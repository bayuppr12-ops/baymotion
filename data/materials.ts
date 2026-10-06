import { Material, SubMaterial } from '@/types';

export function isVideoAllowedSubMaterial(sub?: SubMaterial | null): boolean {
  if (!sub) return false;
  if (sub.category) {
    return sub.category === 'teknik' || sub.category === 'lapangan';
  }
  const videoAllowedKeywords = [
    'lapangan', 'passing', 'servis', 'smash', 'block', 'kombinasi',
    'dribbl', 'control', 'heading', 'throw-in', 'shooting', 'goalkeeping',
    'chest-pass', 'overhead-pass', 'layup', 'pivot', 'rebound',
    'sprint', 'start', 'estafet', 'lompat', 'tolak', 'lempar',
    'guling', 'lilin', 'kayang', 'meroda', 'ritmik',
    'daya-tahan', 'kekuatan', 'kelentukan', 'kelincahan',
    'renang', 'meluncur', 'gaya-dada', 'gaya-bebas', 'gaya-punggung', 'gaya-kupu', 'kolam',
    'bulutangkis', 'badminton', 'raket', 'grip', 'pegangan', 'footwork', 'pukulan', 'drop', 'lob', 'netting', 'drive'
  ];
  const idLower = sub.id.toLowerCase();
  return videoAllowedKeywords.some((kw) => idLower.includes(kw));
}

