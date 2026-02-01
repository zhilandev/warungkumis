import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string;
}

interface QuizMiniGameProps {
  act: 'act1' | 'act2' | 'act3' | 'act4';
  onComplete: (score: number, totalQuestions: number) => void;
}

const questionsByAct: Record<string, Question[]> = {
  act1: [
    {
      question: 'Apa ciri khas Khamir (Saccharomyces cerevisiae)?',
      options: [
        'Multiseluler dengan hifa berfilamen',
        'Uniseluler berbentuk oval dan bereproduksi bertunas',
        'Memiliki tubuh buah dengan tudung dan insang',
        'Berwarna hijau dan menghasilkan spora'
      ],
      correct: 1,
      explanation: 'Khamir adalah jamur uniseluler yang berbentuk oval dan bereproduksi dengan cara bertunas (budding).',
      image: '/assets/images/yeast.png'
    },
    {
      question: 'Bagaimana Khamir mengubah gula dalam fermentasi tape?',
      options: [
        'Gula menjadi asam laktat',
        'Gula menjadi alkohol dan CO₂',
        'Gula menjadi protein',
        'Gula menjadi lemak'
      ],
      correct: 1,
      explanation: 'Khamir mengubah gula menjadi alkohol dan karbon dioksida (CO₂) melalui proses fermentasi alkoholik.',
    },
    {
      question: 'Mengapa kontaminan berbahaya dalam fermentasi?',
      options: [
        'Membuat warna lebih cantik',
        'Dapat menghasilkan racun dan menyebabkan keracunan',
        'Mempercepat fermentasi',
        'Menambah rasa manis'
      ],
      correct: 1,
      explanation: 'Kontaminan seperti Aspergillus flavus dapat menghasilkan aflatoksin yang berbahaya bagi kesehatan.',
      image: '/assets/images/aspergillus.png'
    }
  ],
  act2: [
    {
      question: 'Apa yang membedakan Neurospora crassa (Oncom) dari jamur lain?',
      options: [
        'Hifa tidak bersekat dan berwarna putih',
        'Hifa bersekat (septate) dengan warna oranye-merah',
        'Uniseluler dan berbentuk oval',
        'Memiliki tubuh buah seperti payung'
      ],
      correct: 1,
      explanation: 'Neurospora crassa memiliki hifa yang bersekat (septate) dan berwarna oranye-merah khas.',
      image: '/assets/images/neurospora.png'
    },
    {
      question: 'Suhu optimal untuk pertumbuhan Neurospora crassa adalah?',
      options: [
        '15-20°C',
        '25-28°C',
        '30°C',
        '40-45°C'
      ],
      correct: 2,
      explanation: 'Suhu optimal untuk pertumbuhan Neurospora crassa adalah sekitar 30°C.',
    },
    {
      question: 'Mengapa Aspergillus flavus harus dihindari dalam fermentasi?',
      options: [
        'Warnanya tidak menarik',
        'Menghasilkan aflatoksin yang karsinogenik',
        'Pertumbuhannya terlalu lambat',
        'Bau tidak sedap'
      ],
      correct: 1,
      explanation: 'Aspergillus flavus menghasilkan aflatoksin, senyawa yang bersifat karsinogenik dan berbahaya.',
      image: '/assets/images/aspergillus.png'
    }
  ],
  act3: [
    {
      question: 'Jamur apa yang digunakan untuk membuat tempe?',
      options: [
        'Neurospora crassa',
        'Aspergillus flavus',
        'Rhizopus oryzae',
        'Saccharomyces cerevisiae'
      ],
      correct: 2,
      explanation: 'Rhizopus oryzae adalah kapang yang digunakan untuk fermentasi kedelai menjadi tempe.',
      image: '/assets/images/rhizopus.png'
    },
    {
      question: 'Apa ciri khas Rhizopus oryzae pada tempe yang matang?',
      options: [
        'Warna merah-oranye',
        'Sporangium hitam pada permukaan putih',
        'Bau asam yang kuat',
        'Tekstur lengket'
      ],
      correct: 1,
      explanation: 'Rhizopus oryzae memiliki miselium putih dengan sporangium hitam yang terlihat pada tempe yang matang.',
      image: '/assets/images/rhizopus.png'
    },
    {
      question: 'Mengapa produksi massal tempe lebih berisiko kontaminasi?',
      options: [
        'Bahan kedelai lebih sedikit',
        'Luas permukaan lebih besar dan eksposur udara',
        'Suhu lebih tinggi',
        'Waktu fermentasi lebih singkat'
      ],
      correct: 1,
      explanation: 'Produksi massal memiliki luas permukaan yang lebih besar dan lebih terbuka terhadap kontaminasi udara.',
    }
  ],
  act4: [
    {
      question: 'Jamur mana yang memiliki bentuk seperti tiram dengan insang putih?',
      options: [
        'Auricularia polytricha',
        'Pleurotus ostreatus',
        'Flammulina filiformis',
        'Rhizopus oryzae'
      ],
      correct: 1,
      explanation: 'Pleurotus ostreatus (Jamur Tiram) memiliki tudung berbentuk tiram dengan insang putih di bawahnya.',
      image: '/assets/images/pleurotus.png'
    },
    {
      question: 'Ciri khas Jamur Kuping (Auricularia polytricha) adalah?',
      options: [
        'Batang panjang putih',
        'Bentuk seperti kuping dengan tekstur kenyal',
        'Tudung berbentuk tiram',
        'Berwarna hijau lumut'
      ],
      correct: 1,
      explanation: 'Jamur Kuping memiliki bentuk seperti kuping manusia dengan tekstur kenyal dan berwarna coklat tua.',
      image: '/assets/images/auricularia.png'
    },
    {
      question: 'Apa perbedaan utama Kapang dan Cendawan?',
      options: [
        'Kapang lebih besar dari Cendawan',
        'Kapang: hifa tanpa tubuh buah jelas; Cendawan: memiliki tubuh buah (basidiokarp)',
        'Kapang berwarna, Cendawan tidak berwarna',
        'Tidak ada perbedaan'
      ],
      correct: 1,
      explanation: 'Kapang terdiri dari hifa filamentus tanpa tubuh buah yang jelas, sedangkan Cendawan memiliki tubuh buah (basidiokarp) yang terlihat.',
    },
    {
      question: 'Apa itu Lichen?',
      options: [
        'Sejenis jamur beracun',
        'Simbiosis mutualisme antara algae dan fungi',
        'Bakteri pengurai',
        'Virus yang menginfeksi jamur'
      ],
      correct: 1,
      explanation: 'Lichen adalah simbiosis mutualisme antara algae (yang melakukan fotosintesis) dan fungi (yang menyediakan struktur dan perlindungan).',
    }
  ]
};

