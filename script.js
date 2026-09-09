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

const DEFAULT_CLIENT_IMAGES = [
  'clients/1.png', 'clients/2.png', 'clients/3.png', 'clients/4.png',
  'clients/5.png', 'clients/6.png', 'clients/7.png', 'clients/8.png',
  'clients/9.png', 'clients/10.png', 'clients/11.png', 'clients/12.png',
  'clients/13.png', 'clients/14.png', 'clients/15.png'
];

const DEFAULT_CUSTOMER_IMAGES = [
  'customers/HDFC.png',
  'customers/ICICI.png',
  'customers/TATA.png',
  'customers/WIPRO.png',
  'customers/reliance.png',
  'customers/ITsource.png',
  'customers/hp invent.png',
  'customers/hpp.png',
  'customers/netmagic.png',
  'customers/1697801595.png',
  'customers/1697801635.png',
  'customers/1697801677.png',
  'customers/1697801750.png',
  'customers/1697801774.png',
  'customers/1697801926.png'
];

function createMarqueeCards(items, labelPrefix) {
  // Double the list so we have two identical halves for a 100% seamless infinite loop
  const list = [...items, ...items];
  return list.map((src, index) => {
    const isImage = typeof src === 'string' && /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(src);
    const fileName = typeof src === 'string' ? decodeURIComponent(src.split('/').pop() || '') : '';
    const cleanLabel = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ').trim();
    const label = cleanLabel ? `${labelPrefix} ${cleanLabel}` : `${labelPrefix} ${index % items.length + 1}`;
    return `
      <article class="partner-card" aria-label="${escapeHtml(label)}">
        ${isImage ? `<img src="${src}" alt="${escapeHtml(label)}" loading="lazy" draggable="false">` : `<div style="display:grid;place-items:center;width:100%;height:72px;border-radius:12px;background:linear-gradient(135deg, rgba(43,196,177,0.12), rgba(242,169,59,0.14));"></div>`}
      </article>
    `;
  }).join('');
}

function initMarqueeCarousel(track, options = {}) {
  if (!track || track.dataset.marqueeInit === 'true') return;
  track.dataset.marqueeInit = 'true';

  const baseSpeed = typeof options.speed === 'number' ? options.speed : 2.0;
  let currentX = 0;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;

  const getHalfWidth = () => {
    return (track.scrollWidth / 2) || 1;
  };

  const applyTransform = () => {
    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      while (currentX <= -halfWidth) {
        currentX += halfWidth;
      }
      while (currentX > 0) {
        currentX -= halfWidth;
      }
    }
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  };

  const step = () => {
    if (!isDragging) {
      if (Math.abs(velocity) > 0.15) {
        currentX += velocity;
        velocity *= 0.92; // smooth inertia
        applyTransform();
      } else {
        velocity = 0;
        const moveSpeed = isHovered ? (baseSpeed * 0.25) : baseSpeed;
        currentX -= moveSpeed;
        applyTransform();
      }
    }
    requestAnimationFrame(step);
  };

  // Hover pause on shell container
  const shell = track.closest('.partners__shell, .customers__shell') || track;
  shell.addEventListener('mouseenter', () => { isHovered = true; });
  shell.addEventListener('mouseleave', () => { isHovered = false; });

  // Wheel handling: allow horizontal trackpad scroll or Shift+wheel without blocking vertical page scroll
  track.addEventListener('wheel', (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absX > absY && absX > 1) {
      e.preventDefault();
      currentX -= e.deltaX * 0.9;
      velocity = -e.deltaX * 0.35;
      applyTransform();
    } else if (e.shiftKey && absY > 1) {
      e.preventDefault();
      currentX -= e.deltaY * 0.9;
      velocity = -e.deltaY * 0.35;
      applyTransform();
    }
  }, { passive: false });

  // Mouse & Touch Dragging
  const onPointerDown = (e) => {
    isDragging = true;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    startX = clientX;
    lastX = clientX;
    velocity = 0;
    track.classList.add('is-dragging');
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const delta = clientX - lastX;
    lastX = clientX;
    currentX += delta;
    velocity = delta * 0.75;
    applyTransform();
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
  };

  track.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  track.addEventListener('touchstart', onPointerDown, { passive: true });
  track.addEventListener('touchmove', onPointerMove, { passive: true });
  track.addEventListener('touchend', onPointerUp, { passive: true });
  track.addEventListener('touchcancel', onPointerUp, { passive: true });

  applyTransform();
  requestAnimationFrame(step);
}

async function buildPartners() {
  const track = document.getElementById('partnersTrack');
  if (!track) return;

  track.innerHTML = createMarqueeCards(DEFAULT_CLIENT_IMAGES, 'Client');
  initMarqueeCarousel(track, { speed: 2.2 });

  try {
    const response = await fetch('clients/', { cache: 'no-store' });
    if (response.ok) {
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const found = [...doc.querySelectorAll('a[href]')]
        .map(link => link.getAttribute('href'))
        .filter(href => /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(href || ''))
        .map(href => new URL(href, response.url).href)
        .filter((value, index, arr) => arr.indexOf(value) === index);
      if (found.length && found.length !== DEFAULT_CLIENT_IMAGES.length) {
        track.innerHTML = createMarqueeCards(found, 'Client');
      }
    }
  } catch (err) {}
}

async function buildCustomers() {
  const track = document.getElementById('customersTrack');
  if (!track) return;

  track.innerHTML = createMarqueeCards(DEFAULT_CUSTOMER_IMAGES, 'Customer');
  initMarqueeCarousel(track, { speed: 2.0 });

  try {
    const response = await fetch('customers/', { cache: 'no-store' });
    if (response.ok) {
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const found = [...doc.querySelectorAll('a[href]')]
        .map(link => link.getAttribute('href'))
        .filter(href => /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(href || ''))
        .map(href => new URL(href, response.url).href)
        .filter((value, index, arr) => arr.indexOf(value) === index);
      if (found.length && found.length !== DEFAULT_CUSTOMER_IMAGES.length) {
        track.innerHTML = createMarqueeCards(found, 'Customer');
      }
    }
  } catch (err) {}
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
  buildCustomers();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