export const materials: Material[] = [
  {
    id: 'bola-voli',
    title: 'Bola Voli',
    description: 'Permainan tim yang seru dan penuh strategi!',
    emoji: '🏐',
    color: '#FF6B35',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian Bola Voli',
        emoji: '📖',
        category: 'teori',
        description:
          'Bola voli adalah olahraga beregu yang dimainkan oleh dua tim, masing-masing 6 orang, yang dipisahkan oleh net. Tujuannya adalah memukul bola agar jatuh di lapangan lawan dan mencegah bola jatuh di lapangan sendiri.',
        keyPoints: [
          '2 tim berhadapan, masing-masing 6 pemain',
          'Bola tidak boleh menyentuh tanah di lapangan sendiri',
          'Maksimal 3 sentuhan sebelum bola menyeberang',
          'Menang jika mencapai 25 poin (dengan selisih 2)',
        ],
        commonMistakes: [
          'Menyentuh bola lebih dari 3 kali dalam satu rally',
          'Bola menyentuh net dan tidak melewatinya',
          'Pemain menyentuh net saat bermain',
        ],
        practice: 'Diskusikan bersama kelompok: Mengapa aturan maksimal 3 sentuhan dan larangan bola menyentuh tanah sangat krusial dalam membentuk kerja sama tim bola voli?',
      },
      {
        id: 'sejarah',
        title: 'Sejarah Singkat',
        emoji: '📜',
        category: 'teori',
        description:
          'Bola voli diciptakan oleh William G. Morgan pada tahun 1895 di Holyoke, Massachusetts, Amerika Serikat. Awalnya disebut "Mintonette". Di Indonesia, bola voli berkembang pesat di bawah naungan PBVSI.',
        keyPoints: [
          'Diciptakan tahun 1895 oleh William G. Morgan',
          'Awalnya bernama "Mintonette"',
          'Masuk Indonesia saat zaman Belanda',
          'FIVB didirikan tahun 1947',
          'Resmi jadi cabang Olimpiade tahun 1964',
        ],
        commonMistakes: [
          'Mengira bola voli diciptakan di Italia',
          'Bingung antara PBVSI (Indonesia) dan FIVB (internasional)',
        ],
        practice: 'Cari tahu bersama kelompok: Kapan PBVSI didirikan di Indonesia dan apa peran induk organisasi internasional FIVB dalam bola voli dunia?',
      },
      {
        id: 'lapangan',
        title: 'Lapangan & Perlengkapan',
        emoji: '🏟️',
        category: 'lapangan',
        description:
          'Lapangan bola voli berukuran 18m × 9m. Net memisahkan lapangan menjadi dua bagian sama besar. Tinggi net berbeda untuk putra (2,43m) dan putri (2,24m).',
        keyPoints: [
          'Ukuran lapangan: 18m × 9m',
          'Tinggi net putra: 2,43 meter',
          'Tinggi net putri: 2,24 meter',
          'Bola: diameter 65-67cm, berat 260-280gr',
          'Zona serang: 3 meter dari net',
        ],
        commonMistakes: [
          'Salah menyebutkan ukuran lapangan',
          'Lupa perbedaan tinggi net putra dan putri',
        ],
        practice: 'Diskusikan bersama kelompok: Mengapa terdapat perbedaan tinggi net untuk putra (2,43m) dan putri (2,24m), serta jelaskan fungsi garis serang 3 meter!',
      },
      {
        id: 'passing-bawah',
        title: 'Passing Bawah',
        emoji: '⬇️',
        category: 'teknik',
        description:
          'Passing bawah adalah teknik dasar menerima bola yang datang dari bawah atau setinggi pinggang. Gunakan pergelangan tangan bagian dalam sebagai bidang pukul.',
        keyPoints: [
          'Kaki dibuka selebar bahu, lutut sedikit ditekuk',
          'Kedua tangan terkait rapat, lengan lurus',
          'Pukul bola dengan pergelangan tangan bagian dalam',
          'Pandangan ke arah datangnya bola',
          'Gerakkan tangan ke atas-depan saat memukul',
        ],
        commonMistakes: [
          'Tangan ditekuk saat memukul',
          'Berat badan di kaki belakang',
          'Memukul dengan telapak tangan',
        ],
        practice: 'Analisis bersama kelompok: Mengapa saat melakukan Passing Bawah kedua lengan harus lurus rapat dan pergelangan tangan wajib dikunci?',
      },
      {
        id: 'passing-atas',
        title: 'Passing Atas',
        emoji: '⬆️',
        category: 'teknik',
        description:
          'Passing atas digunakan untuk mengoper bola setinggi kepala ke atas. Jari-jari membentuk seperti "mangkuk" di atas kepala untuk mengumpan ke smasher.',
        keyPoints: [
          'Jari-jari terbuka membentuk segitiga',
          'Posisi tangan di atas dahi/kepala',
          'Dorong bola dengan jari-jari secara merata',
          'Lutut sedikit ditekuk lalu luruskan saat mendorong',
        ],
        commonMistakes: [
          'Hanya menggunakan ujung jari',
          'Siku terlalu lebar',
          'Mendorong dengan telapak tangan',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan peran utama Passing Atas dalam menyusun umpan bola yang siap dieksekusi oleh smasher!',
      },
      {
        id: 'servis-bawah',
        title: 'Servis Bawah',
        emoji: '🎯',
        category: 'teknik',
        description:
          'Servis bawah adalah teknik servis paling mudah untuk pemula. Bola dipegang tangan kiri, dipukul dengan tangan kanan dari bawah ke depan.',
        keyPoints: [
          'Berdiri di belakang garis servis',
          'Pegang bola di tangan kiri di depan badan',
          'Pukul bola dengan telapak tangan kanan dari bawah',
          'Pandangan ke arah lapangan lawan',
        ],
        commonMistakes: [
          'Melempar bola terlalu tinggi sebelum dipukul',
          'Tidak ada ayunan lengan',
        ],
        practice: 'Analisis bersama kelompok: Sebutkan 3 kunci utama agar pukulan Servis Bawah dapat menyeberangi net dengan stabil dan akurat!',
      },
      {
        id: 'servis-atas',
        title: 'Servis Atas',
        emoji: '💨',
        category: 'teknik',
        description:
          'Servis atas dilakukan dengan melambungkan bola di atas kepala lalu memukulnya dengan telapak tangan terbuka.',
        keyPoints: [
          'Lempar bola 30-60cm di atas kepala',
          'Ayunkan tangan pemukul dari belakang kepala',
          'Pukul bola di titik tertinggi',
        ],
        commonMistakes: [
          'Lemparan bola tidak teratur',
          'Siku terlalu rendah saat memukul',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan perbedaan teknik lambungan dan titik perkenaan bola antara Servis Atas dan Servis Bawah!',
      },
      {
        id: 'smash',
        title: 'Smash',
        emoji: '💥',
        category: 'teknik',
        description:
          'Smash adalah pukulan keras dan menukik tajam ke lapangan lawan yang dilakukan sambil melompat tinggi.',
        keyPoints: [
          'Awalan 2-3 langkah',
          'Tolakan dengan kedua kaki setinggi mungkin',
          'Pukul bola di titik tertinggi dengan lecutan pergelangan tangan',
          'Mendarat dengan lutut mengeper',
        ],
        commonMistakes: [
          'Melompat terlalu dekat dengan net',
          'Mendarat dengan kaki kaku',
        ],
        practice: 'Analisis bersama kelompok: Sebutkan 4 tahapan gerakan Smash (Awalan, Tolakan, Pukulan, Mendarat) dan jelaskan kesalahan yang paling sering terjadi!',
      },
      {
        id: 'block',
        title: 'Block',
        emoji: '🛡️',
        category: 'teknik',
        description:
          'Block adalah benteng pertahanan utama untuk menghalau serangan smash lawan tepat di atas net.',
        keyPoints: [
          'Berdiri dekat net dengan tangan di dada',
          'Melompat bersamaan dengan smasher lawan',
          'Kedua tangan lurus menjangkau di atas net',
        ],
        commonMistakes: [
          'Tangan menyentuh net',
          'Lompatan terlambat atau terlalu cepat',
        ],
        practice: 'Diskusikan bersama kelompok: Mengapa timing lompatan seorang Blocker harus disesuaikan dengan posisi melompat smasher lawan?',
      },
      {
        id: 'kombinasi',
        title: 'Kombinasi Teknik',
        emoji: '🔄',
        category: 'teknik',
        description: 'Menggabungkan passing bawah, passing atas, dan smash dalam satu alur permainan.',
        keyPoints: ['Pass (terima) -> Set (umpan) -> Spike (smash)', 'Komunikasi antar pemain'],
        commonMistakes: ['Berebut bola karena tidak teriak "Mine!"'],
        practice: 'Diskusikan bersama kelompok: Rancang alur strategi kombinasi 3 sentuhan (Passing Bawah -> Passing Atas -> Smash) terbaik untuk tim kalian!',
      },
      {
        id: 'peraturan',
        title: 'Peraturan Permainan',
        emoji: '📋',
        category: 'teori',
        description: 'Aturan dasar bola voli berdasarkan regulasi standar FIVB.',
        keyPoints: ['Maksimal 3 sentuhan per tim', 'Net touch dilarang', 'Rally point sampai 25'],
        commonMistakes: ['Memegang bola/diberhentikan (carrying)'],
        practice: 'Analisis bersama kelompok: Sebutkan 5 jenis pelanggaran net (touch net) dan pelanggaran garis yang sering terjadi dalam pertandingan resmi!',
      },
      {
        id: 'strategi',
        title: 'Strategi Sederhana',
        emoji: '🧠',
        category: 'teori',
        description: 'Menempatan bola di area kosong lawan dan mengatur pembagian posisi.',
        keyPoints: ['Incar area pertahanan lawan yang kosong', 'Saling meng-cover teman'],
        commonMistakes: ['Mengarahkan bola selalu ke pemain bertahan lawan'],
        practice: 'Diskusikan bersama kelompok: Bandingkan kelebihan dan kekurangan strategi pertahanan sistem 3-3 dengan sistem 2-4!',
      },
      {
        id: 'modifikasi',
        title: 'Permainan Modifikasi',
        emoji: '🎮',
        category: 'teori',
        description: 'Bermain bola voli dengan aturan disesuaikan (misal 3v3 atau bola plastik).',
        keyPoints: ['Gunakan bola yang lebih ringan jika perlu', 'Ukuran lapangan disesuaikan'],
        commonMistakes: ['Terlalu kaku mengikuti aturan professional'],
        practice: 'Diskusikan bersama kelompok: Rancang 3 aturan modifikasi bola voli mini 3v3 yang seru untuk dimainkan di ruangan terbatas!',
      },
    ],
  },
  {
    id: 'sepak-bola',
    title: 'Sepak Bola',
    description: 'Olahraga paling populer di dunia!',
    emoji: '⚽',
    color: '#2ECC71',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian & Sejarah Sepak Bola',
        emoji: '📖',
        category: 'teori',
        description:
          'Sepak bola adalah permainan beregu yang dimainkan oleh dua tim, masing-masing 11 pemain. Tujuannya adalah memasukkan bola ke gawang lawan menggunakan kaki, kepala, atau dada (selain tangan).',
        keyPoints: [
          ' Dimainkan oleh 2 tim @ 11 pemain',
          'Waktu pertandingan 2 x 45 menit',
          'Hanya kiper yang boleh menyentuh bola dengan tangan di kotak penalti',
          'Dinaungi oleh FIFA (Dunia) dan PSSI (Indonesia)',
        ],
        commonMistakes: [
          'Menyentuh bola dengan tangan bagi pemain lapangan (Handsball)',
          'Salah memahami aturan offside',
        ],
        practice: 'Diskusikan bersama kelompok: Mengapa hanya kiper yang diperbolehkan memegang bola di kotak penalti dan apa dampak pelanggaran handsball bagi tim?',
      },
      {
        id: 'lapangan',
        title: 'Lapangan & Ukuran Gawang',
        emoji: '🏟️',
        category: 'lapangan',
        description:
          'Lapangan sepak bola berbentuk persegi panjang berumput dengan panjang 90-120m dan lebar 45-90m. Lebar gawang adalah 7,32m dan tinggi 2,44m.',
        keyPoints: [
          'Panjang lapangan: 90 - 120 meter',
          'Lebar lapangan: 45 - 90 meter',
          'Lebar gawang: 7,32 meter, tinggi 2,44 meter',
          'Kotak penalti berjarak 16,5 meter dari gawang',
        ],
        commonMistakes: [
          'Mengira bentuk lapangan adalah persegi sama sisi',
          'Salah mengukur titik penalti (harus 11 meter)',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan fungsi kotak penalti (16,5m) dan titik penalti (11m) dalam aturan pertandingan sepak bola!',
      },
      {
        id: 'passing-dalam',
        title: 'Passing Kaki Bagian Dalam',
        emoji: '⚽',
        category: 'teknik',
        description:
          'Passing dengan kaki bagian dalam adalah teknik operan paling akurat untuk jarak pendek dan menengah. Bidang perkenaan bola yang luas membuat arah operan sangat mudah dikontrol.',
        keyPoints: [
          'Kaki tumpu berada di samping bola, mengarah ke arah target operan',
          'Putar pergelangan kaki pemukul ke arah luar dan kunci rapat',
          'Ayunkan kaki dari belakang ke depan mengenai titik tengah bola',
          'Pandangan fokus ke bola lalu ke arah teman yang dituju',
        ],
        commonMistakes: [
          'Pergelangan kaki kendor/tidak dikunci sehingga bola bergulir lemah',
          'Kaki tumpu diletakkan terlalu jauh dari posisi bola',
          'Badan terlalu kaku saat mengayunkan kaki',
        ],
        practice: 'Analisis bersama kelompok: Mengapa Passing Kaki Bagian Dalam menjadi teknik operan paling akurat untuk umpan pendek?',
      },
      {
        id: 'passing-punggung',
        title: 'Passing Punggung Kaki',
        emoji: '👟',
        category: 'teknik',
        description:
          'Passing dengan punggung kaki (kura-kura kaki) digunakan untuk mengoper bola jarak jauh (long pass) atau melepaskan umpan keras yang datar maupun melambung.',
        keyPoints: [
          'Kaki tumpu diletakkan di samping agak belakang bola',
          'Tekuk pergelangan kaki pemukul ke bawah (ujung jari mengarah ke tanah) dan kunci rapat',
          'Kenakan bola tepat pada bagian punggung kaki (daerah tali sepatu)',
          'Badan sedikit condong ke depan agar bola terarah bertenaga',
        ],
        commonMistakes: [
          'Ujung jari kaki menumbuk tanah karena kaki kurang ditekuk ke bawah',
          'Badan terlalu condong ke belakang sehingga bola melayang liar ke atas',
        ],
        practice: 'Diskusikan bersama kelompok: Kapan saat yang paling tepat menggunakan Passing Punggung Kaki dibandingkan kaki bagian dalam?',
      },
      {
        id: 'passing-luar',
        title: 'Passing Kaki Bagian Luar',
        emoji: '🦶',
        category: 'teknik',
        description:
          'Passing dengan kaki bagian luar digunakan untuk mengoper bola terobosan, mengelabuhi pergerakan lawan, atau memberikan umpan melengkung cepat tanpa harus memutar arah badan.',
        keyPoints: [
          'Kaki tumpu berada sedikit di belakang samping bola',
          'Putar pergelangan kaki pemukul ke arah dalam',
          'Kenakan bola pada sisi luar kaki / sepatu',
          'Ayunkan kaki sedikit melintas di depan kaki tumpu',
        ],
        commonMistakes: [
          'Perkenaan bola salah sehingga arah bola tidak sesuai keinginan',
          'Kehilangan keseimbangan karena mengayunkan kaki terlalu memaksakan',
        ],
        practice: 'Analisis bersama kelompok: Jelaskan keunggulan operan menggunakan Kaki Bagian Luar saat mengelabuhi bek lawan!',
      },
      {
        id: 'control',
        title: 'Menghentikan Bola (Control)',
        emoji: '🛑',
        category: 'teknik',
        description:
          'Control adalah menerima dan menghentikan bola yang datang agar mudah dikuasai. Bisa menggunakan telapak kaki, kaki bagian dalam, dada, atau paha.',
        keyPoints: [
          'Sambut datangnya bola dengan menahan benturan (ditarik sedikit ke belakang)',
          'Gunakan telapak kaki untuk menghentikan bola menyusur tanah',
          'Gunakan dada untuk menahan bola lambung',
        ],
        commonMistakes: [
          'Kaki kaku saat menahan bola sehingga bola memantul jauh',
          'Pandangan terlepas dari arah datangnya bola',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan teknik meredam benturan bola saat menghentikan bola lambung dengan dada vs telapak kaki!',
      },
      {
        id: 'dribbling',
        title: 'Menggiring Bola (Dribbling)',
        emoji: '🏃‍♂️',
        category: 'teknik',
        description:
          'Dribbling adalah membawa bola bergerak ke depan dengan tendangan-tendangan pelan dan terukur menggunakan kaki.',
        keyPoints: [
          'Bola tetap dalam jangkauan dekat kaki (tidak lepas)',
          'Gunakan punggung kaki atau kaki bagian luar',
          'Kepala mendongak sesekali untuk melihat posisi kawan dan lawan',
        ],
        commonMistakes: [
          'Menendang bola terlalu keras sehingga diambil lawan',
          'Hanya menunduk melihat bola terus menerus',
        ],
        practice: 'Analisis bersama kelompok: Sebutkan 3 perbedaan utama teknik menggiring bola untuk kecepatan (sprint dribble) vs perlindungan bola (shielding)!',
      },
      {
        id: 'heading',
        title: 'Menyundul Bola (Heading)',
        emoji: '🗣️',
        category: 'teknik',
        description:
          'Heading adalah memukul bola udara menggunakan dahi. Digunakan untuk mengoper, menghalau bola, atau mencetak gol.',
        keyPoints: [
          'Gunakan DAHI (bukan ubun-ubun atau samping kepala)',
          'Mata tetap terbuka dan memperhatikan bola',
          'Liatkan leher ke belakang lalu dorong ke depan',
        ],
        commonMistakes: [
          'Memejamkan mata saat bola datang',
          'Menyundul dengan ubun-ubun (terasa sakit dan tidak akurat)',
        ],
        practice: 'Diskusikan bersama kelompok: Mengapa menyundul bola wajib menggunakan DAHI dan bagaimana posisi mata saat menyundul bola?',
      },
      {
        id: 'throw-in',
        title: 'Lemparan ke Dalam (Throw-in)',
        emoji: '🤾',
        category: 'teknik',
        description:
          'Lemparan ke dalam dilakukan saat bola keluar melewati garis samping lapangan.',
        keyPoints: [
          'Pegang bola dengan kedua tangan di belakang kepala',
          'Kedua kaki harus tetap menyentuh tanah di luar/di atas garis samping',
          'Lempar bola melewati atas kepala ke arah lapangan',
        ],
        commonMistakes: [
          'Salah satu kaki terangkat saat melempar (Foul throw)',
          'Melempar hanya menggunakan satu tangan',
        ],
        practice: 'Analisis bersama kelompok: Sebutkan 2 aturan penting agar lemparan ke dalam (throw-in) dinyatakan sah oleh wasit!',
      },
      {
        id: 'shooting',
        title: 'Menembak Bola (Shooting)',
        emoji: '🎯',
        category: 'teknik',
        description:
          'Shooting adalah menendang bola dengan keras dan terarah ke gawang lawan untuk mencetak gol.',
        keyPoints: [
          'Gunakan punggung kaki (kura-kura kaki) untuk tembakan keras',
          'Kaki tumpu sejajar di samping bola',
          'Badan sedikit condong ke depan agar bola tidak melambung terlalu tinggi',
        ],
        commonMistakes: [
          'Badan terlalu condong ke belakang sehingga bola melayang jauh di atas gawang',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan posisi badan dan kaki tumpu yang benar agar bola hasil shooting tidak melayang terlalu tinggi di atas gawang!',
      },
      {
        id: 'goalkeeping',
        title: 'Teknik Penjaga Gawang (Kiper)',
        emoji: '🧤',
        category: 'teknik',
        description:
          'Kiper adalah satu-satunya pemain yang boleh menangkap bola dengan tangan di area penalti sendiri.',
        keyPoints: [
          'Posisi siap (tangkap bola dengan jari-jari membentuk huruf W)',
          'Jatuhkan diri (diving) untuk menjangkau bola pojok',
          'Komunikasi aktif mengatur barisan pertahanan',
        ],
        commonMistakes: [
          'Tangan terlalu renggang sehingga bola lolos di antara dua tangan',
        ],
        practice: 'Diskusikan bersama kelompok: Jelaskan teknik tangkapan huruf "W" bagi kiper dan mengapa posisi jari sangat penting untuk keamanan tangan!',
      },
      {
        id: 'peraturan',
        title: 'Peraturan & Offside',
        emoji: '📋',
        category: 'teori',
        description:
          'Memahami aturan pelanggaran, kartu kuning/merah, serta posisi offside.',
        keyPoints: [
          'Offside: Pemain penyerang berada lebih dekat ke garis gawang lawan daripada bola dan pemain bertahan terakhir saat bola dioper kepadanya',
          'Kartu Kuning: Peringatan keras; Kartu Merah: Dikeluarkan dari lapangan',
        ],
        commonMistakes: [
          'Mengira offside berlaku saat menerima lemparan ke dalam (padahal tidak)',
        ],
        practice: 'Analisis bersama kelompok: Jelaskan konsep posisi Offside menggunakan skenario contoh dan tentukan kapan offside tidak berlaku!',
      },
    ],
  },
  {
    id: 'bola-basket',
    title: 'Bola Basket',
    description: 'Olahraga cepat dengan teknik dribble dan shoot!',
    emoji: '🏀',
    color: '#E67E22',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian & Sejarah Basket',
        emoji: '📖',
        category: 'teori',
        description:
          'Bola basket diciptakan oleh Dr. James Naismith pada tahun 1891. Olahraga ini dimainkan oleh 2 tim masing-masing 5 pemain dengan memasukkan bola ke keranjang lawan.',
        keyPoints: [
          '2 tim @ 5 pemain',
          'Waktu: 4 x 10 menit (FIBA) atau 4 x 12 menit (NBA)',
          'Poin: 1 (free throw), 2 (dalam garis 3-poin), 3 (luar garis 3-poin)',
          'Induk organisasi: FIBA (Dunia) dan PERBASI (Indonesia)',
        ],
        commonMistakes: [
          'Berjalan membawa bola tanpa memantulkannya (Traveling)',
          'Memantulkan bola dengan kedua tangan sekaligus (Double dribble)',
        ],
        practice: 'Diskusikan bersama kelompok: Sebutkan 3 perbedaan utama aturan permainan bola basket (perhitungan poin 1, 2, 3) dibandingkan olahraga beregu lainnya!',
      },
      {
        id: 'lapangan',
        title: 'Lapangan & Ring Basket',
        emoji: '🏟️',
        category: 'lapangan',
        description:
          'Lapangan basket berbentuk persegi panjang berukuran 28m × 15m. Tinggi ring basket adalah 3,05 meter dari permukaan lantai.',
        keyPoints: [
          'Ukuran lapangan: 28m × 15m',
          'Tinggi ring: 3,05 meter',
          'Diameter keranjang: 45 cm',
        ],
        commonMistakes: ['Mengira tinggi ring basket sama dengan net voli'],
        practice: 'Diskusikan bersama kelompok: Jelaskan perbedaan tinggi ring basket (3,05m) dengan net voli serta fungsi garis 3-point!',
      },
      {
        id: 'chest-pass',
        title: 'Chest Pass & Bounce Pass',
        emoji: '👐',
        category: 'teknik',
        description:
          'Chest pass adalah operan setinggi dada, sedangkan bounce pass adalah operan memantul ke lantai.',
        keyPoints: [
          'Chest Pass: Dorong bola dari depan dada lurus ke dada teman',
          'Bounce Pass: Pantulkan bola ke lantai 2/3 jarak menuju teman',
          'Ibu jari menghadap ke bawah di akhir dorongan (snap)',
        ],
        commonMistakes: ['Operan bounce pass dipantulkan tepat di tengah-tengah (harusnya 2/3 jarak)'],
        practice: 'Analisis bersama kelompok: Bandingkan efektivitas Chest Pass (operan dada) vs Bounce Pass (operan memantul) saat menghadapi bek lawan yang tinggi!',
      },
      {
        id: 'overhead-pass',
        title: 'Overhead Pass',
        emoji: '🙆‍♂️',
        category: 'teknik',
        description:
          'Operan di atas kepala yang digunakan untuk mengoper melampaui raihan tangan lawan.',
        keyPoints: [
          'Pegang bola di atas kepala dengan kedua tangan',
          'Ayunkan siku dan lecutkan pergelangan tangan ke depan',
        ],
        commonMistakes: ['Membawa bola terlalu jauh ke belakang kepala sehingga bola mudah dicuri dari belakang'],
        practice: 'Diskusikan bersama kelompok: Kapan situasi pertandingan terbaik untuk menggunakan Overhead Pass (operan di atas kepala)?',
      },
      {
        id: 'dribbling',
        title: 'Menggiring Bola (Dribbling)',
        emoji: '⛹️‍♂️',
        category: 'teknik',
        description:
          'Dribbling adalah memantulkan bola ke lantai menggunakan satu tangan secara bergantian atau terus menerus sambil bergerak.',
        keyPoints: [
          'Dorong bola dengan bantalan jari (bukan dipukul dengan telapak)',
          'Pantulan bola setinggi pinggang (dribble sedang) atau lutut (dribble rendah)',
          'Lindungi bola dengan tangan lain dan badan',
        ],
        commonMistakes: [
          'Memukul bola dengan telapak tangan kaku',
          'Memegang bola dengan 2 tangan lalu menggiring lagi (Double)',
        ],
        practice: 'Analisis bersama kelompok: Jelaskan mengapa mendribble bola tidak boleh memukul dengan telapak tangan dan sebutkan aturan seputar Double Dribble!',
      },
      {
        id: 'layup',
        title: 'Lay-up Shoot',
        emoji: '🦘',
        category: 'teknik',
        description:
          'Lay-up adalah tembakan melayang melangkahkan 2 langkah ke arah papan ring sebelum melompat memasukkan bola.',
        keyPoints: [
          'Dribble mendekati ring',
          'Lakukan 2 langkah lebar (Kanan-Kiri untuk tangan kanan)',
          'Melompat dengan kaki kiri dan lepaskan bola dengan tangan kanan mantul papan',
        ],
        commonMistakes: ['Langkah lebih dari 2 kali (Traveling)'],
        practice: 'Diskusikan bersama kelompok: Jelaskan pola langkah 1-2 pada Lay-up Shoot serta penyebab terjadinya pelanggaran Traveling!',
      },
      {
        id: 'shooting',
        title: 'Shooting & Jump Shot',
        emoji: '🎯',
        category: 'teknik',
        description:
          'Shooting adalah menembakkan bola ke dalam keranjang. Ingat rumus BEEF (Balance, Eyes, Elbow, Follow through).',
        keyPoints: [
          'B - Balance: Seimbangkan posisi kaki',
          'E - Eyes: Fokus mata ke ring',
          'E - Elbow: Siku membentuk 90 derajat',
          'F - Follow through: Lecutan pergelangan tangan membentuk "belalai gajah"',
        ],
        commonMistakes: ['Siku mengangkak ke samping melebar'],
        practice: 'Analisis bersama kelompok: Uraikan prinsip BEEF (Balance, Eyes, Elbow, Follow through) dalam melakukan tembakan ke ring basket!',
      },
      {
        id: 'pivot',
        title: 'Pivot (Gerakan Memutar)',
        emoji: '🔄',
        category: 'teknik',
        description:
          'Pivot adalah memutar badan dengan salah satu kaki sebagai poros/tumpuan yang tidak boleh bergeser.',
        keyPoints: [
          'Pilih 1 kaki sebagai kaki pivot (tumpuan)',
          'Kaki tumpu tidak boleh terangkat atau bergeser sebelum bola dioper/ditembakkan',
        ],
        commonMistakes: ['Kaki tumpu bergeser memutar (Traveling)'],
        practice: 'Diskusikan bersama kelompok: Mengapa kaki tumpu pada gerakan Pivot tidak boleh terangkat atau bergeser sebelum bola dioper/ditembakkan?',
      },
      {
        id: 'rebound',
        title: 'Rebound',
        emoji: '💥',
        category: 'teknik',
        description:
          'Rebound adalah menangkap bola pantulan dari tembakan yang gagal masuk ke ring.',
        keyPoints: [
          'Box out: Halangi badan lawan agar tidak mendekati ring',
          'Melompat tinggi dan tangkap bola dengan kedua tangan di titik tertinggi',
        ],
        commonMistakes: ['Lupa melalukan box out sebelum melompat'],
        practice: 'Analisis bersama kelompok: Jelaskan pentingnya gerakan Box-out sebelum melompat mengambil bola Rebound!',
      },
      {
        id: 'peraturan',
        title: 'Peraturan Permainan',
        emoji: '📋',
        category: 'teori',
        description: 'Aturan waktu 24 detik, 8 detik, 3 detik, dan jumlah foul.',
        keyPoints: [
          'Violations: Traveling, Double, 3 seconds in the key',
          'Fouls: Personal foul, 5 kali foul = foul out (dikeluarkan)',
        ],
        commonMistakes: ['Berada lebih dari 3 detik di area bersyarat lawan'],
        practice: 'Diskusikan bersama kelompok: Sebutkan perbedaan antara pelanggaran aturan (Violation) dan pelanggaran perorangan (Personal Foul) serta sanksinya!',
      },
    ],
  },
  {
    id: 'atletik',
    title: 'Atletik',
    description: 'Lari, lempar, dan lompat untuk menjadi yang terbaik!',
    emoji: '🏃',
    color: '#3498DB',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian Atletik',
        emoji: '📖',
        category: 'teori',
        description:
          'Atletik disebut sebagai "Mother of Sports" (induk dari segala cabang olahraga) karena mencakup gerakan dasar manusia: jalan, lari, lompat, dan lempar.',
        keyPoints: [
          'Cabang utama: Jalan, Lari, Lompat, Lempar',
          'Induk Organisasi: WA (World Athletics) & PASI (Indonesia)',
        ],
        commonMistakes: ['Mengira atletik hanya sebatas olahraga lari saja'],
        practice: 'Diskusikan bersama kelompok: Mengapa atletik dijuluki "Mother of Sports" dan sebutkan 4 nomor utama yang diperlombakan!',
      },
      {
        id: 'lapangan',
        title: 'Lapangan & Lintasan Atletik',
        emoji: '🏟️',
        category: 'lapangan',
        imageUrl: '/lintasan-lari.jpg',
        description:
          'Stadion atletik standar memiliki keliling lintasan lari 400 meter dengan 8 lajur, area lompat jauh, serta sektor lempar.',
        keyPoints: [
          'Keliling lintasan lari standar: 400 meter',
          'Jumlah lajur lari: 8 lajur',
          'Lebar tiap lajur lari: 1,22 meter',
          'Arah lari berlawanan jarum jam',
        ],
        commonMistakes: ['Berlari keluar dari garis lajur sendiri pada nomor lari pendek'],
        practice: 'Diskusikan bersama kelompok: Jelaskan spesifikasi keliling lintasan lari standar (400m), jumlah lajur, dan arah berlari yang benar!',
      },
      {
        id: 'sprint',
        title: 'Lari Jarak Pendek (Sprint)',
        emoji: '⚡',
        category: 'teknik',
        description:
          'Lari jarak pendek (100m, 200m, 400m) mengandalkan kecepatan maksimal dari awal hingga garis finish.',
        keyPoints: [
          'Menggunakan start jongkok (Crouch start)',
          'Berlari pada lintasan masing-masing (tidak boleh berpindah lajur)',
          'Badan condong ke depan dengan ayunan tangan yang kuat',
        ],
        commonMistakes: ['Badan terlalu tegak saat baru mulai berlari dari start'],
        practice: 'Analisis bersama kelompok: Mengapa pada lari jarak pendek pelari wajib tetap berada di lajur masing-masing hingga garis finish?',
      },
      {
        id: 'start-jongkok',
        title: 'Teknik Start Jongkok',
        emoji: '🏃‍♂️',
        category: 'teknik',
        description:
          'Teknik awal untuk lari jarak pendek dengan aba-aba: "Bersedia", "Siap", "YA / Bunyi Pistol".',
        keyPoints: [
          'Bersedia: Lutut kaki belakang menempel di tanah, tangan di belakang garis start',
          'Siap: Pinggul diangkat lebih tinggi dari bahu, berat badan pindah ke tangan',
          'YA!: Tolakkan kedua kaki kuat-kuat pada balok start dan melesat ke depan',
        ],
        commonMistakes: ['Pinggul tidak diangkat saat aba-aba "Siap"'],
        practice: 'Diskusikan bersama kelompok: Uraikan posisi tubuh dan tumpuan beban pada aba-aba "Bersedia", "Siap", dan "YA!" pada start jongkok!',
      },
      {
        id: 'estafet',
        title: 'Lari Estafet & Oper Tongkat',
        emoji: '🎽',
        category: 'teknik',
        description:
          'Lari sambung beregu (4x100m atau 4x400m) dengan menyerahkan tongkat estafet dari pelari ke pelari berikutnya.',
        keyPoints: [
          'Cara visual: Pelari penerima melihat ke belakang saat menerima tongkat',
          'Cara non-visual: Pelari penerima TIDAK melihat ke belakang (khusus 4x100m)',
          'Operan dilakukan di daerah pergantian (Wissel zone 20 meter)',
        ],
        commonMistakes: ['Tongkat estafet terjatuh saat serah terima'],
        practice: 'Analisis bersama kelompok: Bandingkan teknik penyerahan tongkat estafet cara Visual vs Non-Visual serta fungsi daerah Wissel Zone!',
      },
      {
        id: 'lompat-jauh',
        title: 'Lompat Jauh',
        emoji: '🦘',
        category: 'teknik',
        description:
          'Lompat jauh bertujuan melompat sejauh-jauhnya dari papan tumpuan ke bak pasir.',
        keyPoints: [
          '4 Tahapan: Awalan (sprint) -> Tumpuan (1 kaki) -> Melayang di udara -> Mendarat (2 kaki)',
          'Gaya lompat jauh: Gaya Jongkok (Ortodoks), Gaya Mengantung (Hang style), Gaya Berjalan di udara',
        ],
        commonMistakes: ['Kaki menumpu melebihi papan tumpuan (Diskualifikasi/Foul)'],
        practice: 'Diskusikan bersama kelompok: Uraikan 4 tahapan lompat jauh (Awalan, Tumpuan, Melayang, Mendarat) dan penyebab diskualifikasi tumpuan!',
      },
      {
        id: 'tolak-peluru',
        title: 'Tolak Peluru',
        emoji: '🪨',
        category: 'teknik',
        description:
          'Menolak (bukan melempar) bola besi berat sejauh mungkin dari dalam lingkaran tolakan.',
        keyPoints: [
          'Peluru diletakkan di pangkal leher di bawah rahang',
          'Gerakan adalah MENOLAK/MENDORONG (bukan melempar seperti bola kasti)',
          'Gaya: Gaya Menyamping (Ortodoks) & Gaya Belakang (O’Brien)',
        ],
        commonMistakes: ['Peluru ditarik ke belakang lalu dilempar (Berbahaya untuk cederai bahu!)'],
        practice: 'Analisis bersama kelompok: Jelaskan perbedaan mendasar antara gerakan MENOLAK dan MELEMPAR peluru serta risiko cederanya!',
      },
      {
        id: 'lempar-lembing',
        title: 'Lempar Lembing',
        emoji: '🗡️',
        category: 'teknik',
        description:
          'Melempar lembing berbentuk tombak sejauh mungkin dengan teknik yang benar.',
        keyPoints: [
          'Pegang lembing di bagian tali pegangan (Gaya Amerika / Finlandia)',
          'Awalan lari berirama dan lempar di atas bahu',
        ],
        commonMistakes: ['Mata lembing tidak mendarat menancap/berbekas duluan'],
        practice: 'Diskusikan bersama kelompok: Sebutkan 2 gaya memegang lembing (Gaya Amerika & Finlandia) dan aturan pendaratan mata lembing!',
      },
      {
        id: 'peraturan',
        title: 'Peraturan Perlombaan Atletik',
        emoji: '📋',
        category: 'teori',
        description:
          'Regulasi resmi perlombaan atletik sesuai standar World Athletics & PASI untuk masing-masing cabang lari sprint, estafet, lompat jauh, tolak peluru, dan lempar lembing.',
        keyPoints: [
          '1. LARI SPRINT: Pelari wajib berlari di lajur masing-masing hingga finish. Pelanggaran 1x False Start (mencuri start) langsung berakibat DISKUALIFIKASI. Pemenang ditentukan saat bagian torso (dada) menyentuh bidang vertikal garis finish.',
          '2. LARI ESTAFET: Tongkat wajib diserahkan di dalam Wissel Zone (zona pergantian 20 meter). Serah terima di luar zona berakibat diskualifikasi tim. Bila tongkat jatuh, pelari yang menjatuhkan wajib memungutnya tanpa mengganggu lajur lain.',
          '3. LOMPAT JAUH: Tumpuan wajib 1 kaki di papan tumpuan tanpa menyentuh garis plastisin/lilin. Jarak diukur dari tepi papan tumpuan ke bekas tubuh terbelakang di bak pasir. Setiap peserta mendapat 3 kesempatan penyisihan + 3 final.',
          '4. TOLAK PELURU: Peluru wajib ditolak (didorong) dari pangkal leher dengan 1 tangan dan jatuh di dalam sektor pendaratan (34,92°). Atlet dilarang menginjak balok depan dan WAJIB keluar dari separuh lingkaran bagian belakang.',
          '5. LEMPAR LEMBING: Lembing dipegang pada lilitan tali dan dilempar melintasi atas bahu tanpa membelakangi sektor. Lemparan SAH apabila ujung mata lembing menancap/meninggalkan bekas pertama di tanah. Atlet dilarang menginjak garis lengkung awalan.',
        ],
        commonMistakes: [
          'Melakukan False Start karena tergesa-gesa melesat sebelum aba-aba tembakan pistol',
          'Menyerahkan tongkat estafet di luar batas garis Wissel Zone 20 meter',
          'Menginjak atau melewati garis lilin plastisin di papan tumpuan lompat jauh',
          'Melempar peluru (seperti kasti) atau keluar lingkaran tolakan dari arah depan',
          'Mata lembing mendarat tidak meninggalkan bekas terlebih dahulu (mendarat ekor/batang duluan)',
        ],
        practice:
          'Analisis Regulasi Kelompok: Diskusikan sanksi diskualifikasi pada Lari Sprint (False Start), batas Wissel Zone pada Estafet, serta aturan pendaratan sah pada Tolak Peluru & Lempar Lembing!',
      },
    ],
  },
  {
    id: 'senam',
    title: 'Senam',
    description: 'Keindahan gerak dan kelenturan tubuh!',
    emoji: '🤸',
    color: '#9B59B6',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian & Jenis Senam',
        emoji: '📖',
        category: 'teori',
        description:
          'Senam adalah gerakan tubuh yang diciptakan secara berencana dan disusun secara sistematis untuk meningkatkan kesegaran jasmani, kelenturan, dan koordinasi.',
        keyPoints: [
          'Senam Lantai (Floor Gymnastics)',
          'Senam Ritmik / Irama (Rhythmic Gymnastics)',
          'Senam Alat (Artistik)',
          'Induk Organisasi: FIG (Dunia) & PERSANI (Indonesia)',
        ],
        commonMistakes: ['Melakukan gerakan senam lantai tanpa matras pelindung'],
        practice: 'Diskusikan bersama kelompok: Sebutkan perbedaan antara Senam Lantai, Senam Ritmik, dan Senam Alat beserta induk organisasinya!',
      },
      {
        id: 'guling-depan',
        title: 'Guling Depan (Forward Roll)',
        emoji: '🌀',
        category: 'teknik',
        description:
          'Berguling ke depan di atas matras dengan urutan: tengkuk, punggung, pinggang, dan panggul bagian belakang.',
        keyPoints: [
          'Jongkok, kedua tangan menempel matras selebar bahu',
          'Dagu ditempelkan erat ke dada (lihat pusar)',
          'Tengkuk (leher belakang) menyentuh matras pertama kali (BUKAN dahi/kepala atas!)',
          'Dorong badan ke depan dan mendarat kembali ke posisi jongkok',
        ],
        commonMistakes: [
          'Tumpuan pada dahi/ujung kepala yang bisa sebabkan cedera leher',
          'Dagu tidak menempel ke dada',
        ],
        practice: 'Analisis bersama kelompok: Mengapa bagian tengkuk (leher belakang) wajib menyentuh matras pertama kali dan dagu ditempelkan ke dada saat Guling Depan?',
      },
      {
        id: 'guling-belakang',
        title: 'Guling Belakang (Backward Roll)',
        emoji: '↩️',
        category: 'teknik',
        description:
          'Berguling ke arah belakang dengan tumpuan telapak tangan di samping telinga.',
        keyPoints: [
          'Jongkok membelakangi matras, dagu menempel dada',
          'Jatuhkan panggul ke belakang, kedua telapak tangan di samping telinga menghadap ke atas',
          'Saat panggul menyentuh matras, tolakkan kedua tangan kuat-kuat',
        ],
        commonMistakes: ['Tangan tidak menolak kuat sehingga kepala terbentur matras'],
        practice: 'Diskusikan bersama kelompok: Jelaskan peran dorongan telapak tangan di samping telinga saat berguling ke belakang!',
      },
      {
        id: 'sikap-lilin',
        title: 'Sikap Lilin',
        emoji: '🕯️',
        category: 'teknik',
        description:
          'Gerakan meluruskan kedua kaki lurus ke atas dengan tumpuan pada punggung atas dan siku tangan.',
        keyPoints: [
          'Tidurlah terlentang di atas matras',
          'Angkat kedua kaki lurus ke atas tegak lurus',
          'Topang pinggang dengan kedua tangan, siku menempel matras',
        ],
        commonMistakes: ['Kaki bengkok dan tidak tegak lurus ke atas'],
        practice: 'Analisis bersama kelompok: Jelaskan fungsi tumpuan siku tangan dan perbaikan posisi agar kaki dapat tegak lurus pada Sikap Lilin!',
      },
      {
        id: 'kayang',
        title: 'Gerakan Kayang',
        emoji: '🌉',
        category: 'teknik',
        description:
          'Sikap melengkungkan badan ke belakang seperti jembatan dengan tumpuan kedua telapak tangan dan kaki.',
        keyPoints: [
          'Bisa dimulai dari posisi tidur terlentang atau berdiri',
          'Tekuk kedua lutut dan letakkan telapak tangan di samping telinga',
          'Angkat perut dan pinggul tinggi-tinggi ke atas',
        ],
        commonMistakes: ['Otot bahu dan pinggang terlalu kaku sehingga tidak bisa terangkat'],
        practice: 'Diskusikan bersama kelompok: Analisis unsur kebugaran (kelenturan & kekuatan) yang paling dibutuhkan untuk melakukan gerakan Kayang secara aman!',
      },
      {
        id: 'meroda',
        title: 'Gerakan Meroda (Cartwheel)',
        emoji: '🤸‍♂️',
        category: 'teknik',
        description:
          'Gerakan memutar tubuh ke samping 360 derajat dengan tumpuan kedua tangan dan kaki bergantian.',
        keyPoints: [
          'Berdiri menyamping, tumpukan tangan satu per satu ke matras',
          'Kedua kaki melayang lurus di udara membentuk huruf V',
        ],
        commonMistakes: ['Kaki bengkok saat melayang di udara'],
        practice: 'Analisis bersama kelompok: Uraikan tumpuan tangan dan kaki secara bergantian saat tubuh memutar 360 derajat pada gerakan Meroda!',
      },
      {
        id: 'senam-ritmik',
        title: 'Senam Ritmik & Musik',
        emoji: '🎵',
        category: 'teknik',
        description:
          'Senam yang diiringi irama musik atau ketukan langkah dengan menyelaraskan gerakan tubuh.',
        keyPoints: [
          'Unsur: Kelentukan, keseimbangan, keluwesan, ketepatan dengan irama',
          'Alat yang digunakan: Pita, Simpai (Hula hoop), Gada, Bola, Tali',
        ],
        commonMistakes: ['Gerakan tidak sesuai dengan irama musik'],
        practice: 'Diskusikan bersama kelompok: Sebutkan 4 unsur utama senam ritmik (kelentukan, keseimbangan, keluwesan, ketepatan irama) dan alat yang digunakan!',
      },
      {
        id: 'keselamatan',
        title: 'Keselamatan dalam Senam',
        emoji: '🛡️',
        category: 'teori',
        description:
          'Prinsip utama keselamatan agar tidak terjadi cedera saat latihan senam lantai.',
        keyPoints: [
          'Selalu gunakan matras yang cukup tebal',
          'Lakukan pemanasan (stretching) yang cukup',
          'Minta bantuan guru/teman untuk menjaga (spotter)',
        ],
        commonMistakes: ['Bercanda saat teman sedang berguling di matras'],
        practice: 'Diskusikan bersama kelompok: Sebutkan 3 tugas penting seorang penjaaga (spotter) untuk menjamin keselamatan teman saat latihan senam lantai!',
      },
    ],
  },
  {
    id: 'kebugaran',
    title: 'Kebugaran Jasmani',
    description: 'Tubuh sehat, pikiran kuat, prestasi optimal!',
    emoji: '💪',
    color: '#E74C3C',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian Kebugaran Jasmani',
        emoji: '📖',
        category: 'teori',
        description:
          'Kebugaran jasmani adalah kemampuan tubuh untuk melakukan aktivitas sehari-hari tanpa mengalami kelelahan yang berlebihan dan masih memiliki cadangan energi.',
        keyPoints: [
          'Manfaat: Memperkuat jantung, melancarkan darah, meningkatkan imunitas',
          '3 Komponen utama: Fisik, Organ Tubuh, dan Otot',
        ],
        commonMistakes: ['Mengira kebugaran sama dengan kurus/gemuk saja'],
        practice: 'Diskusikan bersama kelompok: Jelaskan definisi kebugaran jasmani dan mengapa seseorang yang bugar tidak mudah mengalami kelelahan berlebih!',
      },
      {
        id: 'unsur-unsur',
        title: 'Unsur-Unsur Kebugaran',
        emoji: '🎯',
        category: 'teori',
        description: '10 unsur kebugaran jasmani yang membentuk tubuh prima.',
        keyPoints: [
          'Kekuatan (Strength), Daya Tahan (Endurance), Daya Otot (Power)',
          'Kecepatan (Speed), Kelentukan (Flexibility), Kelincahan (Agility)',
          'Koordinasi, Keseimbangan, Ketepatan, Reaksi',
        ],
        commonMistakes: ['Menganggap semua unsur kebugaran bisa dilatih dengan 1 jenis olahraga saja'],
        practice: 'Analisis bersama kelompok: Sebutkan 10 unsur kebugaran jasmani dan kelompokkan mana yang tergolong faktor fisik vs keterampilan!',
      },
      {
        id: 'daya-tahan',
        title: 'Latihan Daya Tahan (Endurance)',
        emoji: '🫀',
        category: 'teknik',
        description: 'Latihan daya tahan jantung dan paru-paru (Cardiorespiratory).',
        keyPoints: [
          'Lari Fartlek (bervariasi kecepatan)',
          'Joging berdurasi panjang (20-30 menit)',
          'Latihan interval (Interval training)',
        ],
        commonMistakes: ['Lari terlalu cepat di awal sehingga cepat kehabisan napas'],
        practice: 'Diskusikan bersama kelompok: Jelaskan perbedaan latihan lari Fartlek (kecepatan bervariasi) dengan latihan lari durasi konstan!',
      },
      {
        id: 'kekuatan',
        title: 'Latihan Kekuatan Otot',
        emoji: '🏋️‍♂️',
        category: 'teknik',
        description: 'Latihan untuk melatih kekuatan otot lengan, dada, perut, dan kaki.',
        keyPoints: [
          'Push-up: Melatih otot dada, bahu, dan trisel',
          'Sit-up: Melatih otot perut',
          'Back-up: Melatih otot punggung',
          'Squat Jump: Melatih kekuatan otot tungkai/kaki',
        ],
        commonMistakes: ['Posisi punggung melengkung saat push-up'],
        practice: 'Analisis bersama kelompok: Jelaskan kelompok otot utama yang dilatih oleh gerakan Push-up, Sit-up, Back-up, dan Squat Jump!',
      },
      {
        id: 'kelentukan',
        title: 'Latihan Kelentukan (Flexibility)',
        emoji: '🧘‍♂️',
        category: 'teknik',
        description: 'Latihan kelenturan sendi dan peregangan otot agar tidak kaku.',
        keyPoints: [
          'Peregangan Statis: Menahan posisi regang 10-15 detik',
          'Peregangan Dinamis: Menggerak-gerakkan persendian berulang',
          'Mencegah risiko cedera otot (kram/keseleo)',
        ],
        commonMistakes: ['Mendorong/menghentak peregangan secara memaksakan sampai sakit hebat'],
        practice: 'Diskusikan bersama kelompok: Bandingkan peregangan Statis (menahan posisi) vs Peregangan Dinamis dan manfaatnya mencegah kram!',
      },
      {
        id: 'kelincahan',
        title: 'Latihan Kelincahan (Agility)',
        emoji: '⚡',
        category: 'teknik',
        description: 'Kemampuan mengubah arah posisi tubuh dengan cepat dan tepat.',
        keyPoints: [
          'Lari Zig-zag melewati rintangan',
          'Lari bolak-balik (Shuttle run)',
          'Lari angka 8',
        ],
        commonMistakes: ['Badan terlalu tegak saat melakukan gerakan balik arah'],
        practice: 'Analisis bersama kelompok: Mengapa posisi badan sedikit rendah sangat penting saat melakukan perubahan arah cepat pada Shuttle Run!',
      },
      {
        id: 'tkji',
        title: 'Pengukuran Tes TKJI',
        emoji: '📊',
        category: 'teori',
        description: 'Tes Kebugaran Jasmani Indonesia (TKJI) standar untuk mengukur derajat kebugaran jasmani siswa.',
        keyPoints: [
          '5 Item Tes TKJI:',
          '1. Lari 50 meter (kecepatan)',
          '2. Gantung angkat tubuh / Pull-up 60 detik',
          '3. Baring duduk / Sit-up 60 detik',
          '4. Loncat tegak / Vertical jump',
          '5. Lari 800m (putri) / 1000m (putra)',
        ],
        commonMistakes: ['Tidak melakukan pemanasan sebelum tes TKJI'],
        practice: 'Diskusikan bersama kelompok: Sebutkan 5 item tes dalam TKJI (Tes Kebugaran Jasmani Indonesia) beserta komponen kebugaran yang diukur!',
      },
      {
        id: 'gizi',
        title: 'Pola Hidup Sehat & Nutrisi',
        emoji: '🥗',
        category: 'teori',
        description: 'Kebugaran jasmani harus ditunjang oleh istirahat dan nutrisi gizi seimbang.',
        keyPoints: [
          'Makan makanan bergizi seimbang (Karbohidrat, Protein, Lemak baik, Vitamin)',
          'Minum air putih minimal 8 gelas (2 liter) sehari',
          'Tidur cukup 8 jam setiap malam',
          'Hindari merokok dan makanan junk food berlebihan',
        ],
        commonMistakes: ['Minum es manis bersoda setelah berolahraga berat'],
        practice: 'Diskusikan bersama kelompok: Susunlah contoh menu gizi seimbang harian bagi siswa yang aktif berolahraga dan jelaskan pentingnya tidur cukup!',
      },
    ],
  },
  {
    id: 'renang',
    title: 'Renang (Aktivitas Air)',
    description: 'Keterampilan bergerak di air, teknik 4 gaya renang, dan keselamatan diri!',
    emoji: '🏊',
    color: '#0EA5E9',
    isPriority: false,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian & Manfaat Renang',
        emoji: '📖',
        category: 'teori',
        description:
          'Renang adalah aktivitas menggerakkan, mengapungkan, atau mengangkat seluruh bagian tubuh ke atas permukaan air dengan menggunakan kekuatan tangan dan kaki. Renang melatih hampir seluruh kelompok otot tubuh, memperkuat sistem kardiorespirasi (jantung dan paru-paru), serta melatih ketahanan mental.',
        keyPoints: [
          'Melatih seluruh otot tubuh (Full-body workout) dengan risiko cedera sendi minimal (low impact)',
          'Meningkatkan kapasitas vital paru-paru dan daya tahan kardiovaskular',
          'Induk Organisasi Dunia: World Aquatics (sebelumnya FINA didirikan tahun 1908)',
          'Induk Organisasi Indonesia: Akuatik Indonesia (sebelumnya PRSI didirikan tahun 1951)',
          '4 Gaya resmi kompetisi: Gaya Dada, Gaya Bebas, Gaya Punggung, dan Gaya Kupu-kupu',
        ],
        commonMistakes: [
          'Masuk ke air tanpa melakukan pemanasan (stretching) yang memicu kram otot',
          'Panik saat masuk ke air yang lebih dalam dari tinggi badan',
          'Mengira renang hanya melatih otot lengan saja',
        ],
        practice:
          'Diskusikan bersama kelompok: Jelaskan mengapa olahraga renang disebut olahraga low-impact yang sangat baik untuk melatih jantung dan paru-paru, serta sebutkan induk organisasi renang nasional dan internasional!',
      },
      {
        id: 'pengenalan-air',
        title: 'Pengenalan Air & Pernapasan',
        emoji: '🫧',
        category: 'teknik',
        description:
          'Adaptasi tubuh dengan lingkungan air merupakan pondasi utama. Kunci pernapasan renang adalah menghirup udara melalui mulut di atas permukaan air dan membuang udara (mengembuskan gelembung/bubbles) perlahan melalui hidung atau mulut saat wajah berada di dalam air.',
        keyPoints: [
          'Basahi tubuh terlebih dahulu di tepi kolam sebelum masuk ke dalam air',
          'Latihan pernapasan ritmis: Ambil napas dalam lewat MULUT saat kepala naik di atas air',
          'Tenggelamkan wajah ke dalam air dan buang napas perlahan lewat hidung/mulut (meniup gelembung)',
          'Jangan pernah menghirup udara lewat hidung saat di dalam air untuk menghindari tersedak',
          'Lakukan pengulangan 15–20 kali hingga terbiasa dengan ritme pernapasan air',
        ],
        commonMistakes: [
          'Menghirup udara menggunakan hidung sehingga air masuk ke saluran pernapasan dan tersedak',
          'Menahan napas terlalu lama saat kepala di dalam air sehingga tubuh tegang dan cepat lelah',
          'Mata tertutup rapat karena takut terkena air alih-alih memakai kacamata renang',
        ],
        practice:
          'Analisis bersama kelompok: Mengapa saat mengambil napas dalam renang wajib menggunakan mulut dan saat membuang napas di dalam air harus melalui hidung/mulut secara rileks?',
      },
      {
        id: 'meluncur',
        title: 'Teknik Dasar Meluncur (Streamlining)',
        emoji: '🚀',
        category: 'teknik',
        description:
          'Meluncur adalah posisi tubuh bergerak lurus menembus air tanpa kayuhan, memanfaatkan gaya dorong tolakan kaki dari dinding kolam. Posisi tubuh harus hidrodinamis (streamline) mendatar sejajar dengan permukaan air untuk memperkecil hambatan air.',
        keyPoints: [
          'Berdiri menempel dinding kolam dengan satu kaki menumpu di lantai dan satu telapak kaki menempel kuat di dinding',
          'Kedua lengan lurus ke depan merapat di samping telinga, kedua ibu jari saling mengunci',
          'Bungkukkan badan ke depan hingga telungkup rata dengan air, wajah menghadap ke dasar kolam',
          'Tolak dinding kolam dengan kuat menggunakan kaki, lalu luncurkan tubuh sejauh mungkin ke depan',
          'Pertahankan posisi tubuh lurus horizontal (streamline) seperti anak panah',
        ],
        commonMistakes: [
          'Kepala mendongak ke atas melihat ke depan yang menyebabkan pinggul dan kaki tenggelam',
          'Kedua tangan terbuka lebar sehingga menimbulkan hambatan air yang besar',
          'Tolakan kaki dari dinding kolam terlalu lemah sehingga jarak luncur pendek',
        ],
        practice:
          'Diskusikan bersama kelompok: Uraikan tahapan sikap tubuh streamline saat meluncur dan faktor apa saja yang menyebabkan luncuran seseorang bisa cepat dan jauh!',
      },
      {
        id: 'gaya-dada',
        title: 'Renang Gaya Dada (Gaya Katak)',
        emoji: '🐸',
        category: 'teknik',
        description:
          'Renang gaya dada (breaststroke) atau gaya katak adalah gaya renang paling populer dan santai. Posisi tubuh stabil telungkup, dengan gerakan tendangan kaki melingkar ke samping (whip kick) dan tarikan tangan di bawah dada yang terkoordinasi berirama.',
        keyPoints: [
          'Posisi tubuh telungkup mendatar (horizontal) sejajar permukaan air',
          'Gerakan kaki: Tekuk kedua lutut mendekat ke panggul, buka dan tendang melingkar ke samping (whip kick), lalu rapatkan kedua kaki kembali secara lecutan kuat',
          'Gerakan tangan: Kedua lengan membuka ke samping selebar bahu, menarik air ke arah bawah dada (pull), lalu luruskan kembali ke depan',
          'Pernapasan: Angkat kepala dan leher ke atas permukaan air saat tangan menarik air ke dada untuk mengambil napas lewat mulut',
          'Urutan koordinasi: Tarik tangan & ambil napas -> Tendang kaki -> Meluncur rileks (Pull, Breathe, Kick, Glide)',
        ],
        commonMistakes: [
          'Arah tendangan kaki ke bawah bukannya melingkar ke samping dan merapat ke belakang',
          'Mengangkat kepala terlalu tinggi hingga badan tegak dan pinggul tenggelam',
          'Gerakan tangan dan kaki dilakukan bersamaan tanpa ada fase meluncur',
        ],
        practice:
          'Analisis bersama kelompok: Jelaskan urutan irama Pull - Breathe - Kick - Glide pada renang gaya dada dan mengapa fase meluncur sangat menghemat tenaga perenang!',
      },
      {
        id: 'gaya-bebas',
        title: 'Renang Gaya Bebas (Front Crawl)',
        emoji: '🏊‍♂️',
        category: 'teknik',
        description:
          'Renang gaya bebas (crawl) adalah gaya renang tercepat dan paling efisien. Dilakukan dengan posisi tubuh telungkup datar di air, ayunan lengan memutar mirip kincir secara bergantian, dan pukulan kaki naik-turun yang kontinu dari pangkal paha.',
        keyPoints: [
          'Posisi tubuh streamline sejajar permukaan air (hydrodynamic body position)',
          'Gerakan kaki: Mengayun naik-turun bergantian secara rileks dan kontinu (flutter kick) dengan sumber gerakan dari PANGKAL PAHA, bukan menekuk lutut',
          'Gerakan tangan: Mengayuh bergantian dengan 5 fase utama (Entry, Catch, Pull, Push, dan Recovery)',
          'Teknik pernapasan: Menolehkan kepala ke samping (kiri atau kanan) saat lengan satu sisi melakukan recovery di atas air',
          'Saat bernapas, satu telinga tetap menempel di permukaan air (one goggle in, one goggle out)',
        ],
        commonMistakes: [
          'Menendang air dengan menekuk lutut seperti mengayuh sepeda (menyebabkan hambatan besar)',
          'Mengangkat seluruh kepala lurus ke depan saat bernapas sehingga kaki langsung tenggelam',
          'Gerakan tangan menyilang garis tengah tubuh saat masuk ke dalam air (crossing over)',
        ],
        practice:
          'Diskusikan bersama kelompok: Mengapa gerakan tendangan kaki gaya bebas harus bersumber dari pangkal paha dan bukan lutut? Serta bagaimana posisi kepala yang tepat saat mengambil napas ke samping?',
      },
      {
        id: 'gaya-punggung',
        title: 'Renang Gaya Punggung (Backstroke)',
        emoji: '🌅',
        category: 'teknik',
        description:
          'Renang gaya punggung adalah satu-satunya gaya renang resmi yang dilakukan dalam posisi tubuh telentang menghadap ke atas. Karena wajah selalu berada di atas permukaan air, perenang dapat bernapas lebih leluasa, namun tidak dapat melihat dinding finish di depan secara langsung.',
        keyPoints: [
          'Posisi tubuh telentang lurus mendatar di permukaan air, telinga terendam sejajar permukaan',
          'Gerakan kaki: Mengayun naik-turun bergantian mirip gaya bebas namun dari posisi telentang (tendangan ke atas mendorong air)',
          'Gerakan tangan: Mengayun memutar ke belakang bergantian secara kontinu (ibu jari keluar air duluan, kelingking masuk air duluan)',
          'Start dilakukan dari DALAM AIR dengan berpegangan pada pegangan balok start menghadap dinding kolam',
          'Gunakan hitungan kayuhan atau bendera pemandu (backstroke flags) 5 meter sebelum dinding untuk antisipasi pembalikan/finish',
        ],
        commonMistakes: [
          'Menekuk leher dan mendekatkan dagu ke dada yang menyebabkan pinggul merosot ke bawah dan tenggelam',
          'Gerakan kayuhan tangan terlalu bengkok dan tidak memutar penuh',
          'Pinggul dan perut turun terlalu dalam di bawah air',
        ],
        practice:
          'Analisis bersama kelompok: Jelaskan keunikan posisi tubuh dan start gaya punggung dibanding 3 gaya lainnya, serta fungsi bendera 5 meter di atas kolam bagi perenang gaya punggung!',
      },
      {
        id: 'gaya-kupu',
        title: 'Renang Gaya Kupu-Kupu (Butterfly)',
        emoji: '🦋',
        category: 'teknik',
        description:
          'Renang gaya kupu-kupu (butterfly stroke) atau gaya lumba-lumba adalah gaya yang membutuhkan koordinasi dan tenaga terbesar. Kedua lengan mengayun bersamaan ke depan di atas permukaan air, dipadukan dengan gerakan gelombang tubuh dan cambukan kaki lumba-lumba (dolphin kick).',
        keyPoints: [
          'Gerakan kaki: Tendangan lumba-lumba (dolphin kick), kedua kaki rapat bergerak naik-turun bersamaan seperti ekor ikan',
          'Dalam 1 siklus kayuhan tangan terdapat 2 kali tendangan kaki (kick saat tangan masuk air & kick saat dorongan tangan selesai)',
          'Gerakan tangan: Kedua lengan ditarik bersamaan di bawah air lalu diayunkan melayang serentak ke depan di atas permukaan air',
          'Pernapasan: Kepala terangkat naik ke depan saat tangan menyelesaikan dorongan (push phase)',
          'Gerakan tubuh mengombinasikan gelombang ritmis (undulasi) dari dada hingga ujung kaki',
        ],
        commonMistakes: [
          'Kaki tidak rapat atau bergerak bergantian (harus simetris dan serentak)',
          'Lengan tidak mampu keluar dari air saat recovery karena kurangnya dorongan dan kekuatan bahu',
          'Bernapas terlalu lambat sehingga kepala terlambat kembali ke air',
        ],
        practice:
          'Diskusikan bersama kelompok: Jelaskan ritme 2 kali dolphin kick dalam 1 kali putaran tangan gaya kupu-kupu dan mengapa kelenturan bahu serta pinggang sangat menentukan efisiensi gaya ini!',
      },
      {
        id: 'kolam',
        title: 'Standar Kolam & Fasilitas Renang',
        emoji: '🏟️',
        category: 'lapangan',
        description:
          'Perlengkapan, ukuran kolam renang berstandar World Aquatics / Akuatik Indonesia, serta sarana penunjang latihan untuk menunjang keamanan dan kompetisi resmi.',
        keyPoints: [
          'Panjang kolam standar Olimpiade: 50 meter (Long Course) atau 25 meter (Short Course)',
          'Lebar kolam: 21 meter atau 25 meter dengan 8 hingga 10 lintasan (lane)',
          'Lebar tiap lintasan: 2,5 meter yang dibatasi oleh tali lintasan (lane ropes) pemecah gelombang',
          'Kedalaman air standar perlombaan: minimal 2,0 meter (1,35 meter s.d 2,0 meter untuk kolam latihan)',
          'Suhu air standar kompetisi: 25°C hingga 28°C',
          'Peralatan wajib atlet: Pakaian renang standar, kacamata renang (goggles), penutup kepala (swim cap)',
          'Alat bantu latihan: Papan pelampung (kickboard), pelampung paha (pull buoy), dan sirip kaki renang (fins)',
        ],
        commonMistakes: [
          'Salah mengira panjang kolam standar Olimpiade (50 meter, bukan 100 meter)',
          'Mengira tali lintasan hanya sekadar pembatas biasa (fungsinya juga memecah gelombang ombak)',
        ],
        practice:
          'Analisis bersama kelompok: Sebutkan spesifikasi dimensi kolam renang Olimpiade (panjang, lebar lintasan, suhu air) dan jelaskan fungsi papan pelampung (kickboard) serta pull buoy dalam latihan teknik!',
      },
      {
        id: 'keselamatan',
        title: 'Keselamatan di Air & Pertolongan Diri',
        emoji: '🛡️',
        category: 'teori',
        description:
          'Keselamatan di air (water safety) adalah prioritas mutlak dalam aktivitas akuatik. Memahami aturan keselamatan kolam, pencegahan kram, teknik mengapung bertahan hidup (water trappen), dan etika pertolongan darurat sangat penting untuk mencegah risiko tenggelam.',
        keyPoints: [
          'Wajib melakukan pemanasan menyeluruh sebelum masuk kolam untuk mencegah kram otot mendadak',
          'Jangan pernah berenang sendirian tanpa pengawasan guru, pelatih, atau petugas penyelamat (lifeguard)',
          'Dilarang berlari di bibir kolam karena lantai basah sangat licin dan membahayakan kepala',
          'Jika terjadi kram otot di air: Jangan panik, balikkan tubuh ke posisi telentang (mengapung rileks), regangkan otot yang kram perlahan, dan lambaikan tangan minta tolong',
          'Teknik Water Trappen: Gerakan menginjak-injak air tegak dengan tangan mengayuh horizontal untuk mempertahankan kepala tetap di atas air',
          'Prinsip pertolongan darurat "Reach, Throw, Row, Go": Dahulukan meraih dengan galah/tongkat (Reach) atau melempar ban pelampung (Throw) dari luar air tanpa langsung terjun',
        ],
        commonMistakes: [
          'Panik berlebihan saat kram atau lelah sehingga menghirup air ke paru-paru',
          'Langsung terjun menolong korban tenggelam tanpa alat bantu meski belum terlatih (berisiko ikut tertarik tenggelam)',
          'Bercanda saling mendorong teman ke kolam renang yang dalam',
        ],
        practice:
          'Diskusikan bersama kelompok: Jelaskan prinsip pertolongan Reach & Throw saat menolong orang yang kesulitan di air serta jelaskan apa yang harus dilakukan jika dirimu sendiri mengalami kram di tengah kolam!',
      },
    ],
  },
  {
    id: 'bulutangkis',
    title: 'Bulu Tangkis',
    description: 'Olahraga raket cepat dan dinamis yang menguji kelincahan, refleks kilat, dan taktik penempatan kok!',
    emoji: '🏸',
    color: '#10B981',
    isPriority: true,
    subMaterials: [
      {
        id: 'pengertian',
        title: 'Pengertian Bulu Tangkis',
        emoji: '🏸',
        category: 'teori',
        description:
          'Bulu tangkis (badminton) adalah cabang olahraga permainan bola kecil yang dimainkan oleh dua orang (nomor tunggal) atau dua pasangan (nomor ganda) yang saling berhadapan di lapangan bersekat net. Tujuan utama permainan ini adalah memukul shuttlecock (kok) melintasi jaring net agar jatuh di area lapangan lawan dan mencegah lawan melakukan hal serupa di area sendiri.',
        keyPoints: [
          'Permainan bola kecil menggunakan raket dan shuttlecock (kok)',
          'Nomor pertandingan: Tunggal Putra/Putri, Ganda Putra/Putri, dan Ganda Campuran',
          'Shuttlecock tidak boleh menyentuh lantai/tanah di area lapangan sendiri',
          'Hanya diperbolehkan 1 kali pukulan untuk menyeberangkan kok ke lapangan lawan',
          'Dipimpin oleh Wasit Utama (Umpire), Hakim Servis (Service Judge), dan Hakim Garis (Line Judges)',
        ],
        commonMistakes: [
          'Mengira shuttlecock boleh memantul di lantai satu kali sebelum dipukul',
          'Menyentuh net dengan raket atau anggota badan saat reli berlangsung (net foul)',
          'Memukul kok dua kali berturut-turut oleh pemain yang sama (double hit)',
        ],
        practice:
          'Diskusikan bersama kelompok: Mengapa dalam bulu tangkis kok tidak boleh memantul di lantai dan bagaimana kecepatan refleks serta kelincahan sangat menentukan jalannya sebuah reli?',
      },
      {
        id: 'sejarah',
        title: 'Sejarah Singkat & Perkembangan',
        emoji: '📜',
        category: 'teori',
        description:
          'Olahraga bulu tangkis berakar dari permainan kuno "Battledore and Shuttlecock" di Yunani, Mesir, dan Tiongkok kuno. Pada abad ke-19, permainan ini populer di Pune (Poona), India. Perwira militer Inggris membawa permainan ini ke kediaman Duke of Beaufort di Badminton House, Gloucestershire, Inggris pada tahun 1873, yang kemudian melahirkan nama "Badminton". Organisasi internasional IBF (kini Badminton World Federation / BWF) didirikan pada 5 Juli 1934. Di Indonesia, Persatuan Bulutangkis Seluruh Indonesia (PBSI) resmi didirikan di Bandung pada 5 Mei 1951. Bulu tangkis resmi menjadi cabang olahraga Olimpiade pada Barcelona 1992, di mana Indonesia menorehkan sejarah emas pertama lewat Susy Susanti dan Alan Budikusuma.',
        keyPoints: [
          'Berasal dari permainan kuno Battledore & Shuttlecock dan permainan Poona di India',
          'Nama Badminton lahir dari puri Badminton House di Gloucestershire, Inggris (1873)',
          'BWF (Badminton World Federation) didirikan pada tanggal 5 Juli 1934',
          'PBSI (Persatuan Bulutangkis Seluruh Indonesia) didirikan pada tanggal 5 Mei 1951 di Bandung',
          'Resmi dipertandingkan di Olimpiade sejak Barcelona 1992 (Emas pertama Indonesia: Susy Susanti & Alan Budikusuma)',
          'Kejuaraan beregu bergengsi dunia: Piala Thomas (putra), Piala Uber (putri), dan Piala Sudirman (campuran)',
        ],
        commonMistakes: [
          'Mengira nama Badminton berasal dari nama orang atau penciptanya (sebenarnya nama istana/gedung di Inggris)',
          'Menukar kepanjangan dan peran BWF (induk internasional) dengan PBSI (induk nasional Indonesia)',
          'Lupa tahun bersejarah berdirinya PBSI (5 Mei 1951)',
        ],
        practice:
          'Cari tahu bersama kelompok: Siapakah atlet legendaris bulu tangkis Indonesia peraih medali emas Olimpiade pertama dan apa perbedaan antara kejuaraan Piala Thomas, Piala Uber, dan Piala Sudirman!',
      },
      {
        id: 'lapangan',
        title: 'Ukuran Lapangan & Perlengkapan',
        emoji: '🏟️',
        category: 'lapangan',
        imageUrl: '/lapangan-bulutangkis.svg',
        description:
          'Lapangan bulu tangkis berbentuk persegi panjang dengan garis batas berukuran panjang 13,40 meter. Lebar lapangan untuk nomor ganda adalah 6,10 meter, sedangkan untuk nomor tunggal adalah 5,18 meter. Net dibentangkan di tengah lapangan dengan tinggi 1,55 meter pada tiang tepi dan 1,524 meter tepat di bagian tengah. Perlengkapan utama meliputi raket ringan fleksibel (75-95 gram) dan shuttlecock berstandar internasional yang terbuat dari gabus berlapis kulit putih dengan 16 helai bulu angsa tertancap simetris.',
        keyPoints: [
          'Panjang lapangan: 13,40 meter (sama untuk tunggal dan ganda)',
          'Lebar lapangan: 6,10 meter (ganda) dan 5,18 meter (tunggal)',
          'Tinggi net: 1,55 meter pada kedua tiang samping dan 1,524 meter di bagian tengah',
          'Jarak garis servis pendek ke net: 1,98 meter',
          'Jarak garis servis belakang ganda ke garis belakang luar: 0,76 meter',
          'Spesifikasi shuttlecock: 16 helai bulu angsa dengan berat 4,74 hingga 5,50 gram',
          'Raket: terbuat dari serat karbon/grafit dengan berat 75-95 gram',
        ],
        commonMistakes: [
          'Salah membedakan area lapangan tunggal (panjang sampai garis luar belakang, lebar garis dalam samping) dan ganda (lebar sampai garis luar samping, belakang garis servis pendek/panjang ganda saat servis)',
          'Mengira tinggi net bulu tangkis sama dengan net bola voli atau tenis lapangan',
          'Lupa bahwa garis batas adalah bagian sah dari dalam lapangan (masuk jika kok menyentuh garis)',
        ],
        practice:
          'Analisis bersama kelompok dengan melihat gambar denah lapangan: Jelaskan batas garis luar untuk pertandingan tunggal vs ganda, serta jelaskan mengapa ada perbedaan garis servis panjang untuk ganda (0,76 m di depan garis belakang)!',
      },
      {
        id: 'pegangan-raket',
        title: 'Teknik Pegangan Raket (Grip)',
        emoji: '🤝',
        category: 'teknik',
        description:
          'Teknik memegang raket (gripping) adalah keterampilan paling mendasar yang menentukan kekuatan, kontrol arah, dan fleksibilitas pukulan. Terdapat empat teknik pegangan utama: Forehand Grip (seperti berjabat tangan dengan ibu jari dan telunjuk membentuk huruf V), Backhand Grip (ibu jari menekan bidang rata/pipih gagang raket sebagai tumpuan tenaga), American Grip / Gebuk Kasur (bidang raket menghadap penuh ke depan, efektif untuk smash di bibir net), dan Combination Grip (menyesuaikan secara dinamis sesuai arah datangnya kok).',
        keyPoints: [
          'Forehand Grip: Posisi telapak tangan seperti berjabat tangan santai, celah antara ibu jari dan jari telunjuk membentuk huruf "V"',
          'Backhand Grip: Gagang raket diputar seperempat putaran ke kiri, ibu jari (jempol) menempel lurus menekan pada permukaan pipih gagang raket',
          'American Grip (Gebuk Kasur): Bagian ibu jari dan jari telunjuk menempel pada bagian permukaan lebar gagang raket, sangat bertenaga untuk menyambar kok di depan net',
          'Combination Grip: Memegang raket secara fleksibel dan luwes berpindah antara forehand dan backhand tergantung arah kok',
          'Prinsip utama: Pegangan harus rileks (tidak digenggam kaku) agar lecutan pergelangan tangan (wrist snap) bekerja maksimal saat perkenaan kok',
        ],
        commonMistakes: [
          'Menggenggam gagang raket terlalu kencang dan kaku sepanjang waktu seperti memegang palu',
          'Tidak memindahkan posisi ibu jari saat pukulan backhand sehingga pukulan lemah dan tidak bertenaga',
          'Menggunakan satu pegangan kaku untuk semua situasi pukulan',
        ],
        practice:
          'Praktikkan bergantian dengan teman sekelompok: Lakukan gerakan transisi cepat dari Forehand Grip ke Backhand Grip dalam hitungan detik dengan memutar gagang raket menggunakan jari-jari tanpa melihat raket!',
      },
      {
        id: 'footwork',
        title: 'Teknik Langkah Kaki (Footwork)',
        emoji: '👟',
        category: 'teknik',
        description:
          'Footwork (kelincahan langkah kaki) berfungsi sebagai penyangga utama untuk mengantarkan posisi tubuh pemain ke tempat datangnya shuttlecock dalam posisi seimbang dan siap memukul. Footwork yang efisien menghemat energi, mencegah cedera pergelangan kaki/lutut, dan memungkinkan pemain segera melakukan recovery (kembali) ke posisi siap di tengah lapangan (center base) setelah melepaskan pukulan.',
        keyPoints: [
          'Ready Position (Sikap Siap): Berdiri seimbang di tengah lapangan, kedua kaki dibuka selebar bahu, lutut sedikit ditekuk, tumpuan pada ujung telapak kaki depan, raket diangkat di depan dada',
          'Chasse Step: Langkah berurutan meluncur cepat ke samping atau depan tanpa menyilangkan kaki',
          'Cross Step: Langkah silang cepat untuk menjangkau sudut terjauh lapangan belakang dengan efisien',
          'Lunge Step: Langkah panjang dengan kaki dominan ditekuk kuat sebagai tumpuan akhir saat mengambil kok di depan net',
          'Recovery: Segera kembali melangkah ke posisi tengah (center base) setelah selesai memukul kok',
          'Prinsip keseimbangan: Kaki tumpuan harus kokoh saat memukul agar pukulan akurat dan tidak terjatuh',
        ],
        commonMistakes: [
          'Berdiri dengan telapak kaki menapak mati (tumit menempel lantai) sehingga lambat bereaksi terhadap kok',
          'Lupa kembali ke posisi tengah setelah memukul, sehingga membiarkan area lapangan lainnya terbuka lebar',
          'Melangkah terlalu panjang dan terburu-buru hingga kehilangan keseimbangan badan',
        ],
        practice:
          'Lakukan latihan "Shadow Badminton 6 Titik" bersama kelompok: Dari posisi tengah, lakukan gerak footwork ke depan-kanan, depan-kiri, samping-kanan, samping-kiri, belakang-kanan, dan belakang-kiri lalu kembali ke tengah dengan seimbang!',
      },
      {
        id: 'pukulan',
        title: 'Teknik Dasar Pukulan (Strokes)',
        emoji: '⚡',
        category: 'teknik',
        description:
          'Pukulan dalam bulu tangkis dibedakan berdasarkan ketinggian kontak bola, lintasan kok, dan tujuan taktiknya. Teknik pukulan utama meliputi: Servis (pembuka reli berupa servis pendek, servis panjang, atau flick), Pukulan Lob / Clear (melambungkan kok tinggi ke garis belakang lawan), Pukulan Drop Shot (memukul halus kok agar jatuh menukik tipis di bibir net lawan), Pukulan Smash (serangan utama berupa pukulan keras menukik tajam ke lantai lawan), Pukulan Netting (sentuhan halus tepat di atas pita net), dan Pukulan Drive (pukulan cepat mendatar menyusur atas net).',
        keyPoints: [
          'Servis: Pukulan pembuka reli; servis pendek (low serve) dominan pada nomor ganda, servis panjang (high serve) dominan pada tunggal',
          'Lob / Clear: Pukulan lambung tinggi ke garis belakang lawan untuk bertahan atau mengatur ritme dan waktu kembali ke tengah',
          'Drop Shot: Ayunan awalan menyerupai smash, namun saat menyentuh kok tenaga diperhalus sehingga kok meluncur menukik tipis di depan net lawan',
          'Smash: Pukulan overhead terkeras yang diarahkan menukik tajam ke lantai area lawan dengan kekuatan penuh dan lecutan pergelangan tangan',
          'Netting: Pukulan sentuhan halus di depan net agar kok bergulir tipis di atas pita jaring dan jatuh sedekat mungkin ke net lawan',
          'Drive: Pukulan cepat mendatar sejajar net setinggi bahu/dada untuk menekan pertahanan lawan dalam tempo tinggi',
        ],
        commonMistakes: [
          'Memukul smash dari posisi kok di belakang kepala sehingga laju kok malah datar atau melambung keluar',
          'Pukulan netting dilakukan terlalu bertenaga sehingga kok melambung tinggi dan mudah disambar lawan di net',
          'Gerakan ayunan drop shot terlihat berbeda dari awal sehingga lawan mudah menebak arah bola',
          'Melakukan servis dengan posisi kepala raket lebih tinggi dari pegangan atau di atas pinggang (servis fault)',
        ],
        practice:
          'Analisis bersama kelompok: Mengapa gerakan ayunan awal pukulan Drop Shot harus terlihat persis sama dengan pukulan Smash? Jelaskan unsur tipuan (deception) dan pengaruhnya terhadap antisipasi lawan!',
      },
      {
        id: 'peraturan-sederhana',
        title: 'Peraturan Sederhana & Sistem Skor',
        emoji: '📋',
        category: 'teori',
        description:
          'Pertandingan bulu tangkis modern menggunakan sistem perhitungan Rally Point dengan format Best of Three Games (mencari pemenang 2 game). Setiap game dimainkan hingga 21 poin. Setiap kali shuttlecock mati, pihak yang memenangkan reli berhak mendapatkan 1 poin dan memegang servis berikutnya. Pemain yang melakukan servis harus berdiri di kotak servis kanan jika perolehan poinnya bernilai genap (0, 2, 4, ...), dan di kotak servis kiri jika perolehan poinnya bernilai ganjil (1, 3, 5, ...). Servis selalu diarahkan menyilang (diagonal) ke kotak servis lawan.',
        keyPoints: [
          'Sistem skor: Rally Point 21 poin, pemenang pertandingan adalah yang memenangkan 2 game terlebih dahulu (Best of 3)',
          'Deuce / Setting: Jika skor imbang 20-20, pertandingan dilanjutkan hingga terjadi selisih 2 poin (misal 22-20, 24-22), dengan batas maksimal skor 30 poin (skor 30-29 menang)',
          'Posisi Servis: Poin GENAP (0, 2, 4, 6, ...) servis dari kotak KANAN; Poin GANJIL (1, 3, 5, 7, ...) servis dari kotak KIRI',
          'Arah Servis: Wajib diarahkan menyilang (diagonal) melintasi garis servis pendek lawan',
          'Pelanggaran (Fault): Kok jatuh di luar garis, kok tersangkut di net, raket/baju menyentuh net, kok menyentuh tubuh pemain, atau memukul kok sebelum melewati bidang net',
          'Let (Pengulangan): Wasit menginstruksikan reli diulang jika terjadi gangguan tak terduga (misal kok lapangan sebelah masuk atau penerima belum siap)',
        ],
        commonMistakes: [
          'Salah posisi kotak servis (berdiri di kiri saat poin genap atau di kanan saat poin ganjil)',
          'Menginjak garis batas kotak servis saat memukul servis (foot fault)',
          'Mengira batas servis nomor ganda sama dengan nomor tunggal (garis belakang ganda lebih pendek 0,76 m)',
        ],
        practice:
          'Simulasi Skor Kelompok: Jika skor Tim A adalah 18 dan Tim B adalah 15, dari kotak manakah Tim A melakukan servis dan jelaskan apa yang terjadi jika skor mencapai imbang 20-20!',
      },
      {
        id: 'permainan-sederhana',
        title: 'Permainan Sederhana & Modifikasi',
        emoji: '🎮',
        category: 'teknik',
        description:
          'Permainan sederhana dan modifikasi dirancang untuk melatih keterampilan dasar bulu tangkis dalam suasana yang menggembirakan, inklusif, dan interaktif di lingkungan sekolah. Modifikasi permainan mempermudah peserta didik menguasai kontrol raket, mengasah kerja sama tim, melatih sportivitas, dan membiasakan diri dengan aturan tanpa merasa terbebani oleh aturan kompetisi formal yang kaku.',
        keyPoints: [
          'Permainan "Keep The Shuttlecock Flying": 3-4 siswa dalam satu kelompok bekerja sama memukul dan menjaga 1 kok tetap melayang di udara secara bergantian tanpa jatuh ke lantai',
          'Permainan "Half-Court Single" (Bulu Tangkis Setengah Lapangan): Menggunakan setengah lebar lapangan membujur untuk melatih akurasi pukulan lurus, lob, dan kontrol bola dengan sistem 11 poin',
          'Permainan "Target Hula Hoop": Siswa melatih akurasi pukulan servis pendek atau drop shot dengan membidik kok agar jatuh tepat di dalam lingkaran hula hoop di seberang net',
          'Permainan "King of The Court Ceria": Permainan rotasi cepat 1 lawan 1 dengan 3 poin reli cepat, pemenang bertahan di court utama',
          'Nilai karakter: Mengembangkan sikap sportivitas, kejujuran saat kok keluar/masuk, menghargai lawan, dan kompak bersama tim',
        ],
        commonMistakes: [
          'Mengayunkan raket secara liar dan sembarangan yang berisiko mencederai rekan satu kelompok di sekitarnya',
          'Bermain secara individualis dan tidak memberi kesempatan teman yang belum mahir untuk mencoba memukul',
          'Mudah menyerah atau marah ketika kok sering terjatuh pada tahap awal latihan',
        ],
        practice:
          'Tantangan Game Ceria Kelompok: Lakukan permainan "Keep The Shuttlecock Flying" bersama 4 teman selama 2 menit. Catat berapa kali sentuhan berturut-turut tertinggi yang berhasil diraih kelompokmu tanpa kok menyentuh lantai!',
      },
    ],
  },
];
