/* ===========================================================================
   Klasse Productions — CINEMATIC: i18n (EN/BM) + cinematic behaviour
   ---------------------------------------------------------------------------
   Modules (in order):
     1.  DICT              shared Bahasa Melayu strings (data-i18n keys)
     2.  applyLang()       EN <-> BM switching (data-i18n / data-bm / data-bm-ph)
     3.  back-to-top       injected on every page
     4.  WhatsApp FAB      injected on every page
     5.  mobile nav        hamburger ≤900px (link / outside / Esc / resize)
     6.  header scrolled   + scroll-progress bar
     7.  parallax          any [data-parallax] element, rAF-throttled
     8.  reveal + counters .reveal / .stat / .stat-band__item / [data-count]
     9.  FAQ accordion     .faq-item
     10. work filters      .filter + .gitem
     11. lightbox          GENERIC: .gitem cards AND any [data-lightbox] thumb.
                           The .lightbox markup is injected if the page has
                           none, so case-study galleries need zero boilerplate.
     12. contact form      mailto fallback
   =========================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     1. Shared Bahasa Melayu dictionary (chrome, nav, buttons, eyebrows)
     ---------------------------------------------------------------------- */
  var DICT = {
    /* nav */
    "nav.home":"Utama","nav.about":"Tentang","nav.services":"Perkhidmatan","nav.work":"Kerja",
    "nav.process":"Proses","nav.clients":"Klien","nav.contact":"Hubungi","nav.cta":"Mari berbual",
    /* footer */
    "foot.tagline":"Sebuah rumah kreatif &amp; produksi yang pakar dalam kandungan, digital, dan penceritaan jenama. Mengubah perniagaan melalui strategi inovatif yang mendorong hasil sebenar dan boleh diukur.",
    "foot.explore":"Terokai","foot.office":"Pejabat","foot.work":"Kerja Terpilih","foot.home":"Utama",
    "foot.about":"Tentang Kami","foot.services":"Perkhidmatan","foot.process":"Proses","foot.clients":"Klien",
    "foot.contact":"Hubungi","foot.rights":"Hak cipta terpelihara.","foot.cases":"Kajian Kes",
    /* client / logo sections */
    "clients.note":"Kami telah bekerjasama dengan jenama merentasi sektor korporat, media, gaya hidup, dan digital — dan banyak lagi.",
    /* eyebrows */
    "eyebrow.house":"Rumah Kreatif &amp; Produksi · Kuala Lumpur","eyebrow.about":"Tentang Klasse",
    "eyebrow.whatwedo":"Apa yang kami buat","eyebrow.selected":"Kerja terpilih",
    "eyebrow.clients":"Klien &amp; Rakan Kongsi","eyebrow.makeHappen":"Mari kita laksanakan",
    "eyebrow.core":"Keupayaan Teras","eyebrow.getintouch":"Hubungi kami","eyebrow.whoweare":"Siapa kami",
    "eyebrow.approach":"Pendekatan kami","eyebrow.portfolio":"Portfolio Projek",
    "eyebrow.projectMind":"Ada projek dalam fikiran?","eyebrow.projectNext":"Projek anda seterusnya",
    "eyebrow.testimonials":"Apa kata klien","eyebrow.faq":"Soalan lazim","eyebrow.packages":"Pakej & Pelaburan",
    "eyebrow.numbers":"Dalam angka","eyebrow.showreel":"Reel kami","eyebrow.capabilities":"Keupayaan penuh",
    "eyebrow.studio":"Studio Kuala Lumpur","eyebrow.process":"Cara kami bekerja",
    "eyebrow.scope":"Skop berdaftar","eyebrow.story":"Kisah kami","eyebrow.inside":"Di dalam studio",
    /* reusable UI strings */
    "ui.viewCase":"Lihat kajian kes","ui.nextCase":"Kes seterusnya","ui.allWork":"Semua kerja",
    "ui.viewWork":"Lihat kerja kami","ui.startProject":"Mulakan projek","ui.emailUs":"E-mel kami",
    "ui.backToTop":"Kembali ke atas","ui.whatsapp":"Sembang di WhatsApp","ui.scroll":"Tatal",
    "ui.moreAbout":"Lagi tentang kami","ui.allCapabilities":"Lihat kesemua 9 keupayaan",
    "ui.fullPortfolio":"Terokai portfolio penuh","ui.talkToUs":"Berbual dengan kami",
    "play.watch":"Tonton reel"
  };

  /* -------------------------------------------------------------------------
     2. Language switching
     ---------------------------------------------------------------------- */
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
    document.querySelectorAll('[data-bm-alt]').forEach(function (el) {
      if (el._enalt === undefined) el._enalt = el.getAttribute('alt') || '';
      el.setAttribute('alt', (lang === 'bm') ? el.getAttribute('data-bm-alt') : el._enalt);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      var isOn = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', isOn);
      b.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    });
    var _bt = document.querySelector('.back-to-top');
    if (_bt) _bt.setAttribute('aria-label', lang === 'bm' ? DICT['ui.backToTop'] : 'Back to top');
    var _wa = document.querySelector('.wa-fab');
    if (_wa) {
      _wa.setAttribute('aria-label', lang === 'bm' ? DICT['ui.whatsapp'] : 'Chat on WhatsApp');
      var _waMsg = lang === 'bm'
        ? 'Hai Klasse Productions, saya ingin berbincang tentang satu projek.'
        : "Hi Klasse Productions, I'd like to talk about a project.";
      _wa.href = 'https://wa.me/60122202015?text=' + encodeURIComponent(_waMsg);
    }
    try { localStorage.setItem('klasse-lang', lang); } catch (e) {}
  }

  function isBM() { return document.documentElement.getAttribute('lang') === 'ms'; }

  /* -------------------------------------------------------------------------
     3. Back-to-top button (injected on every page)
     ---------------------------------------------------------------------- */
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
  var onBackTop = function () { backTop.classList.toggle('show', window.scrollY > 600); };
  window.addEventListener('scroll', onBackTop, { passive: true });
  onBackTop();

  /* -------------------------------------------------------------------------
     4. WhatsApp floating button (injected on every page)
     ---------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------
     5. Mobile nav
     ---------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------
     6. Header scrolled state + scroll-progress bar
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onHeader = function () { header.classList.toggle('scrolled', window.scrollY > 30); };
    window.addEventListener('scroll', onHeader, { passive: true });
    onHeader();
  }

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

  var reduceMotion = prefersReduced;

  /* -------------------------------------------------------------------------
     7. Parallax — any [data-parallax] element (value = speed, default 0.16)
        rAF-throttled, skipped entirely under prefers-reduced-motion.
     ---------------------------------------------------------------------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    var ticking = false;
    var runParallax = function () {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.16;
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;   /* off-screen: skip */
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

  /* -------------------------------------------------------------------------
     8. Count-up + reveal
     ---------------------------------------------------------------------- */
  function countUp(el) {
    if (el._counted) return;
    el._counted = true;
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target; return; }
    var dur = 1300, start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealEls = document.querySelectorAll('.reveal, .stat, .stat-band__item');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          if (e.target.hasAttribute('data-count')) countUp(e.target);
          if (e.target.querySelectorAll) {
            e.target.querySelectorAll('[data-count]').forEach(countUp);
          }
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

  /* -------------------------------------------------------------------------
     9. FAQ accordion
     ---------------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var oa = other.querySelector('.faq-a'); if (oa) oa.style.maxHeight = null;
          var oq = other.querySelector('.faq-q'); if (oq) oq.setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) { item.classList.remove('open'); a.style.maxHeight = null; q.setAttribute('aria-expanded', 'false'); }
      else { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* -------------------------------------------------------------------------
     10 + 11. LIGHTBOX (generic) and work filters
     ---------------------------------------------------------------------- */
  var galleryItems = document.querySelectorAll('.gitem');
  var lbRebuild = function () {};   /* replaced below once the lightbox exists */

  var PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  function buildLightbox() {
    var el = document.createElement('div');
    el.className = 'lightbox';
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Image viewer');
    el.innerHTML =
      '<div class="lightbox__inner">' +
        '<button type="button" class="lb-close" aria-label="Close">&times;</button>' +
        '<div class="lightbox__media">' +
          '<img src="" alt="">' +
          '<div class="lightbox__play" aria-hidden="true">' + PLAY_SVG + '</div>' +
        '</div>' +
        '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
        '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>' +
        '<div class="lightbox__caption"><strong></strong><span></span></div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  var hasLbTargets = document.querySelector('.gitem, [data-lightbox]');
  var lb = document.querySelector('.lightbox');
  if (hasLbTargets && !lb) lb = buildLightbox();

  if (lb && hasLbTargets) {
    var lbImg = lb.querySelector('.lightbox__media img');
    var lbCapTitle = lb.querySelector('.lightbox__caption strong');
    var lbCapText = lb.querySelector('.lightbox__caption span');
    var items = [];
    var current = 0;
    var lastFocus = null;

    /* Group resolution: .gitem cards share the implicit "__work" group;
       [data-lightbox="x"] thumbs are grouped by their attribute value.      */
    function groupOf(el) {
      return el.hasAttribute('data-lightbox') ? (el.getAttribute('data-lightbox') || 'default') : '__work';
    }
    function collect(group) {
      if (group === '__work') {
        return Array.prototype.filter.call(galleryItems, function (it) { return it.style.display !== 'none'; });
      }
      return Array.prototype.filter.call(document.querySelectorAll('[data-lightbox]'), function (it) {
        return (it.getAttribute('data-lightbox') || 'default') === group;
      });
    }
    lbRebuild = function () { if (items.length) items = collect(groupOf(items[0])); };

    function imgOf(el) { return el.tagName === 'IMG' ? el : el.querySelector('img'); }

    function show(idx) {
      if (!items.length) return;
      current = (idx + items.length) % items.length;
      var it = items[current];
      var img = imgOf(it);
      if (img) {
        lbImg.src = img.getAttribute('data-full') || img.currentSrc || img.src;
        lbImg.alt = img.getAttribute('alt') || '';
      }
      var bm = isBM();
      var title = (bm && it.getAttribute('data-title-bm')) || it.getAttribute('data-title') ||
                  (img ? img.getAttribute('alt') : '') || '';
      if (lbCapTitle) lbCapTitle.textContent = title;
      var cap = bm
        ? (it.getAttribute('data-blurb-bm') || it.getAttribute('data-blurb') || '')
        : (it.getAttribute('data-blurb') || '');
      var isVideo = it.classList.contains('video') || it.hasAttribute('data-video');
      if (isVideo) cap += (bm ? '  ·  Reel penuh tersedia atas permintaan.' : '  ·  Full reel available on request.');
      if (lbCapText) lbCapText.textContent = cap;
      lb.classList.toggle('is-video', isVideo);
      var multi = items.length > 1;
      lb.querySelector('.lb-prev').style.display = multi ? '' : 'none';
      lb.querySelector('.lb-next').style.display = multi ? '' : 'none';
    }
    function open(list, idx) {
      items = list;
      lastFocus = document.activeElement;
      show(idx);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var closeBtn = lb.querySelector('.lb-close');
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function bind(el) {
      if (el._lbBound) return;
      el._lbBound = true;
      el.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('a')) return;   /* let real links win */
        var list = collect(groupOf(el));
        var idx = list.indexOf(el);
        if (idx >= 0) open(list, idx);
      });
      var isNativeBtn = el.tagName === 'BUTTON' || el.tagName === 'A';
      if (!isNativeBtn) {
        el.setAttribute('tabindex', '0');
        if (!el.getAttribute('role')) el.setAttribute('role', 'button');
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
      }
    }

    galleryItems.forEach(bind);
    document.querySelectorAll('[data-lightbox]').forEach(bind);

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

  /* ---- Work filters (work.html) — refresh the lightbox list after filtering */
  var filterBtns = document.querySelectorAll('.filter');
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
        lbRebuild();
      });
    });
  }
  window.rebuildLightboxList = function () { lbRebuild(); };

  /* -------------------------------------------------------------------------
     12. Contact form (mailto fallback)
     ---------------------------------------------------------------------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var bm = isBM();
      var body =
        (bm ? 'Nama: ' : 'Name: ') + (d.get('name') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        (bm ? 'Syarikat: ' : 'Company: ') + (d.get('company') || '') + '\n' +
        (bm ? 'Perkhidmatan: ' : 'Service of interest: ') + (d.get('service') || '') + '\n\n' +
        (d.get('message') || '');
      window.location.href = 'mailto:omarbarakbah@klasseproduction.com?subject=' +
        encodeURIComponent((bm ? 'Pertanyaan baharu daripada ' : 'New enquiry from ') + (d.get('name') || 'website')) +
        '&body=' + encodeURIComponent(body);
      var note = document.querySelector('#form-status');
      if (note) {
        note.textContent = bm ? 'Membuka aplikasi e-mel anda…' : 'Opening your email app to send the message…';
        note.style.color = '#fb7a3c';
      }
    });
  }

  var y = document.querySelector('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
