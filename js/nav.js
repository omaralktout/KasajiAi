// ===== Active nav per page (بناءً على data-page) =====
function setActiveNavLinkByDataPage() {
  const current = (document.body.getAttribute('data-page') || '').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('is-active', (a.dataset.page || '').toLowerCase() === current);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLinkByDataPage();
});
