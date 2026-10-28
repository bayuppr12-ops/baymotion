# 🏆 Sport 100 — Game Interaktif PJOK BAYMOTION
> Game Kuis Tebak 5 Jawaban Teratas ala Family 100 untuk Pembelajaran PJOK & Olahraga.

---

## 📌 Sekilas Tentang Game
**Sport 100** adalah game interaktif proyektor kelas yang mengadaptasi konsep acara televisi *Family 100*. Setiap babak menghadirkan 1 pertanyaan seputar PJOK / olahraga dengan **5 kotak jawaban tersembunyi**. Kotak paling atas (#1) bernilai poin tertinggi, dan menurun hingga kotak #5.

### Fitur Utama:
- 🎮 **Format Family 100**: 5 kotak jawaban dengan animasi *3D Flip Card*.
- 🎯 **Pencocokan Cerdas & Sinonim**: Tidak sensitif huruf kapital (*case-insensitive*) dan mendukung daftar kata alternatif/sinonim (*aliases*), misalnya "sepakbola" = "sepak bola", "sprint" = "lari cepat".
- ❌ **Sistem 3 Strike**: Jika jawaban salah, muncul strike overlay merah dengan efek suara buzzer khas. Setelah 3 strike, seluruh sisa jawaban yang belum tertebak akan terbuka otomatis.
- ⏱️ **Tanpa Batas Waktu (Bebas Pikir)**: Soal tidak dibatasi waktu hitung mundur secara default sehingga kelompok siswa dapat berdiskusi dengan tenang tanpa rasa terburu-buru (timer opsional dapat dinyalakan kapan saja jika diinginkan).
- 🔊 **Efek Suara Sintetis (Web Audio API)**: Suara ding benar, buzzer strike, flip kartu, dan fanfare kemenangan tanpa memerlukan file audio eksternal.
- 📱 **Desain Sporty & Responsif**: Mengikuti identitas visual BAYMOTION (gelap, aksen oranye menyala & emas, bersih, dan optimal untuk layar proyektor maupun HP).
- ⚙️ **100% Bebas Edit (No-Code)**: Guru dapat menambah, mengubah, dan menghapus soal tanpa menyentuh kode HTML/JS.

---

## 🛠️ Cara Mengedit Soal & Jawaban

Tersedia **2 cara mudah** bagi editor web atau guru:

### CARA 1: Melalui Panel Admin di Website (Paling Mudah)
1. Buka game di browser.
2. Klik tombol **"⚙️ Edit Soal (Admin)"** di pojok kanan atas.
3. Di tab **"Daftar & Edit Soal"**:
   - Anda bisa langsung mengubah judul soal, kategori, dan waktu timer.
   - Mengubah teks 5 jawaban dan poinnya (misal: 100, 80, 60, 40, 20).
   - Menambahkan kata sinonim di kolom *Sinonim* (pisahkan dengan tanda koma).
   - Menambah soal baru dengan tombol **"➕ Tambah Soal Baru"**.
   - Mengatur urutan soal dengan tombol **"⬆️ Naik"** atau **"⬇️ Turun"**.
   - Menghapus soal dengan tombol **"🗑️ Hapus"**.
4. Klik tombol **"💾 Simpan ke Browser"** di bagian bawah. Data langsung aktif seketika di laptop/komputer Anda.
5. Anda juga bisa mengklik **"📥 Unduh sport100-data.json"** untuk menyimpan cadangan file soal ke komputer Anda.

---

### CARA 2: Melalui File `sport100-data.json`
Buka file `sport100-data.json` menggunakan aplikasi teks seperti **Notepad**, **Notepad++**, atau **VS Code**.

Format datanya sangat terstruktur dan mudah dipahami:
```json
{
  "questions": [
    {
      "id": 1,
      "category": "Permainan Bola Besar",
      "question": "Sebutkan cabang olahraga yang menggunakan bola besar!",
      "timerSeconds": 60,
      "answers": [
        {
          "rank": 1,
          "text": "Sepak Bola",
          "points": 100,
          "aliases": ["sepak bola", "sepakbola", "football", "soccer"]
        },
        {
          "rank": 2,
          "text": "Bola Voli",
          "points": 80,
          "aliases": ["voli", "bola voli", "volleyball"]
        },
        {
          "rank": 3,
          "text": "Bola Basket",
          "points": 60,
          "aliases": ["basket", "bola basket", "basketball"]
        },
        {
          "rank": 4,
          "text": "Futsal",
          "points": 40,
          "aliases": ["futsal", "mini soccer"]
        },
        {
          "rank": 5,
          "text": "Bola Tangan",
          "points": 20,
          "aliases": ["bola tangan", "handball"]
        }
      ]
    }
  ]
}
```

#### Tips Pengisian Data:
1. **`rank`**: Nomor urutan 1 sampai 5. Rank 1 adalah jawaban paling atas.
2. **`text`**: Nama jawaban yang akan ditampilkan di papan saat terbuka.
3. **`points`**: Jumlah poin yang diperoleh peserta jika menebak jawaban tersebut.
4. **`aliases`**: Daftar kata alternatif atau sinonim yang dianggap benar jika diketikkan siswa.

---

## 📂 Struktur File
```
sport-100/
├── index.html          # Halaman utama game
├── sport100.css        # Desain visual & animasi 3D flip card
├── sport100.js         # Logika permainan, suara, timer, & admin panel
├── sport100-data.json  # File konfigurasi soal, jawaban, & poin
└── README.md           # Petunjuk penggunaan lengkap
```

---

## 🚀 Cara Menjalankan
Cukup klik ganda (double-click) file `index.html` pada browser apa pun (Google Chrome, Edge, Firefox), atau akses melalui server web localhost BAYMOTION.
