import React, { useState } from 'react';
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
  Volume2,
  Trophy,
  Sliders,
  Ticket,
  Sparkles,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Quote,
  Award,
  X,
  Briefcase
} from 'lucide-react';
import {
  HERO_IMAGE,
  BOOKING_HERO_IMAGE,
  RAYMEL_AND_PARTNER_IMG,
  RAYMEL_AND_PARTNER_INFO,
  RAMI_DIVISIONS,
  RAMI_SPORT_IMG,
  RAMI_STUDIO_IMG,
} from '../data/mockData';
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
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-44 sm:pb-52 md:pb-40 gap-10">
      {/* ================= FLAGSHIP HERO: RAYMEL & PARTNER - LA CARA DE RAMI RECORDS ================= */}
      <section
        id="home-hero-section"
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#181a1a] via-[#141515] to-[#101111] border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10"
      >
        {/* Ambient background glow accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff5070]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Top Header & Platform Badges */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5070] animate-pulse" />
              <span className="text-xs font-headline font-bold text-[#ffb2b9] uppercase tracking-widest">
                DIRECCIÓN EJECUTIVA & FUNDADORES • EST. 2024
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-black text-white tracking-tight leading-none">
              RAMI <span className="text-[#ffb2b9]">RECORDS</span>
            </h1>
            <p className="text-sm sm:text-base text-[#9ca3af] mt-1.5 font-medium">
              Liderado y fundado por <span className="text-white font-bold">Raymel y su Partner</span>
            </p>
          </div>

          {/* Locations & Heritage Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#e2e2e2]">
              <MapPin className="w-3.5 h-3.5 text-[#ff5070]" />
              <span className="font-semibold text-white">La Habana</span>
              <span className="text-[#6b7280]">•</span>
              <span className="font-semibold text-white">Miami</span>
              <span className="text-[#6b7280]">•</span>
              <span className="font-semibold text-white">Madrid</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff5070]/10 border border-[#ff5070]/25 text-xs font-semibold text-[#ffb2b9]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5070]" />
              <span>Sello Oficial & Ecosistema</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Optical Balance between Founders Photo and Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Official Founders Photo - Front and Center of the Web (5 of 12 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div
              onClick={() => setIsPhotoLightboxOpen(true)}
              className="group relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#0d0e0e] border-2 border-white/15 shadow-2xl cursor-pointer transition-all duration-300 hover:border-[#ff5070] hover:shadow-2xl hover:shadow-[#ff5070]/20"
              title="Click para ver la foto oficial en alta resolución"
            >
              <img
                src={RAYMEL_AND_PARTNER_IMG}
                alt="Raymel y su Partner - La cara oficial de Rami Records"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Subtle gradient shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

              {/* Top Badge on image */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-headline font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                  RMR OFFICIAL
                </span>
                <span className="p-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#ff5070] transition-colors shadow">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-headline font-bold text-sm sm:text-base leading-tight">
                      Raymel & Partner
                    </h3>
                    <p className="text-[#ffb2b9] text-xs font-semibold">
                      Control Central • Rami Records HQ
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#ffb2b9] bg-[#ff5070]/20 border border-[#ff5070]/30 px-2 py-0.5 rounded">
                    Co-CEOs
                  </span>
                </div>
              </div>
            </div>

            {/* Click to expand prompt bar */}
            <div className="flex items-center justify-between px-2 text-xs text-[#9ca3af]">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5070]" />
                Emblema 3D RMR & Consola Sonora
              </span>
              <button
                onClick={() => setIsPhotoLightboxOpen(true)}
                className="text-[11px] font-semibold text-[#ffb2b9] hover:underline flex items-center gap-1"
              >
                <span>Ver foto completa</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Distributed Text & Executive Profiles (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* 1. Co-Founders Roles Breakdown (2-Column Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Raymel Card */}
              <div className="p-4 rounded-2xl bg-[#1a1c1c] border border-white/10 hover:border-[#ff5070]/40 transition-all flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#ff5070]/20 text-[#ff5070] font-headline font-bold text-sm flex items-center justify-center">
                      R
                    </span>
                    <span className="text-[10px] font-bold text-[#ff5070] bg-[#ff5070]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Fundador & CEO
                    </span>
                  </div>
                  <h4 className="text-base font-headline font-bold text-white">
                    Raymel
                  </h4>
                  <p className="text-xs text-[#ffb2b9] font-semibold mt-0.5">
                    A&R, Visión Creativa & Catálogo
                  </p>
                  <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                    Dirección artística y curaduría del sonido urbano cubano. Lidera la firma de talentos, producción musical de estudio y posicionamiento discográfico global.
                  </p>
                </div>
              </div>

              {/* Partner Card */}
              <div className="p-4 rounded-2xl bg-[#1a1c1c] border border-white/10 hover:border-[#00d2ff]/40 transition-all flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] font-headline font-bold text-sm flex items-center justify-center">
                      P
                    </span>
                    <span className="text-[10px] font-bold text-[#00d2ff] bg-[#00d2ff]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Co-Fundador & VP
                    </span>
                  </div>
                  <h4 className="text-base font-headline font-bold text-white">
                    Su Partner
                  </h4>
                  <p className="text-xs text-[#00d2ff] font-semibold mt-0.5">
                    Operaciones, Rami Sport & Booking
                  </p>
                  <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                    Estrategia corporativa y representación de atletas de élite en Rami Sport. Negociación de contratos internacionales, eventos en vivo y giras.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Inspirational Pull Quote */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border-l-4 border-[#ff5070] border-y border-r border-white/5 shadow-inner">
              <Quote className="w-5 h-5 text-[#ff5070] mb-1.5 opacity-80" />
              <p className="text-xs sm:text-sm text-[#f3f4f6] italic leading-relaxed font-normal">
                "{RAYMEL_AND_PARTNER_INFO.quote}"
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] font-headline font-bold text-[#ffb2b9]">
                  Raymel & Partner
                </span>
                <span className="text-[#6b7280] text-xs">•</span>
                <span className="text-[11px] text-[#9ca3af]">
                  Declaración fundacional de Rami Records
                </span>
              </div>
            </div>

            {/* 3. Bio & Strategic Trajectory Text */}
            <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
              {RAYMEL_AND_PARTNER_INFO.bio}
            </p>

            {/* 4. Strategic Impact Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {RAYMEL_AND_PARTNER_INFO.stats.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#121414] border border-white/5 flex flex-col justify-center"
                >
                  <span className="text-xl sm:text-2xl font-headline font-bold text-white">
                    {st.value}
                  </span>
                  <span className="text-[10px] text-[#9ca3af] leading-tight mt-0.5 uppercase tracking-wide font-medium">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 5. Executive Navigation & Ecosystem Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-artists-btn"
                onClick={() => onSelectTab('artistas')}
                className="py-3 px-6 bg-[#ff5070] text-[#67001e] font-headline font-bold text-xs sm:text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#ff5070]/20 flex items-center gap-2"
              >
                <span>Explorar Artistas</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-sport-btn"
                onClick={() => onSelectTab('sport')}
                className="py-3 px-5 bg-[#00d2ff]/20 text-[#00d2ff] hover:bg-[#00d2ff] hover:text-[#003b4d] font-headline font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 border border-[#00d2ff]/30"
              >
                <span>Rami Sport</span>
                <Trophy className="w-4 h-4" />
              </button>

              <button
                id="hero-studio-btn"
                onClick={() => onSelectTab('studio')}
                className="py-3 px-5 bg-[#282a2b]/80 backdrop-blur-md text-white font-headline font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#333535] transition-all flex items-center gap-2 border border-white/10"
              >
                <span>Estudio Atmos</span>
                <Sliders className="w-4 h-4 text-[#a855f7]" />
              </button>

              <button
                id="contact-founders-booking-btn"
                onClick={() => onSelectTab('booking')}
                className="py-3 px-5 bg-[#ffd000]/20 text-[#ffd000] hover:bg-[#ffd000] hover:text-[#4d3e00] font-headline font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 border border-[#ffd000]/30"
              >
                <span>Booking</span>
                <Ticket className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4 DIVISIONS FEATURING ECOSYSTEM ================= */}
      <section id="ecosistema-divisiones" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff5070]" />
              <h2 className="text-xl sm:text-2xl font-headline font-bold text-white uppercase tracking-wide">
                ECOSISTEMA RAMI RECORDS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-0.5">
              Descubre las cuatro ramas oficiales integradas en una sola plataforma.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#ffb2b9]">
            4 Divisiones Oficiales
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Division 1: Entertainment */}
          <div
            onClick={() => onSelectTab('musica')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#ff5070]/15 via-[#1e2020] to-[#141616] border border-[#ff5070]/30 hover:border-[#ff5070] transition-all cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-[#ff5070]/10"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#ff5070]/20 text-[#ff5070] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Disc className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#ff5070] uppercase tracking-wider block">
                División Musical
              </span>
              <h3 className="text-lg font-headline font-bold text-white mt-1 group-hover:text-[#ffb2b9] transition-colors">
                Rami Records Entertainment
              </h3>
              <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                El sello discográfico de la nueva ola urbana cubana. Álbumes, giras mundiales y streaming global.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#ffb2b9]">
              <span>Explorar Música</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Division 2: Sport */}
          <div
            onClick={() => onSelectTab('sport')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#00d2ff]/15 via-[#1e2020] to-[#141616] border border-[#00d2ff]/30 hover:border-[#00d2ff] transition-all cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-[#00d2ff]/10"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-wider block">
                División Deportiva
              </span>
              <h3 className="text-lg font-headline font-bold text-white mt-1 group-hover:text-[#00d2ff] transition-colors">
                Rami Records Sport
              </h3>
              <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                Representación de campeones mundiales y prospectos de Boxeo, MLB, MMA y alto rendimiento atlético.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#00d2ff]">
              <span>Ver Atletas Sport</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Division 3: Booking */}
          <div
            onClick={() => onSelectTab('booking')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#ffd000]/15 via-[#1e2020] to-[#141616] border border-[#ffd000]/30 hover:border-[#ffd000] transition-all cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-[#ffd000]/10"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#ffd000]/20 text-[#ffd000] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#ffd000] uppercase tracking-wider block">
                Contrataciones Oficiales
              </span>
              <h3 className="text-lg font-headline font-bold text-white mt-1 group-hover:text-[#ffd000] transition-colors">
                Rami Records Booking
              </h3>
              <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                Oficina de contratación para festivales, estadios, clubes y presentaciones privadas en América y Europa.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#ffd000]">
              <span>Solicitar Booking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Division 4: Studio */}
          <div
            onClick={() => onSelectTab('studio')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#a855f7]/15 via-[#1e2020] to-[#141616] border border-[#a855f7]/30 hover:border-[#a855f7] transition-all cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-[#a855f7]/10"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/20 text-[#a855f7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider block">
                Complejo de Grabación
              </span>
              <h3 className="text-lg font-headline font-bold text-white mt-1 group-hover:text-[#a855f7] transition-colors">
                Rami Records Studio
              </h3>
              <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                Consolas SSL & Neve, microfonía vintage Neumann y sonido espacial certificado Dolby Atmos 7.1.4.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#a855f7]">
              <span>Reservar Estudio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
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
            Lleva nuestros artistas y atletas a tu evento
          </h2>

          <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
            Disponibles para conciertos, festivales internacionales, veladas de combate y colaboraciones corporativas exclusivas.
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
      {/* ================= FOUNDERS PHOTO FULL-SCREEN LIGHTBOX MODAL ================= */}
      {isPhotoLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-fadeIn"
          onClick={() => setIsPhotoLightboxOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col bg-[#141616] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1c1c]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5070]" />
                <div>
                  <h3 className="text-sm font-headline font-bold text-white uppercase tracking-wider">
                    Foto Oficial de Dirección
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    Raymel y su Partner — Rami Records Headquarters
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPhotoLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with full-resolution display */}
            <div className="relative aspect-square w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={RAYMEL_AND_PARTNER_IMG}
                alt="Raymel y su Partner - Dirección Oficial Rami Records"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#181a1a] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#9ca3af]">
              <div>
                <p className="text-white font-semibold">
                  RMR • Rami Records Entertainment, Sport, Studio & Booking
                </p>
                <p className="text-[11px] text-[#6b7280]">
                  La Habana, Cuba • Miami, EE.UU. • Madrid, España
                </p>
              </div>
              <button
                onClick={() => setIsPhotoLightboxOpen(false)}
                className="px-4 py-2 bg-[#ff5070] text-[#67001e] font-headline font-bold rounded-xl text-center self-end sm:self-auto hover:bg-[#ffb2b9] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
