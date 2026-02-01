import type { FungiData, DialogLine } from '../types';

export const fungiDatabase: FungiData[] = [
  {
    id: 'saccharomyces',
    name: 'Khamir',
    scientificName: 'Saccharomyces cerevisiae',
    type: 'khamir',
    description: 'Jamur uniseluler yang bereproduksi dengan bertunas. Digunakan untuk membuat tape dan roti.',
    features: ['Bentuk oval/bulat', 'Uniseluler', 'Reproduksi bertunas', 'Ukuran 5-10 mikrometer'],
    image: '/assets/images/yeast.png',
  },
  {
    id: 'neurospora',
    name: 'Oncom Merah',
    scientificName: 'Neurospora crassa',
    type: 'kapang',
    description: 'Kapang yang menghasilkan oncom merah. Memiliki hifa bersekat dengan warna oranye-merah.',
    features: ['Hifa bersekat (septate)', 'Warna oranye-merah', 'Konidia berantai', 'Tumbuh pada bungkil kacang'],
    image: '/assets/images/neurospora.png',
  },
  {
    id: 'rhizopus',
    name: 'Tempe',
    scientificName: 'Rhizopus oryzae',
    type: 'kapang',
    description: 'Kapang pembentuk tempe. Memiliki sporangium hitam yang khas pada kedelai terfermentasi.',
    features: ['Hifa tidak bersekat', 'Sporangium hitam', 'Miselium putih', 'Menghasilkan enzim protease'],
    image: '/assets/images/rhizopus.png',
  },
  {
    id: 'aspergillus',
    name: 'Kapang Berbahaya',
    scientificName: 'Aspergillus flavus',
    type: 'kontaminan',
    description: 'KONTAMINAN BERBAHAYA! Menghasilkan aflatoksin yang dapat menyebabkan keracunan.',
    features: ['Warna hijau-kehitaman', 'Hifa bersekat', 'Menghasilkan aflatoksin', 'Pertumbuhan cepat'],
    image: '/assets/images/aspergillus.png',
  },
  {
    id: 'pleurotus',
    name: 'Jamur Tiram',
    scientificName: 'Pleurotus ostreatus',
    type: 'cendawan',
    description: 'Cendawan dengan tubuh buah berbentuk tiram, tumbuh berlapis pada batang kayu.',
    features: ['Tudung berbentuk tiram', 'Tumbuh berlapis', 'Insang putih', 'Batang lateral'],
    image: '/assets/images/pleurotus.png',
  },
  {
    id: 'auricularia',
    name: 'Jamur Kuping',
    scientificName: 'Auricularia polytricha',
    type: 'cendawan',
    description: 'Cendawan dengan tekstur kenyal seperti kuping, warna coklat tua hingga hitam.',
    features: ['Bentuk seperti kuping', 'Tekstur kenyal', 'Warna coklat tua', 'Tumbuh pada kayu mati'],
    image: '/assets/images/auricularia.png',
  },
  {
    id: 'flammulina',
    name: 'Jamur Enoki',
    scientificName: 'Flammulina filiformis',
    type: 'cendawan',
    description: 'Cendawan dengan batang panjang putih dan tudung kecil, sering ditanam dalam botol.',
    features: ['Batang panjang putih', 'Tudung kecil', 'Tumbuh berkelompok', 'Ditanam dalam botol'],
    image: '/assets/images/enoki.png',
  },
  {
    id: 'bakteri',
    name: 'Bakteri',
    scientificName: 'Bacteria spp.',
    type: 'bakteri',
    description: 'Bukan jamur! Organisme prokariotik yang dapat menyebabkan fermentasi asam.',
    features: ['Uniseluler', 'Bentuk batang/bulat', 'Tidak memiliki inti', 'Ukuran lebih kecil dari yeast'],
    image: '/assets/images/bacteria.png',
  },
];

