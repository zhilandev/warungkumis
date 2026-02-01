import React, { useState } from 'react';

interface PlayerFormProps {
  onSubmit: (name: string, className: string) => void;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Silakan masukkan nama Anda');
      return;
    }
    if (!className.trim()) {
      setError('Silakan masukkan kelas Anda');
      return;
    }
    
    onSubmit(name.trim(), className.trim());
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="pixel-title text-2xl text-amber-400 mb-2">
            SELAMAT DATANG
          </h1>
          <p className="pixel-text text-sm text-gray-400">
            Masukkan data Anda untuk memulai
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pixel-panel">
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="pixel-text text-xs text-amber-400 block mb-2">
                NAMA
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan nama Anda"
                className="w-full bg-slate-800 border-2 border-slate-600 p-3 pixel-text text-sm text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                style={{ fontFamily: 'VT323, monospace' }}
              />
            </div>

            {/* Class Input */}
            <div>
              <label className="pixel-text text-xs text-amber-400 block mb-2">
                KELAS
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setError('');
                }}
                placeholder="Contoh: X IPA 1"
                className="w-full bg-slate-800 border-2 border-slate-600 p-3 pixel-text text-sm text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                style={{ fontFamily: 'VT323, monospace' }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="pixel-text text-xs text-red-400 text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="pixel-btn w-full mt-4"
            >
              MULAI PETUALANGAN
            </button>
          </div>
        </form>

        {/* Game Info */}
        <div className="mt-6 text-center">
          <p className="pixel-text text-xs text-gray-500">
            Game Edukasi Biologi - Morfologi Jamur
          </p>
          <p className="pixel-text text-xs text-gray-600 mt-1">
            Durasi: 10-15 menit
          </p>
        </div>
      </div>
    </div>
  );
};
