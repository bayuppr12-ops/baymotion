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
    'daya-tahan', 'kekuatan', 'kelentukan', 'kelincahan'
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
    isPriority: true,
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
        title: 'Peraturan Perlombaan',
        emoji: '📋',
        category: 'teori',
        description: 'Aturan diskualifikasi, pencatatan waktu, dan pengukuran jarak.',
        keyPoints: [
          'False start (Mencuri start) = Diskualifikasi',
          'Pengukuran lompatan diukur dari bekas terbelakang di pasir',
        ],
        commonMistakes: ['Mendarat di bak pasir lalu tangan jatuh ke belakang'],
        practice: 'Diskusikan bersama kelompok: Jelaskan sanksi tegas aturan False Start (mencuri start) dalam perlombaan atletik resmi!',
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
];
