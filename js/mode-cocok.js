let modeCocok=null, skorCocok=0, sisaCocok=0;

function mulaiCocok(mode){
  tutupMenang();
  modeCocok=mode; skorCocok=0; sisaCocok=0;
  document.getElementById('judul-cocok').textContent=DATA_COCOK[mode].judul;
  document.getElementById('skor-cocok').textContent='0';
  rondeBaru();
}
function rondeBaru(){
  const cfg=DATA_COCOK[modeCocok];
  const kolomE=document.getElementById('kolom-emoji');
  const kolomN=document.getElementById('kolom-nama');
  kolomE.innerHTML=''; kolomN.innerHTML='';
  const items=acak([...cfg.items]).slice(0,8);
  sisaCocok=items.length;
  document.getElementById('pesan-cocok').textContent='Seret gambar ke nama yang cocok! 👆';
  acak([...items]).forEach(([e,n],idx)=>{
    const k=document.createElement('div');
    k.className='kartu emoji'; k.dataset.nama=n;
    k.style.background=cfg.warna[idx%cfg.warna.length];
    k.innerHTML=`<span class="e">${e}</span>`;
    kolomE.appendChild(k);
    seret(k,(ev,el)=>lepasCocok(ev,el));
  });
  acak([...items]).forEach(([e,n],idx)=>{
    const k=document.createElement('div');
    k.className='kartu nama-kartu'; k.dataset.nama=n;
    k.style.background=cfg.warna[(idx+3)%cfg.warna.length];
    k.textContent=n;
    kolomN.appendChild(k);
  });
}
function lepasCocok(ev, el){
  if(el.classList.contains('selesai')) return;
  const pesan=document.getElementById('pesan-cocok');
  const t=document.elementFromPoint(ev.clientX,ev.clientY);
  const target=t && t.closest ? t.closest('.nama-kartu') : null;
  if(target && !target.classList.contains('selesai') && target.dataset.nama===el.dataset.nama){
    el.classList.add('selesai','benar'); target.classList.add('selesai','benar');
    skorCocok+=20; sisaCocok--;
    document.getElementById('skor-cocok').textContent=skorCocok;
    pesan.textContent=`✅ Betul! Itu ${el.dataset.nama}.`;
    bunyi('benar');
    if(sisaCocok===0){
    const rank = simpanSkor(modeCocok, skorCocok);
    const infoRank = rank ? `<br>🏆 Peringkat <b>#${rank}</b>!` : '';
    setTimeout(()=>tampilMenang('🎉 RONDE SELESAI! 🎉',
        `Kamu hebat! Skor: <b>${skorCocok}</b> ⭐${infoRank}`,
        [['▶️ Ronde Berikutnya',()=>{tutupMenang();rondeBaru();},'hijau'],['🏠 Beranda',()=>{tutupMenang();keLayar('beranda');},'abu']]),600);
    }

  } else {
    el.classList.add('salah'); setTimeout(()=>el.classList.remove('salah'),400);
    skorCocok=Math.max(0,skorCocok-5);
    document.getElementById('skor-cocok').textContent=skorCocok;
    pesan.textContent='❌ Belum cocok, coba lagi yuk!';
    bunyi('salah');
  }
}