export const QuizMiniGame: React.FC<QuizMiniGameProps> = ({ act, onComplete }) => {
  const questions = questionsByAct[act] || questionsByAct.act1;
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      const finalScore = score + (isCorrect ? 10 : 0);
      onComplete(finalScore, questions.length);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">KUIS EDUKASI</span>
          </div>
          <div className="pixel-panel">
            <span className="pixel-text">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <span className="pixel-text text-amber-400">Skor: {score}</span>
        </div>

        {/* Question Image */}
        {question.image && (
          <div className="flex justify-center mb-4">
            <img
              src={question.image}
              alt="Question"
              className="w-32 h-32 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}

        {/* Question */}
        <div className="pixel-panel mb-4">
          <p className="pixel-text text-lg text-white mb-4">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full pixel-panel text-left p-3 transition-all ${
                  showResult
                    ? index === question.correct
                      ? 'border-green-500 bg-green-900/30'
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-900/30'
                        : 'opacity-50'
                    : 'hover:border-amber-400 cursor-pointer'
                }`}
              >
                <span className="pixel-text text-sm">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`pixel-panel mb-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className={`pixel-text mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Benar! ✅' : 'Salah! ❌'}
            </p>
            <p className="pixel-text text-sm text-gray-300">
              {question.explanation}
            </p>
            <button onClick={handleNext} className="pixel-btn mt-4 w-full">
              {currentQ < questions.length - 1 ? 'SOAL BERIKUTNYA' : 'SELESAI'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
