// ============== Language (global) ==============
(function () {
  const KEY = 'language';
  const DEFAULT = 'en';

  // init on every page load
  const initial = localStorage.getItem(KEY) || DEFAULT;
  applyLang(initial, false);

  // expose togglers (support both names)
  window.toggleLang = function () {
    const next = (localStorage.getItem(KEY) || DEFAULT) === 'ar' ? 'en' : 'ar';
    applyLang(next, true);
  };
  // لبعض الصفحات القديمة اللي لسا بتستدعي toggleLanguage()
  window.toggleLanguage = window.toggleLang;

  window.setLang = function (lang) {
    const safe = lang === 'ar' ? 'ar' : 'en';
    applyLang(safe, true);
  };

  function applyLang(lang, notify) {
    localStorage.setItem(KEY, lang);
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body && document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // خلّي زر اللغة يشتغل (لو موجود)
    const btn = document.getElementById('lang-switcher') || document.querySelector('.lang-switcher');
    if (btn) btn.setAttribute('title', lang === 'ar' ? 'تغيير اللغة' : 'Change Language');

    // خبر الصفحات/الويدجتس إنه اللغة تغيّرت
    if (notify) window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }
})();

// اربط زر اللغة (بدون inline handlers)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('lang-switcher') || document.querySelector('.lang-switcher');
  if (btn) btn.addEventListener('click', () => window.toggleLang && window.toggleLang());
});

// ============== Active nav link ==============
function isHomePage() {
  const path = location.pathname.replace(/\/+$/, '');
  const last = path.split('/').pop(); // ممكن تكون "" على GH Pages
  return !last || last.toLowerCase() === 'index.html';
}



function clearActiveLinks() {
  document.querySelectorAll('.nav-links a.is-active')
    .forEach(a => a.classList.remove('is-active'));
}

function setActiveNavLink() {
  // ⛔️ على الهوم: لا تفعيل إطلاقًا
  if (isHomePage()) {
    clearActiveLinks();
    return;
  }

  const currentFile = (function () {
    let path = location.pathname.replace(/\/+$/, '');
    let file = path.split('/').pop();
    return (file && file.length) ? file.toLowerCase() : 'index.html';
  })();

  const currentPage = (document.body.getAttribute('data-page') || '').toLowerCase();
  const currentHash = location.hash || '';

  const parseHref = (href) => {
    try {
      const u = new URL(href, location.href);
      let p = u.pathname.replace(/\/+$/, '');
      let f = p.split('/').pop();
      return {
        file: (f && f.length) ? f.toLowerCase() : 'index.html',
        hash: u.hash || ''
      };
    } catch {
      const f = (href || '').split('/').pop();
      const h = (href || '').includes('#') ? '#' + href.split('#').pop() : '';
      return { file: (f && f.length) ? f.toLowerCase() : 'index.html', hash: h };
    }
  };

  document.querySelectorAll('.nav-links a').forEach((a) => {
    const { file, hash } = parseHref(a.getAttribute('href'));
    const linkDataPage = (a.dataset.page || '').toLowerCase();

    let isActive = false;

    if (file !== 'index.html') {
      isActive = (file === currentFile);
    } else {
      if (currentFile === 'index.html') {
        if (hash && hash.startsWith('#')) {
          isActive = (hash === currentHash);
        } else {
          isActive = (!currentHash);
        }
      }
    }

    if (!isActive && currentPage && linkDataPage) {
      isActive = (currentPage === linkDataPage);
    }

    a.classList.toggle('is-active', !!isActive);
  });
}

// عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  if (isHomePage()) clearActiveLinks();   // الهوم: نظّف فقط
  else setActiveNavLink();
});

// الهوم: بدل ما نعيد التفعيل عند تغيير الهاش، نمسح أي تفعيل
window.addEventListener('hashchange', () => {
  if (isHomePage()) clearActiveLinks();
  else setActiveNavLink();
});


