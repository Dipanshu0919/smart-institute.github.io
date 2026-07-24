// =========================================================
// SMARTECH TRAINING INSTITUTE — interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Logo swap helper ----------
     Paste your logo URL below (between the quotes) and the image
     will automatically replace the placeholder mark in the header/footer. */
  const LOGO_URL = "smartech logo.png"; // place this file in the same folder as index.html

  if (LOGO_URL) {
    const img = document.getElementById('brandLogoImg');
    const mark = document.getElementById('brandMark');
    img.src = LOGO_URL;
    img.hidden = false;
    if (mark) mark.style.display = 'none';
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Circuit rail scroll pulse ---------- */
  const railPulse = document.getElementById('railPulse');
  const setPulsePosition = () => {
    if (!railPulse) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    const railHeight = window.innerHeight; // fixed viewport rail
    railPulse.style.top = `${progress * (railHeight - 10)}px`;
  };
  window.addEventListener('scroll', setPulsePosition, { passive: true });
  setPulsePosition();

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* ---------- Course filter ---------- */
  const filterButtons = document.querySelectorAll('#courseFilter .chip');
  const courseCards = document.querySelectorAll('#courseGrid .course-card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      courseCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Enroll form validation ---------- */
  const form = document.getElementById('enrollForm');
  const successMsg = document.getElementById('formSuccess');

  const validators = {
    fullName: (v) => v.trim().length >= 2 ? '' : 'Please enter your name.',
    phone: (v) => /^[0-9]{10}$/.test(v.trim()) ? '' : 'Enter a valid 10-digit phone number.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.',
    course: (v) => v ? '' : 'Please choose a course.'
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      Object.keys(validators).forEach(name => {
        const field = form.elements[name];
        const errorEl = form.querySelector(`[data-error-for="${name}"]`);
        const message = validators[name](field.value);
        const row = field.closest('.form-row');
        if (message) {
          hasError = true;
          if (errorEl) errorEl.textContent = message;
          if (row) row.classList.add('has-error');
        } else {
          if (errorEl) errorEl.textContent = '';
          if (row) row.classList.remove('has-error');
        }
      });

      if (hasError) {
        successMsg.hidden = true;
        return;
      }

      // No backend wired up yet — show confirmation and reset.
      successMsg.hidden = false;
      form.reset();
      setTimeout(() => { successMsg.hidden = true; }, 6000);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
