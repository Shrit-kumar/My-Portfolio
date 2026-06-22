/* =========================================================
   SHRIT KUMAR — PORTFOLIO SCRIPT
   Vanilla JS, no dependencies
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Navbar scroll state + progress bar ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');

  /* ---------- 1.5. Back to top (must be initialized before onScroll() calls it) ---------- */
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop(scrollY) {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', scrollY > 500);
  }

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);
    if (scrollProgress) scrollProgress.style.width = pct + '%';

    toggleBackToTop(scrollY);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------- 2. Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }
  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    mobileOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  if (hamburger && navLinks && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
    mobileOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- 3. Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  if (sections.length && navLinkEls.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkEls.forEach((link) => {
              link.classList.toggle('active-link', link.dataset.section === id);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* ---------- 4. Typing animation ---------- */
  const typedTextEl = document.getElementById('typedText');
  const typeCursorEl = document.getElementById('typeCursor');
  const roles = ['B.Tech CSE Student', 'Full Stack Developer', 'MERN & Python Enthusiast'];

  function setCursorVisible(visible) {
    if (!typeCursorEl) return;
    typeCursorEl.style.visibility = visible ? 'visible' : 'hidden';
  }

  function typeLoop() {
    if (!typedTextEl) return;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    // Cursor should only appear while we are actively typing/deleting.
    setCursorVisible(true);

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          // stop typing; hide cursor during the pause
          deleting = true;
          setCursorVisible(false);
          setTimeout(tick, 1700);
          return;
        }
        setTimeout(() => {
          setCursorVisible(true);
          tick();
        }, 65);
      } else {
        charIndex--;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          // pause between roles; hide cursor
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setCursorVisible(false);
          setTimeout(() => {
            setCursorVisible(true);
            tick();
          }, 350);
          return;
        }
        setTimeout(() => {
          setCursorVisible(true);
          tick();
        }, 35);
      }
    }

    tick();
  }

  if (prefersReducedMotion) {
    if (typedTextEl) typedTextEl.textContent = roles[0];
    setCursorVisible(false);
  } else {
    setCursorVisible(false);
    typeLoop();
  }

  /* ---------- 5. Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 6. Skill bars fill on view ---------- */
  const skillRows = document.querySelectorAll('.skill-row');
  if (skillRows.length) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            const pct = entry.target.dataset.percent || 0;
            if (fill) fill.style.width = pct + '%';
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillRows.forEach((row) => skillObserver.observe(row));
  }

  /* ---------- 7. Stat counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => statObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';

    // Respect reduced motion.
    if (prefersReducedMotion || target <= 1) {
      el.textContent = target + suffix;
      return;
    }

    // Optimized counter animation to avoid lag on larger numbers.
    // - increment = Math.ceil(target / 40)
    // - constant 20ms interval
    // - clamps to target
    const increment = Math.ceil(target / 40);
    const interval = 20;

    let current = 0;
    const timerId = window.setInterval(() => {
      current = Math.min(target, current + increment);
      el.textContent = current + suffix;

      if (current >= target) {
        window.clearInterval(timerId);
      }
    }, interval);
  }

  /* ---------- 8. Cursor glow ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    let rafId = null;
    window.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('active');
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  /* ---------- 9. Hero particles (lightweight canvas) ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !prefersReducedMotion) {
    // Disable particles on small devices for better performance.
    if (window.innerWidth < 768) {
      return;
    }
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;
    let visible = true;

    function resize() {
      const hero = canvas.closest('.hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.4 + 0.15,
      }));
    }

    function draw() {
      if (!visible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    let resizeTimer;

    // Debounce resize events to avoid heavy particle recalculation.
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 150);
    });

    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      if (visible && !animId) draw();
    });
  }

  /* ---------- 10. Project card tilt ---------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (tiltCards.length && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ---------- 11. Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }


  /* ---------- 12. Contact form (EmailJS submission only) ---------- */
  const contactForm = document.getElementById('contactForm');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  // Keep only the character counter logic.
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  // EmailJS init + submit logic must be safe for production/deployment.
  // (emailjs is loaded via CDN with `defer` in index.html)
  if (window.emailjs) {
    window.emailjs.init({
      publicKey: 'vPNPgABmCspF18dy0',
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const msgEl = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      const status = document.getElementById('formStatus');
      const submitBtn = document.getElementById('submitBtn');

      // Defensive null checks for production safety.
      if (!nameEl || !emailEl || !msgEl || !nameError || !emailError || !messageError || !status || !submitBtn) {
        return;
      }

      let valid = true;

      [nameEl, emailEl, msgEl].forEach((el) => {
        const grp = el.closest('.form-group');
        if (grp) grp.classList.remove('has-error');
      });
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      status.textContent = '';
      status.className = 'form-status';

      if (!nameEl.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        const grp = nameEl.closest('.form-group');
        if (grp) grp.classList.add('has-error');
        valid = false;
      }

      // Improve email validation regex.
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailPattern.test(emailEl.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        const grp = emailEl.closest('.form-group');
        if (grp) grp.classList.add('has-error');
        valid = false;
      }

      // Message validation (minimum length: 10 chars)
      if (msgEl.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        const grp = msgEl.closest('.form-group');
        if (grp) grp.classList.add('has-error');
        valid = false;
      }

      if (!valid) return;

      if (!window.emailjs) {
        // If EmailJS failed to load, fail gracefully.
        status.textContent = '❌ Email service is not available right now.';
        status.classList.add('error');
        return;
      }

      submitBtn.disabled = true;
      status.textContent = 'Sending...';

      const templateParams = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        message: msgEl.value.trim(),
        time: new Date().toLocaleString(),
        title: 'Portfolio Contact Form',
      };

      window.emailjs
        .send('service_kglz7es', 'template_q3v03fa', templateParams)
        .then(() => {
          status.textContent = '✅ Message sent successfully!';
          status.classList.add('success');
          contactForm.reset();

          // Safe charCount reset.
          const count = document.getElementById('charCount');
          if (count) count.textContent = '0';
        })
        .catch((error) => {
          // Keep console logging in production for debugging.
          // But avoid breaking UI.
          // eslint-disable-next-line no-console
          console.error(error);
          status.textContent = '❌ Failed to send message.';
          status.classList.add('error');
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }

  /* ---------- 13. Image fallback for missing profile photo ---------- */
  const profileImg = document.getElementById('profileImg');

  // Footer year (must be at end of the script for reliable DOM init).
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      const frame = profileImg.closest('.profile-frame');
      if (!frame) return;

      // Do NOT remove the image element from DOM (prevents layout/JS inconsistencies).
      profileImg.style.display = 'none';

      // Insert fallback only once.
      if (frame.querySelector('[data-profile-fallback]')) return;

      frame.insertAdjacentHTML(
        'beforeend',
        `<div data-profile-fallback="true" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
            background:linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18));
            font-family:'Space Grotesk',sans-serif;font-size:4rem;font-weight:700;
            color:rgba(255,255,255,0.85);">SK</div>`
      );
    });
  }


// NOTE: EmailJS + contact form logic lives inside the IIFE above.
// (Removed duplicate/extra global handlers to prevent double submissions.)

})();


