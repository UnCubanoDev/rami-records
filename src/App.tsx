/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TabType, Artist, Release, EventItem, BookingRequest, DemoSubmission, SportAthlete, StudioRoom } from './types';
import {
  INITIAL_ARTISTS,
  INITIAL_RELEASES,
  INITIAL_EVENTS,
  INITIAL_BOOKINGS,
  INITIAL_ATHLETES,
  INITIAL_STUDIO_ROOMS,
  DEFAULT_DOCK_TRACK,
  RAMI_DIVISIONS
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { HomeView } from './views/HomeView';
import { ArtistsView } from './views/ArtistsView';
import { MusicView } from './views/MusicView';
import { EventsView } from './views/EventsView';
import { BookingView } from './views/BookingView';
import { SportView } from './views/SportView';
import { StudioView } from './views/StudioView';
import { ArtistDetailModal } from './components/ArtistDetailModal';
import { DemoSubmissionModal } from './components/DemoSubmissionModal';
import { EventTicketModal } from './components/EventTicketModal';
import { ProfileModal } from './components/ProfileModal';
import { audioEngine } from './utils/audioEngine';
import { Disc, Trophy, Ticket, Sliders, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('inicio');

  // Data Collections
  const [artists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [releases] = useState<Release[]>(INITIAL_RELEASES);
  const [events] = useState<EventItem[]>(INITIAL_EVENTS);
  const [bookingPipeline, setBookingPipeline] = useState<BookingRequest[]>(INITIAL_BOOKINGS);
  const [athletes] = useState<SportAthlete[]>(INITIAL_ATHLETES);
  const [studioRooms] = useState<StudioRoom[]>(INITIAL_STUDIO_ROOMS);

  // Audio Playback State (Preset to 01:14 / 03:45 matching provided design screenshot)
  const [currentTrack, setCurrentTrack] = useState<Release>(DEFAULT_DOCK_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(74); // 01:14
  const [duration, setDuration] = useState<number>(225); // 03:45
  const [volume, setVolume] = useState<number>(0.8);
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(['midnight-echoes-ext', 'mala-influencia']);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState<boolean>(false);

  // Modals state
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [bookingPrefilledArtist, setBookingPrefilledArtist] = useState<string | undefined>(undefined);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Audio Progress Timer
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Audio Control Handlers
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play();
      setIsPlaying(true);
    }
  };

  const handlePlayRelease = (release: Release) => {
    if (currentTrack.id === release.id && isPlaying) {
      handleTogglePlay();
      return;
    }
    setCurrentTrack(release);
    setCurrentTime(0);
    setDuration(release.durationSeconds || 210);
    setIsPlayerVisible(true);
    audioEngine.play();
    setIsPlaying(true);
    showToast(`Reproduciendo: ${release.title}`);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(Math.floor(time));
  };

  const handleNextTrack = () => {
    const allTracks = [DEFAULT_DOCK_TRACK, ...releases];
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    handlePlayRelease(allTracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const allTracks = [DEFAULT_DOCK_TRACK, ...releases];
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length;
    handlePlayRelease(allTracks[prevIndex]);
  };

  const handleToggleLike = (trackId: string) => {
    setLikedTrackIds((prev) => {
      if (prev.includes(trackId)) {
        showToast('Eliminado de canciones favoritas');
        return prev.filter((id) => id !== trackId);
      } else {
        showToast('Guardado en tus canciones favoritas ❤️');
        return [...prev, trackId];
      }
    });
  };

  const handleChangeVolume = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  // Cross-Navigation Handlers
  const handleBookArtist = (artistName: string) => {
    setBookingPrefilledArtist(artistName);
    setActiveTab('booking');
    showToast(`Iniciando solicitud para ${artistName}`);
  };

  const handlePlayTrackName = (trackName: string) => {
    showToast(`Cargando tema: ${trackName}`);
    audioEngine.play();
    setIsPlaying(true);
  };

  const handleBookingSubmit = (newBooking: BookingRequest) => {
    setBookingPipeline((prev) => [newBooking, ...prev]);
    showToast('¡Solicitud de booking registrada en el pipeline!');
  };

  const handleDemoSubmit = (demo: DemoSubmission) => {
    showToast(`Demo "${demo.artistName}" enviada a A&R Rami Records`);
  };

  const likedTracksList = releases.filter((r) => likedTrackIds.includes(r.id));
  if (likedTrackIds.includes(DEFAULT_DOCK_TRACK.id) && !likedTracksList.some((t) => t.id === DEFAULT_DOCK_TRACK.id)) {
    likedTracksList.unshift(DEFAULT_DOCK_TRACK);
  }

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col antialiased selection:bg-[#ff5070]/30 selection:text-[#ffdadc]">
      {/* Responsive Lateral Sidebar (desktop) + Top/Bottom Nav (mobile) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        isPlaying={isPlaying}
        currentTrack={currentTrack}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full md:pl-64 transition-all duration-300">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-8 min-h-screen">
          
          {/* ================= PLATFORM DIVISIONS SELECTOR BAR ================= */}
          <div className="mb-6 p-2 rounded-2xl bg-[#181a1a] border border-white/5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shadow-sm">
            <div className="flex items-center gap-1.5 px-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#ff5070] animate-pulse" />
              <span className="text-[11px] font-headline font-bold text-[#9ca3af] uppercase tracking-wider hidden sm:inline">
                Ecosistema:
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-1 justify-end sm:justify-start">
              <button
                onClick={() => setActiveTab('musica')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'musica' || activeTab === 'artistas'
                    ? 'bg-[#ff5070] text-[#67001e] shadow-md shadow-[#ff5070]/20 font-bold'
                    : 'text-[#d1d5db] hover:bg-white/5'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Entertainment</span>
              </button>

              <button
                onClick={() => setActiveTab('sport')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'sport'
                    ? 'bg-[#00d2ff] text-[#003b4d] shadow-md shadow-[#00d2ff]/20 font-bold'
                    : 'text-[#d1d5db] hover:bg-white/5'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Sport</span>
              </button>

              <button
                onClick={() => setActiveTab('studio')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'studio'
                    ? 'bg-[#a855f7] text-white shadow-md shadow-[#a855f7]/20 font-bold'
                    : 'text-[#d1d5db] hover:bg-white/5'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('booking')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'booking'
                    ? 'bg-[#ffd000] text-[#4d3e00] shadow-md shadow-[#ffd000]/20 font-bold'
                    : 'text-[#d1d5db] hover:bg-white/5'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Booking</span>
              </button>
            </div>
          </div>

          {activeTab === 'inicio' && (
            <HomeView
              onSelectTab={setActiveTab}
              artists={artists}
              releases={releases}
              events={events}
              onPlayRelease={handlePlayRelease}
              onSelectArtist={(artist) => setSelectedArtist(artist)}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
              currentPlayingId={currentTrack.id}
              isPlaying={isPlaying}
            />
          )}

          {activeTab === 'artistas' && (
            <ArtistsView
              artists={artists}
              onSelectArtist={(artist) => setSelectedArtist(artist)}
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
            />
          )}

          {activeTab === 'musica' && (
            <MusicView
              releases={releases}
              onPlayRelease={handlePlayRelease}
              currentPlayingId={currentTrack.id}
              isPlaying={isPlaying}
            />
          )}

          {activeTab === 'sport' && (
            <SportView
              athletes={athletes}
              onSelectTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'studio' && (
            <StudioView
              studioRooms={studioRooms}
              onSelectTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'eventos' && (
            <EventsView
              events={events}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
            />
          )}

          {activeTab === 'booking' && (
            <BookingView
              initialArtist={bookingPrefilledArtist}
              bookingPipeline={bookingPipeline}
              onSubmitBooking={handleBookingSubmit}
            />
          )}
        </div>
      </main>

      {/* Dock Audio Player (matches screen 5 / interactive dock) */}
      <AudioPlayerDock
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLiked={likedTrackIds.includes(currentTrack.id)}
        onToggleLike={handleToggleLike}
        volume={volume}
        onChangeVolume={handleChangeVolume}
        isVisible={isPlayerVisible}
        onClose={() => setIsPlayerVisible(false)}
        onOpen={() => setIsPlayerVisible(true)}
        isMinimized={isPlayerMinimized}
        onToggleMinimize={() => setIsPlayerMinimized((prev) => !prev)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 md:top-6 right-4 z-50 bg-[#ff5070] text-[#67001e] px-4 py-2.5 rounded-xl font-headline font-bold text-xs sm:text-sm shadow-2xl shadow-[#ff5070]/40 animate-fadeIn border border-white/10 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <ArtistDetailModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        onPlayTrack={handlePlayTrackName}
        onBookArtist={handleBookArtist}
      />

      <EventTicketModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <DemoSubmissionModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSubmitDemo={handleDemoSubmit}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        likedTracks={likedTracksList}
        onPlayTrack={handlePlayRelease}
      />
    </div>
  );
}
