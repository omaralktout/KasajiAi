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
function setActiveNavLink() {
  const currentFile = (function () {
    let path = location.pathname.replace(/\/+$/, '');
    let file = path.split('/').pop();
    return (file && file.length) ? file.toLowerCase() : 'index.html';
  })();

  const currentPage = (document.body.getAttribute('data-page') || '').toLowerCase();
  const currentHash = location.hash || ''; // ← مهم للهوم

  // parser يرجّع الملف + الهاش
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

    // صفحات داخلية (ملف فعلي)
    if (file !== 'index.html') {
      isActive = (file === currentFile);
    } else {
      // الهوم: فعّل فقط إذا الهاش يطابق الحالي
      if (currentFile === 'index.html') {
        // لو الرابط anchor داخل نفس الصفحة
        if (hash && hash.startsWith('#')) {
          isActive = (hash === currentHash);
        } else {
          // رابط الهوم الحقيقي (مثلاً ../index.html) يفعّل فقط لو ما في هاش
          isActive = (!currentHash);
        }
      }
    }

    // خيار إضافي: data-page يطابق body[data-page]
    if (!isActive && currentPage && linkDataPage) {
      isActive = (currentPage === linkDataPage);
    }

    a.classList.toggle('is-active', !!isActive);
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);
// مهمة للهوم عشان يتبدّل التحديد وإنت بتتنقّل بين السكاشنز
window.addEventListener('hashchange', setActiveNavLink);

// ============== Mobile menu (اختياري، إن وُجد) ==============
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const open = getComputedStyle(navLinks).display !== 'none';
    if (open) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.flexDirection = 'column';
      navLinks.style.backgroundColor = 'white';
      navLinks.style.padding = '20px';
      navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,.1)';
      navLinks.style.zIndex = '1001';
    }
  });
});
