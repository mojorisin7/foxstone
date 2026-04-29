(function () {
  'use strict';

  // ── Hamburger nav toggle ──────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when any link inside it is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Header shadow on scroll ───────────────────────────────────────────────
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');

  if (header && hero && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        header.classList.toggle('header--scrolled', !entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
  }

  // ── Smooth scroll with header offset ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Contact form AJAX (Formspree) ─────────────────────────────────────────
  const form = document.querySelector('.contact__form');
  const successMsg = document.querySelector('.contact__success');
  const errorMsg = document.querySelector('.contact__error');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          if (successMsg) successMsg.classList.add('is-visible');
          if (errorMsg) errorMsg.classList.remove('is-visible');
        } else {
          throw new Error('server');
        }
      } catch (_) {
        if (errorMsg) errorMsg.classList.add('is-visible');
        if (successMsg) successMsg.classList.remove('is-visible');
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  // ── Fade-up scroll animations ─────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
