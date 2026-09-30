/* ════════════════════════════════════════════════════════
   陈绮敏求职作品集 · 交互脚本
   导航 / 滚动进场 / 数字滚动 / 技能条 / 专项模态框 / Toast
   ════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. 移动端菜单 ─────────────────────────── */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) closeMenu();
  });

  /* ── 2. 导航当前区高亮 ─────────────────────── */
  const sections = ['about', 'objective', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  const navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[data-sec]'));

  function highlightNav() {
    const pos = window.scrollY + window.innerHeight * 0.32;
    let currentId = '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.sec === currentId);
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ── 3. 滚动进场动画 ───────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── 4. 数字滚动动画 ───────────────────────── */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || '';
    var duration = 1100;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var countEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { countObserver.observe(el); });
  } else {
    countEls.forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
  }

  /* ── 5. 技能条填充 ─────────────────────────── */
  var skillBars = document.querySelectorAll('.skill-bar i');
  if ('IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          setTimeout(function () { bar.style.width = 'calc(' + bar.dataset.w + '% - 6px)'; }, 120);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(function (bar) { barObserver.observe(bar); });
  } else {
    skillBars.forEach(function (bar) { bar.style.width = 'calc(' + bar.dataset.w + '% - 6px)'; });
  }

  /* ── 6. 专项详情数据 ───────────────────────── */
  var PROJECTS = [
    {
      no: 'P-01',
      img: 'images/project-1.jpg',
      badge: '原创占比 100%',
      year: '2022.11 — 2026.05 · 深圳市卫生经济学会',
      title: '期刊焕新 PRESSROOM — 《深圳卫生经济》月刊编辑出版',
      desc: '负责《深圳卫生经济》月刊的编辑出版全流程：从选题策划、稿件征集、内容审核、排版校对到印刷发行，一手统筹。三年多把这本行业月刊的原创内容占比从 37.7% 一路做到 100%，实现内容完全自主。',
      points: [
        '统筹每期选题策划与稿件征集，按出版节奏推进内容生产；',
        '把控内容审核与排版校对，保证刊物质量与出版进度；',
        '推动原创内容占比从 37.7% 提升至 100%，告别依赖转载；',
        '对接印刷发行，完成从稿件到成刊的完整闭环。'
      ],
      stack: '选题策划 · 稿件征集 · 内容审核 · 排版校对 · 印刷发行 · 出版专业（初级）资质',
      stats: [
        { v: '100%', s: '原创内容占比' },
        { v: '37.7% → 100%', s: '原创提升轨迹' },
        { v: '每月 1 期', s: '稳定出版节奏' }
      ]
    },
    {
      no: 'P-02',
      img: 'images/project-2.jpg',
      badge: '849 项全流程管理',
      year: '2022.11 — 2026.05 · 深圳市卫生经济学会',
      title: '课题中枢 LEDGERHUB — 科研课题全流程行政管理',
      desc: '统筹管理学会年度科研课题 200 余项、累计 849 项，覆盖申报受理、材料初审、立项备案、结题验收全流程，并建立标准化管理流程，提升项目流转效率。',
      points: [
        '负责课题申报受理与材料初审，把好入口关；',
        '完成立项备案与结题验收，全流程留痕、台账可查；',
        '建立标准化管理流程，梳理各环节流转规则；',
        '以台账驱动管理，任何一项课题的进度随时可定位。'
      ],
      stack: '申报受理 · 材料初审 · 立项备案 · 结题验收 · 流程标准化 · 台账管理',
      stats: [
        { v: '849 项', s: '累计统筹课题' },
        { v: '200+', s: '年度在管课题' },
        { v: '4 环节', s: '全流程闭环管理' }
      ]
    },
    {
      no: 'P-03',
      img: 'images/project-3.jpg',
      badge: '3000+ 人次',
      year: '2022.11 — 2026.05 · 深圳市卫生经济学会',
      title: '会务引擎 EVENTFLOW — 行业培训与学术会议统筹',
      desc: '组织多场行业培训及学术会议：从会议通知、议程安排、场地对接、签到管理到会后总结的完整会务闭环，累计服务参会人员 3000 人次。',
      points: [
        '会议通知与议程编排，参会信息提前触达；',
        '场地对接与现场保障，活动如期落地；',
        '签到管理与现场服务，参会体验有人兜底；',
        '会后总结沉淀，每场会议都有复盘记录。'
      ],
      stack: '会议组织 · 议程安排 · 场地对接 · 签到管理 · 会后总结',
      stats: [
        { v: '3000+', s: '累计服务人次' },
        { v: '5 步', s: '会务流程闭环' },
        { v: '多场', s: '行业培训与学术会议' }
      ]
    },
    {
      no: 'P-04',
      img: 'images/project-4.jpg',
      badge: '抗疫先锋',
      year: '2022.01 — 2022.10 · 福田区疾病预防控制中心（借调）',
      title: '应急防线 FRONTLINE — 疫情防控应急行政协调',
      desc: '突发公共卫生事件期间借调疾控中心，任跨境司机与入境旅客组副组长：协助流调小组的行政调度与后勤保障，在高压环境下保障应急响应高效运转，获评福田「抗疫先锋」荣誉称号。',
      points: [
        '协调人员排班与物资调配，保障一线运转；',
        '负责信息上报流转，指令上下通达；',
        '流行病学调查数据的快速录入、核对、汇总与分析；',
        '撰写多份流调报告，严谨高效，获评福田「抗疫先锋」。'
      ],
      stack: '应急调度 · 排班协调 · 物资保障 · 数据录入核对 · 流调报告撰写',
      stats: [
        { v: '10 个月', s: '借调时长' },
        { v: '副组长', s: '岗位职级' },
        { v: '抗疫先锋', s: '荣誉称号' }
      ]
    }
  ];

  /* ── 7. 专项模态框 ─────────────────────────── */
  var modal = document.getElementById('projModal');
  var modalImg = document.getElementById('modalImg');
  var modalNo = document.getElementById('modalNo');
  var modalBadge = document.getElementById('modalBadge');
  var modalYear = document.getElementById('modalYear');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalPoints = document.getElementById('modalPoints');
  var modalStack = document.getElementById('modalStack');
  var modalStats = document.getElementById('modalStats');
  var lastFocused = null;

  function openModal(index) {
    var p = PROJECTS[index];
    if (!p) return;
    modalImg.src = p.img;
    modalImg.alt = p.title + ' 项目封面';
    modalNo.textContent = p.no;
    modalBadge.textContent = p.badge;
    modalYear.textContent = p.year;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalPoints.innerHTML = p.points.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    modalStack.textContent = p.stack;
    modalStats.innerHTML = p.stats.map(function (st) {
      return '<div><strong>' + st.v + '</strong><span>' + st.s + '</span></div>';
    }).join('');
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.proj-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(parseInt(card.dataset.proj, 10));
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(parseInt(card.dataset.proj, 10));
      }
    });
  });
  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close') || e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ── 8. Toast（简历下载提示）──────────────── */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }
  document.querySelectorAll('a[download]').forEach(function (link) {
    link.addEventListener('click', function () {
      showToast('简历已开始下载 — 如未触发，请右键「链接另存为」');
    });
  });

})();
