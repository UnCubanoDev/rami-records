import React, { useState } from 'react';
import { MapPin, ArrowRight, Mic, Search, Filter } from 'lucide-react';
import { Artist } from '../types';

interface ArtistsViewProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
  onOpenDemoModal: () => void;
}

export const ArtistsView: React.FC<ArtistsViewProps> = ({
  artists,
  onSelectArtist,
  onOpenDemoModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'urbano' | 'reparto' | 'reggaeton'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'urbano', label: 'Urbano' },
    { id: 'reparto', label: 'Reparto' },
    { id: 'reggaeton', label: 'Reggaetón' },
  ] as const;

  const filteredArtists = artists.filter((artist) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      artist.category === selectedCategory ||
      (selectedCategory === 'urbano' && artist.category === 'alt');

    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getProvince = (location: string) => {
    if (location.includes('Habana')) return 'La Habana';
    if (location.includes('Matanzas')) return 'Matanzas';
    if (location.includes('Santiago')) return 'Santiago';
    if (location.includes('Cienfuegos')) return 'Cienfuegos';
    return 'Cuba';
  };

  return (
    <div className="flex flex-col w-full pb-40 sm:pb-48 md:pb-36 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-headline font-bold text-3xl sm:text-4xl text-white">
          Artistas
        </h1>
        <p className="text-sm sm:text-base text-[#a3a3a3]">
          Una nueva generación de talento cubano.
        </p>
      </div>

      {/* Filter Buttons & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-artist-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-headline text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ff5070] text-[#67001e] shadow-md shadow-[#ff5070]/20'
                    : 'bg-[#1e2020] text-[#e2e2e2] hover:bg-[#282a2b]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar artista, género o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[#1e2020] border border-white/5 rounded-full text-xs text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#ff5070]"
          />
        </div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            id={`artist-card-${artist.id}`}
            onClick={() => onSelectArtist(artist)}
            className="flex flex-col bg-[#1e2020] rounded-2xl overflow-hidden group transition-all duration-300 hover:bg-[#282a2b] border border-white/5 shadow-lg cursor-pointer"
          >
            {/* Artist Cover Image */}
            <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#141616]">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-transparent to-transparent opacity-90" />
              
              {/* Province badge */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#121414]/80 backdrop-blur-md text-[#e2e2e2] text-[11px] font-semibold tracking-wide border border-white/5">
                {getProvince(artist.location)}
              </div>
            </div>

            {/* Info container */}
            <div className="flex flex-col p-5 gap-3 -mt-12 relative z-10">
              <div className="flex flex-col">
                <span className="font-headline text-xs font-bold text-[#ff5070] uppercase tracking-wider">
                  {artist.genre}
                </span>
                <h3 className="font-headline font-bold text-2xl text-white group-hover:text-[#ffb2b9] transition-colors">
                  {artist.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-xs text-[#a3a3a3] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff5070]" />
                  <span>{artist.location}</span>
                </span>

                <button
                  id={`btn-view-${artist.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectArtist(artist);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#ff5070] text-[#67001e] font-headline font-bold text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-[#ff5070]/20"
                >
                  <span>Ver artista</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArtists.length === 0 && (
        <div className="py-12 text-center bg-[#1e2020] rounded-2xl border border-white/5">
          <p className="text-sm text-[#a3a3a3]">
            No se encontraron artistas que coincidan con la búsqueda.
          </p>
        </div>
      )}

      {/* Demo Callout */}
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-gradient-to-b from-[#1e2020] to-[#141616] rounded-2xl border border-white/5 text-center gap-3 mt-4">
        <div className="w-14 h-14 rounded-full bg-[#ff5070]/15 flex items-center justify-center text-[#ff5070] mb-1">
          <Mic className="w-7 h-7" />
        </div>
        <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
          ¿Eres artista y buscas sello?
        </h3>
        <p className="text-xs sm:text-sm text-[#a3a3a3] max-w-md leading-relaxed">
          Envía tu demo y sé parte del movimiento de música urbana más vanguardista de Cuba.
        </p>
        <button
          id="artists-send-demo-btn"
          onClick={onOpenDemoModal}
          className="mt-2 px-7 py-3 rounded-xl bg-[#ff5070] text-[#67001e] font-headline font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#ff5070]/20"
        >
          Enviar Demo
        </button>
      </div>
    </div>
  );
};
