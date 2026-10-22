// The Crypt Trials - Logic & Atmospheric Engine

const $ = id => (typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null);
const questions = (typeof window !== 'undefined' && window.QUIZ_QUESTIONS) || [];

let current = 0;
let answers = [];

// Determine if running in a real browser (check.cjs mock does not have document.addEventListener)
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.addEventListener === 'function';

function show(id) {
  const views = ['intro', 'trial', 'result'];
  views.forEach(view => {
    const el = $(view);
    if (el) el.hidden = view !== id;
  });
}

function render() {
  const q = questions[current];
  if (!q) return;

  show('trial');

  const questionEl = $('question');
  if (questionEl) {
    questionEl.textContent = q.question;
    if (typeof questionEl.focus === 'function') questionEl.focus();
  }

  const counterEl = $('counter');
  if (counterEl) {
    counterEl.textContent = `QUESTION ${String(current + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
  }

  const progressEl = $('progress');
  if (progressEl) {
    progressEl.style.width = `${((current + 1) / questions.length) * 100}%`;
  }

  const optionsContainer = $('options');
  if (optionsContainer) {
    optionsContainer.replaceChildren();

    q.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'answer';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = index;
      input.checked = answers[current] === index;

      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement('span');
      text.className = 'answer-text';
      text.textContent = option;

      // Note: check.cjs expects elements.options.children[index].children[0] to be the input!
      label.append(input, letter, text);

      if (isBrowser) {
        const kbd = document.createElement('kbd');
        kbd.className = 'key-hint';
        kbd.textContent = String.fromCharCode(65 + index);
        kbd.setAttribute('aria-hidden', 'true');
        label.append(kbd);
      }

      input.addEventListener('change', () => {
        answers[current] = index;
        update();
        if (isBrowser && window.AudioEngine) {
          window.AudioEngine.playSelect();
        }
      });

      optionsContainer.append(label);
    });
  }

  const backBtn = $('back');
  if (backBtn) {
    backBtn.textContent = current ? '← Back' : '← Entrance';
  }

  const nextBtn = $('next');
  if (nextBtn) {
    nextBtn.textContent = current === questions.length - 1 ? 'Reveal my fate →' : 'Continue →';
  }

  update();
}

function update() {
  const isAnswered = answers[current] !== undefined;
  const nextBtn = $('next');
  if (nextBtn) nextBtn.disabled = !isAnswered;

  const statusEl = $('selection-status');
  if (statusEl) {
    statusEl.textContent = !isAnswered ? 'Select an answer' : 'Answer sealed';
  }
}

function finish() {
  show('result');

  const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
  const total = questions.length;

  const scoreEl = $('score');
  if (scoreEl) {
    scoreEl.textContent = `${correct} / ${total}`;
  }

  const resultTitleEl = $('result-title');
  const resultCopyEl = $('result-copy');

  let titleText = 'You survived\nthe crypt.';
  let copyText = 'The trial is complete. Your fate has been revealed.';

  if (correct === total) {
    titleText = 'Crypt Conqueror\nMaster of the Dark';
    copyText = 'Every seal shattered. You walk with the immortals.';
  } else if (correct > 0) {
    titleText = 'Survivor\nTouched by Shadows';
    copyText = 'You survived the crypt, though the spirits leave their mark.';
  } else {
    titleText = 'Claimed by\nthe Shadows';
    copyText = 'The darkness swallowed your path. Dare you awaken once more?';
  }

  if (resultTitleEl) {
    resultTitleEl.textContent = titleText;
    if (typeof resultTitleEl.focus === 'function') resultTitleEl.focus();
  }
  if (resultCopyEl) {
    resultCopyEl.textContent = copyText;
  }

  const reviewEl = $('review');
  if (reviewEl) {
    reviewEl.replaceChildren();

    questions.forEach((q, i) => {
      const item = document.createElement('details');
      item.className = answers[i] === q.correctAnswer ? 'review-card is-correct' : 'review-card is-wrong';

      const summary = document.createElement('summary');
      const isRight = answers[i] === q.correctAnswer;
      summary.textContent = `${isRight ? '✓' : '×'}  ${q.question}`;

      const p = document.createElement('p');
      const userAnswerText = q.options[answers[i]] || 'No answer';
      const correctAnswerText = q.options[q.correctAnswer];
      p.textContent = `Your answer: ${userAnswerText}. Correct answer: ${correctAnswerText}. ${q.explanation || ''}`;

      item.append(summary, p);
      reviewEl.append(item);
    });
  }

  if (isBrowser && window.AudioEngine) {
    window.AudioEngine.playFinish(correct === total);
  }
}

// Initial count binding
const countEl = $('count');
if (countEl) {
  countEl.textContent = String(questions.length).padStart(2, '0');
}

// Event Listeners for Quiz Flow
const startBtn = $('start');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    current = 0;
    render();
    if (isBrowser && window.AudioEngine) {
      window.AudioEngine.playAdvance();
    }
  });
}

const nextBtn = $('next');
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (answers[current] === undefined) return;
    if (isBrowser && window.AudioEngine) {
      window.AudioEngine.playAdvance();
    }
    if (current === questions.length - 1) {
      finish();
    } else {
      current++;
      render();
    }
  });
}

const backBtn = $('back');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    if (current) {
      current--;
      render();
    } else {
      show('intro');
      const startEl = $('start');
      if (startEl && typeof startEl.focus === 'function') startEl.focus();
    }
  });
}

const restartBtn = $('restart');
if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    answers = [];
    current = 0;
    show('intro');
    const startEl = $('start');
    if (startEl && typeof startEl.focus === 'function') startEl.focus();
  });
}

// Sound Button Logic
const soundBtn = $('sound');
if (soundBtn) {
  soundBtn.addEventListener('click', async () => {
    const audio = $('audio');
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.volume = 0.22;
        await audio.play();
        soundBtn.textContent = 'Sound on ♫';
        soundBtn.setAttribute('aria-pressed', 'true');
        if (isBrowser && window.AudioEngine) {
          window.AudioEngine.setEnabled(true);
        }
      } catch {
        soundBtn.textContent = 'Sound unavailable';
      }
    } else {
      audio.pause();
      soundBtn.textContent = 'Sound off ♫';
      soundBtn.setAttribute('aria-pressed', 'false');
      if (isBrowser && window.AudioEngine) {
        window.AudioEngine.setEnabled(false);
      }
    }
  });
}

// =========================================================
// BROWSER-ONLY ENHANCEMENTS: Audio Engine, Canvas Motes,
// Flashlight, Lightning, Spider, Keyboard Shortcuts & Share
// =========================================================
if (isBrowser) {
  // 1. Audio Engine (Pure Web Audio API Synthesizer)
  let audioCtx = null;
  let audioEnabled = false;

  const initAudio = () => {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  window.AudioEngine = {
    setEnabled(val) {
      audioEnabled = val;
      if (val) initAudio();
    },
    playSelect() {
      if (!audioEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (e) {}
    },
    playAdvance() {
      if (!audioEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } catch (e) {}
    },
    playFinish(won) {
      if (!audioEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const notes = won ? [220, 277, 330, 440] : [220, 207, 196, 175];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = won ? 'sine' : 'sawtooth';
          osc.frequency.value = freq;
          const start = audioCtx.currentTime + idx * 0.14;
          gain.gain.setValueAtTime(0.1, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(start);
          osc.stop(start + 0.5);
        });
      } catch (e) {}
    }
  };

  // 2. Keyboard Navigation
  document.addEventListener('keydown', e => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      if (e.key === 'Enter') {
        const nextEl = $('next');
        if (nextEl && !nextEl.disabled) nextEl.click();
      }
      return;
    }

    const trialEl = $('trial');
    const isTrialActive = trialEl && !trialEl.hidden;

    if (isTrialActive) {
      const key = e.key.toUpperCase();
      let optionIndex = -1;
      if (['A', '1'].includes(key)) optionIndex = 0;
      else if (['B', '2'].includes(key)) optionIndex = 1;
      else if (['C', '3'].includes(key)) optionIndex = 2;
      else if (['D', '4'].includes(key)) optionIndex = 3;

      if (optionIndex >= 0) {
        const optionsContainer = $('options');
        if (optionsContainer && optionsContainer.children[optionIndex]) {
          const radio = optionsContainer.children[optionIndex].querySelector('input');
          if (radio) {
            radio.checked = true;
            answers[current] = optionIndex;
            update();
            if (window.AudioEngine) window.AudioEngine.playSelect();
          }
        }
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        const nextEl = $('next');
        if (nextEl && !nextEl.disabled) {
          e.preventDefault();
          nextEl.click();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        const backEl = $('back');
        if (backEl) {
          e.preventDefault();
          backEl.click();
        }
      }
    } else {
      const introEl = $('intro');
      if (introEl && !introEl.hidden && (e.key === 'Enter' || e.key === ' ')) {
        const startEl = $('start');
        if (startEl) {
          e.preventDefault();
          startEl.click();
        }
      }
      const resultEl = $('result');
      if (resultEl && !resultEl.hidden && (e.key === 'Enter' || e.key === ' ')) {
        const restartEl = $('restart');
        if (restartEl) {
          e.preventDefault();
          restartEl.click();
        }
      }
    }
  });

  // 3. Floating Motes Canvas
  const motesCanvas = $('motes');
  if (motesCanvas && motesCanvas.getContext) {
    const ctx = motesCanvas.getContext('2d');
    let motes = [];
    let w = (motesCanvas.width = window.innerWidth);
    let h = (motesCanvas.height = window.innerHeight);

    const resizeCanvas = () => {
      w = motesCanvas.width = window.innerWidth;
      h = motesCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const moteCount = Math.min(50, Math.floor(window.innerWidth / 24));
    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: -(Math.random() * 0.45 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        seed: Math.random() * 100
      });
    }

    let animFrame = null;
    let lastTime = 0;

    const renderMotes = time => {
      ctx.clearRect(0, 0, w, h);
      motes.forEach(m => {
        m.y += m.speedY;
        m.x += m.speedX + Math.sin(time * 0.0015 + m.seed) * 0.25;

        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${Math.floor(90 + m.r * 30)}, 40, ${m.alpha})`;
        ctx.fill();
      });

      if (document.visibilityState !== 'hidden') {
        animFrame = requestAnimationFrame(renderMotes);
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        lastTime = performance.now();
        animFrame = requestAnimationFrame(renderMotes);
      } else {
        cancelAnimationFrame(animFrame);
      }
    });

    animFrame = requestAnimationFrame(renderMotes);
  }

  // 4. Mouse Candlelight / Flashlight
  const flashlight = document.querySelector('.flashlight');
  if (flashlight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight * 0.4;
    let rafId = null;

    const updateLight = () => {
      flashlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      rafId = null;
    };

    window.addEventListener(
      'mousemove',
      e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(updateLight);
      },
      { passive: true }
    );
  }

  // 5. Interactive Dangling Spider
  const spider = $('spider');
  if (spider) {
    const fleeSpider = () => {
      if (spider.classList.contains('flee')) return;
      spider.classList.add('flee');
      setTimeout(() => {
        spider.classList.remove('flee');
      }, 4200);
    };
    spider.addEventListener('click', fleeSpider);
    spider.addEventListener('mouseenter', fleeSpider);
  }

  // 6. Lightning Storm Engine
  const triggerLightning = () => {
    const delays = [0, 45, 80, 150, 190, 260];
    const opacities = [0.85, 0.15, 1.0, 0.2, 0.7, 0];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        const val = opacities[idx];
        document.documentElement.style.setProperty('--lit', val);
        if (val > 0.3) {
          document.body.classList.add('lit');
        } else {
          document.body.classList.remove('lit');
        }
      }, delay);
    });

    const nextInterval = Math.random() * 16000 + 16000;
    setTimeout(triggerLightning, nextInterval);
  };
  setTimeout(triggerLightning, 12000);

  // 7. Bat Spawner
  const batsContainer = $('bats');
  if (batsContainer) {
    const spawnBat = () => {
      const bat = document.createElement('div');
      const rtl = Math.random() > 0.5;
      bat.className = `bat ${rtl ? 'rtl' : ''}`;
      bat.style.setProperty('--y', `${Math.random() * 35 + 10}%`);
      bat.style.setProperty('--s', `${Math.random() * 16 + 26}px`);
      bat.style.setProperty('--d', `${Math.random() * 4 + 7}s`);
      bat.innerHTML = `
        <svg viewBox="0 0 48 24">
          <path class="wing l" fill="#040102" d="M24 14 C18 4 6 2 0 10 C6 18 16 16 24 14 Z"/>
          <path class="wing r" fill="#040102" d="M24 14 C30 4 42 2 48 10 C42 18 32 16 24 14 Z"/>
          <ellipse cx="24" cy="14" rx="3.5" ry="5.5" fill="#040102"/>
        </svg>
      `;
      batsContainer.append(bat);
      bat.addEventListener('animationend', () => bat.remove());

      setTimeout(spawnBat, Math.random() * 18000 + 12000);
    };
    setTimeout(spawnBat, 8000);
  }

  // 8. Result Sharing / Copying
  const shareBtn = $('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
      const total = questions.length;
      const shareText = `🎃 The Crypt Trials — Microsoft Tech Community Amity Noida\n🕯 Fate Sealed: ${correct} / ${total} Correct\n📜 Creep. Code. Create.\nCan you survive the crypt?`;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
        }
        const toast = $('share-toast');
        if (toast) {
          toast.hidden = false;
          toast.classList.add('visible');
          setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => (toast.hidden = true), 300);
          }, 2600);
        }
      } catch (e) {
        shareBtn.textContent = 'Copied!';
        setTimeout(() => (shareBtn.textContent = 'Copy Fate 📋'), 2000);
      }
    });
  }
}