// ============================================
// PROLOG - Pengenalan Cerita
// ============================================
export const prologDialog: DialogLine[] = [
  {
    speaker: 'Narrator',
    text: 'Bandung, 1987. Malam telah larut di sebuah kampung kecil di lereng gunung...',
    emotion: 'normal',
  },
  {
    speaker: 'Narrator',
    text: 'Warung "Mbah Kumis" - legenda fermentasi yang telah berdiri selama 50 tahun - kini terancam tutup forever.',
    emotion: 'sad',
  },
  {
    speaker: 'Narrator',
    text: 'Pak Darto, pemilik pabrik modern, telah membuka pabrik fermentasi besar di kota. Pelanggan-pelanggan setia mulai berpaling...',
    emotion: 'worried',
  },
  {
    speaker: 'Narrator',
    text: 'Dan kini, Kakek Pak Kumis - sang legenda jamur - terbaring sakit di kamarnya.',
    emotion: 'sad',
  },
  {
    speaker: 'Raka',
    text: 'Kakek... Kakek bangun...',
    emotion: 'worried',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Raka... cucuku. Kakek tidak kuat lagi...',
    emotion: 'sad',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Warung ini... warisan nenek moyang kita... akan hilang selamanya...',
    emotion: 'sad',
  },
  {
    speaker: 'Raka',
    text: 'Jangan bicara seperti itu, Kakek! Aku sudah belajar biologi di kampus. Aku bisa membantu!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Biologi... ya, ilmu pengetahuan. Tapi ilmu jamur tidak ada di buku teks, Raka. Ilmu ini warisan turun-temurun.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Ambillah ini... Buku Harian Jamur. Di dalamnya rahasia fermentasi keluarga kita selama 3 generasi.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Dan mikroskop tua ini... gunakan untuk melihat apa yang mata tidak bisa lihat. Dunia mikroskopis jamur yang ajaib.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Aku janji, Kakek. Aku akan menyelamatkan warung ini. Aku akan buktikan bahwa ilmu modern dan tradisi bisa bersatu!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Baiklah, cucuku. Mari kita mulai dari yang paling dasar. Kenalan dulu dengan Khamir - raja fermentasi tradisional Indonesia.',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Raka membuka Buku Harian Jamur halaman pertama. Petualangan ilmu jamur pun dimulai...',
    emotion: 'normal',
  },
];

// ============================================
// ACT I - KHAMIR (Yeast)
// ============================================
export const act1Dialog: DialogLine[] = [
  {
    speaker: 'Pak Kumis',
    text: 'Lihatlah ke dalam mikroskop, Raka. Apa yang kamu lihat di sana?',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Wow! Benda-benda kecil berbentuk oval... ada yang menempel satu sama lain seperti anak dan induknya!',
    emotion: 'surprised',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Itulah Khamir - Saccharomyces cerevisiae. Dalam bahasa Yunani, Saccharo berarti gula, myces berarti jamur.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Mereka adalah jamur uniseluler, artinya satu sel hidup mandiri. Tidak seperti kapang yang banyak sel.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Lihat tunas kecil yang menempel? Itu cara mereka berkembang biak - disebut "budding" atau bertunas.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Fascinating! Jadi mereka tidak perlu pasangan untuk bereproduksi?',
    emotion: 'surprised',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Benar! Reproduksi aseksual. Tapi tahukah kamu keajaiban mereka dalam fermentasi?',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Khamir mengubah gula (glukosa) menjadi alkohol (etanol) dan karbon dioksida. Persis: C6H12O6 → 2C2H5OH + 2CO2',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Itu reaksi kimia fermentasi alkoholik! Jadi itulah rahasia tape ketan yang manis dan beraroma...',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Tepat! Alkohol memberikan aroma khas, CO2 membuat tekstur lembut berongga. Tapi hati-hati...',
    emotion: 'worried',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Jika kontaminan masuk, seperti bakteri asam laktat, rasa menjadi asam. Atau kapang berbahaya seperti Aspergillus...',
    emotion: 'worried',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Nah, sekarang uji pemahamanmu. Identifikasi Khamir yang benar di antara sampel lain!',
    emotion: 'happy',
  },
];

