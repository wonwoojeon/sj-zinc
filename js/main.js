/* ============================================================
   SJ징크지붕공사 — main.js
   Lenis + GSAP ScrollTrigger + 커스텀 커서 + 인터랙션
   ============================================================ */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = typeof window.ScrollTrigger !== 'undefined';
  var hasLenis = typeof window.Lenis !== 'undefined';

  if (hasGsap && hasST) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------------------------------------------------
     Lenis smooth scroll
  --------------------------------------------------------- */
  var lenis = null;
  if (!reducedMotion && hasLenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    if (hasGsap && hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var rafLenis = function (time) { lenis.raf(time); requestAnimationFrame(rafLenis); };
      requestAnimationFrame(rafLenis);
    }
  }

  // 앵커 스크롤 (Lenis 연동)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------------------------------------------------------
     Preloader — 카운터 + 커튼 업
  --------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  var preCount = document.getElementById('preloaderCount');
  var preBar = document.getElementById('preloaderBar');

  function heroReveal() {
    if (!hasGsap || reducedMotion) return;
    var tl = gsap.timeline();
    tl.fromTo('.hero-bg img', { scale: 1.15 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .to('.hero-line-inner', { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0.15)
      .fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6)
      .fromTo('.hero-sub > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.75)
      .fromTo('.hero-foot', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1);
  }

  function closePreloader() {
    if (!preloader) return;
    if (hasGsap && !reducedMotion) {
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: function () { preloader.style.display = 'none'; }
      });
      heroReveal();
    } else {
      preloader.style.display = 'none';
    }
  }

  if (preloader && hasGsap && !reducedMotion) {
    // 히어로 라인 초기 상태 (JS로만 숨김 — no-JS 대비)
    gsap.set('.hero-line-inner', { yPercent: 110 });
    var counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: function () {
        var n = Math.round(counter.v);
        if (preCount) preCount.textContent = n;
        if (preBar) preBar.style.width = n + '%';
      },
      onComplete: closePreloader
    });
  } else if (preloader) {
    // 모션 축소 / GSAP 로드 실패 시 즉시 해제
    setTimeout(function () { preloader.style.display = 'none'; }, 300);
  }

  // 안전장치: 어떤 이유로든 4초 뒤에도 프리로더가 남아 있으면 강제 해제
  if (preloader) {
    setTimeout(function () {
      if (preloader.style.display !== 'none') {
        preloader.style.transition = 'none';
        preloader.style.display = 'none';
        document.querySelectorAll('.hero-line-inner').forEach(function (el) {
          el.style.transform = 'none';
        });
      }
    }, 4000);
  }

  /* ---------------------------------------------------------
     Header 스크롤 상태
  --------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------
     GSAP 스크롤 모션 (reduced-motion 시 전부 스킵)
  --------------------------------------------------------- */
  if (hasGsap && hasST && !reducedMotion) {

    // 섹션 리빌: fade + slide + stagger
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
    });

    // 섹션 타이틀 리빌 (.reveal과 중복 적용 방지)
    gsap.utils.toArray('.section-title:not(.reveal), .about-quote:not(.reveal)').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });

    // 이미지 parallax (scale 1.15 → 1) — .about-fig 은 .parallax-frame 이 커버
    gsap.utils.toArray('.parallax-frame img, .work-card .img-frame img').forEach(function (img) {
      gsap.fromTo(img, { scale: 1.15 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.img-frame') || img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // 히어로 배경 스크롤 parallax
    gsap.to('.hero-bg img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // 스탯 카운트업
    gsap.utils.toArray('.count').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () { el.textContent = Math.round(obj.v); }
      });
    });

    // WORKS 가로 스크롤 (데스크톱 전용)
    var mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', function () {
      var track = document.getElementById('worksTrack');
      var pin = document.getElementById('worksPin');
      if (!track || !pin) return;
      var getAmount = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      gsap.to(track, {
        x: function () { return -getAmount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: function () { return '+=' + getAmount(); },
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    });

    // PROCESS 스티키 넘버 교체 — 단일 활성 단계만 관리해 번호/강조 동기화 보장
    var bignum = document.getElementById('processBignum');
    var pSteps = gsap.utils.toArray('.p-step');
    function activateProcessStep(step) {
      pSteps.forEach(function (s) { s.classList.remove('active'); });
      step.classList.add('active');
      if (bignum) bignum.textContent = step.getAttribute('data-step');
    }
    pSteps.forEach(function (step) {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: function (self) { if (self.isActive) activateProcessStep(step); }
      });
    });

    // 푸터 아웃라인 텍스트 parallax
    gsap.fromTo('.footer-bg-text', { yPercent: 30 }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ---------------------------------------------------------
     SERVICES — 호버 플로팅 프리뷰
  --------------------------------------------------------- */
  var svcPreview = document.getElementById('svcPreview');
  var svcPreviewImg = document.getElementById('svcPreviewImg');
  if (svcPreview && svcPreviewImg && finePointer && !reducedMotion) {
    // 프리뷰 이미지 프리로드
    document.querySelectorAll('.svc-item').forEach(function (item) {
      var src = item.getAttribute('data-img');
      if (src) { var im = new Image(); im.src = src; }
    });

    var px = 0, py = 0, tx = 0, ty = 0, rafId = null;
    var pw = 0, ph = 0; // 프리뷰 크기 캐시
    function loop() {
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      svcPreview.style.transform =
        'translate(' + (px - pw / 2) + 'px,' +
        (py - ph / 2 - 40) + 'px)';
      rafId = requestAnimationFrame(loop);
    }
    document.querySelectorAll('.svc-item').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var src = item.getAttribute('data-img');
        if (src && svcPreviewImg.getAttribute('src') !== src) {
          svcPreviewImg.setAttribute('src', src);
        }
        svcPreview.classList.add('on');
        pw = svcPreview.offsetWidth;
        ph = svcPreview.offsetHeight;
        if (!rafId) loop();
      });
      item.addEventListener('mouseleave', function () {
        svcPreview.classList.remove('on');
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    });
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     커스텀 커서 (도트 + 링, VIEW/CALL 라벨)
  --------------------------------------------------------- */
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  var cursorLabel = document.getElementById('cursorLabel');
  if (dot && ring && finePointer && !reducedMotion) {
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    }, { passive: true });
    (function cursorLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(cursorLoop);
    })();

    var bindCursor = function (selector, label) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          ring.classList.add('is-view');
          if (cursorLabel) cursorLabel.textContent = label;
        });
        el.addEventListener('mouseleave', function () {
          ring.classList.remove('is-view');
        });
      });
    };
    bindCursor('.work-card .img-frame, .work-card', 'VIEW');
    bindCursor('.cta-tel', 'CALL');
    bindCursor('.ba-slider', 'DRAG');
  } else {
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  /* ---------------------------------------------------------
     매그네틱 버튼
  --------------------------------------------------------- */
  if (finePointer && !reducedMotion && hasGsap) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var inner = btn.querySelector('.magnetic-inner') || btn;
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: dx * 0.25, y: dy * 0.25, duration: 0.4, ease: 'power3.out' });
        gsap.to(inner, { x: dx * 0.12, y: dy * 0.12, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to([btn, inner], { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });

    // 초대형 전화번호 매그네틱
    var ctaTel = document.querySelector('.cta-tel');
    if (ctaTel) {
      ctaTel.addEventListener('mousemove', function (e) {
        var rect = ctaTel.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(ctaTel, { x: dx * 0.06, y: dy * 0.12, duration: 0.5, ease: 'power3.out' });
      });
      ctaTel.addEventListener('mouseleave', function () {
        gsap.to(ctaTel, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    }
  }

  /* ---------------------------------------------------------
     BEFORE / AFTER 슬라이더
  --------------------------------------------------------- */
  var baSlider = document.getElementById('baSlider');
  var baBefore = document.getElementById('baBefore');
  var baHandle = document.getElementById('baHandle');
  if (baSlider && baBefore && baHandle) {
    var dragging = false;

    var setPos = function (pct) {
      pct = Math.max(2, Math.min(98, pct));
      baBefore.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      baHandle.style.left = pct + '%';
      baSlider.setAttribute('aria-valuenow', Math.round(pct));
    };

    var pctFromEvent = function (e) {
      var rect = baSlider.getBoundingClientRect();
      var x = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
      return ((x - rect.left) / rect.width) * 100;
    };

    baSlider.addEventListener('pointerdown', function (e) {
      dragging = true;
      baSlider.setPointerCapture(e.pointerId);
      setPos(pctFromEvent(e));
    });
    baSlider.addEventListener('pointermove', function (e) {
      if (dragging) setPos(pctFromEvent(e));
    });
    var stop = function () { dragging = false; };
    baSlider.addEventListener('pointerup', stop);
    baSlider.addEventListener('pointercancel', stop);

    // 키보드 접근성
    baSlider.addEventListener('keydown', function (e) {
      var now = parseFloat(baSlider.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { setPos(now - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPos(now + 4); e.preventDefault(); }
      if (e.key === 'Home') { setPos(2); e.preventDefault(); }
      if (e.key === 'End') { setPos(98); e.preventDefault(); }
    });

    setPos(50);
  }

})();
