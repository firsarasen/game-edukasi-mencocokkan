# Belajar Sambil Main — Konsep Lengkap Game Edukasi Drag-and-Drop Anak SD

## 1. Ringkasan Konsep
Kumpulan game drag-and-drop warna-warni untuk anak SD dalam satu aplikasi web.
Ada 6 mode permainan: susun peta 38 provinsi Indonesia, dan 5 mode mencocokkan
gambar dengan nama (hewan, buah-buahan, benda-benda familiar, warna, angka).
Semua mode memakai sistem skor, bunyi feedback, dan perayaan saat menang.

## 2. Target & Tujuan Pembelajaran
- **Target:** siswa SD kelas 1–6 (tiap mode bisa dipilih sesuai jenjang).
- **Tujuan:**
  - Mode peta: anak mengenali posisi 38 provinsi dan hafal ibukotanya.
  - Mode hewan/buah/benda: anak mengenali nama-nama familiar (cocok untuk kelas 1–3, termasuk kosakata Bahasa Inggris kalau labelnya diganti).
  - Mode warna & angka: anak mengenali warna dan angka 1–10.

## 3. Daftar Mode & Gameplay

### 3.1 🗺️ Peta 38 Provinsi
1. Peta Indonesia tampil kosong berisi outline putus-putus tiap provinsi.
2. Di bawah ada nampan berisi 38 kepingan bentuk provinsi asli (warna beda-beda),
   masing-masing berlabel nama, posisinya diacak.
3. Anak menyeret kepingan ke outline yang benar.
4. **Benar:** kepingan menempel dengan warna cerahnya, skor +20, muncul fakta
   "Ibukota X adalah Y".
5. **Salah:** kepingan kembali, skor −5, dan pesan pintar: kalau mendarat di
   provinsi lain, game menyebut namanya ("Itu wilayah Banten, bukan Jawa Barat!").
6. **Petunjuk (−10):** satu outline acak berkedip selama 3 detik.
7. Menang saat 38/38 terpasang → layar perayaan + confetti.

### 3.2 🐾🍎🧸🎨🔢 Mode Mencocokkan (5 mode, satu mesin)
- Tiap ronde: 8 gambar (emoji besar warna-warni) di kolom kiri, 8 kartu nama
  di kolom kanan, keduanya diacak.
- Seret gambar ke kartu nama yang cocok. Benar +20 & terkunci hijau, salah −5.
- Ronde selesai → tombol "Ronde Berikutnya" dengan set baru yang diacak.

## 4. Desain untuk Anak SD
- Semua elemen berwarna cerah; tiap provinsi/warna/kartu punya warna sendiri.
- Target sentuh besar (tombol, kartu, kepingan) — nyaman untuk jari anak.
- Bahasa sederhana, feedback instan tiap aksi (animasi + bunyi, tanpa teks error menakutkan).
- Satu kode drag memakai Pointer Events → jalan di HP (sentuh) maupun laptop (mouse).

## 5. Tech Stack
- **HTML + CSS + JavaScript murni**, tanpa framework, tanpa install, jalan offline.
- Bentuk provinsi dari **data GeoJSON asli 38 provinsi** (bukan gambar asal),
  disederhanakan dan diproyeksikan ke SVG.
- Suara via **WebAudio API** (tanpa file audio eksternal), confetti via CSS/JS.
- Emoji sebagai gambar hewan/buah/benda → otomatis berwarna, tanpa aset gambar.

## 6. Struktur Proyek
```
puzzle-nusantara/
├── index.html            # markup semua layar + daftar script
├── css/
│   └── style.css         # seluruh tampilan
├── js/
│   ├── data-provinsi.js  # 38 provinsi: nama, ibukota, bentuk SVG (33 KB)
│   ├── data-cocok.js     # data hewan, buah, benda, warna, angka
│   ├── util.js           # helper: acak, bunyi, confetti, menang, pindah layar
│   ├── drag.js           # mesin drag-and-drop generik (mouse + sentuh)
│   ├── mode-peta.js      # logika mode Peta 38 Provinsi
│   ├── mode-cocok.js     # logika mode mencocokkan gambar ↔ nama
│   └── app.js            # wiring tombol menu & tombol kembali
├── README.md             # panduan struktur & cara nambah mode
└── konsep-game-drag-drop.md  # dokumen ini
```

## 7. Cara Kerja Teknis (inti)
1. **Data peta:** GeoJSON 38 provinsi → disederhanakan (Douglas-Peucker) →
   proyeksi lon/lat ke viewBox 1000×540 → disimpan sebagai path SVG per provinsi.
2. **Drag generik:** `pointerdown` pada kartu/kepingan → buat "hantu" (klon
   mengikuti jari) → `pointerup` → hit-test:
   - Mode peta: titik lepas dicek ke bounding box target yang benar (diperlebar
     30px agar provinsi kecil seperti DKI Jakarta tetap bisa diklik).
   - Mode cocok: `document.elementFromPoint` untuk menemukan kartu nama di bawah jari.
3. **Skor & ronde:** variabel JS biasa; ronde baru = acak ulang item.

## 8. Roadmap Pengembangan
**Sudah ada (v2):** 6 mode, skor, petunjuk, acak ulang, bunyi, confetti, info ibukota.
**Tahap berikutnya:**
- Level bertingkat di mode peta (pulau besar → 38 provinsi).
- Bintang penilaian & timer per ronde.
- Text-to-speech: nama provinsi/hewan dibacakan browser.
- Mode kosakata Inggris (label diganti English) untuk pelajaran Bahasa Inggris.
- Bungkus jadi aplikasi Android (WebView) untuk HP sekolah.

## 9. Cara Uji Coba ke Anak SD
1. Minta 3–5 anak main tanpa penjelasan, amati bagian yang membingungkan.
2. Catat: waktu sampai paham, jumlah salah pasang, apakah fakta ibukota dibaca.
3. Revisi (biasanya: perbesar area drop, tambah suara) lalu uji ulang.

## 10. Kredit Data
Bentuk peta 38 provinsi: dataset GeoJSON oleh denyherianto
(indonesia-geojson-topojson-maps-with-38-provinces), lisensi CC-BY-4.0.

---
*File `index.html` satu folder dengan dokumen ini bisa langsung dibuka di browser — pilih mode permainannya di beranda.*