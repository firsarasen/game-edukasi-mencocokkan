# 🎮 Belajar Sambil Main

Game edukasi drag-and-drop warna-warni untuk anak SD. Murni HTML + CSS + JavaScript,
tanpa framework, tanpa install, jalan offline — tinggal buka `index.html` di browser
(HP maupun laptop).

## Cara menjalankan

Buka file `index.html` langsung di browser. Tidak perlu web server.

## Struktur file

```
puzzle-nusantara/
├── index.html            # markup semua layar + daftar script (tanpa logika)
├── css/
│   └── style.css         # seluruh tampilan: beranda, kartu, peta, animasi
├── js/
│   ├── data-provinsi.js  # 38 provinsi: nama, ibukota, bentuk SVG
│   ├── data-cocok.js     # data mode mencocokkan (hewan, buah, benda, warna, angka)
│   ├── util.js           # helper: acak, bunyi, confetti, menang, pindah layar
│   ├── drag.js           # mesin drag-and-drop generik (mouse + sentuh)
│   ├── mode-peta.js      # logika mode Peta 38 Provinsi
│   ├── mode-cocok.js     # logika mode mencocokkan gambar ↔ nama
│   └── app.js            # wiring tombol menu & tombol kembali
├── README.md             # file ini
└── konsep-game-drag-drop.md  # dokumen konsep lengkap
```

Urutan `<script>` di `index.html` penting: data → util → drag → mode → app.

## Cara menambah mode baru

1. Tambah tombol di `.menu-grid` pada `index.html` dengan `data-mode="namamode"`.
2. Kalau mode mencocokkan: tambah entri di `DATA_COCOK` (`js/data-cocok.js`)
   dengan format `{ judul, warna: [...], items: [[emoji, nama], ...] }`,
   lalu daftarkan di `app.js`.
3. Kalau mode baru beda mekanik: buat `js/mode-namamode.js` pakai `seret()`
   dari `drag.js` dan helper dari `util.js`, lalu tambahkan script-nya
   sebelum `app.js`.

## Kredit data

Bentuk peta 38 provinsi: denyherianto/indonesia-geojson-topojson-maps-with-38-provinces,
lisensi CC-BY-4.0.