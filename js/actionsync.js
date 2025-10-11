/* ===== Translations ===== */
const translations = {
  en: {
    "nav-voicepulse":"VoicePulse","nav-insightai":"InsightAI","nav-actionsync":"ActionSync","nav-insights":"Our Insights","nav-about":"About Us","nav-signup":"Sign up",
    "hero-title-actionsync":"ActionSync","hero-description-actionsync":"A real-time execution layer powered by AI to turn insights into immediate actions across the care journey.",
    "content-title":"Five Execution Nodes","content-subtitle":"Use AI-generated suggestions to guide decision-making and strategy adjustments",
    "node-1-title":"Proactive Patient Outreach & Complaint Resolution","node-1-desc":"Preemptive intervention reduces escalation and transforms potential complaints into opportunities for increased trust and satisfaction.","node-1-tag-1":"Alert Automation","node-1-tag-2":"Patient Interaction",
    "node-2-title":"Experience-Driven Care Recommendations","node-2-desc":"Experience insights are instantly translated into operational or clinical decisions that enhance care quality in real time.","node-2-tag-1":"Clinical Intelligence","node-2-tag-2":"Care Optimization",
    "node-3-title":"Virtual Health Assistants","node-3-desc":"Instant multilingual support reduces staff load and accelerates patient response across touchpoints.","node-3-tag-1":"Conversational AI","node-3-tag-2":"Chatbots",
    "node-4-title":"AI-Powered Care Coordination Agents","node-4-desc":"Automated coordination across clinical and administrative teams minimizes delays and prevents decision conflicts.","node-4-tag-1":"Team Coordination","node-4-tag-2":"Workflow Automation",
    "node-5-title":"Agentic AI–Enabled Care Navigator","node-5-desc":"Intelligent guidance directs patients throughout their care journey in real time, reducing confusion and loss of follow-up.","node-5-tag-1":"Journey Mapping","node-5-tag-2":"Autonomous Agents",
    "contact-title":"Ready to Transform Your Business?","contact-subtitle":"Get started today and see the difference our platform can make","contact-info-title":"Contact Information","contact-phone":"Phone","contact-email":"Email","contact-address":"Address",
    "form-name":"Your Name","form-email":"Your Email","form-message":"Your Message","form-submit":"Send Message",
    "footer-description":"Transforming businesses through intelligent customer insights","footer-copyright":"© 2025 Kasaji.AI. All rights reserved."
  },
  ar: {
    "nav-voicepulse":"VoicePulse","nav-insightai":"InsightAI","nav-actionsync":"ActionSync","nav-insights":"رؤانا","nav-about":"من نحن","nav-signup":"سجل",
    "hero-title-actionsync":"ActionSync","hero-description-actionsync":"طبقة تنفيذ فورية مدعومة بالذكاء الاصطناعي لتحويل الرؤى إلى إجراءات مباشرة عبر رحلة الرعاية.",
    "content-title":"خمس عقد تنفيذية","content-subtitle":"استخدم اقتراحات الذكاء الاصطناعي لتوجيه اتخاذ القرار وتعديل الاستراتيجية",
    "node-1-title":"تواصل استباقي مع المرضى وحل الشكاوى","node-1-desc":"يقلل التدخل الاستباقي من التصعيد ويحوّل الشكاوى المحتملة إلى فرص لزيادة الثقة والرضا.","node-1-tag-1":"أتمتة التنبيهات","node-1-tag-2":"تفاعل المرضى",
    "node-2-title":"توصيات رعاية مدفوعة بالتجربة","node-2-desc":"تُترجم رؤى التجربة فورًا إلى قرارات تشغيلية أو سريرية تعزز جودة الرعاية في الوقت الفعلي.","node-2-tag-1":"ذكاء سريري","node-2-tag-2":"تحسين الرعاية",
    "node-3-title":"مساعدو الصحة الافتراضيون","node-3-desc":"دعم متعدد اللغات يقلل من عبء الموظفين ويُسرّع استجابة المرضى عبر نقاط الاتصال.","node-3-tag-1":"محادثة بالذكاء الاصطناعي","node-3-tag-2":"شات بوتس",
    "node-4-title":"وكلاء تنسيق الرعاية المدعومون بالذكاء","node-4-desc":"تنسيق مؤتمت بين الفرق السريرية والإدارية يقلّل التأخير ويمنع تضارب القرارات.","node-4-tag-1":"تنسيق الفرق","node-4-tag-2":"أتمتة سير العمل",
    "node-5-title":"مُلاّح رعاية مُمكَّن بالذكاء العامل","node-5-desc":"توجيه ذكي يُرشد المرضى في رحلتهم في الوقت الفعلي، مما يقلّل الارتباك وفقدان المتابعة.","node-5-tag-1":"رسم الرحلة","node-5-tag-2":"وكلاء مستقلون",
    "contact-title":"هل أنت مستعد لتحويل أعمالك؟","contact-subtitle":"ابدأ اليوم وشاهد الفرق الذي يمكن أن تحدثه منصتنا","contact-info-title":"معلومات الاتصال","contact-phone":"الهاتف","contact-email":"البريد الإلكتروني","contact-address":"العنوان",
    "form-name":"اسمك","form-email":"بريدك الإلكتروني","form-message":"رسالتك","form-submit":"إرسال الرسالة",
    "footer-description":"تحويل الشركات من خلال رؤى العملاء الذكية","footer-copyright":"© 2025 Kasaji.AI. جميع الحقوق محفوظة."
  }
};

