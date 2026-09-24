/**
 * TRiSTAR - $225K ALBUM & PLATFORM INVESTMENT PITCH DECK ENGINE
 * Presentation Slide Navigation, Interactive SVG Donut Chart,
 * 3-Year Financial Projections, Audio Player & Particle Effects.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SLIDE NAVIGATION ENGINE ---
  const slides = document.querySelectorAll('.slide-section');
  const navButtons = document.querySelectorAll('.nav-dot-btn');
  const btnPrev = document.getElementById('prev-btn');
  const btnNext = document.getElementById('next-btn');
  const currentSlideNum = document.getElementById('current-slide-num');
  const startPitchBtn = document.querySelector('.start-pitch-btn');

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  const goToSlide = (index) => {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    navButtons[currentSlideIndex].classList.remove('active');

    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    navButtons[currentSlideIndex].classList.add('active');

    if (currentSlideNum) {
      currentSlideNum.textContent = currentSlideIndex + 1;
    }

    // Scroll slide to top
    slides[currentSlideIndex].scrollTop = 0;
  };

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  };

  // Nav button click events
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-slide'), 10);
      goToSlide(idx);
    });
  });

  // Cover start button
  if (startPitchBtn) {
    startPitchBtn.addEventListener('click', () => {
      goToSlide(1);
    });
  }

  // HUD buttons
  if (btnPrev) btnPrev.addEventListener('click', handlePrev);
  if (btnNext) btnNext.addEventListener('click', handleNext);

  // Keyboard Navigation (Desktop)
  window.addEventListener('keydown', (e) => {
    if (window.innerWidth > 960) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    }
  });


  // --- 2. USE OF FUNDS INTERACTIVE DONUT CHART (SLIDE 06) ---
  const chartSegments = document.querySelectorAll('.chart-segment');
  const legendItems = document.querySelectorAll('.legend-item');
  const centerAmount = document.getElementById('center-amount');
  const centerLabel = document.getElementById('center-label');
  const segmentDescBox = document.getElementById('segment-desc-box');

  const highlightFundSegment = (index) => {
    const item = legendItems[index];
    if (!item) return;

    const amount = item.getAttribute('data-amount');
    const label = item.getAttribute('data-title');
    const desc = item.getAttribute('data-desc');

    if (centerAmount) centerAmount.textContent = amount;
    if (centerLabel) centerLabel.textContent = label;
    if (segmentDescBox) segmentDescBox.innerHTML = desc;

    legendItems.forEach((el, idx) => {
      if (idx === index) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    chartSegments.forEach((seg, idx) => {
      if (idx === index) {
        seg.classList.add('active');
      } else {
        seg.classList.remove('active');
      }
    });
  };

  chartSegments.forEach((seg, index) => {
    seg.addEventListener('mouseenter', () => highlightFundSegment(index));
    seg.addEventListener('click', () => highlightFundSegment(index));
  });

  legendItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => highlightFundSegment(index));
    item.addEventListener('click', () => highlightFundSegment(index));
  });


  // --- 3. FINANCIAL PROJECTIONS BAR CHART (SLIDE 07) ---
  const barCols = document.querySelectorAll('.bar-col');
  const projDetailCard = document.getElementById('proj-detail-card');

  barCols.forEach(col => {
    col.addEventListener('mouseenter', () => {
      const year = col.getAttribute('data-year');
      const val = col.getAttribute('data-val');
      const desc = col.getAttribute('data-desc');

      if (projDetailCard) {
        const titleEl = projDetailCard.querySelector('.proj-year-heading');
        const valEl = projDetailCard.querySelector('.detail-value');
        const descEl = projDetailCard.querySelector('.proj-desc-text');

        if (titleEl) titleEl.textContent = `${year} Target Outlook`;
        if (valEl) valEl.textContent = val;
        if (descEl) descEl.innerHTML = desc;
      }

      barCols.forEach(c => c.classList.remove('active'));
      col.classList.add('active');
    });
  });


  // --- 4. INTEGRATED AUDIO PLAYER FOR "BLESSINGS" ---
  const audioPlayBtn = document.getElementById('deck-audio-play');
  const audioTrackTitle = document.getElementById('deck-audio-title');
  let deckAudio = null;
  let isDeckAudioPlaying = false;

  if (audioPlayBtn) {
    deckAudio = new Audio('assets/audio/Blessings - Tri-Star FINAL.m4a');
    deckAudio.crossOrigin = "anonymous";
    deckAudio.preload = "auto";

    audioPlayBtn.addEventListener('click', () => {
      if (isDeckAudioPlaying) {
        deckAudio.pause();
        isDeckAudioPlaying = false;
        audioPlayBtn.innerHTML = '▶';
        audioPlayBtn.style.background = 'var(--diamond-cyan)';
      } else {
        deckAudio.play().then(() => {
          isDeckAudioPlaying = true;
          audioPlayBtn.innerHTML = '❚❚';
          audioPlayBtn.style.background = 'var(--accent-gold)';
        }).catch(err => {
          console.log("Audio play allowed on user interaction:", err);
        });
      }
    });

    deckAudio.addEventListener('ended', () => {
      isDeckAudioPlaying = false;
      audioPlayBtn.innerHTML = '▶';
      audioPlayBtn.style.background = 'var(--diamond-cyan)';
    });
  }


  // --- 5. INVESTOR INQUIRY MODAL ---
  const investorModal = document.getElementById('investor-modal');
  const openModalBtns = document.querySelectorAll('.open-investor-modal');
  const closeModalBtn = document.getElementById('close-investor-modal');
  const investorForm = document.getElementById('investor-form');
  const formSuccess = document.getElementById('investor-form-success');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (investorModal) investorModal.classList.add('open');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (investorModal) investorModal.classList.remove('open');
    });
  }

  if (investorModal) {
    investorModal.addEventListener('click', (e) => {
      if (e.target === investorModal) {
        investorModal.classList.remove('open');
      }
    });
  }

  if (investorForm) {
    investorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      investorForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    });
  }


  // --- 6. BACKGROUND DIAMOND PARTICLE SIMULATION ---
  const canvas = document.getElementById('diamond-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rot += p.rotSpeed;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity * 0.6})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;

        // Draw 4-point diamond star
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 2);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size * 2);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

});
