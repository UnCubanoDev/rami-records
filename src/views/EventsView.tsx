import React, { useState } from 'react';
import { MapPin, ArrowRight, Calendar, Clock, Ticket } from 'lucide-react';
import { EventItem } from '../types';

interface EventsViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onSelectEvent }) => {
  const [selectedCity, setSelectedCity] = useState<'Todos' | 'Havana' | 'Miami' | 'Madrid'>('Todos');

  const cityTabs = ['Todos', 'Havana', 'Miami', 'Madrid'] as const;

  const featuredEvent = events.find((e) => e.featured) || events[0];

  const filteredEvents = events.filter((e) => {
    if (selectedCity === 'Todos') return true;
    return e.city === selectedCity;
  });

  const concertList = filteredEvents.filter((e) => !e.featured || selectedCity !== 'Todos');

  return (
    <div className="flex flex-col w-full pb-40 sm:pb-48 md:pb-36 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[#ff5070] font-headline font-bold uppercase tracking-widest">
          Gira Mundial 2024 / 2025
        </span>
        <h1 className="font-headline font-bold text-3xl sm:text-5xl text-white tracking-tight">
          EVENTS
        </h1>
        <p className="text-sm sm:text-base text-[#a3a3a3]">
          Calendario de giras y shows en vivo
        </p>
      </div>

      {/* City filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {cityTabs.map((city) => {
          const isActive = selectedCity === city;
          return (
            <button
              key={city}
              id={`events-filter-${city.toLowerCase()}`}
              onClick={() => setSelectedCity(city)}
              className={`px-5 py-2 rounded-full text-xs font-headline font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#ff5070] text-[#67001e] shadow-md shadow-[#ff5070]/20'
                  : 'bg-[#1e2020] text-[#a3a3a3] hover:text-[#e2e2e2] hover:bg-[#282a2b]'
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>

      {/* Featured Big Event Banner */}
      {featuredEvent && (selectedCity === 'Todos' || selectedCity === featuredEvent.city) && (
        <div
          id="featured-event-banner"
          onClick={() => onSelectEvent(featuredEvent)}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e2020] p-6 sm:p-8 flex flex-col gap-4 shadow-2xl border border-white/5 cursor-pointer group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${featuredEvent.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/60 to-transparent" />

          <div className="relative z-10 flex justify-between items-start">
            <span className="px-3 py-1 rounded-full bg-[#ff5070] text-[#67001e] text-[11px] font-headline font-bold uppercase tracking-wider">
              {featuredEvent.status}
            </span>
            <span className="text-xs text-[#ffb2b9] font-headline font-bold">
              {featuredEvent.dateText}
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-1">
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white group-hover:text-[#ffb2b9] transition-colors">
              {featuredEvent.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#a3a3a3] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#ff5070] shrink-0" />
              <span>{featuredEvent.location}</span>
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
            <span className="text-xs text-[#9ca3af]">
              {featuredEvent.doorsOpen || 'Puertas: 21:00'}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectEvent(featuredEvent);
              }}
              className="px-5 py-2.5 rounded-full bg-[#ff5070] text-[#67001e] font-headline font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md shadow-[#ff5070]/20 w-full sm:w-auto"
            >
              <span>View event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Concerts List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-xl text-white">
            Próximos Conciertos
          </h2>
          <span className="text-xs text-[#9ca3af]">
            {concertList.length} Shows
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {concertList.map((item) => (
            <div
              key={item.id}
              id={`event-item-${item.id}`}
              onClick={() => onSelectEvent(item)}
              className="bg-[#1e2020] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md transition-all hover:bg-[#282a2b] border border-white/5 cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Date Badge */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141616] border border-white/5 flex flex-col items-center justify-center text-center p-1 shrink-0">
                  <span className="text-[10px] text-[#ff5070] font-headline font-bold uppercase tracking-wider">
                    {item.monthBadge}
                  </span>
                  <span className="font-headline font-bold text-xl sm:text-2xl text-white leading-none">
                    {item.dayBadge}
                  </span>
                </div>

                {/* Event info */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'SOLD OUT'
                          ? 'bg-[#ff5070] text-[#67001e]'
                          : item.status === 'SELLING FAST' || item.status === 'LAST TICKETS'
                          ? 'bg-[#ff5070]/20 text-[#ffb2b9]'
                          : 'bg-white/10 text-[#a3a3a3]'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-[#9ca3af]">{item.time}</span>
                  </div>

                  <h4 className="font-headline font-bold text-base sm:text-lg text-white truncate group-hover:text-[#ffb2b9] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#a3a3a3] flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5070] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(item);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#282a2b] group-hover:bg-[#ff5070] text-[#e2e2e2] group-hover:text-[#67001e] font-headline font-bold text-xs transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  <span>View event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