// ============================================
// ACT II - KAPANG (Mould) - Oncom Crisis
// ============================================
export const act2Dialog: DialogLine[] = [
  {
    speaker: 'Narrator',
    text: 'Pagi harinya... matahari baru saja menyingsing. Sebuah krisis menanti di depan pintu.',
    emotion: 'normal',
  },
  {
    speaker: 'Bu Siti',
    text: 'Raka! Tolong, aku butuh oncom merah untuk lauk suamiku hari ini. Stoknya ada?',
    emotion: 'worried',
  },
  {
    speaker: 'Raka',
    text: 'Sebentar, Bu Siti. Aku cek dulu...',
    emotion: 'normal',
  },
  {
    speaker: 'Narrator',
    text: 'Raka memeriksa rak fermentasi. Stok oncom habis!',
    emotion: 'worried',
  },
  {
    speaker: 'Raka',
    text: 'Maaf Bu, stok habis. Tapi... aku bisa buatkan! Kakek sudah ajariku.',
    emotion: 'happy',
  },
  {
    speaker: 'Bu Siti',
    text: 'Benarkah? Pak Kumis memang hebat. Baiklah, aku tunggu. Tapi jangan lama-lama ya!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Bagus, Raka. Kesempatan pertamamu. Oncom merah dibuat dengan Neurospora crassa.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Neurospora memiliki hifa bersekat - septate hyphae. Warnanya oranye-merah karena pigmen karotenoid.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Tapi dengar baik-baik: ASPERGILLUS FLAVUS adalah musuh utama! Warna hijau-hitam, menghasilkan aflatoksin - racun mematikan.',
    emotion: 'worried',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Suhu optimal Neurospora: 28-30°C. Terlalu panas = mati. Terlalu dingin = pertumbuhan lambat. Kontrol suhu adalah kunci!',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Aku mengerti, Kakek. Aku akan jaga suhu dengan benar. Tidak akan mengecewakan Bu Siti!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Semoga berhasil, cucuku. Ingat: jamur itu seperti manusia - mereka butuh kenyamanan untuk tumbuh.',
    emotion: 'happy',
  },
];

// ============================================
// ACT III - TEMPE - Industrial Challenge
// ============================================
export const act3Dialog: DialogLine[] = [
  {
    speaker: 'Narrator',
    text: 'Beberapa hari kemudian... sebuah kesempatan besar datang.',
    emotion: 'normal',
  },
  {
    speaker: 'Investor',
    text: 'Selamat siang! Saya dari Koperasi Kampus. Kami ingin pesan 100 porsi tempe untuk kantin mahasiswa.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Seratus porsi?! Itu... itu pesanan besar! Tapi kami bisa handle.',
    emotion: 'surprised',
  },
  {
    speaker: 'Investor',
    text: 'Bagus! Tapi ada syaratnya: deadline 3 hari. Bisa?',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Tiga hari untuk 100 porsi... tantangan besar. Tapi aku punya ide.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Hati-hati, Raka. Produksi massal berbeda dengan skala rumahan. Risiko kontaminasi jauh lebih tinggi.',
    emotion: 'worried',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Tempe dibuat dengan Rhizopus oryzae. Bedanya dengan Neurospora: hifa Rhizopus TIDAK bersekat - coenocytic.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Rhizopus menghasilkan enzim protease yang menguraikan protein kedelai. Itulah yang membuat tempe mudah dicerna dan bergizi tinggi.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Lihat sporangium hitam yang muncul? Itu tanda Rhizopus sudah matang. Tapi jika ada bintik hijau... itu Aspergillus! Buang segera!',
    emotion: 'worried',
  },
  {
    speaker: 'Investor',
    text: 'Oh ya, saya punya tawaran. Gunakan bahan pengawet kimia, produksi jadi lebih cepat dan tahan lama. Tertarik?',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Maaf, kami tidak menggunakan bahan kimia. Kualitas alami dan tradisi adalah warisan kami. Itu yang membuat tempe kami istimewa.',
    emotion: 'happy',
  },
  {
    speaker: 'Investor',
    text: 'Bagus! Saya suka prinsipmu. Saya tetap pesan 100 porsi dengan metode tradisional. Buktikan kualitasmu!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Keputusan bijak, cucuku. Integritas lebih berharga dari keuntungan sesaat. Tapi sekarang, buktikan kemampuanmu!',
    emotion: 'happy',
  },
];

