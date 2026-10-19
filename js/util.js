function acak(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
let ctxAudio = null;
function bunyi(jenis){
  try{
    ctxAudio = ctxAudio || new (window.AudioContext||window.webkitAudioContext)();
    const t = ctxAudio.currentTime;
    const nada = jenis==='benar' ? [523,659,784] : jenis==='salah' ? [220,160] : [440];
    nada.forEach((f,i)=>{
      const o=ctxAudio.createOscillator(), g=ctxAudio.createGain();
      o.connect(g); g.connect(ctxAudio.destination); o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(.22, t+i*.12);
      g.gain.exponentialRampToValueAtTime(.001, t+i*.12+.3);
      o.start(t+i*.12); o.stop(t+i*.12+.35);
    });
  }catch(e){}
}
function confetti(){
  const warna=['#ef476f','#ffd166','#06d6a0','#118ab2','#9b5de5','#ff9f1c'];
  for(let i=0;i<40;i++){
    const c=document.createElement('div');
    c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=warna[i%warna.length];
    const s=8+Math.random()*10;
    c.style.width=s+'px'; c.style.height=s*(Math.random()>.5?1:.5)+'px';
    c.style.borderRadius=Math.random()>.5?'50%':'3px';
    c.style.animationDuration=(2+Math.random()*2)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4500);
  }
}
function tampilMenang(judul, teks, tombol){
  document.getElementById('menang-judul').textContent=judul;
  document.getElementById('menang-teks').innerHTML=teks;
  const bar=document.getElementById('menang-tombol');
  bar.innerHTML='';
  tombol.forEach(([label,aksi,kelas])=>{
    const b=document.createElement('button');
    b.className='btn '+(kelas||''); b.textContent=label;
    b.addEventListener('click',aksi);
    bar.appendChild(b);
  });
  document.getElementById('menang').classList.add('tampil');
  confetti(); bunyi('benar');
}
function tutupMenang(){ document.getElementById('menang').classList.remove('tampil'); }

function keLayar(id){
  document.querySelectorAll('.layar').forEach(l=>l.classList.remove('aktif'));
  document.getElementById(id).classList.add('aktif');
  window.scrollTo(0,0);
  if(id==='beranda') refreshBeranda();
}

/* ---------- NAMA & PERINGKAT ---------- */
const MODE_LABEL = {
  peta:'🗺️ Peta', hewan:'🐾 Hewan', buah:'🍎 Buah',
  benda:'🧸 Benda', warna:'🎨 Warna', angka:'🔢 Angka'
};
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function getNama(){ return localStorage.getItem('bsm_nama') || ''; }
function setNama(n){ localStorage.setItem('bsm_nama', n); }
function ambilSkor(){ try{ return JSON.parse(localStorage.getItem('bsm_skor')) || []; }catch(e){ return []; } }
// simpan skor terbaik per (nama, mode); kembalikan peringkat, atau null kalau skor 0
function simpanSkor(mode, skor){
  if(skor<=0) return null;
  const nama = getNama() || 'Pemain';
  const arr = ambilSkor();
  const ada = arr.find(x=>x.nama===nama && x.mode===mode);
  if(ada){ if(skor>ada.skor){ ada.skor=skor; ada.tgl=Date.now(); } }
  else arr.push({nama, mode, skor, tgl:Date.now()});
  arr.sort((a,b)=>b.skor-a.skor);
  try{ localStorage.setItem('bsm_skor', JSON.stringify(arr.slice(0,200))); }catch(e){}
  return arr.filter(x=>x.mode===mode).findIndex(x=>x.nama===nama)+1;
}
function terbaikMode(mode){
  const nama = getNama() || 'Pemain';
  const e = ambilSkor().find(x=>x.nama===nama && x.mode===mode);
  return e ? e.skor : 0;
}
function refreshBeranda(){
  const halo = document.getElementById('halo-nama');
  if(halo) halo.textContent = getNama() || 'Pemain';
  document.querySelectorAll('[data-terbaik]').forEach(s=>{
    const t = terbaikMode(s.dataset.terbaik);
    s.textContent = t>0 ? `🏅 ${t}` : '';
  });
}
function tampilPeringkat(filter){
  const ol = document.getElementById('daftar-peringkat');
  ol.innerHTML='';
  let arr = ambilSkor();
  if(filter!=='semua') arr = arr.filter(x=>x.mode===filter);
  const aku = getNama() || 'Pemain';
  if(!arr.length){ ol.innerHTML='<li class="kosong">Belum ada skor. Yuk main dulu! 🎮</li>'; return; }
  const medali=['🥇','🥈','🥉'];
  arr.slice(0,20).forEach((x,i)=>{
    const li=document.createElement('li');
    if(x.nama===aku) li.classList.add('aku');
    li.innerHTML=`<span class="rk">${medali[i]||'#'+(i+1)}</span>`+
      `<span class="nm">${esc(x.nama)}</span>`+
      `<span class="md">${MODE_LABEL[x.mode]||esc(x.mode)}</span>`+
      `<span class="sk">${x.skor} ⭐</span>`;
    ol.appendChild(li);
  });
}