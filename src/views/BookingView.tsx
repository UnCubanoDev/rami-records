import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { BookingRequest } from '../types';

interface BookingViewProps {
  initialArtist?: string;
  bookingPipeline: BookingRequest[];
  onSubmitBooking: (booking: BookingRequest) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  initialArtist,
  bookingPipeline,
  onSubmitBooking,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('España');
  const [city, setCity] = useState('Madrid');
  const [eventType, setEventType] = useState('festival');
  const [artist, setArtist] = useState(initialArtist || 'rami-showcase');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [capacity, setCapacity] = useState('1500');
  const [budget, setBudget] = useState('5,000€ - 10,000€');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialArtist) {
      setArtist(initialArtist);
    }
  }, [initialArtist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !venue) return;

    const newBooking: BookingRequest = {
      id: `booking-${Date.now()}`,
      name,
      company,
      email,
      phone,
      country,
      city,
      eventType: eventType.charAt(0).toUpperCase() + eventType.slice(1),
      artist:
        artist === 'rami-showcase'
          ? 'Rami Records Showcase'
          : artist === 'rami'
          ? 'Rami Live Set'
          : artist,
      date,
      venue,
      capacity,
      budget,
      message,
      status: 'Under Review',
      submittedAt: 'Justo ahora',
    };

    onSubmitBooking(newBooking);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setDate('');
    setVenue('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col w-full pb-44 sm:pb-52 md:pb-40 gap-6">
      {/* Header */}
      <div>
        <h1 className="font-headline font-bold text-3xl sm:text-5xl text-white tracking-tight mb-1">
          BOOKING
        </h1>
        <p className="text-sm sm:text-base text-[#a3a3a3]">
          Bring the sound of Rami Records to your next event.
        </p>
      </div>

      {/* Booking Form Card */}
      <div className="bg-[#1a1c1c] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-white/5">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#ff5070]/10 rounded-full blur-3xl pointer-events-none" />

        {isSubmitted ? (
          <div
            id="success-banner"
            className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fadeIn"
          >
            <div className="w-16 h-16 rounded-full bg-[#ff5070]/20 text-[#ff5070] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white">
              Request Received
            </h3>
            <p className="text-sm text-[#a3a3a3] max-w-sm leading-relaxed">
              Thanks for reaching out. Our booking agency will review your details and get back to you within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="mt-2 bg-[#282a2b] text-white px-6 py-2.5 rounded-xl font-headline font-bold text-xs hover:bg-[#333535] transition-colors"
            >
              Send another request
            </button>
          </div>
        ) : (
          <form id="booking-form" onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Empresa / Promotora</label>
                <input
                  type="text"
                  placeholder="Nombre de la compañía"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="+34 600 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">País *</label>
                <input
                  type="text"
                  required
                  placeholder="España"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Ciudad *</label>
                <input
                  type="text"
                  required
                  placeholder="Madrid"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Tipo de evento *</label>
                <select
                  required
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                >
                  <option value="festival">Festival</option>
                  <option value="club">Club / Concierto</option>
                  <option value="corporate">Evento Corporativo</option>
                  <option value="private">Fiesta Privada</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Artista solicitado *</label>
                <select
                  required
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                >
                  <option value="rami-showcase">Rami Records Showcase (Completo)</option>
                  <option value="Klay J">Klay J (Urban / Trap)</option>
                  <option value="Badkat">Badkat (Reggaeton / R&B)</option>
                  <option value="El Chulo Jr">El Chulo Jr (Reparto / Timba)</option>
                  <option value="Daniela V">Daniela V (Alt Pop / Synth)</option>
                  <option value="rami">Rami Live Set</option>
                  <option value="nyx">NYX (Industrial Techno)</option>
                </select>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Fecha *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Venue / Sala *</label>
                <input
                  type="text"
                  required
                  placeholder="Nombre del recinto"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#e2e2e2]">Capacidad estimada *</label>
                <input
                  type="number"
                  required
                  placeholder="Ej. 1500"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#e2e2e2]">Presupuesto aproximado</label>
              <input
                type="text"
                placeholder="Ej. 5,000€ - 10,000€"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all text-sm"
              />
            </div>

            {/* Row 7 */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#e2e2e2]">Mensaje / Detalles adicionales</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos más detalles sobre horarios, riders técnicos o requisitos específicos..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[#1e2020] border-0 border-b-2 border-white/10 focus:border-[#ff5070] text-[#e2e2e2] px-4 py-3 rounded-t-lg outline-none transition-all resize-none text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="submit-booking-btn"
                className="w-full bg-[#ff5070] text-[#67001e] font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-lg shadow-[#ff5070]/20 text-sm sm:text-base cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send booking request</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Booking Enquiries Pipeline */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-xl text-white">
            Booking Enquiries
          </h2>
          <span className="text-xs text-[#a3a3a3]">
            Active Pipeline
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {bookingPipeline.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1c1c] p-4 rounded-xl flex items-center justify-between border border-white/5 shadow-md"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#1e2020] flex items-center justify-center shrink-0 text-[#ff5070]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-headline font-bold text-sm sm:text-base text-white truncate">
                    {item.venue ? `${item.venue} (${item.city})` : `${item.city} Event`}
                  </h4>
                  <p className="text-xs text-[#a3a3a3] truncate">
                    {item.city}, {item.country} • {item.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${
                    item.status === 'Confirmed'
                      ? 'bg-[#ff5070] text-[#67001e]'
                      : 'bg-[#282a2b] text-[#ffb2b9]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
