(function () {
  var d = document;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  d.documentElement.classList.add('js');
  function init() {
    var els = d.querySelectorAll('.stats-strip, .feature, .featured-project, .project-card, .writing-card, .timeline__item, .sponsor-card, .speaking-layout');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .08 });
    els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
  d.readyState !== 'loading' ? init() : d.addEventListener('DOMContentLoaded', init);
})();
