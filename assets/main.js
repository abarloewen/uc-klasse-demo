/* ===========================================================================
   Klasse Productions — CINEMATIC: i18n (EN/BM) + cinematic animations
   =========================================================================== */
(function () {
  "use strict";

  /* ---- Shared Bahasa Melayu dictionary (chrome, buttons, eyebrows + new sections) ---- */
  var DICT = {
    "nav.home":"Utama","nav.about":"Tentang","nav.services":"Perkhidmatan","nav.work":"Kerja","nav.contact":"Hubungi","nav.cta":"Mari berbual",
    "foot.tagline":"Sebuah rumah kreatif &amp; produksi yang pakar dalam kandungan, digital, dan penceritaan jenama. Mengubah perniagaan melalui strategi inovatif yang mendorong hasil sebenar dan boleh diukur.",
    "foot.explore":"Terokai","foot.office":"Pejabat","foot.home":"Utama","foot.about":"Tentang Kami","foot.services":"Perkhidmatan","foot.work":"Kerja","foot.contact":"Hubungi","foot.rights":"Hak cipta terpelihara.",
    "clients.note":"Kami telah bekerjasama dengan jenama merentasi sektor korporat, media, gaya hidup, dan digital — dan banyak lagi.",
    "eyebrow.house":"Rumah Kreatif &amp; Produksi · Kuala Lumpur","eyebrow.about":"Tentang Klasse","eyebrow.whatwedo":"Apa yang kami buat","eyebrow.selected":"Kerja terpilih","eyebrow.clients":"Klien &amp; Rakan Kongsi","eyebrow.makeHappen":"Mari kita laksanakan","eyebrow.core":"Keupayaan Teras","eyebrow.getintouch":"Hubungi kami","eyebrow.whoweare":"Siapa kami","eyebrow.approach":"Pendekatan kami","eyebrow.portfolio":"Portfolio Projek","eyebrow.projectMind":"Ada projek dalam fikiran?","eyebrow.projectNext":"Projek anda seterusnya","eyebrow.testimonials":"Apa kata klien","eyebrow.faq":"Soalan lazim","eyebrow.packages":"Pakej & Pelaburan","eyebrow.numbers":"Dalam angka","eyebrow.showreel":"Reel kami","eyebrow.capabilities":"Keupayaan penuh","eyebrow.studio":"Studio Kuala Lumpur",
    "play.watch":"Tonton reel"
  };

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang === 'bm' ? 'ms' : 'en');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el._en === undefined) el._en = el.innerHTML;
      el.innerHTML = (lang === 'bm') ? (DICT[el.getAttribute('data-i18n')] || el._en) : el._en;
    });
    document.querySelectorAll('[data-bm]').forEach(function (el) {
      if (el._en === undefined) el._en = el.innerHTML;
      el.innerHTML = (lang === 'bm') ? (el.getAttribute('data-bm') || el._en) : el._en;
    });
    document.querySelectorAll('[data-bm-ph]').forEach(function (el) {
      if (el._enph === undefined) el._enph = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', (lang === 'bm') ? el.getAttribute('data-bm-ph') : el._enph);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      var isOn = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', isOn);
      b.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    });
    var _bt = document.querySelector('.back-to-top');
    if (_bt) _bt.setAttribute('aria-label', lang === 'bm' ? 'Kembali ke atas' : 'Back to top');
    var _wa = document.querySelector('.wa-fab');
    if (_wa) {
      _wa.setAttribute('aria-label', lang === 'bm' ? 'Sembang di WhatsApp' : 'Chat on WhatsApp');
      var _waMsg = lang === 'bm'
        ? 'Hai Klasse Productions, saya ingin berbincang tentang satu projek.'
        : "Hi Klasse Productions, I'd like to talk about a project.";
      _wa.href = 'https://wa.me/60122202015?text=' + encodeURIComponent(_waMsg);
    }
    try { localStorage.setItem('klasse-lang', lang); } catch (e) {}
  }

  /* ---- Back-to-top button (injected on every page) ---- */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var backTop = document.createElement('button');
  backTop.type = 'button';
  backTop.className = 'back-to-top';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(backTop);
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
  var onBackTop = function () {
    backTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onBackTop, { passive: true });
  onBackTop();

  /* ---- WhatsApp floating button (injected on every page) ---- */
  var wa = document.createElement('a');
  wa.className = 'wa-fab';
  wa.href = 'https://wa.me/60122202015';
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.53.07-.8.38-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z"/></svg>';
  document.body.appendChild(wa);

  var saved = 'en';
  try { saved = localStorage.getItem('klasse-lang') || 'en'; } catch (e) {}
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });
  applyLang(saved);

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeMenu(); });
  }

  /* ---- Header scrolled state ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onHeader = function () { header.classList.toggle('scrolled', window.scrollY > 30); };
    window.addEventListener('scroll', onHeader, { passive: true });
    onHeader();
  }

  /* ---- Scroll progress bar ---- */
  var bar = document.querySelector('.scrollbar');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Reduced motion check ---- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Parallax on hero/section background images ---- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    var ticking = false;
    var runParallax = function () {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.18;
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(runParallax); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', runParallax);
    runParallax();
  }

  /* ---- Count-up ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1300, start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---- Reveal + count triggers ---- */
  var revealEls = document.querySelectorAll('.reveal, .stat');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          if (e.target.hasAttribute('data-count')) countUp(e.target);
          var c = e.target.querySelector ? e.target.querySelector('[data-count]') : null;
          if (c) countUp(c);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 0.07) + 's';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) { other.classList.remove('open'); other.querySelector('.faq-a').style.maxHeight = null;
          var oq = other.querySelector('.faq-q'); if (oq) oq.setAttribute('aria-expanded', 'false'); }
      });
      if (isOpen) { item.classList.remove('open'); a.style.maxHeight = null; q.setAttribute('aria-expanded', 'false'); }
      else { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---- Work filters ---- */
  var filterBtns = document.querySelectorAll('.filter');
  var galleryItems = document.querySelectorAll('.gitem');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var f = btn.getAttribute('data-filter');
        galleryItems.forEach(function (it) {
          var show = (f === 'all' || it.getAttribute('data-cat') === f);
          it.style.display = show ? '' : 'none';
        });
        rebuildLightboxList();
      });
    });
  }

  /* ---- Lightbox (gallery + video posters) ---- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('.lightbox__media img');
    var lbCapTitle = lb.querySelector('.lightbox__caption strong');
    var lbCapText = lb.querySelector('.lightbox__caption span');
    var lbInner = lb.querySelector('.lightbox__media');
    var items = [];
    var current = 0;

    function rebuildLightboxList() {
      items = Array.prototype.filter.call(galleryItems, function (it) { return it.style.display !== 'none'; });
    }
    window.rebuildLightboxList = rebuildLightboxList;
    rebuildLightboxList();

    function show(idx) {
      if (!items.length) return;
      current = (idx + items.length) % items.length;
      var it = items[current];
      var img = it.querySelector('img');
      lbImg.src = img.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt || '';
      if (lbCapTitle) lbCapTitle.textContent = it.getAttribute('data-title') || '';
      var isBM = document.documentElement.getAttribute('lang') === 'ms';
      var cap = isBM ? (it.getAttribute('data-blurb-bm') || it.getAttribute('data-blurb') || '') : (it.getAttribute('data-blurb') || '');
      if (it.classList.contains('video')) {
        cap += (isBM ? '  ·  Reel penuh tersedia atas permintaan.' : '  ·  Full reel available on request.');
      }
      if (lbCapText) lbCapText.textContent = cap;
      lb.classList.toggle('is-video', it.classList.contains('video'));
    }
    function open(idx) { show(idx); lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.setAttribute('aria-hidden', 'false'); }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; lb.setAttribute('aria-hidden', 'true'); }

    galleryItems.forEach(function (it) {
      it.addEventListener('click', function () {
        rebuildLightboxList();
        var idx = items.indexOf(it);
        if (idx >= 0) open(idx);
      });
      it.setAttribute('tabindex', '0');
      it.setAttribute('role', 'button');
      it.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); it.click(); }
      });
    });

    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'ArrowLeft') show(current - 1);
    });
  }

  /* ---- Contact form (mailto) ---- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var isBM = document.documentElement.getAttribute('lang') === 'ms';
      var body =
        (isBM ? 'Nama: ' : 'Name: ') + (d.get('name') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        (isBM ? 'Syarikat: ' : 'Company: ') + (d.get('company') || '') + '\n' +
        (isBM ? 'Perkhidmatan: ' : 'Service of interest: ') + (d.get('service') || '') + '\n\n' +
        (d.get('message') || '');
      window.location.href = 'mailto:omarbarakbah@klasseproduction.com?subject=' +
        encodeURIComponent((isBM ? 'Pertanyaan baharu daripada ' : 'New enquiry from ') + (d.get('name') || 'website')) +
        '&body=' + encodeURIComponent(body);
      var note = document.querySelector('#form-status');
      if (note) { note.textContent = isBM ? 'Membuka aplikasi e-mel anda…' : 'Opening your email app to send the message…'; note.style.color = '#fb7a3c'; }
    });
  }

  var y = document.querySelector('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
