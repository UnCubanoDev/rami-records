import React, { useState } from 'react';
import { Shuffle, Play, Plus, Check, Volume2, Disc, Filter } from 'lucide-react';
import { Release } from '../types';

interface MusicViewProps {
  releases: Release[];
  onPlayRelease: (release: Release) => void;
  currentPlayingId?: string;
  isPlaying?: boolean;
}

export const MusicView: React.FC<MusicViewProps> = ({
  releases,
  onPlayRelease,
  currentPlayingId,
  isPlaying,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'Todos' | 'Singles' | 'EPs' | 'Albums' | 'Featured'>('Todos');
  const [playlistAddedId, setPlaylistAddedId] = useState<string | null>(null);

  const filters = ['Todos', 'Singles', 'EPs', 'Albums', 'Featured'] as const;

  const featuredRelease = releases.find((r) => r.featured) || releases[0];

  const filteredReleases = releases.filter((r) => {
    if (selectedFilter === 'Todos') return true;
    if (selectedFilter === 'Singles') return r.type === 'Single';
    if (selectedFilter === 'EPs') return r.type === 'EP';
    if (selectedFilter === 'Albums') return r.type === 'Album';
    if (selectedFilter === 'Featured') return r.featured;
    return true;
  });

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * releases.length);
    onPlayRelease(releases[randomIndex]);
  };

  const handleAddToPlaylist = (releaseId: string) => {
    setPlaylistAddedId(releaseId);
    setTimeout(() => {
      setPlaylistAddedId(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full pb-40 sm:pb-48 md:pb-36 gap-6">
      {/* Header & Shuffle button */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-bold text-3xl sm:text-5xl text-white tracking-tight">
              MUSIC
            </h1>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              Explora los lanzamientos exclusivos de Rami Records.
            </p>
          </div>

          <button
            id="music-shuffle-btn"
            onClick={handleShuffle}
            className="w-12 h-12 rounded-full bg-[#ff5070] flex items-center justify-center text-[#67001e] shadow-lg shadow-[#ff5070]/30 hover:scale-105 active:scale-95 transition-all shrink-0"
            title="Reproducción aleatoria"
            aria-label="Reproducción aleatoria"
          >
            <Shuffle className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((fil) => {
            const isActive = selectedFilter === fil;
            return (
              <button
                key={fil}
                id={`music-filter-${fil.toLowerCase()}`}
                onClick={() => setSelectedFilter(fil)}
                className={`px-5 py-2 rounded-full text-xs font-headline font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ff5070] text-[#67001e] shadow-md shadow-[#ff5070]/20'
                    : 'bg-[#1e2020] text-[#a3a3a3] hover:text-[#e2e2e2] hover:bg-[#282a2b]'
                }`}
              >
                {fil}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Album Hero Card */}
      {featuredRelease && (
        <div
          id="featured-album-hero"
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e2020] border border-white/5 group shadow-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
            style={{ backgroundImage: `url('${featuredRelease.coverUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/50 to-transparent" />

          <div className="relative p-6 sm:p-10 flex flex-col justify-end min-h-[340px] sm:min-h-[380px]">
            <span className="px-3.5 py-1 rounded-full bg-[#ff5070] text-[#67001e] text-[11px] font-headline font-bold tracking-wider w-max mb-3 uppercase">
              FEATURED ALBUM
            </span>

            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white mb-1">
              {featuredRelease.title}
            </h2>

            <p className="text-sm sm:text-base text-[#a3a3a3] mb-5">
              {featuredRelease.artist} • {featuredRelease.year} {featuredRelease.tracksCount ? `• ${featuredRelease.tracksCount} Canciones` : ''}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="play-featured-album-btn"
                onClick={() => onPlayRelease(featuredRelease)}
                className="px-6 py-3 rounded-full bg-[#ff5070] text-[#67001e] font-headline font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#ff5070]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Escuchar Ahora</span>
              </button>

              <button
                id="add-featured-playlist-btn"
                onClick={() => handleAddToPlaylist(featuredRelease.id)}
                className="px-6 py-3 rounded-full bg-[#282a2b]/80 backdrop-blur-md text-white font-headline font-semibold text-xs sm:text-sm hover:bg-[#333535] transition-all flex items-center gap-2 border border-white/10"
              >
                {playlistAddedId === featuredRelease.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">¡Añadido a Playlist!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Añadir a Playlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Music Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline font-bold text-xl text-white">
            Catálogo Rami Records
          </h2>
          <span className="text-xs text-[#9ca3af]">
            {filteredReleases.length} lanzamientos
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredReleases.map((rel) => {
            const isThisPlaying = isPlaying && currentPlayingId === rel.id;
            return (
              <div
                key={rel.id}
                id={`release-card-${rel.id}`}
                onClick={() => onPlayRelease(rel)}
                className="flex flex-col gap-2.5 bg-[#1e2020] rounded-2xl p-3 hover:bg-[#282a2b] transition-all group border border-white/5 cursor-pointer shadow-md"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#141616]">
                  <img
                    src={rel.coverUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <button
                      className="w-11 h-11 rounded-full bg-[#ff5070] text-[#67001e] flex items-center justify-center shadow-lg shadow-[#ff5070]/30 transform group-hover:scale-110 transition-transform"
                      aria-label={`Reproducir ${rel.title}`}
                    >
                      {isThisPlaying ? (
                        <Volume2 className="w-5 h-5 animate-pulse" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="px-0.5">
                  <h3 className="font-headline font-bold text-sm sm:text-base text-[#e2e2e2] truncate group-hover:text-[#ffb2b9] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] truncate">{rel.artist}</p>
                  <span className="text-[10px] font-semibold text-[#ff5070] mt-1 block">
                    {rel.year} • {rel.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