/* ===== Language State ===== */
let currentLanguage = localStorage.getItem('language') || 'ar';

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', function () {
  updateLanguage();

  // Loader (اختياري)
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (!loader) return;
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  });

  // Footer animation
  const footerEl = document.querySelector('footer');
  if (footerEl && 'IntersectionObserver' in window) {
    const ioFooter = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) footerEl.classList.add('animate'); });
    }, { threshold: .1 });
    ioFooter.observe(footerEl);
  }

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (!navLinks) return;
      const open = getComputedStyle(navLinks).display !== 'none';
      if (open) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px'; navLinks.style.left = '0'; navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,.1)';
        navLinks.style.zIndex = '1001';
      }
    });
  }

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const nav = document.querySelector('.navbar');
      const navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({ top: t.offsetTop - navH, behavior: 'smooth' });
    });
  });

  // ===== Contact Form (LIVE) =====
  const form = document.getElementById('contactForm');
  if (form) {
    // ثبّت المسار على الجذر
    form.setAttribute('action', '/send.php');
    form.setAttribute('method', 'POST');

    // honeypot لو مش موجود
    if (!form.querySelector('input[name="company"]')) {
      const hp = document.createElement('input');
      hp.type = 'text'; hp.name = 'company';
      hp.style.display = 'none'; hp.tabIndex = -1; hp.autocomplete = 'off';
      form.appendChild(hp);
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = form.querySelector('.submit-btn');
      const original = btn ? btn.textContent : '';

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'ar' ? 'جارٍ الإرسال...' : 'Sending...');
        btn.disabled = true;
      }

      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
        const txt = (await res.text()).trim();

        // backend بيرجع OK / INVALID / ERROR
        if (res.ok && txt === 'OK') {
          form.reset();
          // بدون رسائل واجهة—خليها نظيفة
        } else {
          // لو حابب تتبّع السبب بالكونسول فقط
          console.warn('Send failed:', res.status, txt);
        }
      } catch (err) {
        console.error('Network error:', err);
      } finally {
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
      }
    });
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.boxShadow = (window.scrollY > 10)
      ? '0 4px 12px rgba(0,0,0,.1)'
      : '0 1px 2px rgba(0,0,0,.05)';
  });

  // Timeline reveal
  const items = document.querySelectorAll('.timeline-item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('inview');
          io.unobserve(el);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -50px 0px' });
    items.forEach(it => io.observe(it));
  } else {
    items.forEach(it => it.classList.add('inview'));
  }
});

/* ===== Toggle Language ===== */
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
}
window.toggleLanguage = toggleLanguage;

/* ===== Safe Language Update (لا تمسح الأطفال) ===== */
function updateLanguage() {
  const body = document.body;
  if (currentLanguage === 'ar') { body.setAttribute('dir', 'rtl'); body.setAttribute('lang', 'ar'); }
  else { body.setAttribute('dir', 'ltr'); body.setAttribute('lang', 'en'); }

  // ترجم نص العنصر فقط إذا كان Leaf (ما فيه أطفال)
  // أو استخدم data-translate-target لتحديد عنصر داخلي
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const val = translations[currentLanguage][key];
    if (!val) return;

    const targetSel = el.getAttribute('data-translate-target');
    if (targetSel) {
      const target = el.querySelector(targetSel);
      if (target) target.textContent = val;
      return;
    }

    if (el.children.length === 0) {
      el.textContent = val;
    }
    // لو عنده أولاد وما في target → اتركه بحاله حتى ما نمسح الكارد/الصورة
  });

  // Placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    const val = translations[currentLanguage][key];
    if (val != null) el.placeholder = val;
  });

  // ترجمة خصائص (اختياري): alt/title … باستخدام data-translate-attr و data-translate-key
  document.querySelectorAll('[data-translate-attr]').forEach(el => {
    const attr = el.getAttribute('data-translate-attr'); // alt, title, aria-label ...
    const key  = el.getAttribute('data-translate-key') || el.getAttribute('data-translate');
    const val  = translations[currentLanguage][key];
    if (attr && val != null) el.setAttribute(attr, val);
  });
}