// ============================================
// ACT IV - CENDAWAN - Festival Finale
// ============================================
export const act4Dialog: DialogLine[] = [
  {
    speaker: 'Narrator',
    text: 'Festival Kuliner Desa - malam puncak yang menentukan nasib warung.',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Lampu-lampu warna-warni menghiasi lapangan. Aroma makanan tradisional memenuhi udara.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Ini saatnya, Raka. Semua yang kau pelajari akan diuji di sini. Booth kita harus menonjol!',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Kita punya 3 jenis cendawan unggulan: Jamur Tiram, Jamur Kuping, dan Enoki. Semua hasil budidaya sendiri!',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Cendawan berbeda dengan kapang. Mereka memiliki tubuh buah - basidiokarp - yang terlihat jelas.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Pleurotus ostreatus - Jamur Tiram. Tudung berbentuk tiram, insang putih di bawah, tumbuh berlapis pada kayu.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Auricularia polytricha - Jamur Kuping. Bentuk seperti kuping manusia, tekstur kenyal, warna coklat tua. Kaya akan zat besi!',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Flammulina filiformis - Enoki. Batang panjang putih karena ditanam dalam botol dengan minim cahaya. Teknik budidaya modern!',
    emotion: 'happy',
  },
  {
    speaker: 'Profesor',
    text: 'Selamat malam! Saya Profesor dari Universitas Padjadjaran. Saya dengar ada pemuda yang menggabungkan ilmu biologi dengan tradisi?',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Ya, Profesor! Saya Raka, mahasiswa biologi. Saya ingin membuktikan bahwa ilmu modern bisa melestarikan tradisi.',
    emotion: 'happy',
  },
  {
    speaker: 'Profesor',
    text: 'Bagus! Izinkan saya menguji pengetahuanmu. Jika berhasil, saya akan merekomendasikan warung ini sebagai tempat praktikum mahasiswa.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Saya siap, Profesor!',
    emotion: 'happy',
  },
];

// ============================================
// EPILOG
// ============================================
export const act4EndingDialog: DialogLine[] = [
  {
    speaker: 'Profesor',
    text: 'Luar biasa! Pemahamanmu tentang jamur sangat baik. Warung ini pantas menjadi pusat edukasi fermentasi!',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Kabar gembira menyebar cepat. Warung Mbah Kumis dipadati pengunjung. Pesanan berdatangan dari berbagai tempat.',
    emotion: 'happy',
  },
  {
    speaker: 'Bu Siti',
    text: 'Raka, oncommu makin enak! Semua tetangga bilang begitu.',
    emotion: 'happy',
  },
  {
    speaker: 'Investor',
    text: 'Kami ingin perpanjang kontrak. Jadi pesanan rutin setiap bulan!',
    emotion: 'happy',
  },
];

