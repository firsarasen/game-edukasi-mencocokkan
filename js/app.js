document.querySelectorAll('[data-kembali]').forEach(b=>b.addEventListener('click',()=>{ tutupMenang(); keLayar('beranda'); }));
document.querySelectorAll('.menu-btn').forEach(b=>b.addEventListener('click',()=>{
  const mode=b.dataset.mode;
  if(mode==='peta'){ keLayar('layar-peta'); mulaiPeta(); }
  else { keLayar('layar-cocok'); mulaiCocok(mode); }
}));

// ---------- layar nama ----------
const inputNama = document.getElementById('input-nama');
function mulaiDenganNama(){
  const n = inputNama.value.trim() || 'Pemain';
  setNama(n);
  keLayar('beranda');
}
document.getElementById('btn-mulai').addEventListener('click', mulaiDenganNama);
inputNama.addEventListener('keydown', e=>{ if(e.key==='Enter') mulaiDenganNama(); });
document.getElementById('btn-ganti-nama').addEventListener('click', ()=>{
  inputNama.value = getNama();
  keLayar('layar-nama');
  inputNama.focus();
});

// ---------- peringkat ----------
document.getElementById('btn-peringkat').addEventListener('click', ()=>{
  document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('aktif'));
  document.querySelector('.tab-btn[data-tab="semua"]').classList.add('aktif');
  tampilPeringkat('semua');
  keLayar('layar-peringkat');
});
document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click', ()=>{
  document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('aktif'));
  b.classList.add('aktif');
  tampilPeringkat(b.dataset.tab);
}));

// kalau nama sudah tersimpan, langsung ke beranda
if(getNama()) keLayar('beranda');
else inputNama.focus();
