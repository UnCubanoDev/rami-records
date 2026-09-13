import React from 'react';
import { X, MapPin, Play, Calendar, Instagram, Music2, CheckCircle2, Sparkles } from 'lucide-react';
import { Artist, Release } from '../types';

interface ArtistDetailModalProps {
  artist: Artist | null;
  onClose: () => void;
  onPlayTrack: (trackName: string) => void;
  onBookArtist: (artistName: string) => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({
  artist,
  onClose,
  onPlayTrack,
  onBookArtist,
}) => {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1e2020] rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-auto animate-fadeIn">
        {/* Close Button */}
        <button
          id="close-artist-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image header */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-[#1e2020]/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff5070] text-[#67001e] text-xs font-bold uppercase tracking-wider">
                {artist.genre}
              </span>
              <span className="text-xs text-white/80 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#ff5070]" /> {artist.location}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white">
              {artist.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
              <span>🎧 {artist.monthlyListeners} oyentes mensuales</span>
              <span>•</span>
              <span className="text-[#ffb2b9] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Artista Exclusivo
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          {/* Bio */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#ff5070] font-semibold mb-2">
              Biografía
            </h3>
            <p className="text-sm text-[#e2e2e2] leading-relaxed">
              {artist.bio}
            </p>
          </div>

          {/* Top Tracks */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#ff5070] font-semibold mb-3 flex items-center gap-1.5">
              <Music2 className="w-4 h-4" /> Temas Principales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {artist.topTracks.map((track, idx) => (
                <div
                  key={idx}
                  onClick={() => onPlayTrack(track)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#141616] hover:bg-[#282a2b] border border-white/5 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs text-[#ff5070] font-mono font-bold w-4">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-medium text-white truncate group-hover:text-[#ffb2b9]">
                      {track}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#ff5070] group-hover:text-[#67001e] flex items-center justify-center transition-all shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
            <button
              id={`modal-book-artist-${artist.id}`}
              onClick={() => {
                onClose();
                onBookArtist(artist.name);
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#ff5070] text-[#67001e] font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff5070]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Solicitar Booking para {artist.name}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
