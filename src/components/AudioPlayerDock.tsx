import React, { useState } from 'react';
import {
  Play,
  Pause,
  Heart,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  X,
  Music2
} from 'lucide-react';
import { Release } from '../types';

interface AudioPlayerDockProps {
  currentTrack: Release;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  isLiked: boolean;
  onToggleLike: (trackId: string) => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  currentTime,
  duration,
  onSeek,
  isLiked,
  onToggleLike,
  volume,
  onChangeVolume,
  isVisible,
  onClose,
  onOpen,
  isMinimized,
  onToggleMinimize,
}) => {
  const [showVolume, setShowVolume] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  // Case 1: Player is hidden completely -> Show subtle, unobtrusive floating bubble in corner
  if (!isVisible) {
    return (
      <button
        id="reopen-player-btn"
        onClick={onOpen}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-8 z-40 bg-[#1e2020]/95 hover:bg-[#282a2b] text-[#e2e2e2] backdrop-blur-xl px-3.5 py-2 rounded-full border border-[#ff5070]/30 shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
        title="Mostrar reproductor de música"
        aria-label="Mostrar reproductor de música"
      >
        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#121414] shrink-0 border border-white/10">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#ff5070] animate-ping" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Music2 className="w-3.5 h-3.5 text-[#ff5070]" />
          <span className="text-xs font-semibold max-w-[110px] sm:max-w-[140px] truncate text-white">
            {currentTrack.title}
          </span>
        </div>
        <span className="text-[10px] bg-[#ff5070]/20 text-[#ffb2b9] px-2 py-0.5 rounded-full font-bold">
          {isPlaying ? 'Sonando' : 'Pausa'}
        </span>
      </button>
    );
  }

  // Case 2: Minimized compact pill mode -> Never blocks bottom buttons/forms
  if (isMinimized) {
    return (
      <div
        id="audio-player-dock-minimized"
        className="fixed bottom-20 md:bottom-6 right-3 md:right-8 z-40 bg-[#1e2020]/95 backdrop-blur-xl py-2 px-3 rounded-2xl shadow-2xl border border-[#ff5070]/30 flex items-center gap-2.5 transition-all duration-300 max-w-[calc(100vw-1.5rem)] sm:max-w-md animate-fadeIn"
      >
        {/* Cover with mini equalizer */}
        <div
          onClick={onToggleMinimize}
          className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#121414] shrink-0 border border-white/10 cursor-pointer"
          title="Expandir reproductor"
        >
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
              <span className="w-1 h-2.5 bg-[#ffb2b9] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-3.5 bg-[#ffb2b9] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-2 bg-[#ffb2b9] rounded-full animate-bounce" />
            </div>
          )}
        </div>

        {/* Title & Artist (clickable to expand) */}
        <div
          onClick={onToggleMinimize}
          className="flex flex-col min-w-0 max-w-[130px] sm:max-w-[190px] cursor-pointer"
          title="Expandir reproductor"
        >
          <span className="text-xs font-semibold text-white truncate hover:text-[#ffb2b9] transition-colors">
            {currentTrack.title}
          </span>
          <span className="text-[10px] text-[#9ca3af] truncate">
            {currentTrack.artist}
          </span>
        </div>

        {/* Play/Pause mini button */}
        <button
          id="minimized-play-pause-btn"
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-[#ff5070] text-[#67001e] flex items-center justify-center shadow-md shadow-[#ff5070]/30 hover:scale-105 active:scale-95 transition-all shrink-0 ml-1"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Expand button */}
        <button
          id="expand-player-btn"
          onClick={onToggleMinimize}
          className="w-7 h-7 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
          title="Expandir controles completos"
          aria-label="Expandir controles"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Close/Hide button */}
        <button
          id="close-player-btn"
          onClick={onClose}
          className="w-7 h-7 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
          title="Ocultar reproductor"
          aria-label="Ocultar reproductor"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Case 3: Fully Expanded Dock (with header buttons to minimize/close, and non-intrusive container)
  return (
    <div
      id="audio-player-dock"
      className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-72 md:right-8 z-40 bg-[#1e2020]/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#ff5070]/20 max-w-4xl mx-auto transition-all duration-300 animate-fadeIn"
    >
      {/* Top action row with minimize and close controls */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-[#ffb2b9] font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#ff5070] animate-pulse" />
          <span>Rami Records • Reproductor Oficial</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            id="dock-minimize-btn"
            onClick={onToggleMinimize}
            className="flex items-center gap-1 text-[11px] text-[#9ca3af] hover:text-white px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors"
            title="Minimizar reproductor para ver la pantalla completa"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Minimizar</span>
          </button>
          <button
            id="dock-close-btn"
            onClick={onClose}
            className="w-6 h-6 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Cerrar reproductor"
            aria-label="Cerrar reproductor"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#121414] shrink-0 border border-white/5">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                <span className="w-1 h-3 bg-[#ffb2b9] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-4 bg-[#ffb2b9] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-2 bg-[#ffb2b9] rounded-full animate-bounce"></span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-headline font-semibold text-xs sm:text-base text-[#e2e2e2] truncate">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] sm:text-sm text-[#9ca3af] truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Previous */}
          <button
            id="audio-prev-btn"
            onClick={onPrevTrack}
            className="flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-[#9ca3af] hover:text-[#e2e2e2] hover:bg-white/5 transition-all"
            title="Pista anterior"
            aria-label="Pista anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Like button */}
          <button
            id="audio-like-btn"
            onClick={() => onToggleLike(currentTrack.id)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
              isLiked ? 'text-[#ff5070]' : 'text-[#9ca3af] hover:text-[#e2e2e2]'
            }`}
            title={isLiked ? 'Guardado en favoritos' : 'Añadir a favoritos'}
            aria-label="Me gusta"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Play/Pause Main Button */}
          <button
            id="play-pause-btn"
            onClick={onTogglePlay}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ff5070] text-[#67001e] flex items-center justify-center shadow-lg shadow-[#ff5070]/30 hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
            aria-label={isPlaying ? 'Pausar reproducción' : 'Iniciar reproducción'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            id="audio-next-btn"
            onClick={onNextTrack}
            className="flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-[#9ca3af] hover:text-[#e2e2e2] hover:bg-white/5 transition-all"
            title="Siguiente pista"
            aria-label="Siguiente pista"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Volume toggle */}
          <div className="relative hidden md:block">
            <button
              id="audio-volume-toggle"
              onClick={() => setShowVolume(!showVolume)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#9ca3af] hover:text-[#e2e2e2] hover:bg-white/5 transition-all"
              title="Volumen"
              aria-label="Control de volumen"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {showVolume && (
              <div className="absolute bottom-12 right-0 bg-[#282a2b] p-3 rounded-xl shadow-xl border border-white/10 flex flex-col items-center gap-2 w-28">
                <span className="text-[10px] text-[#9ca3af]">{Math.round(volume * 100)}%</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#121414] rounded-lg appearance-none cursor-pointer accent-[#ff5070]"
                  aria-label="Ajustar volumen"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress scrubber */}
      <div className="flex flex-col gap-1 mt-2">
        <div
          id="audio-progress-container"
          onClick={handleProgressBarClick}
          className="w-full h-1.5 sm:h-2 bg-[#121414] rounded-full overflow-hidden relative cursor-pointer group"
          role="progressbar"
          aria-valuenow={currentTime}
          aria-valuemin={0}
          aria-valuemax={duration}
          tabIndex={0}
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#ff5070] rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute top-0 bottom-0 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity -ml-1 top-1/2 -translate-y-1/2"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#9ca3af] font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};
