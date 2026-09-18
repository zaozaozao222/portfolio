/* 交互：光标光晕 / 首页视差 / 岗位词轮播 / 吸顶导航 / 移动端菜单 / 折叠面板 / 作品筛选 / 进场动画 */
(function () {
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));

  /* ---------- 光标光晕 + 首页视差 ---------- */
  var glow = document.getElementById('cursorGlow');
  var parallaxNodes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var fine = window.matchMedia('(pointer: fine)').matches;
  var mx = 0, my = 0, gx = 0, gy = 0;

  if (fine && glow) {
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      glow.classList.add('is-on');
    }, { passive: true });
    window.addEventListener('mouseleave', function () { glow.classList.remove('is-on'); });

    (function loop() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';

      if (parallaxNodes.length && window.scrollY < window.innerHeight * 1.2) {
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        parallaxNodes.forEach(function (el) {
          var k = parseFloat(el.getAttribute('data-parallax')) || 0.04;
          el.style.transform = 'translate(' + ((mx - cx) * k).toFixed(1) + 'px,' + ((my - cy) * k * 0.6).toFixed(1) + 'px)';
        });
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 岗位关键词轮播（中英对照） ---------- */
  var rolesZh = [
    ['市场', 'MARKETING'],
    ['品牌', 'BRAND'],
    ['电商', 'E-COMMERCE'],
    ['消费者洞察', 'CONSUMER INSIGHT'],
    ['零售', 'RETAIL']
  ];
  var rolesEn = [
    ['Marketing', 'GO-TO-MARKET'],
    ['Brand', 'BRAND & CONTENT'],
    ['E-commerce', 'E-COMMERCE OPS'],
    ['Consumer Insight', 'RESEARCH'],
    ['Retail', 'RETAIL MANAGEMENT']
  ];
  var wrap = document.querySelector('.roleswitch');
  var cn = document.getElementById('roleCn');
  var en = document.getElementById('roleEn');
  if (wrap && cn && en) {
    var i = 0;
    setInterval(function () {
      wrap.classList.add('is-swap');
      setTimeout(function () {
        i = (i + 1) % rolesZh.length;
        var list = (window.I18N && window.I18N.lang() === 'en') ? rolesEn : rolesZh;
        cn.textContent = list[i][0];
        en.textContent = list[i][1];
        wrap.classList.remove('is-swap');
      }, 300);
    }, 2400);
  }

  /* ---------- 吸顶 + 滚动高亮 ---------- */
  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 20);
    var idx = -1;
    var probe = window.scrollY + window.innerHeight * 0.32;
    sections.forEach(function (s, i) { if (s.offsetTop <= probe) idx = i; });
    navAnchors.forEach(function (a) { a.classList.remove('is-active'); });
    var current = sections[idx];
    if (current) {
      var active = navAnchors.filter(function (a) {
        return a.getAttribute('href') === '#' + current.id;
      })[0];
      if (active) active.classList.add('is-active');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('is-open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('is-open');
    });
  }

  /* ---------- 折叠面板 ---------- */
  function setPanel(item, panel, open) {
    if (open) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      item.classList.add('is-open');
      var b = item.querySelector('[aria-expanded]');
      if (b) b.setAttribute('aria-expanded', 'true');
    } else {
      panel.style.maxHeight = '0px';
      item.classList.remove('is-open');
      var b2 = item.querySelector('[aria-expanded]');
      if (b2) b2.setAttribute('aria-expanded', 'false');
    }
  }
  var accordions = Array.prototype.slice.call(document.querySelectorAll('.gal__row'));
  accordions.forEach(function (item) {
    var head = item.querySelector('.gal__head');
    var panel = item.querySelector('.gal__panel');
    if (!head || !panel) return;
    head.addEventListener('click', function () {
      setPanel(item, panel, !item.classList.contains('is-open'));
    });
  });

  window.addEventListener('load', function () { recompute(); });
  window.addEventListener('resize', function () { recompute(); });
  function recompute() {
    accordions.forEach(function (item) {
      if (!item.classList.contains('is-open')) return;
      var p = item.querySelector('.gal__panel');
      if (p) p.style.maxHeight = p.scrollHeight + 'px';
    });
  }

  /* ---------- 作品筛选 ---------- */
  var filters = document.getElementById('filters');
  if (filters) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.wcard'));
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      filters.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-on'); });
      btn.classList.add('is-on');
      var f = btn.getAttribute('data-f');
      cards.forEach(function (c) {
        c.classList.toggle('is-hidden', !(f === 'all' || c.getAttribute('data-cat') === f));
      });
    });
  }

  /* ---------- 滚动进场 ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal, .skill').forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });

  /* ?noanim / ?shot=<id>：调试与截图用 */
  if (location.search.indexOf('noanim') > -1) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    document.documentElement.style.scrollBehavior = 'auto';
  }
  var m2 = location.search.match(/modal=(d\d)/);
  if (m2) { setTimeout(function () { openDetail(m2[1]); }, 300); }
  var m = location.search.match(/shot=([a-z]+)/);
  if (m) {
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (s.id !== m[1]) s.style.display = 'none';
    });
    var mq = document.querySelector('.marquee'); if (mq) mq.style.display = 'none';
    var hd = document.querySelector('.hero'); if (hd && m[1] !== 'top') hd.style.display = 'none';
    window.scrollTo(0, 0);
  }

  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  });

  /* ---------- 作品详情弹层 ---------- */
  var wmodal = document.getElementById('wmodal');
  var wbody = document.getElementById('wmodalBody');
  function openDetail(id) {
    var src = document.getElementById(id);
    if (!wmodal || !wbody || !src) return;
    wbody.innerHTML = '';
    var clone = src.cloneNode(true);
    clone.removeAttribute('id');
    wbody.appendChild(clone);
    wmodal.classList.add('is-open');
    wmodal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('wmodal-open');
    wbody.scrollTop = 0;
  }
  function closeDetail() {
    if (!wmodal) return;
    wmodal.classList.remove('is-open');
    wmodal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('wmodal-open');
  }
  document.querySelectorAll('.wcard.is-clickable').forEach(function (c) {
    c.addEventListener('click', function () { openDetail(c.getAttribute('data-detail')); });
  });
  if (wmodal) {
    wmodal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeDetail();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDetail();
    });
  }

  if (window.I18N) window.I18N.init();
})();
