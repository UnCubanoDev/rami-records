import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Ticket, QrCode, CheckCircle2, Share2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventTicketModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventTicketModal: React.FC<EventTicketModalProps> = ({ event, onClose }) => {
  const [reserved, setReserved] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1e2020] rounded-2xl overflow-hidden border border-[#ff5070]/20 shadow-2xl p-6 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 text-[#9ca3af] hover:text-white flex items-center justify-center"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.status === 'SOLD OUT'
                ? 'bg-[#ff5070] text-[#67001e]'
                : event.status === 'SELLING FAST' || event.status === 'LAST TICKETS'
                ? 'bg-[#ffb2b9]/20 text-[#ffb2b9]'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}
          >
            {event.status}
          </span>
          <span className="text-xs text-[#9ca3af]">{event.dateText}</span>
        </div>

        <h3 className="font-headline font-bold text-2xl text-white mb-1">
          {event.title}
        </h3>
        <p className="text-sm text-[#ffb2b9] mb-4 font-medium">
          {event.artist}
        </p>

        {/* Event Details Card */}
        <div className="bg-[#141616] p-4 rounded-xl border border-white/5 flex flex-col gap-3 mb-5">
          <div className="flex items-center gap-3 text-sm text-[#e2e2e2]">
            <MapPin className="w-4 h-4 text-[#ff5070] shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#e2e2e2]">
            <Clock className="w-4 h-4 text-[#ff5070] shrink-0" />
            <span>Hora: {event.time}</span>
          </div>
          {event.price && (
            <div className="flex items-center gap-3 text-sm text-[#e2e2e2]">
              <Ticket className="w-4 h-4 text-[#ff5070] shrink-0" />
              <span>Precio estimado: <strong className="text-white">{event.price}</strong></span>
            </div>
          )}
        </div>

        {/* Ticket Digital Pass */}
        {reserved ? (
          <div className="p-4 bg-gradient-to-br from-[#282a2b] to-[#1a1c1c] border border-[#ff5070]/30 rounded-xl flex flex-col items-center text-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <h4 className="font-headline font-bold text-lg text-white">
              ¡Entrada Confirmada!
            </h4>
            <p className="text-xs text-[#9ca3af]">
              Presenta este pase digital en el acceso preferente de {event.city}.
            </p>
            <div className="p-3 bg-white rounded-xl shadow-inner my-1">
              <QrCode className="w-24 h-24 text-black" />
            </div>
            <span className="font-mono text-xs text-[#ffb2b9] tracking-widest uppercase">
              RAMI-{event.id.toUpperCase()}-VIP
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {event.status === 'SOLD OUT' ? (
              <div className="p-4 bg-[#141616] rounded-xl text-center flex flex-col gap-2">
                <span className="text-xs text-[#ff5070] font-bold">
                  Entradas agotadas para venta online
                </span>
                <p className="text-xs text-[#9ca3af]">
                  Puedes unirte a la lista de espera oficial para cancelaciones de última hora.
                </p>
                <button
                  onClick={() => setReserved(true)}
                  className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Unirse a lista de espera VIP
                </button>
              </div>
            ) : (
              <button
                onClick={() => setReserved(true)}
                className="w-full py-3.5 px-4 bg-[#ff5070] text-[#67001e] font-headline font-bold text-sm rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff5070]/20"
              >
                <Ticket className="w-4 h-4" />
                <span>Reservar Entrada Oficial</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