// ============== Mobile menu (robust, no backdrop, mobile-only styles) ==============
document.addEventListener('DOMContentLoaded', () => {
  // اربط على كل نافبار عليها data-mobile-nav
  document.querySelectorAll('.navbar[data-mobile-nav]').forEach((navbar) => {
    if (navbar.dataset.bound === '1') return;
    navbar.dataset.bound = '1';

    const toggle = navbar.querySelector('.menu-toggle');
    const panel  = navbar.querySelector('.nav-links');
    if (!toggle || !panel) return;

    const OPEN = 'is-open';
    const BP = 768;
    let lastFocused = null;

    const isOpen = () => navbar.classList.contains(OPEN);

    // ارتفاع الهيدر (النافبار) ديناميكيًا
    const headerHeightPx = () => Math.round((navbar.getBoundingClientRect().height || 64));

    // تنظيف كل الـinline styles (للدسكتوب خاصة)
    function clearInlinePanelStyles(){
      ['display','position','left','right','top','zIndex','flexDirection',
       'pointerEvents','opacity','transform','transition'].forEach(p => {
        panel.style[p] = '';
      });
    }

    // تفعيل ستايلات الموبايل فقط عندما يكون ≤ BP
    function applyMobilePanelStyles(){
      panel.style.position = 'fixed';
      panel.style.left = '0';
      panel.style.right = '0';
      panel.style.top = headerHeightPx() + 'px';
      panel.style.zIndex = '1001';
      panel.style.flexDirection = 'column';
      panel.style.pointerEvents = 'none';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(-8px)';
      panel.style.transition = 'transform .18s ease, opacity .18s ease';
      panel.style.display = 'none'; // مخفية افتراضيًا للموبايل
    }

    function openMenu(){
      lastFocused = document.activeElement;
      navbar.classList.add(OPEN);
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label', document.dir === 'rtl' ? 'إغلاق القائمة' : 'Close menu');

      // حدّث الموضع حسب ارتفاع الهيدر
      panel.style.top = headerHeightPx() + 'px';

      document.body.style.overflow = 'hidden';
      panel.style.display = 'flex';
      requestAnimationFrame(() => {
        panel.style.pointerEvents = 'auto';
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
        (panel.querySelector('a,button,[tabindex]:not([tabindex="-1"])') || toggle).focus();
      });
    }

    function closeMenu(){
      navbar.classList.remove(OPEN);
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label', document.dir === 'rtl' ? 'فتح القائمة' : 'Open menu');

      document.body.style.overflow = '';
      panel.style.pointerEvents = 'none';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        if (window.innerWidth <= BP) panel.style.display = 'none';
      }, 180);
      lastFocused && lastFocused.focus();
    }

    // مزامنة الوضع (موبايل/دسكتوب) عند التحميل والتغيير
    function syncMode(){
      if (window.innerWidth <= BP) {
        // موبايل: تأكد من وجود ستايلات الموبايل
        applyMobilePanelStyles();
        if (!isOpen()) panel.style.display = 'none';
      } else {
        // دسكتوب: نظّف أي inline وخلي CSS الأساسي يتحكم
        if (isOpen()) closeMenu();
        clearInlinePanelStyles();
      }
    }

    // ربط الأحداث
    syncMode();

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth > BP) return; // أمان: ما تفتح على الدسكتوب
      isOpen() ? closeMenu() : openMenu();
    });

    // كليك على أي رابط داخل اللوحة
    panel.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (a && window.innerWidth <= BP) closeMenu();
    });

    // كليك خارج اللوحة والزر يغلق (موبايل فقط)
    document.addEventListener('click', (e) => {
      if (window.innerWidth > BP || !isOpen()) return;
      const insidePanel = e.target.closest && e.target.closest('.nav-links');
      const onToggle    = e.target.closest && e.target.closest('.menu-toggle');
      if (!insidePanel && !onToggle) closeMenu();
    });

    // ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen() && window.innerWidth <= BP) closeMenu();
    });

    // Resize: بدّل الوضع ونضّف
    window.addEventListener('resize', () => {
      // حدّث موضع اللوحة للموبايل
      if (window.innerWidth <= BP) {
        panel.style.top = headerHeightPx() + 'px';
      }
      syncMode();
    });

    // تغيير الهاش
    window.addEventListener('hashchange', () => {
      if (isOpen() && window.innerWidth <= BP) closeMenu();
    });
  });
});
