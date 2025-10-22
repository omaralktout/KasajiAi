

// Language State
let currentLanguage = localStorage.getItem('language') || 'en';

// ---- Language helpers
function updateLanguage(){
  const body = document.body;
  if (currentLanguage === 'ar'){ body.setAttribute('dir','rtl'); body.setAttribute('lang','ar'); }
  else { body.setAttribute('dir','ltr'); body.setAttribute('lang','en'); }

  document.querySelectorAll('[data-translate]').forEach(el=>{
    const key = el.getAttribute('data-translate');
    const v = translations[currentLanguage][key];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-translate-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-translate-placeholder');
    const v = translations[currentLanguage][key];
    if (v != null) el.placeholder = v;
  });
}
function toggleLanguage(){
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
}
window.toggleLanguage = toggleLanguage; // لو عندك زر يستدعيها

// ---- Init after DOM ready
document.addEventListener('DOMContentLoaded', function(){
  updateLanguage();

  // Loader (optional)
  const loader = document.getElementById('loader');
  if (loader){
    window.addEventListener('load', ()=>{
      loader.style.opacity='0';
      setTimeout(()=> loader.style.display='none', 500);
    });
  }

  // Scroll animations
  if ('IntersectionObserver' in window){
    const animateElements = document.querySelectorAll('.section-title, .feature-card, .quote-section, .contact-container, footer');
    const elementObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('animate'); });
    }, { threshold: .1 });
    animateElements.forEach(el=>elementObserver.observe(el));
  }

 

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

  // ===== Contact Form (LIVE to /send.php) =====
  const form = document.getElementById('contactForm');
  if (form){
    // ثبّت المسار المطلق للجذر (عدّل لو موقعك تحت مسار فرعي)
    form.setAttribute('action','/send.php');

    // honeypot لو ناقص
    if (!form.querySelector('input[name="company"]')){
      const hp = document.createElement('input');
      hp.type='text'; hp.name='company'; hp.style.display='none'; hp.tabIndex=-1; hp.autocomplete='off';
      form.appendChild(hp);
    }

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const btn = form.querySelector('.submit-btn');
      const originalText = btn ? btn.textContent : '';

      if (btn){
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'ar' ? 'جارٍ الإرسال...' : 'Sending...');
        btn.disabled = true;
      }

      try{
        const res = await fetch(form.action, { method:'POST', body:new FormData(form) });
        const txt = (await res.text()).trim();
        if (res.ok && txt === 'OK'){
          form.reset(); // بدون رسائل شكر
        } else {
          console.warn('Send failed:', res.status, txt);
        }
      } catch(err){
        console.error('Network error:', err);
      } finally {
        if (btn){ btn.textContent = originalText; btn.disabled = false; }
      }
    });
  }
});