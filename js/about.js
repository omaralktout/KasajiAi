

// اجعلها متاحة عالميًا إذا بتحب تستخدم window.translations
window.translations = translations;

/* ===== Language State (DEFAULT EN) ===== */
let currentLanguage = localStorage.getItem("language") || "en";

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", function () {
  updateLanguage();

  // Loader
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    if (!loader) return;
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  });

  // Footer animation
  const footerEl = document.querySelector("footer");
  if (footerEl && "IntersectionObserver" in window) {
    const ioFooter = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && footerEl.classList.add("animate")),
      { threshold: 0.1 }
    );
    ioFooter.observe(footerEl);
  }

 

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      const nav = document.querySelector(".navbar");
      const navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({ top: t.offsetTop - navH, behavior: "smooth" });
    });
  });

  // Timeline reveal (استخدمنا الكلاسات الجديدة tl-row)
  const items = document.querySelectorAll(".tl-row");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    items.forEach((it) => io.observe(it));
  } else {
    items.forEach((it) => it.classList.add("inview"));
  }
});

/* ===== Toggle Language ===== */
function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  localStorage.setItem("language", currentLanguage);
  updateLanguage();
}
window.toggleLanguage = toggleLanguage;

/* ===== Safe Language Update (ما بنمسح أولاد العنصر) ===== */
function updateLanguage() {
  const body = document.body;
  if (currentLanguage === "ar") {
    body.setAttribute("dir", "rtl");
    body.setAttribute("lang", "ar");
  } else {
    body.setAttribute("dir", "ltr");
    body.setAttribute("lang", "en");
  }

  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    const val = translations[currentLanguage] && translations[currentLanguage][key];
    if (val == null) return;

    // لو محدد target داخلي (مثلاً span.i18n) نحط النص داخله
    const targetSel = el.getAttribute("data-translate-target");
    if (targetSel) {
      const target = el.querySelector(targetSel);
      if (target) target.textContent = val;
      return;
    }

    // لو العنصر Leaf (ما فيه أولاد) نقدر نستبدل نصه مباشرة
    if (el.children.length === 0) {
      el.textContent = val;
    }
    // غير هيك: لا تغيّر شيء (عشان ما نمسح الـ <br> أو العناصر الداخلية)
  });

  // Placeholders
  document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    const val = translations[currentLanguage] && translations[currentLanguage][key];
    if (val != null) el.placeholder = val;
  });

  // ترجمة خصائص (alt/title/aria-label) اختيارية
  document.querySelectorAll("[data-translate-attr]").forEach((el) => {
    const attr = el.getAttribute("data-translate-attr"); // alt, title, aria-label ...
    const key = el.getAttribute("data-translate-key") || el.getAttribute("data-translate");
    const val = translations[currentLanguage] && translations[currentLanguage][key];
    if (attr && val != null) el.setAttribute(attr, val);
  });
}
// ========== Highlight current nav link ==========
function setActiveNavLink() {
  // احصل على اسم الملف الحالي (actionsync.html / insightai.html ... أو index.html)
  const currentFile = (function () {
    let p = location.pathname.replace(/\/+$/, ""); // شطب / في آخر المسار
    let f = p.split("/").pop();
    return (f && f.length) ? f.toLowerCase() : "index.html";
  })();

  // نورملايز للروابط داخل الناف (يتعامل مع ../ وبدون ملف)
  const normalize = (href) => {
    try {
      const u = new URL(href, location.origin);
      let p = u.pathname.replace(/\/+$/, "");
      let f = p.split("/").pop();
      return (f && f.length) ? f.toLowerCase() : "index.html";
    } catch {
      const f = href.split("/").pop();
      return (f && f.length) ? f.toLowerCase() : "index.html";
    }
  };

  document.querySelectorAll(".nav-links a").forEach((a) => {
    const file = normalize(a.getAttribute("href"));
    // فعّل لو نفس الملف، أو لو إحنا على الرئيسية وروابط الناف راجعة لـ index.html
    if (
      file === currentFile ||
      (currentFile === "index.html" && (file === "" || file === "index.html"))
    ) {
      a.classList.add("is-active");
    } else {
      a.classList.remove("is-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
});
// Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', (e)=>{
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const h = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({ top: target.offsetTop - h, behavior: 'smooth' });
    });
  });

  // Navbar shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', ()=>{
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 10 ? '0px 4px 12px rgba(0,0,0,0.1)' : '0px 1px 2px rgba(0,0,0,0.05)';
  });
  // Contact form (as-is)
  const form = document.getElementById('contactForm');
  if (form){
    form.setAttribute('action','/send.php');
    if (!form.querySelector('input[name="company"]')){
      const hp=document.createElement('input'); hp.type='text'; hp.name='company';
      hp.style.display='none'; hp.tabIndex=-1; hp.autocomplete='off'; form.appendChild(hp);
    }
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const btn = form.querySelector('.submit-btn'); const original = btn?btn.textContent:'';
      if (btn){ btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage==='ar'?'جارٍ الإرسال...':'Sending...'); btn.disabled = true; }
      try{
        const res = await fetch(form.action,{ method:'POST', body:new FormData(form) });
        const txt = (await res.text()).trim();
        if (res.ok && txt === 'OK'){ form.reset(); }
      } catch(err){ console.error(err); }
      finally{ if (btn){ btn.textContent = original; btn.disabled = false; } }
    });
  }
