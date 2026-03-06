/**
 * Portfolio — minimal JS: nav toggle, sticky header, smooth scroll
 * Respects prefers-reduced-motion for scroll behavior
 */

(function () {
  'use strict';

  var header = document.getElementById('header');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  // Sticky header: add class when scrolled
  function updateHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Mobile nav toggle
  function toggleNav() {
    var expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
    document.body.style.overflow = expanded ? '' : 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Smooth scroll for same-page anchors (honors reduced motion via CSS)
  function handleNavClick(e) {
    var href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    if (href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      closeNav();
    }
  }

  // Close nav when clicking outside
  function handleClickOutside(e) {
    if (navMenu.classList.contains('open') && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeNav();
    }
  }

  // Escape key closes nav
  function handleKeydown(e) {
    if (e.key === 'Escape') closeNav();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleNavClick);
  });

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeNav();
  });
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);

  updateHeaderScroll();
})();
