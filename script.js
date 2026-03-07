// Minimal JS:
// - Smooth scroll with fixed header offset
// - Active nav highlighting
// - Reveal animations
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('header nav a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function headerOffset() {
    return (header ? header.offsetHeight : 72) + 8;
  }

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

      // Update URL without jump
      try { history.pushState(null, '', href); } catch (_) {}
    });
  });

  // Active section highlighting
  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;

        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0.01 });

    sections.forEach(function (s) { activeObs.observe(s); });
  }

  // Reveal animations
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var items = document.querySelectorAll('.card, .hero-left, .hero-right, .metrics, .skill-columns');
    var revealObs = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) {
      el.classList.add('reveal');
      revealObs.observe(el);
    });
  }
});
