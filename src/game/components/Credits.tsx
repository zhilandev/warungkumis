import React from 'react';

interface CreditsProps {
  onBack: () => void;
}

export const Credits: React.FC<CreditsProps> = ({ onBack }) => {
  return (
    <div className="relative w-full min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 border-b-4 border-amber-600 p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="pixel-title text-2xl text-amber-400">TENTANG GAME</h1>
          <button onClick={onBack} className="pixel-btn text-xs">
            KEMBALI
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Game Info */}
        <div className="pixel-panel">
          <h2 className="pixel-subtitle text-lg text-amber-400 mb-4">WARUNG FERMENTASI: WARISAN PAK KUMIS</h2>
          <p className="pixel-text text-sm text-gray-300 mb-4">
            Game edukasi tentang morfologi dan peran jamur dalam fermentasi tradisional Indonesia. 
            Pemain akan belajar tentang tiga jenis jamur utama: Khamir (Yeast), Kapang (Mould), 
            dan Cendawan (Mushroom) sambil membantu menyelamatkan warung fermentasi keluarga.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="pixel-text text-gray-400">Genre:</span>
              <p className="pixel-text text-amber-200">Simulation / Visual Novel / Edukasi</p>
            </div>
            <div>
              <span className="pixel-text text-gray-400">Durasi:</span>
              <p className="pixel-text text-amber-200">10-15 menit</p>
            </div>
            <div>
              <span className="pixel-text text-gray-400">Setting:</span>
              <p className="pixel-text text-amber-200">Bandung, 1987</p>
            </div>
            <div>
              <span className="pixel-text text-gray-400">Platform:</span>
              <p className="pixel-text text-amber-200">Web Browser</p>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="pixel-panel">
          <h2 className="pixel-subtitle text-lg text-amber-400 mb-4">MATERI EDUKASI</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="pixel-text text-yellow-400 mb-1">KHAMIR (YEAST)</h3>
              <p className="pixel-text text-xs text-gray-300">
                Jamur uniseluler seperti <em>Saccharomyces cerevisiae</em> yang bereproduksi 
                dengan bertunas. Digunakan untuk membuat tape ketan dan roti.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="pixel-text text-orange-400 mb-1">KAPANG (MOULD)</h3>
              <p className="pixel-text text-xs text-gray-300">
                Jamur multiseluler filamentus dengan hifa. <em>Rhizopus oryzae</em> untuk tempe, 
                <em>Neurospora crassa</em> untuk oncom. Hati-hati dengan <em>Aspergillus flavus</em> 
                yang berbahaya!
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="pixel-text text-green-400 mb-1">CENDAWAN (MUSHROOM)</h3>
              <p className="pixel-text text-xs text-gray-300">
                Jamur dengan tubuh buah (basidiokarp) seperti Jamur Tiram, Jamur Kuping, 
                dan Enoki. Memiliki struktur tudung, batang, dan insang.
              </p>
            </div>
          </div>
        </div>

        {/* Game Structure */}
        <div className="pixel-panel">
          <h2 className="pixel-subtitle text-lg text-amber-400 mb-4">STRUKTUR GAME</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="pixel-text text-amber-500">ACT I</span>
              <span className="pixel-text text-xs text-gray-300">Khamir - Mikroskop & Tape Ketan</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="pixel-text text-amber-500">ACT II</span>
              <span className="pixel-text text-xs text-gray-300">Kapang - Oncom & Kontrol Suhu</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="pixel-text text-amber-500">ACT III</span>
              <span className="pixel-text text-xs text-gray-300">Tempe - Produksi Massal</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="pixel-text text-amber-500">ACT IV</span>
              <span className="pixel-text text-xs text-gray-300">Festival - Kuis & Identifikasi</span>
            </div>
          </div>
        </div>

        {/* Traditional Foods */}
        <div className="pixel-panel">
          <h2 className="pixel-subtitle text-lg text-amber-400 mb-4">MAKANAN FERMENTASI INDONESIA</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-slate-800/50">
              <span className="pixel-text text-sm text-yellow-400">TAPE KETAN</span>
              <p className="pixel-text text-xs text-gray-500 mt-1">Khamir</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50">
              <span className="pixel-text text-sm text-orange-400">TEMPE</span>
              <p className="pixel-text text-xs text-gray-500 mt-1">Rhizopus</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50">
              <span className="pixel-text text-sm text-red-400">ONCOM</span>
              <p className="pixel-text text-xs text-gray-500 mt-1">Neurospora</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50">
              <span className="pixel-text text-sm text-green-400">JAMUR TIRAM</span>
              <p className="pixel-text text-xs text-gray-500 mt-1">Pleurotus</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="pixel-text text-xs text-gray-500">
            Dibuat untuk edukasi biologi - Morfologi Jamur
          </p>
          <p className="pixel-text text-xs text-gray-600 mt-2">
            "Warisan ilmu tradisi untuk generasi mendatang"
          </p>
        </div>
      </div>
    </div>
  );
};
