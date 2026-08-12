/* ===========================================================================
   Klasse Productions — private preview gate
   ---------------------------------------------------------------------------
   Soft client-side gate for sharing the demo with the client.
   NOTE: this is a courtesy lock (the files are still public on the CDN), not
   real security. For hard protection use Vercel Deployment Protection.
   Unlock is remembered in localStorage for 14 days.
   =========================================================================== */
(function () {
  "use strict";

  var PASSWORD = "klasse2026";
  var KEY = "klasse-preview-unlocked";
  var DAYS = 14;

  /* already unlocked? */
  try {
    var until = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (until && Date.now() < until) return;
  } catch (e) {}

  /* hide the page until the gate resolves (no content flash) */
  var hide = document.createElement("style");
  hide.id = "gate-hide";
  hide.textContent = "html.gate-locked body>*:not(.gate){visibility:hidden!important}html.gate-locked{overflow:hidden}";
  (document.head || document.documentElement).appendChild(hide);
  document.documentElement.classList.add("gate-locked");

  var css = document.createElement("style");
  css.textContent = [
    ".gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;",
      "background:#0a0a0b;color:#fff;font-family:'Inter',system-ui,-apple-system,sans-serif;padding:1.5rem;",
      "opacity:0;animation:gateIn .5s ease forwards}",
    "@keyframes gateIn{to{opacity:1}}",
    ".gate__bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.22;filter:grayscale(.3)}",
    ".gate__bg::after{content:'';position:absolute;inset:0;",
      "background:radial-gradient(120% 90% at 50% 0%,rgba(234,88,12,.22),transparent 60%),linear-gradient(180deg,rgba(10,10,11,.72),rgba(10,10,11,.96))}",
    ".gate__card{position:relative;z-index:2;width:100%;max-width:430px;text-align:center}",
    ".gate__logo{height:38px;width:auto;margin:0 auto 2.1rem;display:block}",
    ".gate__k{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:#fb7a3c;font-weight:700;margin-bottom:.9rem}",
    ".gate__k::before{content:'';display:inline-block;width:22px;height:2px;background:#ea580c;vertical-align:middle;margin-right:.6rem}",
    ".gate__h{font-family:'Anton','Inter',sans-serif;font-size:clamp(1.9rem,7vw,2.5rem);line-height:1.05;letter-spacing:.01em;",
      "text-transform:uppercase;margin:0 0 .8rem}",
    ".gate__h span{color:#fb7a3c}",
    ".gate__p{font-size:.95rem;line-height:1.6;color:#a8a8b3;margin:0 auto 1.8rem;max-width:34ch}",
    ".gate__form{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center}",
    ".gate__in{flex:1 1 210px;min-width:0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.16);",
      "border-radius:100px;padding:.95rem 1.3rem;color:#fff;font-size:.95rem;font-family:inherit;transition:border-color .2s,background .2s}",
    ".gate__in::placeholder{color:#6f6f7a}",
    ".gate__in:focus{outline:none;border-color:#ea580c;background:rgba(234,88,12,.07)}",
    ".gate__btn{background:#ea580c;color:#fff;border:0;border-radius:100px;padding:.95rem 1.7rem;font-size:.8rem;font-weight:700;",
      "letter-spacing:.09em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:background .2s,transform .2s;min-height:46px}",
    ".gate__btn:hover{background:#fb7a3c;transform:translateY(-1px)}",
    ".gate__btn:focus-visible,.gate__in:focus-visible{outline:2px solid #fff;outline-offset:3px}",
    ".gate__err{min-height:1.3rem;margin-top:.9rem;font-size:.83rem;color:#ff6b5e;opacity:0;transition:opacity .2s}",
    ".gate__err.on{opacity:1}",
    ".gate.shake .gate__card{animation:gateShake .4s}",
    "@keyframes gateShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}",
    ".gate__foot{margin-top:2.6rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.09);font-size:.82rem;color:#79798a;line-height:1.7}",
    ".gate__foot a{color:#fff;text-decoration:none;border-bottom:1px solid rgba(234,88,12,.6);padding-bottom:1px;transition:color .2s}",
    ".gate__foot a:hover{color:#fb7a3c}",
    ".gate__uc{display:inline-flex;align-items:center;gap:.45rem;margin-top:.5rem;font-weight:600}",
    "@media(prefers-reduced-motion:reduce){.gate,.gate.shake .gate__card{animation:none;opacity:1}.gate__btn:hover{transform:none}}"
  ].join("");

  function build() {
    document.head.appendChild(css);

    var g = document.createElement("div");
    g.className = "gate";
    g.setAttribute("role", "dialog");
    g.setAttribute("aria-modal", "true");
    g.setAttribute("aria-label", "Private preview — password required");
    g.innerHTML =
      '<div class="gate__bg" style="background-image:url(assets/img/about-team-1.jpg)"></div>' +
      '<div class="gate__card">' +
        '<img class="gate__logo" src="assets/logo-white.png" alt="Klasse Productions">' +
        '<div class="gate__k">Private preview</div>' +
        '<h1 class="gate__h">Website <span>preview.</span></h1>' +
        '<p class="gate__p">This is an unreleased preview of the new Klasse Productions website. Enter the access password to continue.</p>' +
        '<form class="gate__form" autocomplete="off">' +
          '<input class="gate__in" type="password" name="klasse-access" placeholder="Access password" aria-label="Access password" autocomplete="current-password" required>' +
          '<button class="gate__btn" type="submit">Unlock</button>' +
        '</form>' +
        '<div class="gate__err" role="alert" aria-live="polite"></div>' +
        '<div class="gate__foot">' +
          'Designed &amp; built by' +
          '<br><a class="gate__uc" href="https://ummah-collective.com" target="_blank" rel="noopener">Ummah Collective &rarr;</a>' +
          '<br><span style="opacity:.75">Need access? <a href="mailto:info@ummah-collective.com">info@ummah-collective.com</a></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(g);

    var form = g.querySelector("form");
    var input = g.querySelector(".gate__in");
    var err = g.querySelector(".gate__err");
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 350);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value.trim().toLowerCase() === PASSWORD) {
        try { localStorage.setItem(KEY, String(Date.now() + DAYS * 864e5)); } catch (e2) {}
        g.style.transition = "opacity .35s ease";
        g.style.opacity = "0";
        setTimeout(function () {
          g.remove();
          document.documentElement.classList.remove("gate-locked");
          var h = document.getElementById("gate-hide");
          if (h) h.remove();
        }, 350);
      } else {
        err.textContent = "That password isn’t right. Please try again.";
        err.classList.add("on");
        g.classList.add("shake");
        input.select();
        setTimeout(function () { g.classList.remove("shake"); }, 420);
      }
    });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
