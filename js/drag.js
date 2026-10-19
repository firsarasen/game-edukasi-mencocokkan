function seret(el, saatLepas){
  el.addEventListener('pointerdown', (e)=>{
    if(el.classList.contains('selesai')) return;
    e.preventDefault();
    const hantu=el.cloneNode(true);
    hantu.classList.add('hantu'); hantu.classList.remove('selesai');
    document.body.appendChild(hantu);
    const r=el.getBoundingClientRect();
    const dx=e.clientX-r.left, dy=e.clientY-r.top;
    const gerak=(ev)=>{
      hantu.style.left=(ev.clientX-dx+r.width/2)+'px';
      hantu.style.top=(ev.clientY-dy+r.height/2)+'px';
    };
    gerak(e);
    const lepas=(ev)=>{
      window.removeEventListener('pointermove',gerak);
      window.removeEventListener('pointerup',lepas);
      hantu.remove();
      saatLepas(ev, el);
    };
    window.addEventListener('pointermove',gerak);
    window.addEventListener('pointerup',lepas);
  });
}