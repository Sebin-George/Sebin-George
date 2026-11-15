// Sticky stacked experience cards: each card slides up over the previous as you scroll.
(function () {
  var section = document.querySelector('.exp');
  var cards = section ? section.querySelectorAll('.card') : [];
  if (!cards.length) return;
  var base = [{ x: 0, y: 0, r: -8 }, { x: 24, y: 0, r: -8 }, { x: 0, y: 0, r: -8 }];

  function update() {
    if (window.innerWidth <= 1100) {
      cards.forEach(function (c) { c.style.transform = ''; });
      return;
    }
    var rect = section.getBoundingClientRect();
    var total = section.offsetHeight - window.innerHeight;
    var p = Math.min(1, Math.max(0, -rect.top / total)); // 0..1
    var n = cards.length;
    cards.forEach(function (c, i) {
      // card i starts entering at i/n of the progress (first card is already in place)
      var start = (i - 0.6) / n, end = (i + 0.25) / n;
      var t = i === 0 ? 1 : Math.min(1, Math.max(0, (p - start) / (end - start)));
      var offY = (1 - t) * 620;
      var depth = Math.max(0, Math.floor(p * n + 0.2) - i);      // how many cards sit on top of this one
      var peek = Math.min(depth, 2) * -14;
      var b = base[i] || base[0];
      c.style.transform = 'translate(' + (b.x + depth * -12) + 'px,' + (offY + peek) + 'px) rotate(' + b.r + 'deg)';
      c.style.zIndex = i + 1;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Projects arrows: scroll the card row on small screens, otherwise a no-op.
document.querySelectorAll('.arrows button').forEach(function (b, i) {
  b.addEventListener('click', function () {
    var row = document.querySelector('.cards');
    row.scrollBy({ left: (i ? 1 : -1) * 400, behavior: 'smooth' });
  });
});

// Scroll reveal: fade/slide elements in as they enter the viewport.
(function () {
  var sel = '.eyebrow,.big,.serif,.lead,.work-lead,.about-title,.portrait,.about-text,.stats>div,.step,.lists ul,.pcard,.tgroup,.info,.socials a,.form,.open-list,.swoosh,.open-art img,.follow,.exp-left .btn-small,.center .btn-small';
  var els = document.querySelectorAll(sel);
  els.forEach(function (el, i) {
    el.classList.add('rv');
    var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', Math.min(sib, 6) * 0.08 + 's');
  });
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

// Stat counters: count up when the About stats come into view.
(function () {
  var nums = document.querySelectorAll('.stats b');
  if (!nums.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      var el = en.target, txt = el.textContent, end = parseInt(txt, 10), suffix = txt.replace(/[0-9]/g, '');
      var t0 = performance.now(), dur = 1600;
      (function tick(t) {
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * e) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  nums.forEach(function (n) { io.observe(n); });
})();
