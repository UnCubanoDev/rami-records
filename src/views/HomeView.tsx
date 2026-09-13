import React from 'react';
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Disc,
  Users,
  ChevronRight,
  Megaphone,
  Send,
  Play,
  Flame,
  Volume2
} from 'lucide-react';
import { HERO_IMAGE, BOOKING_HERO_IMAGE } from '../data/mockData';
import { Artist, Release, EventItem, TabType } from '../types';

interface HomeViewProps {
  onSelectTab: (tab: TabType) => void;
  artists: Artist[];
  releases: Release[];
  events: EventItem[];
  onPlayRelease: (release: Release) => void;
  onSelectArtist: (artist: Artist) => void;
  onSelectEvent: (event: EventItem) => void;
  currentPlayingId?: string;
  isPlaying?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  artists,
  releases,
  events,
  onPlayRelease,
  onSelectArtist,
  onSelectEvent,
  currentPlayingId,
  isPlaying,
}) => {
  const latestReleases = releases.slice(1, 3); // Mala Influencia, Midnight Havana
  const previewArtists = artists.slice(0, 2); // Klay J, Badkat
  const upcomingEvents = events.slice(2, 4); // Rami Fest Live, Club Showcase

  return (
    <div className="flex flex-col w-full pb-40 sm:pb-48 md:pb-36 gap-8">
      {/* ================= CINEMATIC HERO SECTION ================= */}
      <section
        id="home-hero-section"
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e2020] flex flex-col justify-end p-6 sm:p-10 min-h-[460px] sm:min-h-[520px] shadow-2xl"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/70 to-transparent" />

        <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5070] animate-pulse" />
            <span className="text-xs text-[#ffb2b9] tracking-widest font-semibold uppercase">
              Est. 2024 • La Habana
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-bold text-white tracking-tight leading-tight sm:leading-none">
            RAMI RECORDS{' '}
            <span className="text-[#ffb2b9]">ENTERTAINMENT</span>
          </h1>

          <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed">
            Music. Artists. Culture. Redefining the urban soundscape with unmatched passion.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
            <button
              id="hero-explore-artists-btn"
              onClick={() => onSelectTab('artistas')}
              className="py-3 px-6 bg-[#ff5070] text-[#67001e] font-headline font-bold text-sm rounded-xl text-center shadow-lg shadow-[#ff5070]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Explorar artistas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-booking-btn"
              onClick={() => onSelectTab('booking')}
              className="py-3 px-6 bg-[#282a2b]/80 backdrop-blur-md text-white font-headline font-semibold text-sm rounded-xl text-center hover:bg-[#333535] transition-all flex items-center justify-center gap-2 border border-white/5"
            >
              <span>Booking</span>
              <CalendarIcon className="w-4 h-4 text-[#ffb2b9]" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= MANIFIESTO SECTION ================= */}
      <section id="home-manifesto-section" className="flex flex-col gap-2 px-1">
        <span className="text-xs text-[#ff5070] tracking-widest font-bold uppercase">
          Manifiesto
        </span>
        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#e2e2e2]">
          Una nueva generación de música urbana cubana.
        </h2>
        <p className="text-sm sm:text-base text-[#a3a3a3] max-w-3xl leading-relaxed">
          Rompiendo esquemas sonoros desde el corazón del Caribe hacia el mundo entero. Autenticidad, poder y líricas que conectan.
        </p>
      </section>

      {/* ================= LATEST RELEASES SECTION ================= */}
      <section id="home-releases-section" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#ff5070]" />
            <h2 className="text-lg sm:text-xl font-headline font-bold text-[#e2e2e2] tracking-wide uppercase">
              LATEST RELEASES
            </h2>
          </div>
          <button
            id="view-all-releases-btn"
            onClick={() => onSelectTab('musica')}
            className="text-xs font-semibold text-[#ffb2b9] hover:underline"
          >
            Ver todo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestReleases.map((rel) => {
            const isThisPlaying = isPlaying && currentPlayingId === rel.id;
            return (
              <div
                key={rel.id}
                onClick={() => onPlayRelease(rel)}
                className="flex items-center gap-4 p-3 rounded-xl bg-[#1e2020] hover:bg-[#282a2b] transition-all border border-white/5 cursor-pointer group"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#141616]">
                  <img
                    src={rel.coverUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-[#ff5070] text-[#67001e] flex items-center justify-center shadow">
                      {isThisPlaying ? (
                        <Volume2 className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-[#ff5070] uppercase tracking-wider">
                    {rel.type.toUpperCase()} • {rel.year} {rel.tracksCount ? `• ${rel.tracksCount} TRACKS` : ''}
                  </span>
                  <h3 className="text-sm sm:text-base font-headline font-bold text-[#e2e2e2] truncate group-hover:text-[#ffb2b9]">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] truncate">{rel.artist}</p>
                </div>

                <span className="text-xs text-[#a3a3a3] pr-2 shrink-0">
                  {rel.releaseDateText}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ARTISTS SECTION ================= */}
      <section id="home-artists-section" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#ff5070]" />
            <h2 className="text-lg sm:text-xl font-headline font-bold text-[#e2e2e2] tracking-wide uppercase">
              ARTISTS
            </h2>
          </div>
          <button
            id="view-all-artists-btn"
            onClick={() => onSelectTab('artistas')}
            className="text-xs font-semibold text-[#ffb2b9] hover:underline"
          >
            Ver roster
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {previewArtists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => onSelectArtist(artist)}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#1e2020] flex flex-col justify-end p-4 sm:p-5 group cursor-pointer border border-white/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${artist.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/40 to-transparent" />

              <div className="relative z-10">
                <span className="text-[10px] sm:text-xs font-bold text-[#ff5070] tracking-wider uppercase block">
                  {artist.genre}
                </span>
                <h3 className="text-lg sm:text-2xl font-headline font-bold text-white group-hover:text-[#ffb2b9] transition-colors">
                  {artist.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= UPCOMING EVENTS SECTION ================= */}
      <section id="home-events-section" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#ff5070]" />
            <h2 className="text-lg sm:text-xl font-headline font-bold text-[#e2e2e2] tracking-wide uppercase">
              UPCOMING
            </h2>
          </div>
          <button
            id="view-all-events-btn"
            onClick={() => onSelectTab('eventos')}
            className="text-xs font-semibold text-[#ffb2b9] hover:underline"
          >
            Calendario
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => onSelectEvent(ev)}
              className="p-4 rounded-xl bg-[#1e2020] hover:bg-[#282a2b] flex items-center justify-between border border-white/5 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex flex-col items-center justify-center bg-[#ff5070] text-[#67001e] rounded-xl p-2 w-12 h-12 shrink-0 font-headline font-bold">
                  <span className="text-[10px] uppercase tracking-wider">{ev.monthBadge}</span>
                  <span className="text-lg leading-none">{ev.dayBadge}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-headline font-bold text-white truncate group-hover:text-[#ffb2b9]">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] truncate">{ev.location}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#ff5070] group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOOKING CALLOUT SECTION ================= */}
      <section
        id="home-booking-callout"
        className="relative rounded-2xl md:rounded-3xl overflow-hidden p-6 sm:p-10 bg-[#1e2020] flex flex-col items-center text-center gap-4 mt-2 border border-white/5"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${BOOKING_HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-[#121414]/80 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col items-center gap-2 max-w-lg">
          <div className="w-12 h-12 rounded-full bg-[#ff5070]/20 text-[#ff5070] flex items-center justify-center mb-1">
            <Megaphone className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white">
            Lleva nuestros artistas a tu próximo evento
          </h2>

          <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
            Disponibles para conciertos, festivales, giras internacionales y colaboraciones exclusivas.
          </p>

          <button
            id="home-cta-booking-btn"
            onClick={() => onSelectTab('booking')}
            className="mt-3 w-full sm:w-auto py-3.5 px-8 bg-[#ff5070] text-[#67001e] font-headline font-bold text-sm rounded-xl shadow-lg shadow-[#ff5070]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Solicitar booking</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
