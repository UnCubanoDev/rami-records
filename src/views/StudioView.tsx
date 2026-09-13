import React, { useState } from 'react';
import {
  Sliders,
  Mic2,
  Headphones,
  Music,
  Radio,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  Layers,
  ArrowRight,
  ShieldCheck,
  Disc
} from 'lucide-react';
import { StudioRoom, StudioBookingRequest, TabType } from '../types';
import { RAMI_STUDIO_IMG } from '../data/mockData';

interface StudioViewProps {
  studioRooms: StudioRoom[];
  onSelectTab: (tab: TabType) => void;
  onShowToast: (msg: string) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  studioRooms,
  onSelectTab,
  onShowToast,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<StudioRoom>(studioRooms[0]);
  const [bookingHours, setBookingHours] = useState<number>(4);
  const [bookingDate, setBookingDate] = useState<string>('2025-02-20');
  const [timeSlot, setTimeSlot] = useState<string>('14:00 - 18:00 (Tarde)');
  const [serviceType, setServiceType] = useState<'Grabación de Voces' | 'Mezcla & Master' | 'Producción Completa' | 'Dolby Atmos'>('Grabación de Voces');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const calculateTotal = () => {
    let rate = selectedRoom.hourlyRate;
    if (serviceType === 'Dolby Atmos') rate += 35;
    if (serviceType === 'Producción Completa') rate += 45;
    return rate * bookingHours;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      onShowToast('Por favor completa todos tus datos de contacto');
      return;
    }
    setIsBooked(true);
    onShowToast(`¡Sesión reservada en ${selectedRoom.name}!`);
  };

  return (
    <div className="flex flex-col w-full pb-44 sm:pb-52 md:pb-40 gap-8">
      {/* ================= HERO STUDIO BANNER ================= */}
      <section
        id="studio-hero-section"
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e2020] flex flex-col justify-end p-6 sm:p-10 min-h-[400px] sm:min-h-[480px] shadow-2xl border border-white/5"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
          style={{ backgroundImage: `url('${RAMI_STUDIO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/75 to-transparent" />

        <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="text-xs text-[#d8b4fe] tracking-widest font-semibold uppercase">
              Rami Records • Complejo de Grabación & Acústica
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
            RAMI RECORDS <span className="text-[#a855f7]">STUDIO</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1d5db] font-normal leading-relaxed">
            Ingeniería sonora de clase mundial en La Habana y Miami. Consolas analógicas SSL & Neve, salas flotantes con microfonía vintage y certificación oficial Dolby Atmos 7.1.4.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a
              href="#reservar-estudio"
              className="py-3 px-6 bg-[#a855f7] text-white font-headline font-bold text-sm rounded-xl text-center shadow-lg shadow-[#a855f7]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Reservar Sesión de Grabación</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#salas-estudio"
              className="py-3 px-6 bg-[#282a2b]/80 backdrop-blur-md text-white font-headline font-semibold text-sm rounded-xl text-center hover:bg-[#333535] transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <span>Explorar Salas & Equipamiento</span>
              <Sliders className="w-4 h-4 text-[#d8b4fe]" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= STUDIO PILLARS ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-xl sm:text-2xl font-headline font-bold text-[#a855f7]">Dolby Atmos</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Sonido Espacial 7.1.4</span>
          <span className="text-[11px] text-[#9ca3af]">Certificación oficial inmersiva</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-xl sm:text-2xl font-headline font-bold text-white">SSL & Neve</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Consolas Analógicas</span>
          <span className="text-[11px] text-[#9ca3af]">Calidez y pegada legendaria</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-xl sm:text-2xl font-headline font-bold text-[#a855f7]">Neumann & Sony</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Micrófonos a Válvula</span>
          <span className="text-[11px] text-[#9ca3af]">U87, C-800G, Telefunken</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-xl sm:text-2xl font-headline font-bold text-white">24/7 VIP</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Acceso Privado Lounge</span>
          <span className="text-[11px] text-[#9ca3af]">Privacidad total para talentos</span>
        </div>
      </section>

      {/* ================= STUDIO ROOMS SHOWCASE ================= */}
      <section id="salas-estudio" className="flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-[#a855f7]" />
            <h2 className="text-xl sm:text-2xl font-headline font-bold text-white uppercase tracking-wide">
              SALAS DE GRABACIÓN & MASTERIZACIÓN
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9ca3af] mt-0.5">
            Espacios diseñados acústicamente por ingenieros internacionales para el sonido urbano más contundente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {studioRooms.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-5 rounded-2xl bg-[#1e2020] border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-[#a855f7] shadow-xl shadow-[#a855f7]/15 bg-[#24222a]'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-[#141616]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-mono font-bold text-xs">
                      ${room.hourlyRate}/hora
                    </div>
                    {room.dolbyAtmos && (
                      <span className="absolute bottom-2 left-2 bg-[#a855f7] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        Dolby Atmos Certificado
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline font-bold text-lg text-white">
                    {room.name}
                  </h3>
                  <span className="text-xs text-[#a855f7] font-semibold block mb-2">
                    {room.type}
                  </span>

                  <div className="space-y-1.5 text-xs text-[#9ca3af] border-t border-white/5 pt-2">
                    <p><strong className="text-[#e2e2e2]">Consola:</strong> {room.console}</p>
                    <p><strong className="text-[#e2e2e2]">Monitores:</strong> {room.monitors}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {room.features.slice(0, 3).map((feat, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#d1d5db]">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoom(room);
                    const el = document.getElementById('reservar-estudio');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 rounded-xl font-headline font-bold text-xs text-center transition-all ${
                    isSelected
                      ? 'bg-[#a855f7] text-white shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isSelected ? '✓ Sala Seleccionada para Reserva' : 'Seleccionar esta Sala'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= INTERACTIVE BOOKING WIDGET ================= */}
      <section
        id="reservar-estudio"
        className="p-6 sm:p-10 rounded-3xl bg-[#1e2020] border border-[#a855f7]/30 shadow-2xl flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#a855f7]" />
              <span className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                Reserva Online Instantánea
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white mt-1">
              Agendar Sesión en Rami Records Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af]">
              Sala activa: <strong className="text-white">{selectedRoom.name}</strong> (${selectedRoom.hourlyRate}/h)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#141616] border border-white/5 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#9ca3af] font-semibold">Inversión Estimada</span>
              <span className="text-2xl font-headline font-bold text-[#a855f7]">
                ${calculateTotal()} USD
              </span>
            </div>
            <span className="text-xs text-[#9ca3af]">{bookingHours} horas • {serviceType}</span>
          </div>
        </div>

        {isBooked ? (
          <div className="p-8 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/30 flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-[#a855f7]" />
            <h3 className="text-xl font-headline font-bold text-white">
              ¡Sesión Confirmada con el Ingeniero de Sala!
            </h3>
            <p className="text-xs sm:text-sm text-[#d1d5db] max-w-md">
              Hemos reservado <strong>{bookingHours} horas</strong> en <strong>{selectedRoom.name}</strong> para el <strong>{bookingDate}</strong> en el turno <strong>{timeSlot}</strong>. Te enviamos la confirmación técnica y código de acceso al estudio a <strong>{clientEmail}</strong>.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                setClientName('');
                setClientEmail('');
                setClientPhone('');
                setProjectDetails('');
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-[#a855f7] text-white font-bold text-xs"
            >
              Realizar otra reserva de estudio
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 1: Booking Specs */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                  Tipo de Servicio Musical
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="Grabación de Voces">Grabación de Voces & Instrumentos (con Ingeniero)</option>
                  <option value="Mezcla & Master">Mezcla Analógica & Masterización</option>
                  <option value="Producción Completa">Producción Completa (Beatmaking + Letras + Grabación)</option>
                  <option value="Dolby Atmos">Mezcla Inmersiva Espacial Dolby Atmos 7.1.4</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                    Fecha Deseada
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                    Duración (Horas)
                  </label>
                  <select
                    value={bookingHours}
                    onChange={(e) => setBookingHours(parseInt(e.target.value))}
                    className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  >
                    <option value={2}>2 Horas (Sesión Express)</option>
                    <option value={4}>4 Horas (Medio Turno)</option>
                    <option value={8}>8 Horas (Día Completo)</option>
                    <option value={12}>12 Horas (Lockout Nocturno)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                  Franja Horaria Preferida
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="10:00 - 14:00 (Mañana)">10:00 - 14:00 (Mañana)</option>
                  <option value="14:00 - 18:00 (Tarde)">14:00 - 18:00 (Tarde)</option>
                  <option value="18:00 - 22:00 (Noche)">18:00 - 22:00 (Noche)</option>
                  <option value="22:00 - 06:00 (Madrugada VIP)">22:00 - 06:00 (Madrugada VIP)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                  Detalles del Proyecto Musical
                </label>
                <textarea
                  rows={2}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Número de temas, estilo (reparto, trap, reggaeton), instrumentos en vivo necesarios..."
                  className="w-full bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            {/* Step 2: Contact Info */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                    Nombre del Artista / Productor *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Roberto 'El Melódico'"
                    className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                    Correo Electrónico de Confirmación *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="productor@estudio.com"
                    className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                    Teléfono / WhatsApp Directo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+53 5 000 0000 / +1 786 000 0000"
                    className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#d8b4fe] text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantía de Calidad Acústica Rami Records</span>
                </div>
                <p className="text-[11px] text-[#9ca3af]">
                  Incluye ingeniero residente titulado, backups de sesión en servidores seguros y exportación multitrack WAV 96kHz/24bit sin coste adicional.
                </p>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 bg-[#a855f7] text-white font-headline font-bold text-sm rounded-xl shadow-lg shadow-[#a855f7]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirmar Reserva por ${calculateTotal()} USD</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
