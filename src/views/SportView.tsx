import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Shield,
  Dumbbell,
  Target,
  Send,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Zap,
  MapPin,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { SportAthlete, TabType } from '../types';
import { RAMI_SPORT_IMG } from '../data/mockData';

interface SportViewProps {
  athletes: SportAthlete[];
  onSelectTab: (tab: TabType) => void;
  onShowToast: (msg: string) => void;
}

export const SportView: React.FC<SportViewProps> = ({
  athletes,
  onSelectTab,
  onShowToast,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>('Todos');
  const [selectedAthlete, setSelectedAthlete] = useState<SportAthlete | null>(null);

  // Representation Form State
  const [formData, setFormData] = useState({
    name: '',
    athleteName: '',
    email: '',
    phone: '',
    sport: 'Boxeo',
    category: '',
    currentRecord: '',
    location: '',
    videoLink: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sportsCategories = ['Todos', 'Boxeo', 'Béisbol', 'MMA', 'Atletismo'];

  const filteredAthletes = selectedSport === 'Todos'
    ? athletes
    : athletes.filter((a) => a.sport === selectedSport);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.athleteName) {
      onShowToast('Por favor completa los campos requeridos');
      return;
    }
    setIsSubmitted(true);
    onShowToast('Solicitud enviada a la división deportiva de Rami Records');
  };

  return (
    <div className="flex flex-col w-full pb-44 sm:pb-52 md:pb-40 gap-8">
      {/* ================= HERO SPORT BANNER ================= */}
      <section
        id="sport-hero-section"
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e2020] flex flex-col justify-end p-6 sm:p-10 min-h-[400px] sm:min-h-[480px] shadow-2xl border border-white/5"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
          style={{ backgroundImage: `url('${RAMI_SPORT_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/75 to-transparent" />

        <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-pulse" />
            <span className="text-xs text-[#00d2ff] tracking-widest font-semibold uppercase">
              Rami Records • División Deportiva Oficial
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
            RAMI RECORDS <span className="text-[#00d2ff]">SPORT</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1d5db] font-normal leading-relaxed">
            Representación de élite, campamentos de entrenamiento y desarrollo integral para la nueva generación de campeones mundiales cubanos e internacionales.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a
              href="#atletas-section"
              className="py-3 px-6 bg-[#00d2ff] text-[#003b4d] font-headline font-bold text-sm rounded-xl text-center shadow-lg shadow-[#00d2ff]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Atletas</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#form-representacion"
              className="py-3 px-6 bg-[#282a2b]/80 backdrop-blur-md text-white font-headline font-semibold text-sm rounded-xl text-center hover:bg-[#333535] transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <span>Solicitar Representación</span>
              <Shield className="w-4 h-4 text-[#00d2ff]" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= STATS ROW ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-2xl sm:text-3xl font-headline font-bold text-[#00d2ff]">+15</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Atletas en Roster</span>
          <span className="text-[11px] text-[#9ca3af]">Boxeo, MLB, MMA & Pista</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-2xl sm:text-3xl font-headline font-bold text-white">92%</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Ratio de Victorias</span>
          <span className="text-[11px] text-[#9ca3af]">Récord colectivo profesional</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-2xl sm:text-3xl font-headline font-bold text-[#00d2ff]">3</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Sedes de Entrenamiento</span>
          <span className="text-[11px] text-[#9ca3af]">La Habana, Miami, Madrid</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2020] border border-white/5 flex flex-col">
          <span className="text-2xl sm:text-3xl font-headline font-bold text-white">$4.5M+</span>
          <span className="text-xs sm:text-sm font-semibold text-white mt-1">Contratos Negociados</span>
          <span className="text-[11px] text-[#9ca3af]">Bolsas y patrocinios</span>
        </div>
      </section>

      {/* ================= ATHLETES ROSTER ================= */}
      <section id="atletas-section" className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#00d2ff]" />
              <h2 className="text-xl sm:text-2xl font-headline font-bold text-white uppercase tracking-wide">
                ROSTER DE ATLETAS RAMI SPORT
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-0.5">
              Figuras de clase mundial con el sello de calidad y disciplina de Rami Records.
            </p>
          </div>

          {/* Sport Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {sportsCategories.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSport === sport
                    ? 'bg-[#00d2ff] text-[#003b4d] shadow-md shadow-[#00d2ff]/20 font-bold'
                    : 'bg-[#1e2020] text-[#9ca3af] hover:text-white hover:bg-[#282a2b]'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAthletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => setSelectedAthlete(athlete)}
              className="bg-[#1e2020] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00d2ff]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/4] overflow-hidden bg-[#141616]">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-transparent to-black/30" />

                <span className="absolute top-3 left-3 bg-[#00d2ff] text-[#003b4d] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {athlete.sport}
                </span>

                {athlete.ranking && (
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {athlete.ranking}
                  </span>
                )}

                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[11px] text-[#00d2ff] font-semibold block">
                    {athlete.division}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-white leading-tight">
                    {athlete.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-[#9ca3af]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00d2ff]" />
                    <span>{athlete.origin}</span>
                  </div>
                  {athlete.record && (
                    <span className="font-mono text-white font-semibold">
                      {athlete.record}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#9ca3af] line-clamp-2 leading-relaxed">
                  {athlete.bio}
                </p>

                {athlete.nextFightOrEvent && (
                  <div className="mt-1 p-2 rounded-lg bg-black/30 border border-white/5 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#ffd000] shrink-0" />
                    <span className="text-[10px] text-[#e2e2e2] truncate font-medium">
                      {athlete.nextFightOrEvent}
                    </span>
                  </div>
                )}

                <button
                  className="mt-2 w-full py-2 bg-white/5 hover:bg-[#00d2ff]/20 hover:text-[#00d2ff] text-xs font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-1"
                >
                  <span>Ver Perfil y Logros</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1e2020] via-[#1a1c1c] to-[#141616] border border-white/5 flex flex-col gap-6">
        <div>
          <span className="text-xs text-[#00d2ff] font-headline font-bold uppercase tracking-wider">
            Servicios Integrales
          </span>
          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white mt-1">
            ¿Qué ofrece Rami Records Sport a los atletas?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#141616]/80 border border-white/5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">
              Representación & Contratos
            </h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Negociación de bolsas con promotoras mundiales (Top Rank, Matchroom, UFC, equipos de MLB) y protección jurídica total.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141616]/80 border border-white/5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center mb-1">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">
              Campamentos de Élite
            </h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Preparación física multidisciplinaria, sparring de primer nivel, nutrición deportiva y recuperación biomecánica.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141616]/80 border border-white/5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center mb-1">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">
              Marca Personal & Patrocinios
            </h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Sinergia con la música y el entretenimiento: entradas al ring personalizadas por nuestros artistas, ropa exclusiva y acuerdos de marca.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ATHLETE SUBMISSION FORM ================= */}
      <section
        id="form-representacion"
        className="p-6 sm:p-10 rounded-3xl bg-[#1e2020] border border-[#00d2ff]/20 shadow-2xl flex flex-col gap-6"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#00d2ff]" />
            <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
              Talento & Scouting
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white mt-1">
            Postúlate a Rami Records Sport
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af] mt-1 leading-relaxed">
            Buscamos atletas con hambre de victoria, disciplina férrea y potencial para destacar en los escenarios más exigentes del mundo.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-[#00d2ff]" />
            <h3 className="text-xl font-headline font-bold text-white">
              ¡Solicitud Recibida con Éxito!
            </h3>
            <p className="text-xs sm:text-sm text-[#d1d5db] max-w-md">
              El equipo de scouting deportivo de Rami Records evaluará tu perfil, récord y videos. Nos comunicaremos contigo en un plazo de 48 a 72 horas.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  athleteName: '',
                  email: '',
                  phone: '',
                  sport: 'Boxeo',
                  category: '',
                  currentRecord: '',
                  location: '',
                  videoLink: '',
                  notes: '',
                });
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-[#00d2ff] text-[#003b4d] font-bold text-xs"
            >
              Enviar otra postulación
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Nombre del Atleta o Representante *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Carlos Mendoza"
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Nombre Deportivo / Apodo *
              </label>
              <input
                type="text"
                required
                value={formData.athleteName}
                onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                placeholder="Ej. Dariel 'El Relámpago'"
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="atleta@ejemplo.com"
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Teléfono / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (305) 000-0000"
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Disciplina Deportiva
              </label>
              <select
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              >
                <option value="Boxeo">Boxeo Profesional</option>
                <option value="Béisbol">Béisbol (MLB / Internacional)</option>
                <option value="MMA">Artes Marciales Mixtas (MMA)</option>
                <option value="Atletismo">Atletismo & Pista</option>
                <option value="Otro">Otro Deporte de Combate / Rendimiento</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Récord o Logros Principales
              </label>
              <input
                type="text"
                value={formData.currentRecord}
                onChange={(e) => setFormData({ ...formData, currentRecord: e.target.value })}
                placeholder="Ej. 10-0 (8 KOs) o Medalla de Oro Nacional"
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Enlace a Video de Peleas, Entrenamientos o Highlights (YouTube / Instagram / Drive)
              </label>
              <input
                type="url"
                value={formData.videoLink}
                onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-[#141616] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-[#e2e2e2] block mb-1.5">
                Objetivos y Mensaje para Rami Sport
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Cuéntanos tus metas, tu peso/categoría actual y qué buscas en la representación..."
                className="w-full bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-8 bg-[#00d2ff] text-[#003b4d] font-headline font-bold text-sm rounded-xl shadow-lg shadow-[#00d2ff]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Enviar Postulación Deportiva</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ================= DETAIL MODAL FOR ATHLETE ================= */}
      {selectedAthlete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1e2020] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden">
              <img
                src={selectedAthlete.image}
                alt={selectedAthlete.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-transparent to-black/40" />
              <button
                onClick={() => setSelectedAthlete(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider block">
                  {selectedAthlete.sport} • {selectedAthlete.division}
                </span>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white">
                  {selectedAthlete.name}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedAthlete.record && (
                  <span className="px-3 py-1 bg-white/5 rounded-full text-white font-mono">
                    Récord: <strong>{selectedAthlete.record}</strong>
                  </span>
                )}
                {selectedAthlete.ranking && (
                  <span className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] rounded-full font-semibold">
                    {selectedAthlete.ranking}
                  </span>
                )}
                <span className="px-3 py-1 bg-white/5 rounded-full text-[#9ca3af]">
                  Origen: {selectedAthlete.origin}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-1">
                  Biografía Deportiva
                </h4>
                <p className="text-sm text-[#d1d5db] leading-relaxed">
                  {selectedAthlete.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-2">
                  Palmarés & Logros Clave
                </h4>
                <ul className="space-y-1.5">
                  {selectedAthlete.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#e2e2e2]">
                      <CheckCircle2 className="w-4 h-4 text-[#00d2ff] shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedAthlete.nextFightOrEvent && (
                <div className="p-3.5 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-5 h-5 text-[#00d2ff]" />
                    <div>
                      <span className="text-[10px] text-[#00d2ff] font-bold uppercase tracking-wider block">
                        Próxima Presentación
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {selectedAthlete.nextFightOrEvent}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedAthlete(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 text-xs font-semibold"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setSelectedAthlete(null);
                    onSelectTab('booking');
                    onShowToast(`Solicitud de booking para ${selectedAthlete.name}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00d2ff] text-[#003b4d] font-headline font-bold text-xs hover:scale-105 transition-all"
                >
                  Contratar Atleta en Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
