import { getSessionFromRequest } from '../_lib/session.js';
import { getSupabaseAdmin } from '../_lib/supabase.js';
import { gradeSubmission } from '../_lib/evaluator.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSessionFromRequest(req);
  if (!session || !session.registrationId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON request payload' });
      }
    }

    const finalAnswers = body?.answers;
    if (!finalAnswers || typeof finalAnswers !== 'object') {
      return res.status(400).json({ error: 'Final answers object is required.' });
    }

    const supabase = getSupabaseAdmin();

    // 1. Fetch team answer record to check existing submission status
    const { data: existing, error: fetchError } = await supabase
      .from('team_answers')
      .select('id, status, answers')
      .eq('registration_id', session.registrationId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking team submission status');
      return res.status(500).json({ error: 'Database verification failed' });
    }

    // Reject repeat submissions (Enforcing one final submission per team)
    if (existing?.status === 'submitted') {
      return res.status(409).json({ error: 'Final quiz answers have already been submitted. Further modifications are prohibited.' });
    }

    // 2. Fetch master questions including private answer_key for server evaluation
    const { data: dbQuestions, error: qError } = await supabase
      .from('questions')
      .select('question_key, seal_number, question_type, answer_key, points')
      .eq('is_active', true);

    if (qError || !dbQuestions) {
      console.error('Error fetching questions for grading');
      return res.status(500).json({ error: 'Evaluation service temporarily unavailable.' });
    }

    // 3. Score submission on server
    const evaluation = gradeSubmission(dbQuestions, finalAnswers);

    const now = new Date().toISOString();

    // 4. Update or insert submission record with status: 'submitted'
    if (existing) {
      // Atomic conditional update: only update if current status in database is still 'draft'
      const { data: updatedRows, error: updateError } = await supabase
        .from('team_answers')
        .update({
          status: 'submitted',
          answers: finalAnswers,
          submitted_at: now,
          updated_at: now
        })
        .eq('id', existing.id)
        .eq('status', 'draft')
        .select('id, status');

      if (updateError) {
        console.error('Error finalizing submission in Supabase');
        return res.status(500).json({ error: 'Failed to record final submission' });
      }

      // If zero rows updated, another concurrent request already updated the status to 'submitted'
      if (!updatedRows || updatedRows.length === 0) {
        return res.status(409).json({ error: 'Final quiz answers have already been submitted by another concurrent request.' });
      }
    } else {
      const { data: insertedRows, error: insertError } = await supabase
        .from('team_answers')
        .insert({
          registration_id: session.registrationId,
          status: 'submitted',
          answers: finalAnswers,
          submitted_at: now,
          created_at: now,
          updated_at: now
        })
        .select('id, status');

      if (insertError) {
        // Unique constraint violation on registration_id indicates race condition on insert
        if (insertError.code === '23505') {
          return res.status(409).json({ error: 'Final quiz answers have already been submitted.' });
        }
        console.error('Error creating finalized submission in Supabase');
        return res.status(500).json({ error: 'Failed to record final submission' });
      }

      if (!insertedRows || insertedRows.length === 0) {
        return res.status(500).json({ error: 'Failed to verify submission recording.' });
      }
    }

    // Return score summary to client without leaking private answer keys
    return res.status(200).json({
      submitted: true,
      score: evaluation.score,
      totalQuestions: evaluation.totalQuestions,
      submittedAt: now
    });
  } catch (err) {
    console.error('Submit endpoint error:', err.message);
    return res.status(500).json({ error: 'An unexpected internal error occurred.' });
  }
}
