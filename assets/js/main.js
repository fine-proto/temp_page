(function () {
  'use strict';

  /* Header shadow + to-top */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 8);
    toTop.classList.toggle('show', y > 900);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var gnb = document.getElementById('gnb');
  function closeNav() { gnb.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () {
    var open = gnb.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  gnb.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.lb-cap');
  var lbCount = lb.querySelector('.lb-count');
  var lbStage = lb.querySelector('.lb-stage');
  var lbPrev = lb.querySelector('.lb-prev');
  var lbNext = lb.querySelector('.lb-next');
  var items = [], idx = 0, lastFocus = null;

  function render() {
    var it = items[idx];
    lbStage.classList.remove('zoomed');
    lbImg.src = it.src;
    lbImg.alt = it.cap || '';
    lbCap.textContent = it.cap || '';
    lbCount.textContent = items.length > 1 ? (idx + 1) + ' / ' + items.length : '';
    lbPrev.hidden = lbNext.hidden = items.length < 2;
  }
  function open(list, start) {
    items = list; idx = start || 0; lastFocus = document.activeElement;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { if (items.length < 2) return; idx = (idx + d + items.length) % items.length; render(); }

  document.addEventListener('click', function (e) {
    var z = e.target.closest('button.zoom');
    if (z) {
      var img = z.querySelector('img');
      var fig = z.closest('figure');
      var cap = fig && fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent.trim() : (img.alt || '');
      open([{ src: z.dataset.full || img.currentSrc || img.src, cap: cap }], 0);
      return;
    }
    var s = e.target.closest('[data-slides]');
    if (s) {
      var nums = s.dataset.slides.split(',');
      var title = s.dataset.title || '';
      open(nums.map(function (n) {
        var p = ('0' + n.trim()).slice(-2);
        return { src: 'assets/slides/slide-' + p + '.webp', cap: title + ' · PPT ' + parseInt(p, 10) + '페이지' };
      }), 0);
    }
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lbPrev.addEventListener('click', function () { step(-1); });
  lbNext.addEventListener('click', function () { step(1); });
  lbStage.addEventListener('click', function (e) {
    if (e.target === lbImg) { lbStage.classList.toggle('zoomed'); }
    else if (e.target === lbStage) { close(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) { return !b.hidden; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  /* swipe */
  var sx = null;
  lbStage.addEventListener('touchstart', function (e) { if (e.touches.length === 1) sx = e.touches[0].clientX; }, { passive: true });
  lbStage.addEventListener('touchend', function (e) {
    if (sx === null || lbStage.classList.contains('zoomed')) { sx = null; return; }
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
})();
