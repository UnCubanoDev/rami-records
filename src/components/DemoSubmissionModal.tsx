import React, { useState } from 'react';
import { X, Mic, Send, CheckCircle, UploadCloud, AlertCircle } from 'lucide-react';
import { DemoSubmission } from '../types';

interface DemoSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDemo: (demo: DemoSubmission) => void;
}

export const DemoSubmissionModal: React.FC<DemoSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitDemo,
}) => {
  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState('Urbano / Trap');
  const [demoUrl, setDemoUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistName || !email) return;

    onSubmitDemo({
      id: `demo-${Date.now()}`,
      artistName,
      email,
      phone,
      genre,
      demoUrl: demoUrl || 'Audio demo adjunto',
      fileName: fileName || undefined,
      submittedAt: 'Justo ahora',
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setArtistName('');
    setEmail('');
    setPhone('');
    setDemoUrl('');
    setFileName('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1e2020] rounded-2xl overflow-hidden border border-[#ff5070]/20 shadow-2xl p-6 my-auto">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 text-[#9ca3af] hover:text-white flex items-center justify-center"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#ff5070]/20 text-[#ff5070] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-2xl text-white">
              ¡Demo Recibida con Éxito!
            </h3>
            <p className="text-sm text-[#9ca3af] max-w-xs">
              El equipo de A&R de <span className="text-[#ffb2b9]">Rami Records</span> escuchará tu propuesta. Si encaja con nuestra visión sonora, te contactaremos en un plazo máximo de 7 días.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-[#ff5070] text-[#67001e] font-bold rounded-xl text-sm"
            >
              Cerrar y Volver
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff5070]/20 text-[#ff5070] flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-white">
                  Envía tu Demo a Rami Records
                </h3>
                <p className="text-xs text-[#9ca3af]">
                  Buscamos nuevos talentos de música urbana cubana
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-[#e2e2e2] font-medium">Nombre Artístico *</label>
              <input
                type="text"
                required
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Ej. El Dany Jr, MC Malecón..."
                className="bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff5070]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[#e2e2e2] font-medium">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="artista@ejemplo.com"
                  className="bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff5070]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[#e2e2e2] font-medium">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+53 5 000 0000"
                  className="bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff5070]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-[#e2e2e2] font-medium">Género Musical</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ff5070]"
              >
                <option value="Urbano / Trap">Urbano / Trap</option>
                <option value="Reparto / Timba">Reparto / Timba</option>
                <option value="Reggaetón / R&B">Reggaetón / R&B</option>
                <option value="Alt Pop / Synth">Alt Pop / Synth</option>
                <option value="Afrocubano / Experimental">Afrocubano / Experimental</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-[#e2e2e2] font-medium">Enlace a tu Música (Drive / SoundCloud / YouTube)</label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://soundcloud.com/... o https://drive.google.com/..."
                className="bg-[#141616] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff5070]"
              />
            </div>

            {/* Simulated file drop */}
            <div className="border-2 border-dashed border-white/10 hover:border-[#ff5070]/50 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#141616]/40">
              <UploadCloud className="w-6 h-6 text-[#ff5070] mb-1" />
              <span className="text-xs text-white font-medium">
                {fileName ? fileName : 'O arrastra tu archivo MP3 / WAV aquí'}
              </span>
              <span className="text-[10px] text-[#9ca3af]">Máximo 25MB</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                id="demo-file-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <label
                htmlFor="demo-file-input"
                className="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs text-white rounded-lg cursor-pointer"
              >
                Seleccionar archivo
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 px-4 bg-[#ff5070] text-[#67001e] font-headline font-bold text-sm rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff5070]/20"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Propuesta a A&R</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
