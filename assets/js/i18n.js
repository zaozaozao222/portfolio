/* ============================================================
   中英双语结构
   - 中文（zh）为默认，首次加载时从 DOM 自动快照
   - 英文（en）写在下方 EN 字典中；缺失的 key 自动回落到中文
   - 新增文案：在 HTML 元素上加 data-i18n="key"，并在 EN 里补一条即可
   ============================================================ */
(function () {
  var LANG_KEY = 'zz-lang';

  var EN = {
    'nav.name': 'Zien Zhang <em>ZIEN</em>',
    'nav.exp': 'Experience',
    'nav.work': 'Work',
    'nav.skills': 'Skills',
    'nav.gallery': 'Visual',
    'nav.contact': 'Contact',
    'nav.cta': 'Contact me',

    'hero.name': '张紫恩',
    'hero.role1': 'Marketing',
    'hero.line': 'Trained in art history, a perpetual apprentice — decoding beauty through professional training, and relearning it with every chance I get.',
    'qf1': '<strong>Sichuan University · Art History</strong><span>GPA 3.86 / 4.0 · top 5% · Class of 2027</span>',
    'qf2': '<strong>The Chinese University of Hong Kong · MA in Cultural Management <span class="tag-mini">PLANNED</span></strong><span>Sept 2027 entry (planned) · Class of 2028</span>',
    'qf3': '<strong>IELTS 7.5 · Cambridge Summer Programme</strong><span>Chinese / English / Japanese · content · data · competitor teardown</span>',
    'hero.avail': 'Available now',
    'hero.slot1': 'Regular internship · Nov 2026 – Aug 2027',
    'hero.slot2': 'Full-time summer · Jun – Aug 2027',
    'hero.cta1': 'See my work',
    'hero.cta2': 'CV 中文',
    'hero.cta2b': 'English CV',

    'nb.hello': "Hello, I'm Zien.",

    'exp.title': 'Experience',

    'edu2.school': 'The Chinese University of Hong Kong (CUHK) — MA in Cultural Management',
    'edu2.detail': 'MA in Cultural Management · Class of 2028 · enrolment planned, not yet official',
    'edu1.school': 'Sichuan University — Fine Arts (Art History & Theory)',
    'edu1.detail': 'GPA 3.86 / 4.0 (top 5%) · First Prize Scholarship · Outstanding Student',

    'tl.e2t': 'Sichuan Hongmofang Network Technology — Assistant Product Manager',
    'tl.e2b1': 'Joined the AI Panda "Hongbao" project: content planning, product appearance & interaction logic, go-to-market discussion.',
    'tl.e2b2': 'Independently produced identity cards, user manuals, packaging copy and base scripts; delivered multiple colour schemes.',
    'tl.e2b3': 'Mapped the competitor\'s full interaction path and proposed UI / mini-program improvements; joined CES 2026 trend analysis and overseas launch planning.',
    'tl.e7t': 'Sichuan Changhong Electronics Holding Group — Operations Assistant',
    'tl.e7b1': 'Ran the corporate WeChat account: original articles, layout proofreading, asset management.',
    'tl.e7b2': 'Maintained Excel data trackers and standardised daily workflows.',
    'tl.e3t': '"Spark Heritage" — Revitalising Urban-Fringe Heritage | Core Member',
    'tl.e3b1': 'Field research and in-depth interviews; extracted the "Six Treasures" narrative and designed a storytelling guidebook.',
    'tl.e3b2': 'Planned 5 differentiated city routes; contributed to mini-program content and promo video scripts.',
    'tl.e5t': 'International Organisations Summer Programme, Girton College, Cambridge',
    'tl.e5b1': 'Completed modules on international organisations and the global economy; presented in English on cross-border heritage communication.',
    'tl.e8t': 'SCU Summer Social Practice Team — Copy / Photography / Editing',
    'tl.e8b1': 'Independently produced short videos and graphic packages; team won Outstanding Team and Best Cinematography.',

    'work.title': 'Work',
    'work.f0': 'All',
    'work.f1': 'Brand',
    'work.f2': 'Insight',
    'work.f3': 'E-commerce',
    'work.f4': 'Commercial',
    'work.tip': 'TIP · drop cover images into assets/img/work/ named 01.jpg – 06.jpg',
    'w.role': 'What I did',
    'w.result': 'Outcome',
    'w.link': 'View full project →',

    'w1.t': 'Heritage-Site User Research & Content Productisation',
    'w1.role': 'Field research, in-depth interviews, survey design & analysis, narrative extraction, content planning.',
    'w1.result': 'Extracted the "Six Treasures" narrative, designed a storytelling guidebook and interactive content, planned 5 differentiated city routes.',
    'w2.t': 'AI Panda "Hongbao" Product Identity & Content System',
    'w2.role': 'Appearance & colour schemes, identity cards / manuals / packaging copy, interaction recommendations.',
    'w2.result': 'Multiple colour directions plus a full base asset set; UI and onboarding copy suggestions entered prototype review.',
    'w3.t': 'Corporate WeChat Content Operations & Data Tracking',
    'w3.role': 'Original article writing & layout, asset library management, Excel data tracking.',
    'w3.result': 'Standardised the publishing workflow and archiving.',
    'w4.t': 'CES 2026 AI Toy Trend Analysis & Overseas Launch',
    'w4.role': 'Exhibit trend analysis, overseas promotion planning, hands-on review content.',
    'w4.result': 'Delivered trend conclusions and overseas promotion directions.',
    'w5.t': 'Brand Aesthetics Research: Lin Fengmian & Visual Culture',
    'w5.role': 'Literature review, image and source analysis, paper writing & publication.',
    'w5.result': '3 published papers; Annual Golden Award of Chinese Visual Arts.',
    'w6.t': 'Structured Teaching Research on Mandala Thangka Heritage',
    'w6.role': 'Participant observation, semi-structured interviews, teaching model design, visual teaching kits.',
    'w6.result': 'A geometry–craft–ritual teaching model and a public experience path.',

    'skill.title': 'Skills & Tools',
    's1': 'Content Creation & Social Operations', 's1v': 'Advanced',
    's2': 'Consumer Insight — Interviews & Survey Analysis', 's2v': 'Advanced',
    's3': 'English (IELTS 7.5) — Business & Academic', 's3v': 'Fluent',
    's4': 'AI Tools (Codex / WorkBuddy / Claude / ChatGPT / Kling)', 's4v': 'Advanced',
    's5': 'Visual & Video (Figma / CapCut / Layout)', 's5v': 'Advanced',
    's6': 'Excel / PowerPoint — Data & Storytelling', 's6v': 'Good',

    'gal.title': 'Visual Notes',
    'gal.r1': 'Personal',
    'gal.hint': 'Click to unfold ✦',
    'gal.board': 'Aesthetic Board',
    'gal.slottip': 'TIP · to replace, drop images into assets/img/aesthetic/ named 01.jpg – 03.jpg',

    'ct.title': 'Contact',
    'ct.lead': 'Hiring interns in marketing, brand, e-commerce or consumer insight? Reach out directly — timing and start dates are flexible.',
    'ct.cta': 'Email me',
    'ct.mail': 'Email',
    'ct.mail2': 'Alt email',
    'ct.tel': 'Phone',
    'ct.wechat': 'WeChat',
    'ct.base': 'Based in',
    'ct.basev': 'Chengdu · nationwide mobility',
    'ct.cv': 'CV',
    'ct.cv1': '中文 CV',
    'ct.cv2': 'English CV',
    'foot.note': 'Continuously updating · Sep 2026'
  };

  var nodes = [];
  function collect() {
    nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!el.__zh) el.__zh = el.innerHTML;
      el.__key = key;
    });
  }

  function apply(lang) {
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-CN';
    nodes.forEach(function (el) {
      var val = (lang === 'en') ? (EN[el.__key] || el.__zh) : el.__zh;
      el.innerHTML = val;
    });
    document.querySelectorAll('.lang__opt').forEach(function (o) {
      o.classList.toggle('is-on', o.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  window.I18N = {
    init: function () {
      collect();
      var saved = 'zh';
      try { saved = localStorage.getItem(LANG_KEY) || 'zh'; } catch (e) {}
      apply(saved);
      var btn = document.getElementById('langBtn');
      if (btn) {
        btn.addEventListener('click', function () {
          var next = (document.documentElement.lang === 'en') ? 'zh' : 'en';
          apply(next);
        });
      }
    },
    lang: function () { return document.documentElement.lang; }
  };
})();