export const epilogDialog: DialogLine[] = [
  {
    speaker: 'Narrator',
    text: 'Warung Fermentasi Mbah Kumis berhasil diselamatkan. Lebih dari itu - ia berkembang menjadi pusat edukasi biologi fermentasi.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Raka... duduklah di samping Kakek.',
    emotion: 'normal',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Kakek tidak pernah menyangka... ilmu turun-temurun kita bisa diselamatkan oleh ilmu modern yang kau pelajari.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Semua berkat ajaran Kakek. Ilmu biologi hanya alat. Yang penting adalah cinta kita pada tradisi dan keinginan untuk melestarikannya.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Kakek bangga padamu. Buku Harian Jamur ini... sekarang menjadi milikmu. Tulis lanjutannya, cucuku.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Aku janji, Kakek. Aku akan terus menulis. Ilmu jamur Indonesia akan kutuangkan dalam buku-buku ilmiah. Dunia harus tahu kekayaan kita!',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Namun, perjalanan Raka tidak berakhir di sini. Di balik kesuksesan ini, ada tim kecil yang membantunya memahami dan mendokumentasikan ilmu jamur secara modern.',
    emotion: 'normal',
  },
  {
    speaker: 'Raka',
    text: 'Betul, Kakek. Selama ini aku dibantu oleh teman-temanku dari kampus. Mereka yang membantuku menyusun materi dan menguji pengetahuanku tentang jamur.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Ah, jadi itulah rahasiamu! Ceritakan padaku, siapa saja mereka?',
    emotion: 'surprised',
  },
  {
    speaker: 'Raka',
    text: 'Ada Zhilan yang selalu teliti dalam mengoreksi fakta ilmiahku. Anindya yang kreatif menyusun materi pembelajaran. Mahardika yang ahli dalam sistematisasi data.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Lalu ada Meisya yang selalu semangat menguji quiz-quiz yang kubuat. Ariezka yang membantu desain visual. Azzkha yang rajin mencari referensi tambahan.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Dan tak ketinggalan Alya yang selalu mendukung dan memberikan masukan berharga. Tanpa mereka, aku tidak akan bisa memahami jamur sedalam ini.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Sungguh tim yang hebat! Kakek senang mendengarnya. Ilmu yang dibagi bersama akan tumbuh lebih kuat. Ingatlah selalu untuk berterima kasih pada mereka.',
    emotion: 'happy',
  },
  {
    speaker: 'Raka',
    text: 'Tentu, Kakek. Kepada Zhilan, Anindya, Mahardika, Meisya, Ariezka, Azzkha, dan Alya... terima kasih banyak atas bantuannya!',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Dan warung itu terus berdiri kokoh. Generasi demi generasi datang belajar. Dari Khamir sederhana hingga Cendawan kompleks.',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Raka dan timnya membuktikan bahwa tradisi dan ilmu pengetahuan bisa berjalan berdampingan. Warisan bukan untuk dipajang, tapi untuk dikembangkan bersama.',
    emotion: 'happy',
  },
  {
    speaker: 'Narrator',
    text: 'Mbah Kumis - Warisan Pak Kumis - menjadi legenda baru. Bukan hanya warung fermentasi, tapi simbol kebanggaan ilmu Indonesia yang lahir dari kerja sama dan semangat berbagi.',
    emotion: 'happy',
  },
  {
    speaker: 'Pak Kumis',
    text: 'Terima kasih, Raka. Terima kasih telah menyelamatkan warisan kita... dan terima kasih juga untuk tim hebatmu!',
    emotion: 'happy',
  },
];

// ============================================
// ACT I - MULTIPLE CHOICE QUIZ (PILIHAN GANDA A-D)
// ============================================
export const act1QuizQuestions = [
  {
    question: 'Apa ciri utama Khamir (Saccharomyces cerevisiae)?',
    options: ['Multiseluler dengan hifa', 'Uniseluler berbentuk oval dan bereproduksi bertunas', 'Memiliki tubuh buah seperti payung', 'Berwarna hijau dan beracun'],
    correct: 1,
    explanation: 'Khamir adalah jamur uniseluler yang berbentuk oval dan bereproduksi dengan cara bertunas (budding).',
    image: '/assets/images/yeast.png'
  },
  {
    question: 'Bagaimana Khamir mengubah gula dalam fermentasi tape?',
    options: ['Gula menjadi asam laktat', 'Gula menjadi alkohol dan CO₂', 'Gula menjadi protein', 'Gula menjadi lemak'],
    correct: 1,
    explanation: 'Khamir mengubah gula menjadi alkohol dan karbon dioksida (CO₂) melalui proses fermentasi alkoholik.',
  },
  {
    question: 'Mengapa kontaminan berbahaya dalam fermentasi?',
    options: ['Membuat warna lebih cantik', 'Dapat menghasilkan racun dan menyebabkan keracunan', 'Mempercepat fermentasi', 'Menambah rasa manis'],
    correct: 1,
    explanation: 'Kontaminan seperti Aspergillus flavus dapat menghasilkan aflatoksin yang berbahaya bagi kesehatan.',
    image: '/assets/images/aspergillus.png'
  },
  {
    question: 'Reproduksi Khamir disebut...',
    options: ['Sporulasi', 'Budding/Bertunas', 'Fragmentasi', 'Konjugasi'],
    correct: 1,
    explanation: 'Khamir bereproduksi secara aseksual dengan cara bertunas (budding), di mana tunas kecil tumbuh dari induknya.',
  },
  {
    question: 'Produk fermentasi Khamir yang terkenal di Indonesia adalah...',
    options: ['Tempe', 'Oncom', 'Tape ketan', 'Tauco'],
    correct: 2,
    explanation: 'Tape ketan adalah hasil fermentasi beras ketan menggunakan Khamir (Saccharomyces cerevisiae).',
  }
];

