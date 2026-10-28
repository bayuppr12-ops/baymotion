/**
 * BAYMOTION — SPORT 100
 * Game Interaktif Family 100 untuk PJOK & Olahraga
 * Vanilla JavaScript (No External Dependencies)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA DEFAULT (Fallback jika file JSON belum dimuat atau akses file://)
  // =========================================================================
  const DEFAULT_GAME_DATA = {
    gameTitle: "Sport 100 - BAYMOTION",
    description: "Game tebak survei 5 jawaban teratas bertema PJOK & Olahraga ala Family 100",
    settings: {
      defaultTimerSeconds: 0,
      maxStrikes: 3,
      enableTimerByDefault: false,
      enableStrikesByDefault: true
    },
    questions: [
      {
        id: 1,
        category: "Permainan Bola Besar",
        question: "Sebutkan cabang olahraga yang menggunakan bola besar!",
        timerSeconds: 0,
        answers: [
          { rank: 1, text: "Sepak Bola", points: 100, aliases: ["sepak bola", "sepakbola", "football", "soccer", "bola"] },
          { rank: 2, text: "Bola Voli", points: 80, aliases: ["voli", "bola voli", "volleyball", "volley"] },
          { rank: 3, text: "Bola Basket", points: 60, aliases: ["basket", "bola basket", "basketball"] },
          { rank: 4, text: "Futsal", points: 40, aliases: ["futsal", "mini soccer", "sepak bola mini"] },
          { rank: 5, text: "Bola Tangan", points: 20, aliases: ["bola tangan", "handball", "hand ball"] }
        ]
      },
      {
        id: 2,
        category: "Bulu Tangkis",
        question: "Sebutkan teknik pukulan dasar dalam permainan bulu tangkis!",
        timerSeconds: 0,
        answers: [
          { rank: 1, text: "Smash (Smes)", points: 100, aliases: ["smash", "smes", "jumping smash", "pukulan smash"] },
          { rank: 2, text: "Servis (Service)", points: 80, aliases: ["servis", "service", "servis pendek", "servis panjang", "flick service"] },
          { rank: 3, text: "Lob (Pukulan Melambung)", points: 60, aliases: ["lob", "pukulan lob", "clear", "melambung", "pukulan lambung"] },
          { rank: 4, text: "Drop Shot", points: 40, aliases: ["drop shot", "dropshot", "pukulan potong", "drop"] },
          { rank: 5, text: "Drive / Netting", points: 20, aliases: ["drive", "pukulan drive", "netting", "net", "permainan net"] }
        ]
      },
      {
        id: 3,
        category: "Kebugaran Jasmani",
        question: "Sebutkan komponen kebugaran jasmani yang penting untuk kesehatan tubuh!",
        timerSeconds: 0,
        answers: [
          { rank: 1, text: "Daya Tahan Jantung & Paru", points: 100, aliases: ["daya tahan", "endurance", "stamina", "daya tahan jantung", "kardio", "cardio", "paru"] },
          { rank: 2, text: "Kekuatan Otot (Strength)", points: 80, aliases: ["kekuatan", "strength", "daya tahan otot", "kekuatan otot"] },
          { rank: 3, text: "Kelenturan (Flexibility)", points: 60, aliases: ["kelenturan", "flexibility", "fleksibilitas", "lentur", "peregangan"] },
          { rank: 4, text: "Kecepatan (Speed)", points: 40, aliases: ["kecepatan", "speed", "sprint", "lari cepat"] },
          { rank: 5, text: "Kelincahan & Keseimbangan", points: 20, aliases: ["kelincahan", "agility", "keseimbangan", "balance", "daya ledak", "koordinasi"] }
        ]
      },
      {
        id: 4,
        category: "Atletik",
        question: "Sebutkan nomor perlombaan dalam cabang olahraga atletik!",
        timerSeconds: 0,
        answers: [
          { rank: 1, text: "Lari Jarak Pendek (Sprint)", points: 100, aliases: ["lari sprint", "sprint", "lari jarak pendek", "100 meter", "lari 100m", "lari cepat"] },
          { rank: 2, text: "Lari Estafet", points: 80, aliases: ["estafet", "lari estafet", "sambung", "lari sambung", "tongkat estafet"] },
          { rank: 3, text: "Lompat Jauh", points: 60, aliases: ["lompat jauh", "long jump", "lompat"] },
          { rank: 4, text: "Tolak Peluru", points: 40, aliases: ["tolak peluru", "shot put", "peluru"] },
          { rank: 5, text: "Lempar Lembing", points: 20, aliases: ["lempar lembing", "javelin", "lembing", "lempar cakram", "lompat tinggi"] }
        ]
      }
    ]
  };

  const STORAGE_KEY = 'sport100_game_data';

  // =========================================================================
  // 2. STATE GAME
  // =========================================================================
  let gameData = JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
  let currentQIndex = 0;
  let totalScore = 0;
  let roundScore = 0;
  let revealedRanks = new Set();
  let revealedCorrectRanks = new Set();
  let questionHistory = {};
  let currentStrikes = 0;
  let maxStrikes = 3;
  let isRoundOver = false;

  // Settings Toggles
  let isTimerActive = false;
  let isStrikesActive = true;
  let isSoundActive = true;

  // Timer Variables
  let timerSecondsLeft = 0;
  let timerInterval = null;

  // Audio Context (Synthesized Game Sounds)
  let audioCtx = null;

  // =========================================================================
  // 3. AUDIO ENGINE (Web Audio API - Bebas dependensi MP3)
  // =========================================================================
  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playChime() {
    if (!isSoundActive) return;
    initAudio();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.4);
    });
  }

  function playBuzzer() {
    if (!isSoundActive) return;
    initAudio();
    if (!audioCtx) return;

    // Authentic Family 100 strike buzzer (Dual square wave dissonance)
    const freqs = [135, 142];
    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.65);
    });
  }

  function playFlip() {
    if (!isSoundActive) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }

  function playTick() {
    if (!isSoundActive) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.07);
  }

  function playFanfare() {
    if (!isSoundActive) return;
    initAudio();
    if (!audioCtx) return;

    const chords = [
      { notes: [523.25, 659.25], delay: 0 },
      { notes: [587.33, 739.99], delay: 0.15 },
      { notes: [659.25, 830.61], delay: 0.3 },
      { notes: [783.99, 987.77, 1046.50], delay: 0.45 }
    ];

    chords.forEach(chord => {
      chord.notes.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, audioCtx.currentTime + chord.delay);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + chord.delay);
        gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + chord.delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + chord.delay + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + chord.delay);
        osc.stop(audioCtx.currentTime + chord.delay + 0.65);
      });
    });
  }

  // =========================================================================
  // 4. CONFETTI ENGINE (Pure Canvas)
  // =========================================================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let particles = [];
  let confettiAnimId = null;

  function resizeCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function triggerConfetti(count = 70) {
    if (!ctx) return;
    const colors = ['#FF6B1A', '#FFC857', '#10B981', '#38BDF8', '#F43F5E', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * confettiCanvas.width,
        y: -10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }
    if (!confettiAnimId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.y > confettiCanvas.height + 20) {
        particles.splice(i, 1);
        i--;
      }
    }

    if (particles.length > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimId = null;
    }
  }

  // =========================================================================
  // 5. DATA LOADER & STORAGE
  // =========================================================================
  async function loadData() {
    // 1. Cek LocalStorage terlebih dahulu (Jika guru pernah edit di admin)
    const localSaved = localStorage.getItem(STORAGE_KEY);
    if (localSaved) {
      try {
        const parsed = JSON.parse(localSaved);
        if (parsed.questions && parsed.questions.length > 0) {
          gameData = parsed;
          if (gameData.settings) {
            gameData.settings.enableTimerByDefault = false;
          }
          isTimerActive = false;
          return;
        }
      } catch (e) {
        console.warn('Data localStorage korup, mencoba memuat dari file:', e);
      }
    }

    // 2. Coba fetch dari sport100-data.json (Jika web di-hosting di server/localhost)
    try {
      const res = await fetch('sport100-data.json');
      if (res.ok) {
        const fetchedData = await res.json();
        if (fetchedData.questions && fetchedData.questions.length > 0) {
          gameData = fetchedData;
          isTimerActive = Boolean(gameData.settings?.enableTimerByDefault);
          return;
        }
      }
    } catch (err) {
      console.log('Fetch file JSON tidak aktif (mungkin protokol file://), menggunakan data default bawaan.');
    }

    // 3. Fallback ke data bawaan
    gameData = JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
    isTimerActive = Boolean(gameData.settings?.enableTimerByDefault);
  }

  function saveToLocalStorage(dataToSave) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }

  // =========================================================================
  // 6. LOGIKA GAME UTAMA
  // =========================================================================
  function calculateTotalScore() {
    let sum = 0;
    for (const key in questionHistory) {
      if (parseInt(key, 10) !== currentQIndex) {
        sum += (questionHistory[key].roundScore || 0);
      }
    }
    sum += (roundScore || 0);
    return sum;
  }

  function saveCurrentQuestionState() {
    questionHistory[currentQIndex] = {
      revealedRanks: new Set(revealedRanks),
      revealedCorrectRanks: new Set(revealedCorrectRanks),
      roundScore: roundScore,
      currentStrikes: currentStrikes,
      isRoundOver: isRoundOver
    };
  }

  function updateNavButtonsUI() {
    const totalQ = gameData.questions.length;
    const isLastQuestion = currentQIndex >= totalQ - 1;

    // Tombol Next Langsung di Controls Card
    const btnNextDirectText = document.getElementById('btnNextDirectText');
    if (btnNextDirectText) {
      btnNextDirectText.innerText = isLastQuestion ? 'Lihat Hasil Akhir 🏆' : 'Soal Berikutnya';
    }

    // Tombol Next di Top Progress Header
    const btnNextHeaderText = document.getElementById('btnNextHeaderText');
    if (btnNextHeaderText) {
      btnNextHeaderText.innerText = isLastQuestion ? 'Selesai 🏆' : 'Next Soal ⏭️';
    }

    // Tombol Prev di Top Progress Header
    const btnPrevHeader = document.getElementById('btnPrevHeader');
    if (btnPrevHeader) {
      btnPrevHeader.disabled = (currentQIndex <= 0);
    }

    // Tombol Buka Jawaban
    const btnReveal = document.getElementById('btnRevealAnswers');
    if (btnReveal) {
      btnReveal.disabled = isRoundOver || revealedRanks.size === 5;
    }
  }

  function getCurrentQuestion() {
    if (!gameData.questions || gameData.questions.length === 0) {
      return null;
    }
    return gameData.questions[currentQIndex] || gameData.questions[0];
  }

  function initRound() {
    const q = getCurrentQuestion();
    if (!q) return;

    // Cek apakah babak ini sudah memiliki riwayat tersimpan (misal kembali dari prev)
    const saved = questionHistory[currentQIndex];
    if (saved) {
      revealedRanks = new Set(saved.revealedRanks);
      revealedCorrectRanks = new Set(saved.revealedCorrectRanks);
      roundScore = saved.roundScore || 0;
      currentStrikes = saved.currentStrikes || 0;
      isRoundOver = Boolean(saved.isRoundOver);
    } else {
      revealedRanks.clear();
      revealedCorrectRanks.clear();
      roundScore = 0;
      currentStrikes = 0;
      isRoundOver = false;
    }

    totalScore = calculateTotalScore();

    // Sembunyikan Game Over & Sesuaikan Round End Card
    const roundEndCard = document.getElementById('roundEndCard');
    const gameOverCard = document.getElementById('gameOverCard');
    const gameBoardSection = document.getElementById('gameBoardSection');

    if (gameOverCard) gameOverCard.classList.remove('active');
    if (gameBoardSection) gameBoardSection.style.display = 'block';

    if (roundEndCard) {
      if (isRoundOver) {
        roundEndCard.classList.add('active');
      } else {
        roundEndCard.classList.remove('active');
      }
    }

    // Update Progress Bar
    const totalQ = gameData.questions.length;
    document.getElementById('qIndexDisplay').innerText = `Soal ${currentQIndex + 1} dari ${totalQ}`;
    const progressFill = document.getElementById('progressBarFill');
    if (progressFill) {
      const pct = Math.round(((currentQIndex + 1) / totalQ) * 100);
      progressFill.style.width = `${pct}%`;
    }

    // Update Header Scores
    updateHeaderScores();

    // Update Question Banner
    document.getElementById('categoryTag').innerText = q.category || 'PJOK & OLAHRAGA';
    document.getElementById('questionText').innerText = q.question;

    // Reset Strikes Display
    renderStrikes();

    // Render 5 Answer Slots
    renderBoard(q);

    // Pulihkan status kartu yang sudah terbuka jika ada
    if (revealedRanks.size > 0) {
      revealedRanks.forEach(rank => {
        const slot = document.getElementById(`slot-${rank}`);
        const slotBack = document.getElementById(`slot-back-${rank}`);
        if (slot) {
          slot.classList.add('revealed');
          if (!revealedCorrectRanks.has(rank)) {
            if (slotBack) slotBack.classList.add('missed');
          }
        }
      });
    }

    // Update Nav Buttons State
    updateNavButtonsUI();

    // Reset Input
    const inputEl = document.getElementById('answerInput');
    const btnAnswer = document.getElementById('btnSubmitAnswer');
    if (inputEl) {
      inputEl.value = '';
      inputEl.disabled = isRoundOver;
      if (!isRoundOver) inputEl.focus();
    }
    if (btnAnswer) btnAnswer.disabled = isRoundOver;
    showFeedback('', '');

    // Setup & Start Timer jika babak belum selesai
    if (!isRoundOver) {
      const qTimer = (q.timerSeconds !== undefined && q.timerSeconds !== null)
        ? Number(q.timerSeconds)
        : (gameData.settings?.defaultTimerSeconds ?? 0);
      setupTimer(qTimer);
    } else {
      clearInterval(timerInterval);
    }
  }

  function renderBoard(q) {
    const boardContainer = document.getElementById('boardContainer');
    if (!boardContainer) return;

    boardContainer.innerHTML = '';

    // Pastikan tepat ada 5 jawaban terurut rank 1 - 5
    const answers = q.answers || [];
    const sortedAnswers = [...answers].sort((a, b) => a.rank - b.rank);

    for (let i = 1; i <= 5; i++) {
      const ans = sortedAnswers.find(a => a.rank === i) || {
        rank: i,
        text: `Jawaban ${i}`,
        points: (6 - i) * 20,
        aliases: []
      };

      const slot = document.createElement('div');
      slot.className = 'answer-slot';
      slot.id = `slot-${i}`;

      slot.innerHTML = `
        <div class="slot-face slot-front">
          <div class="slot-number">${ans.rank}</div>
          <div class="slot-placeholder">••••••••••••••••••••</div>
          <div class="slot-lock-icon">🔒</div>
        </div>
        <div class="slot-face slot-back" id="slot-back-${i}">
          <div class="answer-info">
            <div class="slot-rank">${ans.rank}</div>
            <div class="answer-text">${ans.text}</div>
          </div>
          <div class="answer-points">${ans.points} POIN</div>
        </div>
      `;

      boardContainer.appendChild(slot);
    }
  }

  function renderStrikes() {
    const container = document.getElementById('strikesBoxes');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 1; i <= maxStrikes; i++) {
      const box = document.createElement('div');
      box.className = `strike-slot ${i <= currentStrikes ? 'active' : ''}`;
      box.innerText = 'X';
      container.appendChild(box);
    }
  }

  function updateHeaderScores() {
    const totalEl = document.getElementById('totalScoreDisplay');
    const roundEl = document.getElementById('roundScoreDisplay');
    if (totalEl) totalEl.innerText = totalScore;
    if (roundEl) roundEl.innerText = roundScore;
  }

  // =========================================================================
  // 7. TIMER LOGIC
  // =========================================================================
  function setupTimer(seconds) {
    clearInterval(timerInterval);
    const sec = (seconds !== undefined && seconds !== null) ? Number(seconds) : (gameData.settings?.defaultTimerSeconds ?? 0);
    timerSecondsLeft = sec;
    updateTimerDisplay();

    if (!isTimerActive || sec <= 0) return;

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      updateTimerDisplay();

      if (timerSecondsLeft <= 5 && timerSecondsLeft > 0) {
        playTick();
      }

      if (timerSecondsLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeOut();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerPill = document.getElementById('timerPill');
    const timerText = document.getElementById('timerText');
    if (!timerText || !timerPill) return;

    if (!isTimerActive || !timerSecondsLeft || timerSecondsLeft <= 0) {
      timerText.innerText = 'Tanpa Batas';
      timerPill.className = 'timer-pill no-timer';
      timerPill.title = 'Batas waktu dinonaktifkan (Tanpa batas waktu)';
      return;
    }

    timerText.innerText = `${timerSecondsLeft}s`;
    timerPill.className = 'timer-pill';
    timerPill.title = `Sisa waktu: ${timerSecondsLeft} detik`;

    if (timerSecondsLeft <= 10) {
      timerPill.classList.add('danger');
    } else if (timerSecondsLeft <= 20) {
      timerPill.classList.add('warning');
    }
  }

  function handleTimeOut() {
    if (isRoundOver || !isTimerActive) return;
    playBuzzer();
    showFeedback('Waktu Habis! Soal berakhir.', 'wrong');
    finishRound(false);
  }

  // =========================================================================
  // 8. PEMERIKSAAN JAWABAN (Matching Normalizer & Case-Insensitive)
  // =========================================================================
  function cleanString(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function checkAnswer(userRawText) {
    if (isRoundOver) return;

    const cleanedInput = cleanString(userRawText);
    if (!cleanedInput) {
      showFeedback('Silakan ketik jawaban terlebih dahulu!', 'info');
      return;
    }

    const q = getCurrentQuestion();
    if (!q) return;

    const answers = q.answers || [];
    let matchedAnswer = null;

    // Cari kecocokan di setiap 5 jawaban
    for (const ans of answers) {
      const mainTextClean = cleanString(ans.text);
      if (mainTextClean === cleanedInput) {
        matchedAnswer = ans;
        break;
      }

      // Cek aliases / sinonim
      if (ans.aliases && Array.isArray(ans.aliases)) {
        for (const alias of ans.aliases) {
          const aliasClean = cleanString(alias);
          if (aliasClean === cleanedInput) {
            matchedAnswer = ans;
            break;
          }
          // Kemiripan sederhana jika kata kunci cukup panjang
          if (aliasClean.length >= 4 && (aliasClean.includes(cleanedInput) || cleanedInput.includes(aliasClean))) {
            matchedAnswer = ans;
            break;
          }
        }
      }

      if (matchedAnswer) break;
    }

    const inputEl = document.getElementById('answerInput');
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }

    if (matchedAnswer) {
      // Jawaban Benar!
      if (revealedRanks.has(matchedAnswer.rank)) {
        showFeedback(`"${matchedAnswer.text}" sudah pernah ditebak sebelumnya!`, 'duplicate');
        return;
      }

      // Buka Jawaban
      revealAnswer(matchedAnswer, true);
    } else {
      // Jawaban Salah!
      handleWrongAnswer(userRawText);
    }
  }

  function revealAnswer(ans, isCorrectGuess) {
    revealedRanks.add(ans.rank);
    if (isCorrectGuess) {
      revealedCorrectRanks.add(ans.rank);
    }

    const slot = document.getElementById(`slot-${ans.rank}`);
    const slotBack = document.getElementById(`slot-back-${ans.rank}`);
    if (slot) {
      playFlip();
      slot.classList.add('revealed');

      if (!isCorrectGuess) {
        if (slotBack) slotBack.classList.add('missed');
      }
    }

    if (isCorrectGuess) {
      playChime();
      const points = parseInt(ans.points, 10) || 0;
      roundScore += points;
      totalScore = calculateTotalScore();
      updateHeaderScores();

      // Animasi Floating Point
      spawnFloatingPoint(slot, `+${points}`);

      showFeedback(`Hebat! Jawaban "${ans.text}" benar! (+${points} Poin)`, 'correct');

      // Cek apakah semua 5 jawaban sudah terbuka
      if (revealedRanks.size === 5) {
        clearInterval(timerInterval);
        playFanfare();
        triggerConfetti(90);
        finishRound(true);
      }
    }

    updateNavButtonsUI();
  }

  function spawnFloatingPoint(targetEl, text) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-point';
    floatEl.innerText = text;
    floatEl.style.left = `${rect.right - 120}px`;
    floatEl.style.top = `${rect.top + window.scrollY + 10}px`;
    document.body.appendChild(floatEl);

    setTimeout(() => {
      if (floatEl.parentNode) {
        floatEl.parentNode.removeChild(floatEl);
      }
    }, 1100);
  }

  function handleWrongAnswer(rawText) {
    if (!isStrikesActive) {
      playBuzzer();
      showFeedback(`Jawaban "${rawText}" belum tepat. Silakan coba lagi!`, 'wrong');
      return;
    }

    currentStrikes++;
    renderStrikes();
    playBuzzer();

    // Trigger Big Strike Overlay Flash
    triggerStrikeOverlay(currentStrikes);

    showFeedback(`Jawaban "${rawText}" salah! Strike ${currentStrikes} dari ${maxStrikes}!`, 'wrong');

    if (currentStrikes >= maxStrikes) {
      clearInterval(timerInterval);
      finishRound(false);
    }
  }

  function triggerStrikeOverlay(strikeCount) {
    const overlay = document.getElementById('strikeFlashOverlay');
    const textEl = document.getElementById('strikeFlashText');
    if (!overlay) return;

    if (textEl) {
      textEl.innerText = `STRIKE ${strikeCount}!`;
    }

    overlay.classList.remove('active');
    void overlay.offsetWidth; // force reflow
    overlay.classList.add('active');

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 800);
  }

  function showFeedback(msg, type) {
    const el = document.getElementById('feedbackBox');
    if (!el) return;
    el.innerText = msg;
    el.className = `feedback-box ${type}`;
  }

  // =========================================================================
  // 9. BABAK SELESAI & NEXT SOAL
  // =========================================================================
  function finishRound(allRevealed) {
    isRoundOver = true;
    clearInterval(timerInterval);

    // Nonaktifkan input
    const inputEl = document.getElementById('answerInput');
    const btnAnswer = document.getElementById('btnSubmitAnswer');
    if (inputEl) inputEl.disabled = true;
    if (btnAnswer) btnAnswer.disabled = true;

    // Buka sisa jawaban yang belum tertebak dengan label missed
    const q = getCurrentQuestion();
    if (q && q.answers) {
      q.answers.forEach(ans => {
        if (!revealedRanks.has(ans.rank)) {
          setTimeout(() => {
            const cur = getCurrentQuestion();
            if (cur && cur.id === q.id) {
              revealAnswer(ans, false);
            }
          }, ans.rank * 120);
        }
      });
    }

    saveCurrentQuestionState();
    updateNavButtonsUI();

    // Tampilkan Banner Round End
    setTimeout(() => {
      const cur = getCurrentQuestion();
      if (!cur || cur.id !== q.id) return;

      const roundEndCard = document.getElementById('roundEndCard');
      const roundEndTitle = document.getElementById('roundEndTitle');
      const roundEndDesc = document.getElementById('roundEndDesc');
      const btnNextRound = document.getElementById('btnNextRound');

      if (roundEndCard) {
        roundEndCard.classList.add('active');
        if (allRevealed) {
          if (roundEndTitle) roundEndTitle.innerText = '🎉 LUAR BIASA! SEMUA JAWABAN TERBUKA!';
          if (roundEndDesc) roundEndDesc.innerText = `Skor babak ini: +${roundScore} Poin. Pertahankan kekompakan tim!`;
        } else {
          if (roundEndTitle) roundEndTitle.innerText = '⚡ BABAK SOAL INI SELESAI';
          if (roundEndDesc) roundEndDesc.innerText = `Skor diperoleh pada babak ini: +${roundScore} Poin. Jawaban yang belum tertebak telah ditampilkan.`;
        }

        const isLastQuestion = currentQIndex >= gameData.questions.length - 1;
        if (btnNextRound) {
          btnNextRound.innerHTML = isLastQuestion 
            ? '🏆 Lihat Hasil Akhir & Peringkat' 
            : 'Soal Berikutnya ➡️';
        }
      }
    }, 700);
  }

  function revealAllAnswersForCurrentQuestion() {
    if (isRoundOver) return;
    playChime();
    showFeedback('Semua sisa jawaban telah dibuka untuk pembahasan kelas!', 'info');
    finishRound(false);
  }

  function skipOrNextQuestion() {
    saveCurrentQuestionState();
    clearInterval(timerInterval);

    if (currentQIndex < gameData.questions.length - 1) {
      currentQIndex++;
      initRound();
    } else {
      showGameOver();
    }
  }

  function prevRound() {
    if (currentQIndex > 0) {
      saveCurrentQuestionState();
      clearInterval(timerInterval);
      currentQIndex--;
      initRound();
    }
  }

  function nextRoundOrFinish() {
    skipOrNextQuestion();
  }

  // =========================================================================
  // 10. GAME OVER SCREEN
  // =========================================================================
  function showGameOver() {
    saveCurrentQuestionState();
    clearInterval(timerInterval);
    playFanfare();
    triggerConfetti(120);

    const gameBoardSection = document.getElementById('gameBoardSection');
    const roundEndCard = document.getElementById('roundEndCard');
    const gameOverCard = document.getElementById('gameOverCard');

    if (gameBoardSection) gameBoardSection.style.display = 'none';
    if (roundEndCard) roundEndCard.classList.remove('active');
    if (gameOverCard) gameOverCard.classList.add('active');

    // Update Skor Akhir
    totalScore = calculateTotalScore();
    document.getElementById('finalScoreVal').innerText = totalScore;

    // Hitung Rank / Gelar Juara
    let rankTitle = 'Atlet Berbakat';
    let trophyEmoji = '🏆';
    const maxPossible = (gameData.questions.length || 1) * 300;
    const ratio = totalScore / maxPossible;

    if (ratio >= 0.8) {
      rankTitle = 'Legenda Olahraga Emas 🥇';
      trophyEmoji = '👑';
    } else if (ratio >= 0.6) {
      rankTitle = 'Kapten Juara Sejati 🥈';
      trophyEmoji = '🏆';
    } else if (ratio >= 0.4) {
      rankTitle = 'Bintang Muda Lapangan 🥉';
      trophyEmoji = '⭐';
    } else {
      rankTitle = 'Pejuang Sportif Pantang Menyerah 🏃';
      trophyEmoji = '🎖️';
    }

    document.getElementById('finalRankTag').innerText = rankTitle;
    document.getElementById('finalTrophyEmoji').innerText = trophyEmoji;
    document.getElementById('statTotalQuestions').innerText = gameData.questions.length;
    document.getElementById('statAvgScore').innerText = Math.round(totalScore / (gameData.questions.length || 1));
  }

  function restartGame() {
    questionHistory = {};
    currentQIndex = 0;
    totalScore = 0;
    roundScore = 0;
    revealedRanks.clear();
    revealedCorrectRanks.clear();
    isRoundOver = false;
    currentStrikes = 0;
    initRound();
  }

  // =========================================================================
  // 11. PANEL ADMIN / EDITOR SOAL (EDITABLE FEATURES)
  // =========================================================================
  const adminModal = document.getElementById('adminModal');

  function openAdminModal() {
    clearInterval(timerInterval);
    if (adminModal) {
      adminModal.classList.add('active');
      switchTab('questionsTab');
      renderAdminQuestionList();
      updateJsonEditorTextarea();
    }
  }

  function closeAdminModal() {
    if (adminModal) {
      adminModal.classList.remove('active');
      // Resume timer jika game masih aktif dan ada batas waktu
      if (!isRoundOver && isTimerActive && timerSecondsLeft > 0) {
        setupTimer(timerSecondsLeft);
      }
    }
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
  }

  function renderAdminQuestionList() {
    const listEl = document.getElementById('adminQuestionsList');
    if (!listEl) return;
    listEl.innerHTML = '';

    gameData.questions.forEach((q, qIdx) => {
      const card = document.createElement('div');
      card.className = 'admin-q-card';
      card.id = `admin-q-${qIdx}`;

      let answersRows = '';
      for (let r = 1; r <= 5; r++) {
        const a = (q.answers || []).find(ans => ans.rank === r) || { rank: r, text: '', points: (6 - r) * 20, aliases: [] };
        const aliasStr = (a.aliases || []).join(', ');

        answersRows += `
          <tr>
            <td class="col-rank">#${r}</td>
            <td class="col-text">
              <input type="text" class="admin-input ans-text-input" data-qidx="${qIdx}" data-rank="${r}" value="${escapeHtml(a.text)}" placeholder="Nama Jawaban ${r}">
            </td>
            <td class="col-pts">
              <input type="number" class="admin-input ans-pts-input" data-qidx="${qIdx}" data-rank="${r}" value="${a.points}" style="width: 70px;">
            </td>
            <td>
              <input type="text" class="admin-input ans-aliases-input" data-qidx="${qIdx}" data-rank="${r}" value="${escapeHtml(aliasStr)}" placeholder="Sinonim (pisahkan dg koma)">
            </td>
          </tr>
        `;
      }

      card.innerHTML = `
        <div class="admin-q-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="admin-q-badge">Soal ${qIdx + 1}</span>
            <input type="text" class="admin-input q-cat-input" data-qidx="${qIdx}" value="${escapeHtml(q.category || '')}" placeholder="Kategori (mis: Bulu Tangkis)" style="width: 180px; padding: 4px 8px; font-size: 0.8rem;">
          </div>
          <div class="admin-q-actions">
            <button type="button" class="btn-small" onclick="window.Sport100.moveQuestion(${qIdx}, -1)" ${qIdx === 0 ? 'disabled' : ''}>⬆️ Naik</button>
            <button type="button" class="btn-small" onclick="window.Sport100.moveQuestion(${qIdx}, 1)" ${qIdx === gameData.questions.length - 1 ? 'disabled' : ''}>⬇️ Turun</button>
            <button type="button" class="btn-small danger" onclick="window.Sport100.deleteQuestion(${qIdx})">🗑️ Hapus</button>
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-form-label">Teks Pertanyaan:</label>
          <input type="text" class="admin-input q-text-input" data-qidx="${qIdx}" value="${escapeHtml(q.question)}" placeholder="Ketik pertanyaan olahraga...">
        </div>

        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <label class="admin-form-label" style="margin: 0;">Timer (detik, 0 = Tanpa Batas):</label>
          <input type="number" class="admin-input q-timer-input" data-qidx="${qIdx}" value="${q.timerSeconds ?? 0}" style="width: 80px; padding: 4px 8px;">
        </div>

        <label class="admin-form-label">5 Kotak Jawaban & Poin (Urutan Teratas = Poin Terbesar):</label>
        <table class="admin-answers-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Teks Jawaban</th>
              <th>Poin</th>
              <th>Sinonim / Alternatif Kata (Dipisah Koma)</th>
            </tr>
          </thead>
          <tbody>
            ${answersRows}
          </tbody>
        </table>
      `;

      listEl.appendChild(card);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function addNewQuestion() {
    syncFormInputsToState();
    const newId = (gameData.questions.length > 0 ? Math.max(...gameData.questions.map(q => q.id || 0)) : 0) + 1;
    gameData.questions.push({
      id: newId,
      category: "PJOK & Olahraga",
      question: "Pertanyaan Olahraga Baru...",
      timerSeconds: 0,
      answers: [
        { rank: 1, text: "Jawaban Teratas 1", points: 100, aliases: [] },
        { rank: 2, text: "Jawaban 2", points: 80, aliases: [] },
        { rank: 3, text: "Jawaban 3", points: 60, aliases: [] },
        { rank: 4, text: "Jawaban 4", points: 40, aliases: [] },
        { rank: 5, text: "Jawaban 5", points: 20, aliases: [] }
      ]
    });
    renderAdminQuestionList();
    updateJsonEditorTextarea();

    // Scroll ke kartu baru
    setTimeout(() => {
      const listEl = document.getElementById('adminQuestionsList');
      if (listEl && listEl.lastElementChild) {
        listEl.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  function moveQuestion(index, direction) {
    syncFormInputsToState();
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= gameData.questions.length) return;

    const temp = gameData.questions[index];
    gameData.questions[index] = gameData.questions[targetIdx];
    gameData.questions[targetIdx] = temp;

    renderAdminQuestionList();
    updateJsonEditorTextarea();
  }

  function deleteQuestion(index) {
    if (gameData.questions.length <= 1) {
      alert('Minimal harus ada 1 soal dalam game!');
      return;
    }
    if (confirm(`Yakin ingin menghapus Soal ${index + 1}?`)) {
      syncFormInputsToState();
      gameData.questions.splice(index, 1);
      renderAdminQuestionList();
      updateJsonEditorTextarea();
    }
  }

  function syncFormInputsToState() {
    const listEl = document.getElementById('adminQuestionsList');
    if (!listEl) return;

    const cards = listEl.querySelectorAll('.admin-q-card');
    cards.forEach((card, qIdx) => {
      if (!gameData.questions[qIdx]) return;

      const qText = card.querySelector('.q-text-input')?.value;
      const qCat = card.querySelector('.q-cat-input')?.value;
      const qTimer = card.querySelector('.q-timer-input')?.value;

      if (qText !== undefined) gameData.questions[qIdx].question = qText;
      if (qCat !== undefined) gameData.questions[qIdx].category = qCat;
      if (qTimer !== undefined) gameData.questions[qIdx].timerSeconds = isNaN(parseInt(qTimer, 10)) ? 0 : Math.max(0, parseInt(qTimer, 10));

      const answers = [];
      for (let r = 1; r <= 5; r++) {
        const textVal = card.querySelector(`.ans-text-input[data-rank="${r}"]`)?.value || '';
        const ptsVal = card.querySelector(`.ans-pts-input[data-rank="${r}"]`)?.value || '0';
        const aliasesVal = card.querySelector(`.ans-aliases-input[data-rank="${r}"]`)?.value || '';

        const aliasesArray = aliasesVal
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0);

        answers.push({
          rank: r,
          text: textVal,
          points: parseInt(ptsVal, 10) || 0,
          aliases: aliasesArray
        });
      }
      gameData.questions[qIdx].answers = answers;
    });
  }

  function saveAndApplyAdminChanges() {
    syncFormInputsToState();
    saveToLocalStorage(gameData);
    alert('✅ Perubahan soal berhasil disimpan ke memori browser (LocalStorage)!');
    closeAdminModal();
    restartGame();
  }

  function updateJsonEditorTextarea() {
    const textarea = document.getElementById('jsonCodeEditor');
    if (textarea) {
      textarea.value = JSON.stringify(gameData, null, 2);
    }
  }

  function applyJsonEditorChanges() {
    const textarea = document.getElementById('jsonCodeEditor');
    if (!textarea) return;

    try {
      const parsed = JSON.parse(textarea.value);
      if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        alert('Format JSON tidak valid: Properti "questions" harus berupa array berisi soal.');
        return;
      }
      gameData = parsed;
      saveToLocalStorage(gameData);
      renderAdminQuestionList();
      alert('✅ JSON berhasil diterapkan dan disimpan!');
      closeAdminModal();
      restartGame();
    } catch (e) {
      alert('Terjadi kesalahan sintaks JSON:\n' + e.message);
    }
  }

  function downloadJsonFile() {
    syncFormInputsToState();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "sport100-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function importJsonFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedData = JSON.parse(e.target.result);
        if (!importedData.questions || !Array.isArray(importedData.questions)) {
          alert('File JSON tidak memiliki struktur data Sport 100 yang sesuai.');
          return;
        }
        gameData = importedData;
        saveToLocalStorage(gameData);
        renderAdminQuestionList();
        updateJsonEditorTextarea();
        alert(`✅ Berhasil mengimpor ${gameData.questions.length} soal dari file ${file.name}!`);
        closeAdminModal();
        restartGame();
      } catch (err) {
        alert('Gagal membaca file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToDefaultQuestions() {
    if (confirm('Yakin ingin mereset seluruh soal ke pengaturan awal bawaan BAYMOTION?')) {
      localStorage.removeItem(STORAGE_KEY);
      gameData = JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));
      renderAdminQuestionList();
      updateJsonEditorTextarea();
      alert('✅ Soal berhasil direset ke standar awal!');
      closeAdminModal();
      restartGame();
    }
  }

  // =========================================================================
  // 12. EVENT LISTENERS SETUP
  // =========================================================================
  function setupEventListeners() {
    // Form Input Jawaban
    const form = document.getElementById('answerForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('answerInput');
        if (input) {
          checkAnswer(input.value);
        }
      });
    }

    // Tombol Next Round (pada Banner Round End)
    const btnNext = document.getElementById('btnNextRound');
    if (btnNext) {
      btnNext.addEventListener('click', nextRoundOrFinish);
    }

    // Tombol Next Soal Langsung di Controls Card (Bisa di-next kapan saja)
    const btnNextDirect = document.getElementById('btnNextQuestionDirect');
    if (btnNextDirect) {
      btnNextDirect.addEventListener('click', skipOrNextQuestion);
    }

    // Tombol Next Soal di Header Progress
    const btnNextHeader = document.getElementById('btnNextHeader');
    if (btnNextHeader) {
      btnNextHeader.addEventListener('click', skipOrNextQuestion);
    }

    // Tombol Prev Soal di Header Progress
    const btnPrevHeader = document.getElementById('btnPrevHeader');
    if (btnPrevHeader) {
      btnPrevHeader.addEventListener('click', prevRound);
    }

    // Tombol Buka Semua Jawaban
    const btnReveal = document.getElementById('btnRevealAnswers');
    if (btnReveal) {
      btnReveal.addEventListener('click', revealAllAnswersForCurrentQuestion);
    }

    // Tombol Restart
    const btnRestart = document.getElementById('btnRestartGame');
    if (btnRestart) {
      btnRestart.addEventListener('click', restartGame);
    }

    const btnManageFromGameOver = document.getElementById('btnManageFromGameOver');
    if (btnManageFromGameOver) {
      btnManageFromGameOver.addEventListener('click', openAdminModal);
    }

    // Tombol Reset Game di Topbar
    const btnResetTop = document.getElementById('btnResetGameTop');
    if (btnResetTop) {
      btnResetTop.addEventListener('click', () => {
        if (confirm('Mulai ulang game dari Soal pertama?')) {
          restartGame();
        }
      });
    }

    // Sound Toggle
    const btnSound = document.getElementById('btnSoundToggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        isSoundActive = !isSoundActive;
        btnSound.innerText = isSoundActive ? '🔊' : '🔇';
        btnSound.title = isSoundActive ? 'Matikan Suara' : 'Nyalakan Suara';
      });
    }

    // Timer Toggle
    const btnTimer = document.getElementById('btnTimerToggle');
    if (btnTimer) {
      btnTimer.style.opacity = isTimerActive ? '1' : '0.5';
      btnTimer.title = isTimerActive ? 'Timer Aktif (Klik untuk nonaktifkan batas waktu)' : 'Batas Waktu: Nonaktif (Klik untuk nyalakan timer)';
      btnTimer.addEventListener('click', () => {
        isTimerActive = !isTimerActive;
        btnTimer.style.opacity = isTimerActive ? '1' : '0.5';
        btnTimer.title = isTimerActive ? 'Timer Aktif (Klik untuk nonaktifkan batas waktu)' : 'Batas Waktu: Nonaktif (Klik untuk nyalakan timer)';
        if (!isTimerActive) {
          clearInterval(timerInterval);
          updateTimerDisplay();
        } else {
          setupTimer(timerSecondsLeft > 0 ? timerSecondsLeft : (gameData.settings?.defaultTimerSeconds || 60));
        }
      });
    }

    // Strike Toggle
    const btnStrike = document.getElementById('btnStrikeToggle');
    if (btnStrike) {
      btnStrike.addEventListener('click', () => {
        isStrikesActive = !isStrikesActive;
        btnStrike.style.opacity = isStrikesActive ? '1' : '0.5';
        btnStrike.title = isStrikesActive ? 'Aturan 3 Strike Aktif' : 'Aturan Strike Nonaktif';
        renderStrikes();
      });
    }

    // Fullscreen Toggle (Untuk Proyektor Kelas)
    const btnFullscreen = document.getElementById('btnFullscreenToggle');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          btnFullscreen.innerText = '⤓';
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          }
          btnFullscreen.innerText = '⛶';
        }
      });
    }

    // Admin Modal Open & Close
    const btnOpenAdmin = document.getElementById('btnOpenAdmin');
    if (btnOpenAdmin) {
      btnOpenAdmin.addEventListener('click', openAdminModal);
    }

    const btnCloseAdmin = document.getElementById('btnCloseAdmin');
    if (btnCloseAdmin) {
      btnCloseAdmin.addEventListener('click', closeAdminModal);
    }

    if (adminModal) {
      adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
          closeAdminModal();
        }
      });
    }

    // Admin Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.getAttribute('data-tab'));
      });
    });

    // Admin Actions
    const btnAddQ = document.getElementById('btnAddQuestion');
    if (btnAddQ) btnAddQ.addEventListener('click', addNewQuestion);

    const btnSaveAdmin = document.getElementById('btnSaveAdmin');
    if (btnSaveAdmin) btnSaveAdmin.addEventListener('click', saveAndApplyAdminChanges);

    const btnDownloadJson = document.getElementById('btnDownloadJson');
    if (btnDownloadJson) btnDownloadJson.addEventListener('click', downloadJsonFile);

    const btnApplyJson = document.getElementById('btnApplyJson');
    if (btnApplyJson) btnApplyJson.addEventListener('click', applyJsonEditorChanges);

    const btnCopyJson = document.getElementById('btnCopyJson');
    if (btnCopyJson) {
      btnCopyJson.addEventListener('click', () => {
        const textarea = document.getElementById('jsonCodeEditor');
        if (textarea) {
          navigator.clipboard.writeText(textarea.value).then(() => {
            alert('📋 Kode JSON berhasil disalin ke clipboard!');
          });
        }
      });
    }

    const btnResetDefault = document.getElementById('btnResetDefault');
    if (btnResetDefault) btnResetDefault.addEventListener('click', resetToDefaultQuestions);

    const fileInput = document.getElementById('jsonFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          importJsonFile(e.target.files[0]);
          e.target.value = ''; // reset input
        }
      });
    }
  }

  // =========================================================================
  // 13. INISIALISASI
  // =========================================================================
  window.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await loadData();
    initRound();
  });

  // Expose global controller untuk inline buttons jika dibutuhkan
  window.Sport100 = {
    moveQuestion,
    deleteQuestion,
    addNewQuestion,
    openAdminModal,
    closeAdminModal
  };

})();
