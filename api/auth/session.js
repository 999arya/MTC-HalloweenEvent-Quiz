import { getSessionFromRequest, clearSessionCookie } from '../_lib/session.js';
import { getSupabaseAdmin } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    // Logout / terminate session
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({ authenticated: false, message: 'Session terminated' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSessionFromRequest(req);
  if (!session || !session.registrationId) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Query registration & team_answers status
    const [regRes, ansRes] = await Promise.all([
      supabase
        .from('registrations')
        .select('id, full_name, team_name, team_size, member2_name')
        .eq('id', session.registrationId)
        .maybeSingle(),
      supabase
        .from('team_answers')
        .select('status, submitted_at, answers')
        .eq('registration_id', session.registrationId)
        .maybeSingle()
    ]);

    const registration = regRes.data;
    if (!registration) {
      // Registration no longer exists; clear cookie
      res.setHeader('Set-Cookie', clearSessionCookie());
      return res.status(200).json({ authenticated: false });
    }

    const answerRecord = ansRes.data;
    const isSubmitted = answerRecord?.status === 'submitted';

    return res.status(200).json({
      authenticated: true,
      teamName: registration.team_name || `${registration.full_name}'s Team`,
      leaderName: registration.full_name,
      teamSize: registration.team_size || 1,
      member2Name: registration.member2_name || null,
      isSubmitted,
      submittedAt: answerRecord?.submitted_at || null,
      hasDraft: !isSubmitted && Boolean(answerRecord?.answers && Object.keys(answerRecord.answers).length > 0)
    });
  } catch (err) {
    console.error('Session check error:', err.message);
    return res.status(200).json({
      authenticated: true,
      teamName: session.teamName,
      leaderName: session.leaderName,
      isSubmitted: false
    });
  }
}
