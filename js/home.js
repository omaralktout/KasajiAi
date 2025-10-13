document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Translations
  // =========================
  const translations = {
    en: {
      nav_voicepulse:"VoicePulse", nav_insightai:"InsightAI", nav_actionsync:"ActionSync",
      nav_insights:"Our Insights", nav_about:"About Us", nav_signup:"Sign up",

      hero_title:"Because Every Patient Deserves to Be Heard and Understood",
      hero_subtitle:"Improving patient experience is not an option—it's a human responsibility. We listen, monitor, and transform every voice into better care",
      hero_btn_signup:"Sign up", hero_btn_demo:"Watch Demo",

      partners_title:"Trusted <span class='em'>Scientific &amp; Tech</span> Partners",
      partners_subtitle:"World-class expertise and cutting-edge technologies",

      services_title:"Our Core Services",
      service1_label:"Listening Intelligence",
      service1_title:"Voice",
      service1_tagline_secondary:"Live, <span class='highlight-text'>multi-channel</span> listening in action",
      service1_desc:"VoicePulse captures real experiences as they occur — from patients, caregivers, and stakeholders — and turns them into clear, traceable insights.",
      service1_feature1:"Surveys and touchpoint check-ins",
      service1_feature2:"Phone-based interactions and interviews",
      service1_feature3:"Focus groups and co-design sessions",
      service1_feature4:"Social listening and sentiment signals",
      service1_tagline:"Every voice becomes a measurable data point that feeds continuous improvement.",
      service1_link:"Explore VoicePulse",

      service2_label:"Insight Engine",
      service2_title:"Insight",
      service2_tagline_secondary:"Where data turns into <span class='highlight-text'>intelligence</span>",
      service2_desc:"InsightAI transforms raw feedback into deep, actionable understanding — revealing what patients feel, expect, and may experience next.",
      service2_card1_title:"Deeper Experience Decoding",
      service2_card1_desc:"Interpreting hidden sentiment, behavior, and experience signals",
      service2_card2_title:"Predictive Outcome Intelligence",
      service2_card2_desc:"Predictive analytics that forecast trends and outcomes before they surface",
      service2_tagline:"From insight to foresight — InsightAI exposes what traditional tools miss.",
      service2_link:"See InsightAI",

      service3_label:"Intelligent Execution",
      service3_title:"Action",
      service3_tagline_secondary:"Turning insight into <span class='highlight-text'>real-time</span> action",
      service3_desc:"ActionSync enables instant activation of feedback, helping healthcare providers apply changes the moment they're needed — not after the damage happens.",
      service3_card1_title:"Proactive Outreach",
      service3_card1_desc:"Addressing concerns early to prevent escalation",
      service3_card2_title:"Experience-Based Actions",
      service3_card2_desc:"Adjusting services instantly based on feedback",
      service3_card3_title:"Virtual Health Assistants",
      service3_card3_desc:"Automating support through AI conversations",
      service3_card4_title:"AI Care Coordination",
      service3_card4_desc:"Synchronizing teams and workflows intelligently",
      service3_link:"Activate with ActionSync",

      how_title:"Kasaji AI is where innovation meets human insight",
      how_subtitle:"We provider AI-powered Voice of Customer (VoC) tools to transform patient and customer experiences into measurable impact.",
      how_step1_title:"Capture",
      how_step1_desc:"We gather the voice of patients and customers across multiple touchpoints",
      how_step2_title:"Analyze",
      how_step2_desc:"We transform data into insights using advanced AI models",
      how_step3_title:"Act",
      how_step3_desc:"We turn insights into measurable, real-world improvements",

      serve_title:"Whom Do We Serve",
      serve_subtitle:"We partner with healthcare leaders who strive to deliver exceptional care, improve patient journeys, and build trust through insight-driven innovation.",
      serve_card1_title:"Hospitals and Healthcare Systems",
      serve_card2_title:"Healthcare Professionals and Administrators",
      serve_card3_title:"Clinics and Specialized Medical Centers",

      mission_title:"Mission",
      mission_body:"Our mission is to empower healthcare providers and businesses with intelligent tools that capture and analyze real-time feedback. Through our Experience Management and Voice of Customer (VoC) platforms, we enable data-driven decisions that improve satisfaction, loyalty, and operational excellence.",

      why_title:"Why We Stand Out",
      why_subtitle:"Not all providers are the same — here's why our healthcare-focused approach makes the difference",
      why_general_title:"General Providers",
      why_general_desc:"Offer broad services across multiple industries, but without true specialization",
      why_general_detail:"They aim to cover many areas, yet fail to deliver depth where it matters most — in patient care",
      why_general_point1:"No deep healthcare expertise",
      why_general_point2:"Scattered focus across many fields",
      why_general_point3:"Limited after-sales support",
      why_general_point4:"Lack of patient-experience know-how",
      why_kasaji_desc:"Dedicated exclusively to healthcare, combining science, AI, and human expertise to elevate patient experience",
      why_kasaji_detail:"We don't just provide tools — we deliver a complete, patient-centered solution designed for real impact",
      why_kasaji_point1:"Deep patient-experience expertise",
      why_kasaji_point2:"Focused solely on healthcare",
      why_kasaji_point3:"Continuous support & close partnership",
      why_kasaji_point4:"Teams with both academic & practical knowledge",
      why_kasaji_point5:"Evidence-based methodologies grounded in research",
      why_kasaji_point6:"Human-centered approach that blends empathy with innovation",
      why_kasaji_cta:"Get Started",
      why_tech_title:"Tech-Only Vendors",
      why_tech_desc:"Focus mainly on selling technology solutions, without the human and healthcare expertise needed for real impact",
      why_tech_detail:"Technology alone cannot improve patient experience without guidance, empathy, and healthcare expertise",
      why_tech_point1:"Provide tools without real guidance",
      why_tech_point2:"Lack understanding of patient journey",
      why_tech_point3:"No specialized support teams",
      why_tech_point4:"Technology-driven, not patient-centered",

      "contact-title":"Ready to Transform Your Business?",
      "contact-subtitle":"Get started today and see the difference our platform can make",
      "contact-info-title":"Contact Information",
      "contact-phone":"Phone",
      "contact-email":"Email",
      "contact-address":"Address",
      "form-name":"Your Name",
      "form-email":"Your Email",
      "form-message":"Your Message",
      "form-submit":"Send Message",
      "footer-description":"Transforming businesses through intelligent customer insights",
      "footer-copyright":"© 2025 Kasaji.AI. All rights reserved."
    },
   ar: {
  nav_voicepulse:"VoicePulse", nav_insightai:"InsightAI", nav_actionsync:"ActionSync",
  nav_insights:"Our Insights", nav_about:"About Us", nav_signup:"تسجيل دخول",

  hero_title:"لأن كل مريض يستحق أن يُصغى إليه ويُفهم",
  hero_subtitle:"تحسين تجربة المريض ليس رفاهية، بل واجب إنساني. الإصغاء والمراقبة وتحويل الآراء إلى رعاية أفضل هو ما يصنع الفرق",
  hero_btn_signup:"تسجيل دخول", hero_btn_demo:"تعرّف أكثر",

  partners_title:"شركاؤنا في الابتكار <span class='em'>العلمي و التقني</span>",
  partners_subtitle:"خبرات بمستوى عالمي وتقنيات في طليعة الابتكار",

  services_title:"حلولنا الأساسية",
  service1_label:"ذكاء الاستماع",
  service1_title:"Voice",
  service1_tagline_secondary:"استماع لحظي ومتعدد القنوات",
  service1_desc:"تلتقط منصة VoicePulse التجارب الحقيقية فور حدوثها — من المرضى، ومقدّمي الرعاية، وأصحاب المصلحة — ثم تحوّلها إلى رؤى واضحة وقابلة للتتبع.",
  service1_feature1:"استطلاعات الرأي وتقييمات نقاط التواصل",
  service1_feature2:"المكالمات الهاتفية والمقابلات",
  service1_feature3:"مجموعات التركيز وجلسات التصميم المشترك",
  service1_feature4:"الرصد الاجتماعي وتحليل المشاعر",
  service1_tagline:"كل صوت يتحوّل إلى نقطة بيانات قابلة للقياس تغذّي التحسين المستمر.",
  service1_link:"اكتشف قوة VoicePulse",

  service2_label:"محرك الرؤى",
  service2_title:"Insight",
  service2_tagline_secondary:"حيث تتحوّل البيانات إلى ذكاء",
  service2_desc:"يقوم InsightAI بتحويل الملاحظات الخام إلى فهم عميق وقابل للتنفيذ — كاشفًا ما يشعر به المرضى، وما يتوقعونه، وما قد يختبرونه لاحقًا.",
  service2_card1_title:"فهم أعمق للتجربة",
  service2_card1_desc:"تحليل الإشارات الخفية للمشاعر والسلوك والتجربة",
  service2_card2_title:"ذكاء تنبّؤي للنتائج",
  service2_card2_desc:"تحليلات متقدمة تتنبأ بالاتجاهات والنتائج قبل ظهورها",
  service2_tagline:"من الفهم إلى التوقّع — InsightAI يكشف ما لا تراه الأدوات التقليدية",
  service2_link:"اكتشف InsightAI",

  service3_label:"تنفيذ ذكي",
  service3_title:"Action",
  service3_tagline_secondary:"تحويل الرؤى إلى أفعال فورية",
  service3_desc:"يتيح ActionSync تفعيل الملاحظات في نفس اللحظة، لمساعدة مقدّمي الرعاية الصحية على اتخاذ الإجراء المطلوب فورًا — قبل أن تتفاقم المشكلة.",
  service3_card1_title:"تواصل استباقي",
  service3_card1_desc:"معالجة المخاوف مبكرًا لمنع التصعيد",
  service3_card2_title:"إجراءات مبنية على التجربة",
  service3_card2_desc:"تعديل الخدمات مباشرةً بناءً على التعليقات الواردة",
  service3_card3_title:"مساعدو رعاية صحية افتراضيون",
  service3_card3_desc:"دعم مؤتمت عبر محادثات الذكاء الاصطناعي",
  service3_card4_title:"تنسيق رعاية مدعوم بالذكاء الاصطناعي",
  service3_card4_desc:"مزامنة الفرق ومسارات العمل بذكاء",
  service3_link:"ابدأ مع ActionSync",

  how_title:" حيث يلتقي الذكاء الصناعي بذكاء البشر Kasaji AI",
  how_subtitle:"نوفّر أدوات مدعومة بالذكاء الاصطناعي لقياس صوت العميل (VoC)، لتحويل تجارب المرضى والعملاء إلى أثر ملموس وقابل للقياس",
  how_step1_title:"الالتقاط",
  how_step1_desc:"نلتقط صوت المرضى والعملاء من كل نقطة تفاعل",
  how_step2_title:"التحليل",
  how_step2_desc:"نحوّل البيانات إلى قرارات مدعومة بالذكاء الاصطناعي",
  how_step3_title:"التنفيذ",
  how_step3_desc:"نحوّل الرؤى إلى تحسينات ملموسة وقابلة للقياس على أرض الواقع",

  serve_title:"شركاؤنا في رحلة التغيير",
  serve_subtitle:"نقف إلى جانب القادة الذين يؤمنون بأن التجربة الإنسانية لا تقلّ أهمية عن العلاج نفسه — قادة يسعون لتقديم رعاية استثنائية، ورحلة مريض أكثر كرامة ووضوحًا.",
  serve_card1_title:"المستشفيات وأنظمة الرعاية المتكاملة",
  serve_card2_title:"الكوادر الطبية والإدارية",
  serve_card3_title:"العيادات والمراكز الطبية المتخصصة",

  mission_title:"مهمتنا",
  mission_body:"مهمتنا هي تمكين مزوّدي الرعاية الصحية والمؤسسات من امتلاك أدوات ذكية تلتقط آراء المرضى والعملاء في لحظتها، وتحوّلها إلى رؤى قابلة للتنفيذ. من خلال منصّات إدارة التجربة و صوت العميل (VoC) نوفر قدرة حقيقية على اتخاذ قرارات مدعومة بالبيانات — قرارات تصنع فارقًا في الرضا والولاء والكفاءة التشغيلية.",

  why_title:"ما الذي يميزنا؟",
  why_subtitle:"ليست كل الحلول متشابهة — منهجنا المُصمَّم خصيصًا لقطاع الرعاية الصحية هو ما يصنع الفارق الحقيقي.",
  why_general_title:"المزوّدون التقليديون",
  why_general_desc:"يقدمون خدمات واسعة لعدة صناعات، لكن دون تخصص حقيقي في الرعاية الصحية.",
  why_general_detail:"يحاولون تغطية كل شيء، لكن عندما يتعلق الأمر بالمريض… يغيب العمق المطلوب.",
  why_general_point1:"لا يمتلكون خبرة متخصصة في القطاع الصحي",
  why_general_point2:"تركيزهم مشتت بين مجالات عديدة",
  why_general_point3:"دعم ضعيف بعد التعاقد",
  why_general_point4:"فهم محدود لتجربة المريض واحتياجاته الإنسانية",

  why_kasaji_desc:"منصة متخصصة حصريًا في قطاع الرعاية الصحية، تجمع بين العلم والذكاء الاصطناعي والخبرة البشرية للارتقاء بتجربة المريض.",
  why_kasaji_detail:"نحن لا نقدّم أدوات فحسب — بل نوفر حلًا متكاملًا يتمحور حول المريض، ومصمم ليُحدث أثرًا حقيقيًا على أرض الواقع.",
  why_kasaji_point1:"خبرة عميقة في مجال تجربة المريض",
  why_kasaji_point2:"تركيز كامل على الرعاية الصحية فقط",
  why_kasaji_point3:"دعم مستمر وشراكة وثيقة مع العملاء",
  why_kasaji_point4:"فرق تجمع بين المعرفة الأكاديمية والخبرة الميدانية",
  why_kasaji_point5:"منهجيات مبنية على الأدلة والبحث العلمي",
  why_kasaji_point6:"نهج إنساني يمزج بين التعاطف والابتكار",
  why_kasaji_cta:"ابدأ الآن",

  why_tech_title:"الحلول التقنية البحتة",
  why_tech_desc:"يركّزون على بيع التكنولوجيا، لكنهم يفتقرون إلى البعد الإنساني والخبرة الصحية اللازمة لتحقيق أثر حقيقي.",
  why_tech_detail:"فالتقنية وحدها لا تحسّن تجربة المريض ما لم تُدعَم بالتوجيه، والفهم العاطفي، والمعرفة السريرية.",
  why_tech_point1:"يقدمون أدوات دون إرشاد فعلي",
  why_tech_point2:"يفتقرون لفهم رحلة المريض بمراحلها المختلفة",
  why_tech_point3:"لا يملكون فرق دعم متخصصة في الرعاية الصحية",
  why_tech_point4:"حلولهم تحركها التقنية… لا الإنسان",

  "contact-title":"Ready to Transform Your Business?",
  "contact-subtitle":"ابدأ اليوم واكتشف الأثر الحقيقي الذي يمكن لمنصتنا أن تصنعه.",
  "contact-info-title":"معلومات التواصل",
  "contact-phone":"الهاتف",
  "contact-email":"البريد الإلكتروني",
  "contact-address":"العنوان",
  "form-name":"اسمك",
  "form-email":"بريدك الإلكتروني",
  "form-message":"رسالتك",
  "form-submit":"أرسل الرسالة",
  "footer-description":"Transforming businesses through intelligent customer insights",
  "footer-copyright":"© 2025 Kasaji.AI. All rights reserved."
}

  };

  // =========================
  // Element refs
  // =========================
  const html = document.documentElement;
  const langBtn = document.getElementById('lang-switcher');
  const mainHeader = document.getElementById('main-header');
  const backToTopButton = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contactForm');

  // =========================
  // Language Switch
  // =========================
  function t(lang, key) {
    if (!translations[lang]) return null;
    if (translations[lang][key] != null) return translations[lang][key];
    const swapped = key.includes('_') ? key.replaceAll('_', '-') : key.replaceAll('-', '_');
    return translations[lang][swapped] != null ? translations[lang][swapped] : null;
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-translate], [data-translate-key]').forEach(el => {
      const key = el.getAttribute('data-translate') || el.getAttribute('data-translate-key');
      const val = t(lang, key);
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      const val = t(lang, key);
      if (val != null) el.setAttribute('placeholder', val);
    });
  }

  function updateLanguage(lang){
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    applyTranslations(lang);
    if (langBtn) langBtn.setAttribute('title', lang === 'ar' ? 'تغيير اللغة' : 'Change Language');
    localStorage.setItem('selectedLanguage', lang);
  }

  function toggleLang(){
    const current = html.getAttribute('lang') || 'en';
    updateLanguage(current === 'en' ? 'ar' : 'en');
  }

  if (langBtn) langBtn.addEventListener('click', toggleLang);
  // default language is English
  updateLanguage(localStorage.getItem('selectedLanguage') || 'en');

  // =========================
  // Header Scroll + Back to Top
  // =========================
  function handleHeaderScroll() {
    if (!mainHeader) return;
    if (window.scrollY > 60) mainHeader.classList.add('header-scrolled');
    else mainHeader.classList.remove('header-scrolled');
  }

  function handleBackToTop() {
    if (!backToTopButton) return;
    if (window.scrollY > 400) backToTopButton.classList.add('show');
    else backToTopButton.classList.remove('show');
  }

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    handleBackToTop();
  });
  handleHeaderScroll();
  handleBackToTop();

  // =========================
  // Reveal on Scroll Animations
  // =========================
  const revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // =========================
  // Contact Form (LIVE)
  // =========================
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const original = btn ? btn.textContent : '';

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (html.lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...');
        btn.disabled = true;
      }

      try {
        const res = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm) });
        const txt = (await res.text()).trim();
        if (res.ok && txt === 'OK') {
          contactForm.reset();
        } else {
          console.error('Send failed:', txt);
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

  // =========================
  // Footer Animation
  // =========================
  const footerEl = document.querySelector('footer');
  if (footerEl && 'IntersectionObserver' in window) {
    const ioFooter = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) footerEl.classList.add('animate'); });
    }, { threshold: .1 });
    ioFooter.observe(footerEl);
  }
});

window.toggleLang = toggleLang;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('drawer-lang')?.addEventListener('click', () => window.toggleLang && window.toggleLang());
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = mobileMenu?.querySelector('.mobile-menu__backdrop');
  const closeBtns = mobileMenu?.querySelectorAll('[data-close]');
  const links = mobileMenu?.querySelectorAll('a');
  function openMenu(){ if(!mobileMenu) return; mobileMenu.classList.add('open'); document.body.style.overflow='hidden'; hamburger?.setAttribute('aria-expanded','true'); mobileMenu.setAttribute('aria-hidden','false'); }
  function closeMenu(){ if(!mobileMenu) return; mobileMenu.classList.remove('open'); document.body.style.overflow=''; hamburger?.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); }
  function toggleMenu(){ mobileMenu?.classList.contains('open') ? closeMenu() : openMenu(); }
  hamburger?.addEventListener('click', toggleMenu);
  backdrop?.addEventListener('click', closeMenu);
  closeBtns?.forEach(b=>b.addEventListener('click', closeMenu));
  links?.forEach(a=>a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu?.classList.contains('open')) closeMenu(); });
});