// ============================================
// ACT II - TRUE/FALSE QUIZ (BENAR/SALAH)
// ============================================
export const act2QuizQuestions = [
  {
    statement: 'Neurospora crassa memiliki hifa yang bersekat (septate).',
    isTrue: true,
    explanation: 'Benar! Neurospora crassa memiliki hifa bersekat (septate hyphae) yang memiliki dinding pemisah antar sel.',
    image: '/assets/images/neurospora.png'
  },
  {
    statement: 'Suhu optimal untuk pertumbuhan Neurospora adalah 15-20°C.',
    isTrue: false,
    explanation: 'Salah! Suhu optimal untuk Neurospora crassa adalah 28-30°C, bukan 15-20°C.',
  },
  {
    statement: 'Aspergillus flavus aman dikonsumsi dan tidak berbahaya.',
    isTrue: false,
    explanation: 'Salah! Aspergillus flavus sangat berbahaya karena menghasilkan aflatoksin yang bersifat karsinogenik.',
    image: '/assets/images/aspergillus.png'
  },
  {
    statement: 'Oncom terbuat dari bungkil kacang tanah yang difermentasi.',
    isTrue: true,
    explanation: 'Benar! Oncom merah dibuat dari bungkil kacang tanah (ampas minyak) yang difermentasi dengan Neurospora crassa.',
  },
  {
    statement: 'Kapang dengan hifa bersekat disebut coenocytic.',
    isTrue: false,
    explanation: 'Salah! Kapang dengan hifa TIDAK bersekat disebut coenocytic. Yang bersekat disebut septate.',
  }
];

// ============================================
// ACT III - WORDLE (TEBAK KATA)
// ============================================
export const act3QuizQuestions = [
  {
    answer: 'TEMPE',
    hint: 'Makanan fermentasi dari kedelai',
    explanation: 'Tempe adalah hasil fermentasi kedelai menggunakan kapang Rhizopus oryzae.',
    image: '/assets/images/rhizopus.png'
  },
  {
    answer: 'ONCOM',
    hint: 'Makanan merah dari bungkil kacang',
    explanation: 'Oncom merah dibuat dari bungkil kacang tanah yang difermentasi dengan Neurospora crassa.',
    image: '/assets/images/neurospora.png'
  },
  {
    answer: 'KAPANG',
    hint: 'Jamur dengan hifa filamentus',
    explanation: 'Kapang (mould) adalah jamur multiseluler dengan hifa yang tidak memiliki tubuh buah jelas.',
  },
  {
    answer: 'KHAMIR',
    hint: 'Jamur uniseluler untuk tape',
    explanation: 'Khamir (yeast) adalah jamur uniseluler yang digunakan untuk fermentasi tape dan roti.',
    image: '/assets/images/yeast.png'
  },
  {
    answer: 'CENDAWAN',
    hint: 'Jamur dengan tubuh buah',
    explanation: 'Cendawan (mushroom) memiliki tubuh buah (basidiokarp) yang terlihat jelas.',
    image: '/assets/images/pleurotus.png'
  }
];

