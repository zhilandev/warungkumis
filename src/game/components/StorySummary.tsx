import React from 'react';

interface StorySummaryProps {
  onContinue: () => void;
}

const summaryPoints = [
  {
    act: 'PROLOG',
    title: 'Warung dalam Bahaya',
    content: 'Raka, mahasiswa biologi, pulang ke kampung karena kakeknya Pak Kumis sakit. Warung fermentasi "Mbah Kumis" terancam tutup karena pelanggan beralih ke pabrik modern. Pak Kumis menyerahkan Buku Harian Jamur dan mikroskop kepada Raka.',
    image: '/assets/images/bedroom.png'
  },
  {
    act: 'ACT I',
    title: 'Mengenal Khamir',
    content: 'Raka belajar tentang Saccharomyces cerevisiae (Khamir/Yeast) - jamur uniseluler yang bereproduksi dengan bertunas. Khamir mengubah gula menjadi alkohol dan CO₂, membuat tape ketan menjadi manis dan lembut.',
    image: '/assets/images/yeast.png'
  },
  {
    act: 'ACT II',
    title: 'Krisis Oncom',
    content: 'Bu Siti membutuhkan oncom merah. Raka belajar tentang Neurospora crassa - kapang dengan hifa bersekat (septate) berwarna oranye-merah. Suhu optimal 28-30°C. Hati-hati dengan Aspergillus flavus yang berbahaya!',
    image: '/assets/images/neurospora.png'
  },
  {
    act: 'ACT III',
    title: 'Tantangan Tempe',
    content: 'Investor memesan 100 porsi tempe dengan deadline 3 hari. Raka menggunakan Rhizopus oryzae - kapang dengan hifa tidak bersekat (coenocytic) yang menghasilkan enzim protease. Raka menolak bahan kimia pengawet dan mempertahankan metode tradisional.',
    image: '/assets/images/rhizopus.png'
  },
  {
    act: 'ACT IV',
    title: 'Festival Cendawan',
    content: 'Di Festival Kuliner Desa, Raka memamerkan 3 jenis cendawan: Jamur Tiram (Pleurotus), Jamur Kuping (Auricularia), dan Enoki (Flammulina). Profesor dari universitas menguji pengetahuannya.',
    image: '/assets/images/pleurotus.png'
  },
  {
    act: 'EPILOG',
    title: 'Warung Terselamatkan',
    content: 'Warung Mbah Kumis berkembang menjadi pusat edukasi fermentasi. Raka dibantu timnya: Zhilan, Anindya, Mahardika, Meisya, Ariezka, Azzkha, dan Alya. Tradisi dan ilmu pengetahuan berjalan berdampingan.',
    image: '/assets/images/title-bg.png'
  }
];

const keyLearnings = [
  { type: 'Khamir', desc: 'Uniseluler, reproduksi bertunas, untuk tape' },
  { type: 'Kapang', desc: 'Multiseluler hifa, Neurospora & Rhizopus' },
  { type: 'Cendawan', desc: 'Tubuh buah (basidiokarp) terlihat jelas' },
  { type: 'Lichen', desc: 'Simbiosis algae + fungi' },
];

export const StorySummary: React.FC<StorySummaryProps> = ({ onContinue }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/95 overflow-y-auto scroll-smooth">
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="pixel-title text-xl md:text-3xl text-amber-400 mb-2">
            RANGKUMAN CERITA
          </h1>
          <p className="pixel-text text-[10px] md:text-xs text-gray-400">
            Ringkasan perjalanan Raka menyelamatkan Warung Fermentasi
          </p>
        </div>

        {/* Story Points */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 mb-8">
          {summaryPoints.map((point, index) => (
            <div key={index} className="pixel-panel flex gap-3 md:gap-4 p-3 md:p-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={point.image}
                  alt={point.act}
                  className="w-16 h-16 md:w-24 md:h-24 object-cover border-2 border-amber-600"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="pixel-text text-[10px] md:text-xs text-amber-400">{point.act}</span>
                </div>
                <h3 className="pixel-text text-xs md:text-sm text-white mb-1 md:mb-2">{point.title}</h3>
                <p className="pixel-text text-[9px] md:text-xs text-gray-400 leading-relaxed">{point.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Learnings */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="pixel-subtitle text-sm md:text-lg text-amber-200 mb-3 md:mb-4 text-center">
            ILMU YANG DIPERLajari
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {keyLearnings.map((item, index) => (
              <div key={index} className="pixel-panel p-2 md:p-3 text-center">
                <p className="pixel-text text-xs md:text-sm text-amber-400 mb-1">{item.type}</p>
                <p className="pixel-text text-[8px] md:text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center pb-8">
          <p className="pixel-text text-[10px] md:text-xs text-gray-500 mb-4">
            Siap untuk menguji pengetahuanmu?
          </p>
          <button
            onClick={onContinue}
            className="pixel-btn text-sm md:text-base py-3 md:py-4 px-6 md:px-8"
          >
            LANJUT KE KUIS ▶
          </button>
        </div>
      </div>
    </div>
  );
};
