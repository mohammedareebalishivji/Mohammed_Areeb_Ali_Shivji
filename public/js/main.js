(function() {
  'use strict';

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMQ = window.matchMedia('(max-width: 768px)');
  const isMobile = mobileMQ.matches;

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

  // --- Hero CTA scroll ---
  document.querySelector('.hero-cta')?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) lenis.scrollTo(target, { offset: -70, duration: 1.4 });
  });

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
  }

  // --- Mobile Nav Hamburger ---
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const overlay = document.getElementById('nav-overlay');
    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
      });
    });
  }

  // --- Cert Cards Infinite Loop ---
  function initCertReveal() {
    const track = document.getElementById('cert-track');
    const grid = document.getElementById('cert-grid');
    if (!track || !grid) return;

    const cards = gsap.utils.toArray('.cert-item');
    if (cards.length === 0) return;

    if (isReduced || isMobile) {
      cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      return;
    }

    let loopTween = null;
    let clonesAdded = false;

    function startLoop() {
      if (loopTween) return;
      if (!clonesAdded) {
        cards.forEach(c => track.appendChild(c.cloneNode(true)));
        clonesAdded = true;
      }
      const cardW = cards[0].offsetWidth + 20;
      const totalW = cardW * cards.length;
      loopTween = gsap.to(track, {
        x: -totalW, duration: 40, ease: 'none', repeat: -1,
        onRepeat: () => gsap.set(track, { x: 0 }),
      });
      const onHoverIn = () => loopTween.pause();
      const onHoverOut = () => loopTween.resume();
      track._hoverHandlers = [onHoverIn, onHoverOut];
      track.addEventListener('mouseenter', onHoverIn);
      track.addEventListener('mouseleave', onHoverOut);
    }

    function killLoop() {
      if (loopTween) { loopTween.kill(); loopTween = null; }
      if (track._hoverHandlers) {
        track.removeEventListener('mouseenter', track._hoverHandlers[0]);
        track.removeEventListener('mouseleave', track._hoverHandlers[1]);
        track._hoverHandlers = null;
      }
    }

    const entranceTween = gsap.fromTo(cards, {
      y: 60, rotationX: 10, scale: 0.9, opacity: 0,
    }, {
      y: 0, rotationX: 0, scale: 1, opacity: 1,
      duration: 0.7,
      stagger: { each: 0.06, from: 'random' },
      ease: 'power3.out',
    });

    let entered = false;
    ScrollTrigger.create({
      trigger: grid,
      start: 'top 82%',
      toggleActions: 'play none none none',
      animation: entranceTween,
      onEnter: () => {
        if (!entered) {
          entranceTween.eventCallback('onComplete', startLoop);
          entered = true;
        }
      },
      onLeave: killLoop,
      onEnterBack: () => { if (!loopTween) startLoop(); },
    });

    gsap.to('#cert-bg-glow', {
      y: -80, ease: 'none',
      scrollTrigger: {
        trigger: '#more-certifications',
        start: 'top bottom', end: 'bottom top', scrub: 1.5,
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

      initMagneticButtons();
      initNavLinks();
      initMobileNav();
      initCertReveal();
      initHeroGradient();
      ScrollTrigger.refresh();
    }, 500);
  });
})();
