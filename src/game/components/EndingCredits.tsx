import React from 'react';

interface EndingCreditsProps {
  playerName: string;
  playerClass: string;
  totalScore: number;
  totalQuestions: number;
  onReturnToMenu: () => void;
}

const creators = [
  'Zhilan',
  'Anindya', 
  'Mahardika',
  'Meisya',
  'Ariezka',
  'Azzkha',
  'Alya'
];

interface EndingConfig {
  title: string;
  subtitle: string;
  message: string;
  quote: string;
  color: string;
  bgColor: string;
}

const getEndingConfig = (percentage: number): EndingConfig => {
  if (percentage >= 80) {
    // Perfect Ending - All correct or almost all
    return {
      title: 'SELAMAT! 🌟',
      subtitle: 'ENDING SEMPURNA',
      message: 'Kamu telah menguasai ilmu jamur dengan sangat baik! Warung Fermentasi Mbah Kumis berkembang pesat dan menjadi pusat edukasi fermentasi di kampung. Kakek bangga melihat keberhasilanmu.',
      quote: '"Ilmu yang baik adalah ilmu yang dibagikan."',
      color: 'text-amber-400',
      bgColor: 'from-amber-900/30',
    };
  } else if (percentage >= 60) {
    // Good Ending - Most correct
    return {
      title: 'HEBAT! ⭐',
      subtitle: 'ENDING BAIK',
      message: 'Kamu berhasil menyelamatkan Warung Fermentasi Mbah Kumis! Meskipun masih ada yang perlu dipelajari, usahamu telah membawa keberhasilan. Warung tetap berdiri dan melayani pelanggan setia.',
      quote: '"Setiap kegagalan adalah awal dari kesuksesan."',
      color: 'text-green-400',
      bgColor: 'from-green-900/30',
    };
  } else if (percentage >= 40) {
    // Neutral Ending - Half correct
    return {
      title: 'BAGUS! 📖',
      subtitle: 'ENDING CUKUP',
      message: 'Warung Fermentasi berhasil bertahan, tapi dengan kesulitan. Kamu menyadari bahwa masih banyak yang harus dipelajari tentang jamur. Raka memutuskan untuk belajar lebih giat.',
      quote: '"Belajar tidak pernah berakhir."',
      color: 'text-blue-400',
      bgColor: 'from-blue-900/30',
    };
  } else {
    // Bad Ending - Too many wrong
    return {
      title: 'JANGAN MENYERAH! 💪',
      subtitle: 'ENDING PERLU BELAJAR LAGI',
      message: 'Sayangnya, banyak jawaban yang salah menyebabkan masalah dalam fermentasi. Warung mengalami kesulitan dan Raka harus belajar dari awal. Tapi kegagalan adalah guru terbaik!',
      quote: '"Kegagalan adalah batu loncatan menuju kesuksesan."',
      color: 'text-red-400',
      bgColor: 'from-red-900/30',
    };
  }
};

export const EndingCredits: React.FC<EndingCreditsProps> = ({
  playerName,
  playerClass,
  totalScore,
  totalQuestions,
  onReturnToMenu,
}) => {
  const percentage = totalQuestions > 0 ? Math.round((totalScore / (totalQuestions * 10)) * 100) : 0;
  const ending = getEndingConfig(percentage);

  return (
    <div className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/images/title-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            imageRendering: 'pixelated',
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${ending.bgColor} via-slate-900/90 to-slate-900`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Ending Type Badge */}
        <div className={`pixel-panel mb-4 border-2 ${ending.color.replace('text', 'border')}`}>
          <span className={`pixel-text text-sm ${ending.color}`}>{ending.subtitle}</span>
        </div>

        {/* Thank You Message */}
        <div className="text-center mb-6">
          <h1 className={`pixel-title text-3xl ${ending.color} mb-4`}>
            {ending.title}
          </h1>
          <div className="pixel-panel inline-block mb-4">
            <p className="pixel-text text-lg text-white">
              {playerName}
            </p>
            <p className="pixel-text text-sm text-gray-400">
              Kelas {playerClass}
            </p>
          </div>
        </div>

        {/* Score Display */}
        <div className="pixel-panel mb-6 text-center">
          <p className="pixel-text text-sm text-gray-400 mb-2">SKOR AKHIR</p>
          <p className={`pixel-title text-4xl ${ending.color}`}>
            {totalScore} / {totalQuestions * 10}
          </p>
          <p className="pixel-text text-lg text-gray-300 mt-2">
            {percentage}% Benar
          </p>
        </div>

        {/* Ending Message */}
        <div className="pixel-panel max-w-lg w-full mb-6 text-center">
          <p className="pixel-text text-sm text-gray-300 leading-relaxed">
            {ending.message}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className={`pixel-text text-xs ${ending.color}`}>
              {ending.quote}
            </p>
          </div>
        </div>

        {/* Creators Section */}
        <div className="text-center mb-6">
          <h2 className="pixel-subtitle text-lg text-amber-200 mb-4">
            DIBUAT OLEH
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="pixel-panel px-3 py-1"
              >
                <span className="pixel-text text-xs text-amber-400">{creator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <button
          onClick={onReturnToMenu}
          className="pixel-btn pulse-glow"
        >
          KEMBALI KE MENU
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="pixel-text text-xs text-gray-600">
            Warung Fermentasi: Warisan Pak Kumis
          </p>
          <p className="pixel-text text-xs text-gray-700 mt-1">
            © 2025 - Game Edukasi Biologi
          </p>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${ending.color.replace('text', 'bg')}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};
