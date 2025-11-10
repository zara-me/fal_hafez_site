// script.js (complete)
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // DOM
  const nitSection = document.getElementById('nit-section');
  const resultSection = document.getElementById('result-section');
  const getFalBtn = document.getElementById('get-fal-btn');
  const getNewFalBtn = document.getElementById('get-new-fal-btn');
  const ghazalTextElement = document.getElementById('ghazal-text');
  const ghazalNumberElement = document.getElementById('ghazal-number');
  const tafsirTextElement = document.getElementById('tafsir-text');
  const guideTitle = document.getElementById('guide-title');
  const creator = document.getElementById('creator');


  const shareBtn = document.getElementById('share-btn');
  const shareFeedback = document.getElementById('share-feedback');

  const langButtons = document.querySelectorAll('.lang-btn');
  const pageTitle = document.getElementById('page-title');
  const siteTitle = document.getElementById('site-title');
  const nitText = document.getElementById('nit-text');
  const falTitle = document.getElementById('fal-title');
  const ghazalIntroLabel = document.getElementById('ghazal-intro-label');
  const tafsirLabel = document.getElementById('tafsir-label');
  const footerText = document.getElementById('footer-text');

  // GUIDE elements
  const guideSection = document.getElementById('guide-section');
  const guideShort = document.getElementById('guide-short');
  const guideToggle = document.getElementById('guide-toggle');
  const guideFull = document.getElementById('guide-full');

  if (!getFalBtn || !getNewFalBtn) return;

  // fallback in case ghazals.json not loaded
  const fallbackGhazals = [
    {
      id: 1,
      text: {
        fa: "الا یا ایها الساقی ادر کأسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها\nبه بوی نافه‌ای کاخر صبا زان طره بگشاید\nز تاب جعد مشکینش چه خون افتاد در دل‌ها\nای دل صبر پیشه کن که روز نیک نزدیک است\nفردا نویدِ خوشی و گشایش برای تو دارد",
        en: "O cupbearer, bring the cup and pass it around;\nLove seemed easy at first but difficulties were found.\nBy the scent of her hair when morning winds set free,\nHow the turn of her curls poured blood into my heart's sea.\nBe patient, O heart, bright days approach near,\nTomorrow will bring relief and joy sincere.",
        ru: "О возничий, подай кубок и передай вокруг;\nЛюбовь сначала казалась лёгкой, но пришли беды вдруг.\nОт запаха её косы, когда утренний ветер её распрямил,\nКак изгиб кудрей пролил кровь в сердце моё.\nТерпение, о сердце, близятся светлые дни,\nЗавтра принесёт облегчение и радость мне."
      },
      tafsir: {
        fa: "صبر و امید نشاندهندهٔ گشایش در راه است.",
        en: "Patience and hope indicate forthcoming relief.",
        ru: "Терпение и надежда указывают на скорое облегчение."
      }
    }
  ];

  // data holder
  let ghazals = [];
  let currentGhazal = null;

  // load ghazals.json
  function loadGhazals() {
    return fetch('ghazals.json', { cache: "no-cache" })
      .then(resp => {
        if (!resp.ok) throw new Error('Network response not ok');
        return resp.json();
      })
      .then(json => {
        if (Array.isArray(json) && json.length > 0) {
          ghazals = json;
          return;
        } else {
          throw new Error('Invalid JSON');
        }
      })
      .catch(err => {
        console.warn('Could not load ghazals.json, using fallback.', err);
        // create 50 fallback by cycling
        const list = [];
        for (let i = 0; i < 50; i++) {
          const src = fallbackGhazals[0];
          list.push({
            id: i + 1,
            text: Object.assign({}, src.text),
            tafsir: Object.assign({}, src.tafsir)
          });
        }
        ghazals = list;
      });
  }

  // translations (UI + guide)
  const translations = {
    fa: {
      siteTitle: 'فال لسان الغیب',
      creator: 'طراحی و توسعه توسط its_me_zr',
      pageTitle: 'فال و گشایش — راهنمای شعر و فال',
      guideTitle:'رازِ فال با شعر',
      nitText: '«ای حافظ شیرازی! تو محرم هر رازی! تو را به خدا و به شاخ نباتت قسم می دهم که هر چه صلاح و مصلحت می بینی برایم آشکار و آرزوی مرا براورده سازی.»',
      getFalBtn: 'نیت کردم و آماده‌ام',
      falTitle: 'فال شما',
      ghazalIntro: 'غزل شماره',
      tafsirLabel: 'تعبیر و تفسیر',
      shareBtn: 'کپی لینک فال',
      copyFeedback: 'لینک کپی شد!',
      getNew: 'فال دیگر بگیرم',
      footer: 'تمام حقوق محفوظ است',
      guideShort: 'آیا تا به‌حال فکر کرده‌اید که چرا مردم از شعر برای «فال» استفاده می‌کنند؟ این یک سنت باستانی است که شعر را به عنوان آیینهٔ دل می‌بیند — ادامه را بخوانید.',
      guideFull: 'فال گرفتن با شعر ریشه‌های فرهنگی و عرفانی دارد: در گذشته مردم برای پرسیدن از سرنوشت، شعری را انتخاب یا باز می‌کردند و با تفسیر آن، راهنمایی‌های نمادین می‌جستند. شعر به خاطر کنایه‌ها و سمبول‌هایش فضای بزرگی برای خوانش‌های مختلف فراهم می‌کند؛ این خوانش‌ها با نیت شخص ترکیب شده و تجربه‌ای شخصی و معنوی خلق می‌کند. در این سایت، شعر را به عنوان یک «آینهٔ درونی» می‌بینیم: هر بیت می‌تواند در زمان و حالِ متفاوتی برای فرد معنایی تازه پیدا کند — پس با نیتی پاک فال بگیر و از تفسیر به عنوان راهنمایی روحی استفاده کن.'
    },
    en: {
      siteTitle: 'Mystic Verse & Fortune',
      creator: 'Designed and developed by its_me_zr',
      pageTitle: 'Fortune & Guidance — The Magic of Poetry',
      nitText: '"Make your intention, breathe, and draw the verse with an open heart."',
      guideTitle: 'The Magic of Poetry & Fortune',
      getFalBtn: 'I have made my intention',
      falTitle: 'Your Fortune',
      ghazalIntro: 'Ghazal number',
      tafsirLabel: 'Interpretation',
      shareBtn: 'Copy fortune link',
      copyFeedback: 'Link copied!',
      getNew: 'Get another fortune',
      footer: 'All rights reserved',
      guideShort: 'Ever wondered why people use poetry for divination? It’s an ancient practice that treats verse as a mirror for the heart — read on to learn more.',
      guideFull: 'Poetry-based fortune-telling has cultural and mystical roots: people traditionally turned to selected verses to seek symbolic guidance about life’s questions. Poetry’s metaphors and imagery allow multiple readings; combined with a seeker’s intention, each reading becomes a personal, sometimes spiritual message. On this site we view verse as an "inner mirror": the same lines can speak differently depending on the moment and the person. Use the interpretation as a gentle guide — keep an open heart and a reflective mind.'
    },
    ru: {
      siteTitle: 'Мистическая Поэзия и Судьба',
      creator: 'Разработано its_me_zr',
      pageTitle: 'Предсказание и Руководство — Магия Стиха',
      nitText: '«Загадай намерение, вдохни глубже и открой стих с чистым сердцем.»',
      guideTitle: 'Магия поэзии и предсказаний',
      getFalBtn: 'Я загадал(а) и готов(а)',
      falTitle: 'Ваше предсказание',
      ghazalIntro: 'Стих №',
      tafsirLabel: 'Толкование',
      shareBtn: 'Скопировать ссылку фала',
      copyFeedback: 'Ссылка скопирована!',
      getNew: 'Получить другой фал',
      footer: 'Все права защищены',
      guideShort: 'Задумывались, почему люди используют поэзию для предсказаний? Это древняя практика, которая воспринимает стих как зеркало сердца — читайте дальше.',
      guideFull: 'Предсказание с помощью поэзии имеет культурные и мистические корни: люди традиционно обращались к выбранным строкам, чтобы получить символическое руководство по жизненным вопросам. Метафоры и образы поэзии допускают множество чтений; в сочетании с намерением ищущего каждое чтение становится личным, иногда духовным посланием. На этом сайте стих мы видим как "внутреннее зеркало": те же строки могут говорить по-разному в разное время и для разных людей. Используйте толкование как мягкое руководство — сохраняйте открытое сердце и раздумье.'
    }
  };

  // language management
  let currentLang = localStorage.getItem('siteLang') || 'fa';

  function applyTranslations(lang) {
    const t = translations[lang] || translations.fa;
    if (siteTitle) siteTitle.textContent = t.siteTitle;
    if (pageTitle) pageTitle.textContent = t.pageTitle;
    if (nitText) nitText.textContent = t.nitText;
    if (getFalBtn) getFalBtn.textContent = t.getFalBtn;
    if (falTitle) falTitle.textContent = t.falTitle;
    if (ghazalIntroLabel) ghazalIntroLabel.textContent = t.ghazalIntro;
    if (tafsirLabel) tafsirLabel.textContent = t.tafsirLabel;
    if (shareBtn) shareBtn.textContent = t.shareBtn;
    if (getNewFalBtn) getNewFalBtn.textContent = t.getNew;
    if (footerText) footerText.textContent = t.footer;
    if (shareFeedback) shareFeedback.textContent = t.copyFeedback;
    if (guideTitle) guideTitle.textContent = t.guideTitle || '';
    if (creator) creator.textContent = t.creator;

    // GUIDE translations
    if (guideShort) guideShort.textContent = t.guideShort || '';
    if (guideFull) guideFull.textContent = t.guideFull || '';
    if (guideToggle) guideToggle.textContent = (lang === 'fa' ? 'بیشتر بدانید' : (lang === 'en' ? 'Read more' : 'Подробнее'));

    langButtons.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    localStorage.setItem('siteLang', lang);
    currentLang = lang;

    // re-render current shown ghazal (if present)
    if (currentGhazal) renderGhazal(currentGhazal);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      applyTranslations(this.dataset.lang);
    });
  });

  // GUIDE toggle logic
  const GUIDE_STATE_KEY = 'guideExpandedV1';
  function setGuideExpanded(expanded) {
    if (!guideFull || !guideToggle) return;
    if (expanded) {
      guideFull.classList.remove('hidden');
      guideFull.setAttribute('aria-hidden', 'false');
      guideToggle.setAttribute('aria-expanded', 'true');
    } else {
      guideFull.classList.add('hidden');
      guideFull.setAttribute('aria-hidden', 'true');
      guideToggle.setAttribute('aria-expanded', 'false');
    }
    localStorage.setItem(GUIDE_STATE_KEY, expanded ? '1' : '0');
  }
  // initial state
  const savedGuide = localStorage.getItem(GUIDE_STATE_KEY);
  setGuideExpanded(savedGuide === '1');

  guideToggle.addEventListener('click', function () {
    const isOpen = !guideFull.classList.contains('hidden');
    setGuideExpanded(!isOpen);
    if (!isOpen) guideFull.focus();
  });

  // render a ghazal according to currentLang
  function renderGhazal(gh) {
    const lang = currentLang || 'fa';
    const text = (gh.text && (gh.text[lang] || gh.text.fa || '')) || '';
    const tafsir = (gh.tafsir && (gh.tafsir[lang] || gh.tafsir.fa || '')) || '';
    if (ghazalNumberElement) ghazalNumberElement.textContent = gh.id || '—';
    if (ghazalTextElement) ghazalTextElement.textContent = text;
    if (tafsirTextElement) tafsirTextElement.textContent = tafsir;
  }

  // pick random
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // display function
  function displayFal(item) {
    currentGhazal = item;
    renderGhazal(item);
    if (nitSection) nitSection.classList.add('hidden');
    if (resultSection) {
      resultSection.classList.remove('hidden');
      resultSection.focus();
    }
    // update URL params
    const url = new URL(window.location.href);
    url.searchParams.set('id', item.id);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url.toString());
  }

  // build share link
  function buildShareLink() {
    if (!currentGhazal) return window.location.href;
    const url = new URL(window.location.href);
    url.searchParams.set('id', currentGhazal.id);
    url.searchParams.set('lang', currentLang);
    return url.toString();
  }

  // simulate loading
  function simulateLoading(cb) {
    if (getFalBtn) {
      getFalBtn.disabled = true;
      getFalBtn.setAttribute('aria-busy', 'true');
      const t = translations[currentLang] || translations.fa;
      getFalBtn.textContent = (t.getFalBtn ? t.getFalBtn : '...') + '…';
      setTimeout(function () {
        try {
          cb();
        } finally {
          getFalBtn.disabled = false;
          getFalBtn.removeAttribute('aria-busy');
          if (getFalBtn) getFalBtn.textContent = translations[currentLang].getFalBtn;
        }
      }, 600);
    } else {
      cb();
    }
  }

  // share (copy link)
  if (shareBtn) {
    shareBtn.addEventListener('click', async function () {
      const link = buildShareLink();
      try {
        await navigator.clipboard.writeText(link);
      } catch (err) {
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(el);
      }
      // feedback
      if (shareFeedback) {
        shareFeedback.classList.remove('visually-hidden');
        setTimeout(function () {
          shareFeedback.classList.add('visually-hidden');
        }, 1600);
      }
    });
  }

  // main actions
  getFalBtn.addEventListener('click', function () {
    simulateLoading(function () {
      if (!ghazals || ghazals.length === 0) {
        displayFal(fallbackGhazals[0]);
        return;
      }
      const sel = pickRandom(ghazals);
      displayFal(sel);
    });
  });

  getNewFalBtn.addEventListener('click', function () {
    if (resultSection) resultSection.classList.add('hidden');
    if (nitSection) nitSection.classList.remove('hidden');
    if (ghazalNumberElement) ghazalNumberElement.textContent = '—';
    if (ghazalTextElement) ghazalTextElement.textContent = 'متن غزل در اینجا نمایش داده می‌شود.';
    if (tafsirTextElement) tafsirTextElement.textContent = 'تعبیر مرتبط با غزل در این قسمت قرار می‌گیرد.';
    currentGhazal = null;
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    url.searchParams.delete('lang');
    window.history.replaceState({}, '', url.toString());
  });

  // handle URL params: if id present show that ghazal after load
  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const lang = params.get('lang');
    if (lang && ['fa','en','ru'].includes(lang)) {
      applyTranslations(lang);
    }
    if (id) {
      const num = parseInt(id, 10);
      if (!isNaN(num) && ghazals && ghazals.length > 0) {
        const found = ghazals.find(g => g.id === num);
        if (found) {
          displayFal(found);
        }
      }
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && shareFeedback) {
      shareFeedback.classList.add('visually-hidden');
    }
  });

  // initialization
  loadGhazals().then(function () {
    applyTranslations(currentLang);
    handleUrlParams();
  });

});