// ============================================
// ACT IV - PICK WORD (PILIH KATA)
// ============================================
export const act4QuizQuestions = [
  {
    sentence: 'Jamur Tiram (Pleurotus) memiliki tudung berbentuk ___ yang tumbuh berlapis-lapis.',
    options: ['TIRAM', 'BUNDAR', 'PANJANG', 'KOTAK'],
    correct: 0,
    explanation: 'Pleurotus ostreatus disebut Jamur Tiram karena tudungnya berbentuk seperti tiram/tiram laut.',
    image: '/assets/images/pleurotus.png'
  },
  {
    sentence: 'Jamur Kuping (Auricularia) memiliki tekstur yang ___ dan bentuk seperti kuping.',
    options: ['KERAS', 'KENYAL', 'KASAR', 'TIPIS'],
    correct: 1,
    explanation: 'Jamur Kuping memiliki tekstur kenyal dan elastis seperti karet, dengan bentuk menyerupai kuping manusia.',
    image: '/assets/images/auricularia.png'
  },
  {
    sentence: 'Cendawan memiliki tubuh buah yang disebut ___ yang terlihat jelas.',
    options: ['HIFA', 'BASIDIOKARP', 'SPORA', 'MISELIUM'],
    correct: 1,
    explanation: 'Cendawan memiliki tubuh buah (basidiokarp) yang terlihat jelas, berbeda dengan kapang yang hanya memiliki hifa.',
  },
  {
    sentence: 'Lichen adalah simbiosis antara ___ dan jamur (fungi).',
    options: ['BAKTERI', 'ALGAE', 'VIRUS', 'PROTOZOA'],
    correct: 1,
    explanation: 'Lichen adalah simbiosis mutualisme antara algae (yang melakukan fotosintesis) dan fungi (yang menyediakan struktur).',
  },
  {
    sentence: 'Aspergillus flavus menghasilkan ___ yang sangat berbahaya.',
    options: ['VITAMIN', 'AFLATOKSIN', 'PROTEIN', 'ENZIM'],
    correct: 1,
    explanation: 'Aflatoksin adalah racun yang dihasilkan oleh Aspergillus flavus, sangat berbahaya dan bersifat karsinogenik.',
    image: '/assets/images/aspergillus.png'
  }
];

// ============================================
// LEGACY QUIZ QUESTIONS (for compatibility)
// ============================================
export const quizQuestions = [
  {
    question: 'Jamur mana yang UNISELULER?',
    options: ['Khamir (Yeast)', 'Kapang (Mould)', 'Cendawan (Mushroom)', 'Lichen'],
    correct: 0,
    explanation: 'Khamir seperti Saccharomyces cerevisiae adalah jamur uniseluler yang bereproduksi bertunas.',
  },
  {
    question: 'Apa perbedaan utama Kapang dan Cendawan?',
    options: [
      'Kapang lebih besar dari Cendawan',
      'Kapang: hifa terus-menerus tanpa tubuh buah jelas; Cendawan: ada tubuh buah (mushroom)',
      'Kapang berwarna, Cendawan tidak berwarna',
      'Tidak ada perbedaan',
    ],
    correct: 1,
    explanation: 'Kapang terdiri dari hifa filamentus, sedangkan Cendawan memiliki tubuh buah yang terlihat (basidiokarp).',
  },
  {
    question: 'Apa itu Lichen?',
    options: [
      'Sejenis jamur beracun',
      'Simbiosis antara algae dan fungi',
      'Bakteri pengurai',
      'Virus yang menginfeksi jamur',
    ],
    correct: 1,
    explanation: 'Lichen adalah simbiosis mutualisme antara algae (fotosintesis) dan fungi (struktur dan perlindungan).',
  },
  {
    question: 'Kapang apa yang digunakan untuk membuat tempe?',
    options: ['Neurospora crassa', 'Aspergillus flavus', 'Rhizopus oryzae', 'Penicillium'],
    correct: 2,
    explanation: 'Rhizopus oryzae adalah kapang yang digunakan untuk fermentasi kedelai menjadi tempe.',
  },
  {
    question: 'Mengapa Aspergillus flavus berbahaya?',
    options: [
      'Menghasilkan aflatoksin yang beracun',
      'Warnanya tidak menarik',
      'Bau tidak sedap',
      'Teksturnya kasar',
    ],
    correct: 0,
    explanation: 'Aspergillus flavus menghasilkan aflatoksin, senyawa karsinogenik yang berbahaya bagi kesehatan.',
  },
];
