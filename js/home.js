document.addEventListener('DOMContentLoaded', () => {
 
 

  // =========================
  // Element refs
  // =========================
  const html = document.documentElement;
  const langBtn = document.getElementById('lang-switcher');
  const mainHeader = document.getElementById('main-header');
  const backToTopButton = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contactForm');

  

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



