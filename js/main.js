/* ============================================================
   NESTIFY INTERIORS — main.js
   Global JS: component injection, navbar, counters, misc
   ============================================================ */

'use strict';

/* ── Component Loader ───────────────────────────────────────── */
/**
 * Loads a shared HTML component (navbar/footer) into a target element.
 * Handles relative paths for GitHub Pages subdirectory support.
 */
async function loadComponent(selector, url) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    const html = await res.text();
    target.innerHTML = html;

    // After injecting navbar, initialize all navbar behaviour
    if (selector === '#navbar-container') {
      initNavbar();
    }
  } catch (err) {
    console.warn('Component load error:', err);
  }
}

/* ── Navbar Scroll Behaviour ────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scrolled class for background
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Active link highlighting
  const links    = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const current  = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      navMobile.setAttribute('aria-hidden', !isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ── Animated Stat Counters ─────────────────────────────────── */
/**
 * Counts up numbers when they enter the viewport.
 * Looks for elements with [data-count] attribute.
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el      = entry.target;
      const target  = parseFloat(el.dataset.count);
      const suffix  = el.dataset.suffix  || '';
      const prefix  = el.dataset.prefix  || '';
      const decimals= el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration= 1800;
      let start     = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = prefix + current.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ── Before / After Slider ──────────────────────────────────── */
function initBeforeAfter() {
  const wrappers = document.querySelectorAll('.before-after-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const afterEl  = wrapper.querySelector('.ba-after');
    const handleEl = wrapper.querySelector('.ba-handle');
    if (!afterEl || !handleEl) return;

    let isDragging = false;

    function setPosition(x) {
      const rect  = wrapper.getBoundingClientRect();
      const ratio = Math.max(0.05, Math.min(0.95, (x - rect.left) / rect.width));
      const pct   = (ratio * 100).toFixed(1) + '%';
      afterEl.style.width  = pct;
      handleEl.style.left  = pct;
    }

    // Mouse
    wrapper.addEventListener('mousedown', e => {
      isDragging = true;
      setPosition(e.clientX);
    });
    window.addEventListener('mousemove', e => {
      if (isDragging) setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch
    wrapper.addEventListener('touchstart', e => {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
  });
}

/* ── Portfolio Filter ───────────────────────────────────────── */
function initPortfolioFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          item.classList.remove('hidden');
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.classList.add('hidden'); }, 300);
        }
      });
    });
  });
}

/* ── Smooth Scroll for anchor links ────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 96; // navbar height + buffer
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Lazy image loading helper ──────────────────────────────── */
function initLazyImages() {
  // Native lazy loading is used via HTML attributes.
  // This adds a fade-in effect when images load.
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    if (img.complete) img.style.opacity = '1';
    else img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
  });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Load shared components
  await Promise.all([
    loadComponent('#navbar-container', 'navbar.html'),
    loadComponent('#footer-container', 'footer.html'),
  ]);

  // Initialize features
  initCounters();
  initBeforeAfter();
  initPortfolioFilter();
  initSmoothScroll();
  initLazyImages();
});
