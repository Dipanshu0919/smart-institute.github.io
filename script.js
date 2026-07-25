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
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.dataset.animated = 'true';
      }
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

  /* ---------- Courses: fetch from courses.json and render ----------
     Everything below (filter chips, course cards, the enroll form's
     course dropdown, and the syllabus modal) is generated from one
     data file instead of being hand-written in the HTML. If you're
     testing by double-clicking index.html, this fetch will fail —
     browsers block file:// pages from reading local JSON. Serve the
     folder with a tiny local server instead, e.g.:
       python3 -m http.server 8000
     then open http://localhost:8000 in your browser. It works
     normally once the site is uploaded to real hosting. */

  const courseFilterEl = document.getElementById('courseFilter');
  const courseGridEl = document.getElementById('courseGrid');
  const courseSelectEl = document.getElementById('course');
  const courseModal = document.getElementById('courseModal');

  let courseData = null; // { categories: [...], courses: [...] }

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function renderFilterChips(categories) {
    courseFilterEl.innerHTML = categories.map((cat, i) => `
      <button class="chip${i === 0 ? ' is-active' : ''}" data-filter="${cat.id}">${escapeHtml(cat.label)}</button>
    `).join('');
  }

  function renderCourseCards(courses) {
    courseGridEl.innerHTML = courses.map(course => `
      <article class="course-card" data-cat="${course.category}" data-course-id="${course.id}" tabindex="0" role="button" aria-label="View syllabus for ${escapeHtml(course.title)}">
        <div class="course-card__top">
          <span class="course-card__tag">${escapeHtml(course.tag)}</span>
          <span class="course-card__level">${escapeHtml(course.level)}</span>
        </div>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.summary)}</p>
        <ul class="course-card__meta">
          ${course.meta.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
        </ul>
        <div class="course-card__row">
          <span class="course-card__view">View syllabus <span aria-hidden="true">↗</span></span>
          <a href="#enroll" class="course-card__cta" data-no-modal="true">Enroll <span aria-hidden="true">→</span></a>
        </div>
      </article>
    `).join('');
  }

  function renderCourseDropdown(categories, courses) {
    if (!courseSelectEl) return;
    const placeholder = '<option value="" disabled selected>Choose a course</option>';
    const groups = categories
      .filter(cat => cat.id !== 'all')
      .map(cat => {
        const inGroup = courses.filter(c => c.category === cat.id);
        if (!inGroup.length) return '';
        const options = inGroup.map(c => `<option>${escapeHtml(c.title)}</option>`).join('');
        return `<optgroup label="${escapeHtml(cat.label)}">${options}</optgroup>`;
      }).join('');
    courseSelectEl.innerHTML = placeholder + groups + '<option>Not sure yet</option>';
  }

  function applyFilter(filterId) {
    courseGridEl.querySelectorAll('.course-card').forEach(card => {
      const show = filterId === 'all' || card.dataset.cat === filterId;
      card.classList.toggle('is-hidden', !show);
    });
  }

  function selectCourseInForm(title) {
    if (!courseSelectEl) return;
    const match = Array.from(courseSelectEl.options).find(opt => opt.textContent === title);
    if (match) courseSelectEl.value = title;
  }

  function getVisibleCourseIds() {
    return Array.from(courseGridEl.querySelectorAll('.course-card:not(.is-hidden)'))
      .map(card => card.dataset.courseId);
  }

  function openCourseModal(courseId) {
    const course = courseData.courses.find(c => c.id === courseId);
    if (!course || !courseModal) return;

    document.getElementById('courseModalTag').textContent = course.tag;
    document.getElementById('courseModalLevel').textContent = course.level;
    document.getElementById('courseModalTitle').textContent = course.title;
    document.getElementById('courseModalSummary').textContent = course.summary;

    document.getElementById('courseModalSyllabus').innerHTML = course.syllabus.map(group => `
      <div class="course-modal__group">
        <h4>${escapeHtml(group.heading)}</h4>
        <ul>${group.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    `).join('');

    courseModal.dataset.currentId = courseId;

    // Wire the Enroll link + wrap-around Prev/Next through whatever's
    // currently visible (so navigation respects the active filter chip).
    const visibleIds = getVisibleCourseIds();
    const idx = visibleIds.indexOf(courseId);
    const prevBtn = document.getElementById('courseModalPrev');
    const nextBtn = document.getElementById('courseModalNext');
    if (visibleIds.length > 1 && idx !== -1) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      prevBtn.onclick = () => openCourseModal(visibleIds[(idx - 1 + visibleIds.length) % visibleIds.length]);
      nextBtn.onclick = () => openCourseModal(visibleIds[(idx + 1) % visibleIds.length]);
    } else {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }

    const panel = document.querySelector('.course-modal__panel');
    if (panel) panel.scrollTop = 0;
    courseModal.classList.add('is-open');
    courseModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCourseModal() {
    if (!courseModal) return;
    courseModal.classList.remove('is-open');
    courseModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (courseGridEl) {
    fetch('courses.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        courseData = data;
        renderFilterChips(data.categories);
        renderCourseCards(data.courses);
        renderCourseDropdown(data.categories, data.courses);

        // Keep the hero "courses offered" stat in sync with the real count
        const statEl = document.getElementById('statCoursesCount');
        if (statEl) {
          const count = data.courses.length;
          statEl.dataset.count = String(count);
          // If the count-up already finished (e.g. fetch was slower than
          // scroll-into-view) with the HTML's fallback number, correct it now.
          if (statEl.dataset.animated === 'true') {
            statEl.textContent = count.toLocaleString() + (statEl.dataset.suffix || '');
          }
        }

        // Filter chip clicks (delegated, since chips are rendered dynamically)
        courseFilterEl.addEventListener('click', (e) => {
          const btn = e.target.closest('.chip');
          if (!btn) return;
          courseFilterEl.querySelectorAll('.chip').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          applyFilter(btn.dataset.filter);
        });

        // Card click/keyboard -> open syllabus modal (unless the Enroll link itself was clicked)
        courseGridEl.addEventListener('click', (e) => {
          const enrollLink = e.target.closest('[data-no-modal]');
          const card = e.target.closest('.course-card');
          if (enrollLink) {
            const course = courseData.courses.find(c => c.id === card?.dataset.courseId);
            if (course) selectCourseInForm(course.title);
            return;
          }
          if (card) openCourseModal(card.dataset.courseId);
        });
        courseGridEl.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const card = e.target.closest('.course-card');
          if (!card) return;
          e.preventDefault();
          openCourseModal(card.dataset.courseId);
        });
      })
      .catch(err => {
        console.error('Could not load courses.json:', err);
        courseFilterEl.innerHTML = '<p class="course-status">Couldn\u2019t load the course list. If you\u2019re viewing this file directly (file://), run a local server \u2014 see the comment at the top of script.js.</p>';
      });
  }

  if (courseModal) {
    document.getElementById('courseModalClose').addEventListener('click', closeCourseModal);
    document.getElementById('courseModalBackdrop').addEventListener('click', closeCourseModal);
    document.getElementById('courseModalCta').addEventListener('click', () => {
      const course = courseData?.courses.find(c => c.id === courseModal.dataset.currentId);
      if (course) selectCourseInForm(course.title);
      closeCourseModal();
    });
    document.addEventListener('keydown', (e) => {
      if (!courseModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeCourseModal();
      if (e.key === 'ArrowLeft') document.getElementById('courseModalPrev').click();
      if (e.key === 'ArrowRight') document.getElementById('courseModalNext').click();
    });
  }

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
