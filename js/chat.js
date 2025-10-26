// chat.js — يبدأ مغلق + إرسال + Polling للردود من الباك
(function () {
  const widget = document.getElementById('chat-widget');
  const bar    = document.getElementById('cw-bar');
  const panel  = document.getElementById('cw-panel');
  const toggle = document.getElementById('cw-toggle'); // زر السهم
  const close  = document.getElementById('cw-close');   // زر ✕

  const form   = document.getElementById('cw-form');
  const input  = document.getElementById('cw-input');
  const send   = document.getElementById('cw-send');
  const log    = document.getElementById('cw-log');

  if (!widget || !bar || !panel || !toggle || !close || !form || !input || !send || !log) {
    console.error('[Chat] عنصر مفقود.'); return;
  }

  // —— جلسة ثابتة لكل زائر —— //
  const SESSION_KEY = 'kasaji_chat_session';
  let session = localStorage.getItem(SESSION_KEY);
  if (!session) {
    session = 's_' + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem(SESSION_KEY, session);
  }

  // آخر طابع زمني وصلناه من الإنبوكس
  let lastTs = '';

  // حالة فتح/إغلاق
  let isOpen = false;
  function updateToggleIcon(){
    if (isOpen) { toggle.textContent = '▾'; toggle.setAttribute('aria-label','إغلاق'); }
    else        { toggle.textContent = '▴'; toggle.setAttribute('aria-label','فتح'); }
  }
  function applyState() {
    if (isOpen) {
      widget.classList.add('open');
      panel.hidden = false;
      panel.style.display = 'block';
      bar.setAttribute('aria-expanded', 'true');
      setTimeout(()=>{ try{ input.focus(); }catch(_){} }, 30);
    } else {
      widget.classList.remove('open');
      panel.hidden = true;
      panel.style.display = 'none';
      bar.setAttribute('aria-expanded', 'false');
    }
    updateToggleIcon();
  }
  function openPanel(){ isOpen = true; applyState(); }
  function closePanel(){ isOpen = false; applyState(); }
  function togglePanel(){ isOpen ? closePanel() : openPanel(); }

  // ابدأ مسكّر
  isOpen = false; applyState();
  bar.addEventListener('click', (e) => { if (e.target.closest('button')) return; togglePanel(); });
  bar.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(); }});
  toggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); togglePanel(); });
  close.addEventListener('click',  (e) => { e.preventDefault(); e.stopPropagation(); closePanel(); });

  // —— إرسال —— //
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const text = (input.value || '').trim();
    if(!text) return;

    appendMsg('user', text);
    input.value = '';
    input.focus();
    send.disabled = true;

    try{
      const res = await fetch('send_to_partner.php', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ event:'chat.message', text, session })
      });

      // الرد الحقيقي عادةً رح يوصل عبر webhook → get_inbox.php
      // لو مزوّدك بيرجع reply فوري، اعرضه كخيار إضافي:
      try {
        const data = await res.json();
        if (res.ok && data && typeof data.reply === 'string' && data.reply.trim()) {
          appendMsg('bot', data.reply);
        }
      } catch (_) {}

    }catch(err){
      appendMsg('bot', 'تعذّر الاتصال بالخادم.');
    }finally{
      send.disabled = false;
    }
  });

  // —— عرض الرسالة في الواجهة —— //
  function appendMsg(who, text, ts){
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    if (ts) lastTs = ts;   // خزّن آخر طابع زمني للـ polling
  }

  // —— Polling للإنبوكس —— //
  let polling = false;
  async function poll(){
    if (polling) return;
    polling = true;
    try{
      const url = new URL('get_inbox.php', window.location.href);
      url.searchParams.set('session', session);
      if (lastTs) url.searchParams.set('since', lastTs);
      const res = await fetch(url.toString(), { cache:'no-store' });
      const data = await res.json();

      if (Array.isArray(data.messages)) {
        for (const m of data.messages) {
          // احرص إن partner_webhook.php يخزّن from='partner' لرسائل البوت
          const who = (m.from && m.from !== 'user') ? 'bot' : 'user';
          if (who === 'bot') {
            appendMsg('bot', m.message || '', m.ts || '');
          }
        }
      }

      // افتح الودجت أول ما يجي رد جديد (اختياري)
      // if (!isOpen && data.messages && data.messages.length) openPanel();
    } catch(e){
      // بصمت
    } finally {
      polling = false;
    }
  }
  setInterval(poll, 1200);
  poll(); // أول مرة
})();
