const NS='http://www.w3.org/2000/svg';
const svgPeta=document.getElementById('lapis-target').ownerSVGElement;
const lapisTarget=document.getElementById('lapis-target');
const lapisTerpasang=document.getElementById('lapis-terpasang');
const nampan=document.getElementById('nampan');
let skorPeta=0, terpasangPeta=0, bboxTarget={};

function warnaProv(i){ return `hsl(${(i*137.5)%360},72%,58%)`; }

function mulaiPeta(){
  tutupMenang();
  lapisTarget.innerHTML=''; lapisTerpasang.innerHTML=''; nampan.innerHTML='';
  skorPeta=0; terpasangPeta=0; bboxTarget={};
  document.getElementById('skor-peta').textContent='0';
  document.getElementById('prog-peta').textContent='0/38';
  document.getElementById('pesan-peta').textContent='Seret kepingan provinsi ke tempat yang benar ya! 👆';
  document.getElementById('fakta-peta').style.display='none';

  DATA_PROVINSI.forEach((p,i)=>{
    p._warna=warnaProv(i);
    const t=document.createElementNS(NS,'path');
    t.setAttribute('d',p.d); t.setAttribute('class','target-prov'); t.dataset.id=p.id;
    lapisTarget.appendChild(t);
  });
  // simpan bbox target setelah render
  requestAnimationFrame(()=>{
    lapisTarget.querySelectorAll('path').forEach(t=>{
      const b=t.getBBox();
      bboxTarget[t.dataset.id]={x:b.x-30,y:b.y-30,w:b.width+60,h:b.height+60,nama:DATA_PROVINSI.find(p=>p.id===t.dataset.id).nama};
    });
  });

  acak([...DATA_PROVINSI]).forEach((p)=>{
    const chip=document.createElement('div');
    chip.className='keping-prov'; chip.dataset.id=p.id;
    const mini=document.createElementNS(NS,'svg');
    mini.setAttribute('viewBox','0 0 100 70');
    const mp=document.createElementNS(NS,'path');
    mp.setAttribute('d',p.d); mp.setAttribute('fill',p._warna);
    mp.setAttribute('stroke','#fff'); mp.setAttribute('stroke-width','2');
    // sesuaikan viewBox ke bbox path
    mini.appendChild(mp);
    const nm=document.createElement('div');
    nm.className='nama'; nm.textContent=p.nama;
    chip.appendChild(mini); chip.appendChild(nm);
    nampan.appendChild(chip);
    requestAnimationFrame(()=>{
      try{
        const b=mp.getBBox();
        mini.setAttribute('viewBox',`${b.x-4} ${b.y-4} ${b.width+8} ${b.height+8}`);
      }catch(e){}
    });
    seret(chip,(ev,el)=>lepasProvinsi(ev,el,p));
  });
}

function koordinatPeta(ev){
  const r=svgPeta.getBoundingClientRect();
  return { x:(ev.clientX-r.left)*(1000/r.width), y:(ev.clientY-r.top)*(540/r.height) };
}
function diDalam(pt,b){ return pt.x>b.x && pt.x<b.x+b.w && pt.y>b.y && pt.y<b.y+b.h; }

function lepasProvinsi(ev, el, p){
  if(el.classList.contains('selesai')) return;
  const pt=koordinatPeta(ev);
  const benar=bboxTarget[p.id] && diDalam(pt,bboxTarget[p.id]);
  const pesan=document.getElementById('pesan-peta');
  const fakta=document.getElementById('fakta-peta');
  if(benar){
    const g=document.createElementNS(NS,'path');
    g.setAttribute('d',p.d); g.setAttribute('fill',p._warna); g.setAttribute('class','terpasang-map');
    lapisTerpasang.appendChild(g);
    el.classList.add('selesai');
    skorPeta+=20; terpasangPeta++;
    document.getElementById('skor-peta').textContent=skorPeta;
    document.getElementById('prog-peta').textContent=terpasangPeta+'/38';
    pesan.textContent=`✅ Betul! Ini ${p.nama}.`;
    fakta.textContent=`💡 Ibukota ${p.nama} adalah ${p.ibukota}.`;
    fakta.style.display='block';
    bunyi('benar');
    if(terpasangPeta===DATA_PROVINSI.length){
    const rank = simpanSkor('peta', skorPeta);
    const infoRank = rank ? `<br>🏆 Peringkat <b>#${rank}</b> mode Peta!` : '';
    setTimeout(()=>tampilMenang('🎉 LUAR BIASA! 🎉',
        `Kamu berhasil menyusun <b>38 provinsi</b> Indonesia!<br>Skor akhir: <b>${skorPeta}</b> ⭐${infoRank}`,
        [['🔀 Main Lagi',()=>mulaiPeta(),'hijau'],['🏠 Beranda',()=>{tutupMenang();keLayar('beranda');},'abu']]),700);
    }

  } else {
    // cek apakah mendarat di provinsi lain (buat feedback)
    let lain=null;
    for(const id in bboxTarget){
      if(id!==p.id && diDalam(pt,bboxTarget[id])){ lain=bboxTarget[id].nama; break; }
    }
    el.classList.add('salah'); setTimeout(()=>el.classList.remove('salah'),400);
    skorPeta=Math.max(0,skorPeta-5);
    document.getElementById('skor-peta').textContent=skorPeta;
    pesan.textContent = lain ? `❌ Itu wilayah ${lain}, bukan ${p.nama}. Coba lagi!` : `❌ Belum tepat. Cari lagi wilayah ${p.nama}!`;
    bunyi('salah');
  }
}
document.getElementById('btn-acak-peta').addEventListener('click',mulaiPeta);
document.getElementById('btn-petunjuk-peta').addEventListener('click',()=>{
  const sisa=[...lapisTarget.querySelectorAll('path')].filter(t=>{
    const p=DATA_PROVINSI.find(x=>x.id===t.dataset.id);
    return p && !document.querySelector(`.keping-prov[data-id="${p.id}"].selesai`);
  });
  if(!sisa.length) return;
  const t=sisa[Math.floor(Math.random()*sisa.length)];
  const p=DATA_PROVINSI.find(x=>x.id===t.dataset.id);
  t.classList.add('denyut');
  skorPeta=Math.max(0,skorPeta-10);
  document.getElementById('skor-peta').textContent=skorPeta;
  document.getElementById('pesan-peta').textContent=`💡 Lihat wilayah yang berkedip — itu ${p.nama}!`;
  setTimeout(()=>t.classList.remove('denyut'),3000);
});