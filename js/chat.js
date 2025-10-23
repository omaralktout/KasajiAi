// chat.js — يبدأ مغلق + فتح/إغلاق مضبوط + إرسال للباك
(function () {
  const widget = document.getElementById('chat-widget');
  const bar    = document.getElementById('cw-bar');
  const panel  = document.getElementById('cw-panel');
  const toggle = document.getElementById('cw-toggle'); // زر السهم
  const close  = document.getElementById('cw-close');  // زر ✕

  const form   = document.getElementById('cw-form');
  const input  = document.getElementById('cw-input');
  const send   = document.getElementById('cw-send');
  const log    = document.getElementById('cw-log');

  // تأكيد العناصر
  if (!widget || !bar || !panel || !toggle || !close || !form || !input || !send || !log) {
    console.error('[Chat] عنصر مفقود: تحقق من IDs (chat-widget, cw-bar, cw-panel, cw-toggle, cw-close, cw-form, cw-input, cw-send, cw-log).');
    return;
  }

  // حالة داخلية
  let isOpen = false;

  function updateToggleIcon(){
    if (isOpen) {
      toggle.textContent = '▾';           // مفتوح = "سكر"
      toggle.setAttribute('aria-label','إغلاق');
    } else {
      toggle.textContent = '▴';           // مسكّر = "افتح"
      toggle.setAttribute('aria-label','فتح');
    }
  }

  // طبّق الحالة بصرف النظر عن الوضع الحالي
  function applyState() {
    if (isOpen) {
      widget.classList.add('open');
      panel.hidden = false;
      panel.style.display = 'block';
      bar.setAttribute('aria-expanded', 'true');
    } else {
      widget.classList.remove('open');
      panel.hidden = true;
      panel.style.display = 'none';
      bar.setAttribute('aria-expanded', 'false');
    }
    updateToggleIcon();
  }

  function openPanel()  { isOpen = true;  applyState(); setTimeout(()=>{ try{ input.focus(); }catch(_){} }, 30); }
  function closePanel() { isOpen = false; applyState(); }
  function togglePanel(){ isOpen ? closePanel() : openPanel(); }

  // ✅ ابدأ دائمًا "مسكّر"
  isOpen = false;
  applyState();

  // فتح/إغلاق
  bar.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    togglePanel();
  });
  bar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(); }
  });
  toggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); togglePanel(); });
  close.addEventListener('click',  (e) => { e.preventDefault(); e.stopPropagation(); closePanel(); });

  // ———— إرسال الرسائل للباك ————
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const text = (input.value || '').trim();
    if(!text) return;

    appendMsg('user', text);
    input.value = '';
    input.focus();
    send.disabled = true;

    try{
      const res = await fetch('/send_to_partner.php', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ event:'chat.message', text, session:'default' })
      });

      let data = null;
      try { data = await res.json(); } catch (_) {}

      if(res.ok && data && typeof data.reply === 'string' && data.reply.trim() !== ''){
        appendMsg('bot', data.reply);
      }else if(res.ok && data && data.status === 'sent'){
        // لو الرد الحقيقي بيجي Push عبر webhook لاحقًا
        appendMsg('bot', 'تم الإرسال ✅');
      }else{
        appendMsg('bot', 'خطأ في الخادم أو استجابة غير صالحة.');
      }
    }catch(err){
      appendMsg('bot', 'تعذّر الاتصال بالخادم.');
    }finally{
      send.disabled = false;
    }
  });

  function appendMsg(who, text){
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
})();
