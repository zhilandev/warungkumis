import React, { useState } from 'react';
import { fungiDatabase } from '../data/fungi';
import type { FungiData } from '../types';

interface GalleryProps {
  onBack: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [selectedFungi, setSelectedFungi] = useState<FungiData | null>(null);
  const [filter, setFilter] = useState<'all' | 'khamir' | 'kapang' | 'cendawan'>('all');

  const filteredFungi = filter === 'all' 
    ? fungiDatabase 
    : fungiDatabase.filter(f => f.type === filter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'khamir': return 'text-yellow-400';
      case 'kapang': return 'text-orange-400';
      case 'cendawan': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'khamir': return 'Khamir (Yeast)';
      case 'kapang': return 'Kapang (Mould)';
      case 'cendawan': return 'Cendawan (Mushroom)';
      default: return type;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 border-b-4 border-amber-600 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="pixel-title text-2xl text-amber-400">GALERI JAMUR</h1>
          <button onClick={onBack} className="pixel-btn text-xs">
            KEMBALI
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {(['all', 'khamir', 'kapang', 'cendawan'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pixel-btn text-xs ${filter === f ? 'bg-amber-500' : ''}`}
            >
              {f === 'all' ? 'SEMUA' : getTypeLabel(f).toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFungi.map((fungi) => (
            <button
              key={fungi.id}
              onClick={() => setSelectedFungi(fungi)}
              className="pixel-panel p-4 hover:border-amber-400 transition-all text-left"
            >
              <img
                src={fungi.image}
                alt={fungi.name}
                className="w-full aspect-square object-contain mb-3"
                style={{ imageRendering: 'pixelated' }}
              />
              <p className="pixel-text text-xs text-amber-200">{fungi.name}</p>
              <p className={`pixel-text text-xs ${getTypeColor(fungi.type)}`}>
                {getTypeLabel(fungi.type)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedFungi && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedFungi(null)}
        >
          <div 
            className="pixel-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="pixel-title text-xl text-amber-400">{selectedFungi.name}</h2>
                <p className="pixel-text text-sm text-gray-400 italic">
                  {selectedFungi.scientificName}
                </p>
              </div>
              <button 
                onClick={() => setSelectedFungi(null)}
                className="pixel-btn text-xs px-3 py-1"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedFungi.image}
              alt={selectedFungi.name}
              className="w-48 h-48 object-contain mx-auto mb-4"
              style={{ imageRendering: 'pixelated' }}
            />

            <div className="mb-4">
              <span className={`pixel-text ${getTypeColor(selectedFungi.type)}`}>
                {getTypeLabel(selectedFungi.type)}
              </span>
            </div>

            <p className="pixel-text text-sm text-gray-300 mb-4">
              {selectedFungi.description}
            </p>

            <div>
              <h3 className="pixel-text text-sm text-amber-400 mb-2">Ciri-ciri:</h3>
              <ul className="space-y-1">
                {selectedFungi.features.map((feature, index) => (
                  <li key={index} className="pixel-text text-xs text-gray-400 flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
