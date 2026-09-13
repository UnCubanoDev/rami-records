import React from 'react';
import { X, User, Heart, Ticket, Music, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { Release } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  likedTracks: Release[];
  onPlayTrack: (track: Release) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  likedTracks,
  onPlayTrack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1e2020] rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-6 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 text-[#9ca3af] hover:text-white flex items-center justify-center"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-4 pb-5 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff5070] to-[#ffb2b9] text-[#67001e] flex items-center justify-center font-bold text-2xl shadow-xl shadow-[#ff5070]/20">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline font-bold text-xl text-white">
                Fan Rami VIP
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#ff5070]/20 text-[#ffb2b9] text-[10px] font-bold">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#9ca3af]">uncubanodev@gmail.com</p>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Acceso prioritario a lanzamientos y giras
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-4">
          <div className="bg-[#141616] p-3 rounded-xl text-center border border-white/5">
            <span className="text-lg font-bold text-[#ffb2b9] font-headline">
              {likedTracks.length}
            </span>
            <span className="block text-[11px] text-[#9ca3af]">Guardadas</span>
          </div>
          <div className="bg-[#141616] p-3 rounded-xl text-center border border-white/5">
            <span className="text-lg font-bold text-white font-headline">2</span>
            <span className="block text-[11px] text-[#9ca3af]">Entradas</span>
          </div>
          <div className="bg-[#141616] p-3 rounded-xl text-center border border-white/5">
            <span className="text-lg font-bold text-[#ff5070] font-headline">Nivel 4</span>
            <span className="block text-[11px] text-[#9ca3af]">Club Rami</span>
          </div>
        </div>

        {/* Liked Tracks list */}
        <div className="mt-2">
          <h4 className="text-xs uppercase tracking-wider text-[#ff5070] font-semibold mb-2 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-[#ff5070]" /> Tus Canciones Favoritas
          </h4>

          {likedTracks.length === 0 ? (
            <div className="p-4 bg-[#141616] rounded-xl text-center text-xs text-[#9ca3af]">
              Aún no has marcado canciones con me gusta. ¡Explora el catálogo y dale ❤️!
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
              {likedTracks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onPlayTrack(t);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 bg-[#141616] hover:bg-[#282a2b] rounded-xl border border-white/5 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.coverUrl}
                      alt={t.title}
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate group-hover:text-[#ffb2b9]">
                        {t.title}
                      </p>
                      <p className="text-[10px] text-[#9ca3af] truncate">{t.artist}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#ff5070] font-mono">{t.duration}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
