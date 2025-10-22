
/* ===== Language state (default EN) ===== */
let currentLanguage = localStorage.getItem('language') || 'en';

/* ===== Helpers ===== */
function updateLanguage(){
  const html = document.documentElement;
  const body = document.body;
  html.setAttribute('lang', currentLanguage);
  html.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
  body.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr'); // <-- لضمان توافق CSS

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
window.toggleLanguage = toggleLanguage;

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded',()=>{
  // Language
  updateLanguage();

  // Loader
  const loader = document.getElementById('loader');
  if (loader){ loader.style.opacity='0'; setTimeout(()=>{ loader.style.display='none'; }, 500); }

  // Stagger nicer: titles/descriptions inside .section
  document.querySelectorAll('.section').forEach((sec,i)=>{
    const title = sec.querySelector('.section-title');
    const desc  = sec.querySelector('.section-description');
    if (title) title.style.animationDelay = `${0.15 + i*0.1}s`;
    if (desc)  desc.style.animationDelay  = `${0.25 + i*0.1}s`;
  });

  // Footer reveal
  const animateElements = document.querySelectorAll('.contact-container, footer');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('animate'); }),{threshold:.1});
    animateElements.forEach(el=>io.observe(el));
  } else {
    animateElements.forEach(el=>el.classList.add('animate'));
  }

  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const offset = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
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
});
