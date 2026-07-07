(function() {
  'use strict';

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // --- Lenis ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // --- Preloader ---
  function initPreloader() {
    const bar = document.getElementById('preloader-bar');
    const counter = document.getElementById('preloader-counter');
    const preloader = document.getElementById('preloader');
    const logo = document.querySelector('.preloader-logo');

    if (isReduced) {
      preloader.classList.add('hidden');
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => preloader.classList.add('hidden')
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    tl.to(bar, {
      width: '100%', duration: 1.2, ease: 'power2.inOut',
      onUpdate: function() {
        const pct = Math.round(this.progress() * 100);
        counter.textContent = pct + '%';
      }
    }, '-=0.2');
    tl.to(preloader, { opacity: 0, duration: 0.4 }, '-=0.2');
  }

  // --- Hero Particles ---
  function initParticles() {
    if (isReduced) return;
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
      p.style.opacity = 0.1 + Math.random() * 0.25;
      container.appendChild(p);
      anime({
        targets: p,
        translateY: [0, -30 - Math.random() * 40],
        opacity: [0.3, 0],
        duration: 3000 + Math.random() * 4000,
        loop: true,
        easing: 'easeInOutSine',
        delay: Math.random() * 3000,
      });
    }
  }

  // --- Hero Ambient Gradient (scroll-driven shift) ---
  function initHeroGradient() {
    if (isReduced || isMobile) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    gsap.to(hero, {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }

  // --- Hero Title Animation ---
  function initHeroTitle() {
    const title = document.getElementById('hero-title');
    if (!title) return;

    const chars = title.querySelectorAll('.char');

    if (isReduced) {
      chars.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      navReveal();
      gsap.to(['.hero-sub', '#hero-cta', '.scroll-cue', '.nav-logo', '.nav-links a'], {
        opacity: 1, duration: 0.01, stagger: 0.01
      });
      return;
    }

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.3,
      onComplete: () => {
        gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
        gsap.to('#hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 });
        gsap.to('.scroll-cue', { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 });
        navReveal();
      }
    });
  }

  function navReveal() {
    gsap.to('.nav-logo', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    gsap.to('.nav-links a', {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      stagger: 0.08, delay: 0.2
    });
  }

  // --- Split Hero Title into Characters ---
  function splitHeroChars() {
    const title = document.getElementById('hero-title');
    if (!title) return;
    const lines = title.querySelectorAll('.line');
    lines.forEach(line => {
      const text = line.textContent;
      line.textContent = '';
      [...text].forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        line.appendChild(span);
      });
    });
  }

  // --- Scroll Progress ---
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    if (isReduced) { bar.style.display = 'none'; return; }
    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });
  }

  // --- Section Title Word Splits ---
  function splitWords(el) {
    const text = el.textContent;
    el.textContent = '';
    text.split(/(\s+)/).forEach(part => {
      if (part.trim() === '') {
        el.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        el.appendChild(span);
      }
    });
  }

  function initSectionWordReveals() {
    if (isReduced) return;
    const titles = ['#about-title', '#projects-title', '#more-certs-title', '#skills-title', '#achievements-title'];
    titles.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      splitWords(el);
      const words = el.querySelectorAll('.word');
      gsap.to(words, {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    const ctaTitle = document.getElementById('cta-title');
    if (ctaTitle) {
      const words = ctaTitle.querySelectorAll('.word');
      gsap.to(words, {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    }
  }

  // --- About Image Parallax ---
  function initAboutParallax() {
    if (isReduced || isMobile) return;
    const img = document.querySelector('.about-image');
    const decor = document.querySelector('.about-image-decor');
    if (!img) return;
    gsap.to(img, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
    if (decor) {
      gsap.to(decor, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }
  }

  // --- Project Cards Clip-Path Reveal ---
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;
    if (isReduced) {
      cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; c.style.clipPath = 'none'; });
      return;
    }
    cards.forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 60,
        clipPath: 'inset(0 0 100% 0)',
      }, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }

  // --- Skills Reveal ---
  function initSkillsReveal() {
    if (isReduced) {
      document.querySelectorAll('.skill-category').forEach(c => {
        c.style.opacity = '1'; c.style.transform = 'none';
      });
      return;
    }
    gsap.to('.skill-category', {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#skills-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    document.querySelectorAll('.skill-item-fill').forEach(fill => {
      const w = fill.getAttribute('data-width') || '0';
      gsap.to(fill, {
        width: w + '%',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: fill.closest('.skill-category'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }

  // --- Achievement Cards Reveal ---
  function initAchievementsReveal() {
    if (isReduced) {
      document.querySelectorAll('.achievement-card, .athletics-item').forEach(c => {
        c.style.opacity = '1'; c.style.transform = 'none';
      });
      return;
    }
    gsap.to('.achievement-card', {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#achievements-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
    gsap.to('.athletics-item', {
      opacity: 1, scale: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '#athletics-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // --- Footer Closing ---
  function initFooterReveal() {
    if (isReduced) {
      const el = document.getElementById('footer-closing');
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      return;
    }
    gsap.to('#footer-closing', {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#footer-closing',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // --- Counter Animation ---
  function initCounters() {
    if (isReduced) {
      document.querySelectorAll('.about-stat-num').forEach(el => {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }
    document.querySelectorAll('.about-stat-num').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      gsap.to(el, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el.closest('.about-stats'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }

  // --- Pinned Showcase Horizontal Scroll ---
  function initPinnedShowcase() {
    if (isReduced) {
      const showcase = document.querySelector('.pinned-showcase');
      if (showcase) {
        showcase.classList.remove('pinned-showcase');
        showcase.querySelector('.pinned-showcase-sticky')?.classList.remove('pinned-showcase-sticky');
      }
      return;
    }

    const track = document.getElementById('showcase-track');
    if (!track) return;
    const cards = track.querySelectorAll('.pinned-card');
    if (cards.length === 0) return;

    let cardStyle = window.getComputedStyle(cards[0]);
    let gap = parseFloat(cardStyle.marginRight) || 48;
    let cardW = cards[0].offsetWidth + gap;
    let totalW = cardW * cards.length - gap;
    let viewportW = window.innerWidth;
    let maxScroll = Math.max(0, totalW - viewportW + 80);

    function updateMetrics() {
      cardStyle = window.getComputedStyle(cards[0]);
      gap = parseFloat(cardStyle.marginRight) || 48;
      cardW = cards[0].offsetWidth + gap;
      totalW = cardW * cards.length - gap;
      viewportW = window.innerWidth;
      maxScroll = Math.max(0, totalW - viewportW + 80);
      ScrollTrigger.refresh();
    }

    window.addEventListener('resize', updateMetrics);

    gsap.to(track, {
      x: () => -maxScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: '.pinned-showcase',
        start: 'top top',
        end: () => '+=' + (maxScroll + window.innerHeight),
        pin: '.pinned-showcase-sticky',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  // --- Pinned Cards Scale + Saturation Pop ---
  function initPinnedCardsPop() {
    if (isReduced || isMobile) return;
    document.querySelectorAll('.pinned-card').forEach(card => {
      gsap.fromTo(card, {
        scale: 0.92,
        filter: 'grayscale(0.6) saturate(0.4)',
      }, {
        scale: 1,
        filter: 'grayscale(0) saturate(1)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }

  // --- Magnetic Button Effect ---
  function initMagneticButtons() {
    if (isReduced) return;
    const btns = document.querySelectorAll('.hero-cta, .cta-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0, y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // --- Smooth Nav Anchor Links ---
  function initNavLinks() {
    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          lenis.scrollTo(target, { offset: -70, duration: 1.4 });
        }
      });
    });
    document.querySelector('.hero-cta')?.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#projects');
      if (target) lenis.scrollTo(target, { offset: -70, duration: 1.4 });
    });
  }

  // --- Cert Timeline Reveal ---
  function initCertReveal() {
    if (isReduced) {
      document.querySelectorAll('.cert-item').forEach(c => {
        c.style.opacity = '1'; c.style.transform = 'none';
      });
      return;
    }
    gsap.to('.cert-item', {
      opacity: 1, x: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cert-timeline',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', () => {
    splitHeroChars();
    initPreloader();
    initParticles();
    setTimeout(() => initHeroTitle(), 100);

    ScrollTrigger.refresh();

    setTimeout(() => {
      initScrollProgress();
      initSectionWordReveals();
      initAboutParallax();
      initProjectCards();
      initSkillsReveal();
      initAchievementsReveal();
      initFooterReveal();
      initCounters();
      initPinnedShowcase();
      initPinnedCardsPop();
      initMagneticButtons();
      initNavLinks();
      initCertReveal();
      initHeroGradient();
      ScrollTrigger.refresh();
    }, 500);
  });
})();
