// =========================================================
// SMARTECH TRAINING INSTITUTE — static frontend
// =========================================================

const LOGO_URL = 'smartech logo.png';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function populateCourseSelect() {
  const courseSelect = document.getElementById('course');
  if (!courseSelect || !COURSE_DATA) return;

  const html = COURSE_DATA.categories
    .filter(category => category.id !== 'all')
    .map(category => {
      const courses = COURSE_DATA.courses.filter(course => course.category === category.id);
      if (!courses.length) return '';

      const options = courses.map(course => `
        <option value="${escapeHtml(course.title)}">${escapeHtml(course.title)}</option>
      `).join('');

      return `<optgroup label="${escapeHtml(category.label)}">${options}</optgroup>`;
    })
    .filter(Boolean)
    .join('');

  courseSelect.innerHTML = `<option value="" disabled selected>Choose a course</option>${html}`;
}

function renderFilterChips(categories) {
  const courseFilterEl = document.getElementById('courseFilter');
  courseFilterEl.innerHTML = categories.map((cat, i) => `
    <button class="chip${i === 0 ? ' is-active' : ''}" data-filter="${cat.id}">${escapeHtml(cat.label)}</button>
  `).join('');
}

function renderCourseCards(courses) {
  const courseGridEl = document.getElementById('courseGrid');
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
        <button class="course-card__view" type="button">View syllabus</button>
      </div>
    </article>
  `).join('');
}

function applyFilter(filterId) {
  const courseGridEl = document.getElementById('courseGrid');
  courseGridEl.querySelectorAll('.course-card').forEach(card => {
    if (filterId === 'all' || card.dataset.cat === filterId) {
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-hidden');
    }
  });
}

function getVisibleCourseIds() {
  const courseGridEl = document.getElementById('courseGrid');
  return Array.from(courseGridEl.querySelectorAll('.course-card:not(.is-hidden)')).map(card => card.dataset.courseId);
}

function openCourseModal(courseId) {
  const course = COURSE_DATA.courses.find(c => c.id === courseId);
  if (!course) return;

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

  const courseModal = document.getElementById('courseModal');
  courseModal.dataset.currentId = courseId;

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
  const courseModal = document.getElementById('courseModal');
  courseModal.classList.remove('is-open');
  courseModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function buildPartners() {
  const track = document.getElementById('partnersTrack');
  if (!track) return;

  const getPartnerImages = async () => {
    try {
      const response = await fetch('clients/', { cache: 'no-store' });
      if (!response.ok) return [];

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return [...doc.querySelectorAll('a[href]')]
        .map(link => link.getAttribute('href'))
        .filter(href => /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(href || ''))
        .map(href => new URL(href, response.url).href)
        .filter((value, index, arr) => arr.indexOf(value) === index);
    } catch (error) {
      return [];
    }
  };

  const fallbackCards = Array.from({ length: 5 }, () => '');
  const partnerFiles = await getPartnerImages();
  const items = partnerFiles.length ? partnerFiles : fallbackCards;

  const cards = [...items, ...items].map((src, index) => {
    const isImage = typeof src === 'string' && /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(src);
    const label = isImage ? `Client ${index % items.length + 1}` : '';
    return `
      <article class="partner-card" aria-label="${escapeHtml(label || 'Client logo')}">
        ${isImage ? `<img src="${src}" alt="${escapeHtml(label || 'Client logo')}" loading="lazy">` : `<div style="display:grid;place-items:center;width:100%;height:82px;border-radius:12px;background:linear-gradient(135deg, rgba(43,196,177,0.12), rgba(242,169,59,0.14));"></div>`}
      </article>
    `;
  }).join('');

  track.innerHTML = cards;

  let startX = 0;
  let startOffset = 0;
  let currentTranslate = 0;

  const pauseAutoScroll = () => track.classList.add('is-paused');
  const resumeAutoScroll = () => track.classList.remove('is-paused');

  track.addEventListener('mouseenter', pauseAutoScroll);
  track.addEventListener('mouseleave', resumeAutoScroll);
  track.addEventListener('focusin', pauseAutoScroll);
  track.addEventListener('focusout', resumeAutoScroll);

  track.addEventListener('pointerdown', (event) => {
    pauseAutoScroll();
    startX = event.clientX;
    startOffset = currentTranslate;
    track.classList.add('dragging');
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (startX === 0) return;
    const delta = event.clientX - startX;
    currentTranslate = startOffset + delta * 0.9;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener('pointerup', () => {
    startX = 0;
    track.classList.remove('dragging');
    resumeAutoScroll();
    track.style.transform = '';
    currentTranslate = 0;
  });

  track.addEventListener('pointerleave', () => {
    startX = 0;
    track.classList.remove('dragging');
    resumeAutoScroll();
    track.style.transform = '';
    currentTranslate = 0;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('brandLogoImg');
  if (img) img.src = LOGO_URL;

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    const setNavState = (isOpen) => {
      mainNav.classList.toggle('is-open', isOpen);
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    navToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !mainNav.classList.contains('is-open');
      setNavState(willOpen);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setNavState(false);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setNavState(false);
    });
  }

  const railPulse = document.getElementById('railPulse');
  const setPulsePosition = () => {
    if (!railPulse) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    const railHeight = window.innerHeight;
    railPulse.style.top = `${progress * (railHeight - 10)}px`;
  };
  window.addEventListener('scroll', setPulsePosition, { passive: true });
  setPulsePosition();

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
      else el.dataset.animated = 'true';
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

  function dev_by() {
        const encoded =
          "LSBEZXZlbG9wZWQgYnk6IERpcGFuc2h1IEFzaG9rIEFnYXJ3YWwKLSBNb2JpbGU6ICs5MTg1NTQwNDg4MzYKLSBHaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9kaXBhbnNodTA5MTk=";
        console.log(atob(encoded));
      }

  const courseFilterEl = document.getElementById('courseFilter');
  const courseGridEl = document.getElementById('courseGrid');
  const courseModal = document.getElementById('courseModal');

  if (courseFilterEl && courseGridEl) {
    renderFilterChips(COURSE_DATA.categories);
    renderCourseCards(COURSE_DATA.courses);
    populateCourseSelect();

    const statEl = document.getElementById('statCoursesCount');
    if (statEl) {
      const count = COURSE_DATA.courses.length;
      statEl.dataset.count = String(count);
      if (statEl.dataset.animated === 'true') {
        statEl.textContent = count.toLocaleString() + (statEl.dataset.suffix || '');
      }
    }

    courseFilterEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      courseFilterEl.querySelectorAll('.chip').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter);
    });

    courseGridEl.addEventListener('click', (e) => {
      const enrollLink = e.target.closest('[data-no-modal]');
      const card = e.target.closest('.course-card');
      if (enrollLink) return;
      if (card) openCourseModal(card.dataset.courseId);
    });

    courseGridEl.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.course-card');
      if (!card) return;
      e.preventDefault();
      openCourseModal(card.dataset.courseId);
    });
  }

  if (courseModal) {
    document.getElementById('courseModalClose').addEventListener('click', closeCourseModal);
    document.getElementById('courseModalBackdrop').addEventListener('click', closeCourseModal);
    document.addEventListener('keydown', (e) => {
      if (!courseModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeCourseModal();
      if (e.key === 'ArrowLeft') document.getElementById('courseModalPrev').click();
      if (e.key === 'ArrowRight') document.getElementById('courseModalNext').click();
    });
  }

  buildPartners();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
