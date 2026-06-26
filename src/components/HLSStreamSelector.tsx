import { useState, FormEvent } from 'react';
import { HLSStream } from '../types';
import { X, Play, Link, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HLSStreamSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  streams: HLSStream[];
  activeStreamId: string;
  onSelectStream: (streamId: string) => void;
  onAddCustomStream: (name: string, url: string) => void;
}

export default function HLSStreamSelector({
  isOpen,
  onClose,
  streams,
  activeStreamId,
  onSelectStream,
  onAddCustomStream,
}: HLSStreamSelectorProps) {
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customError, setCustomError] = useState('');

  if (!isOpen) return null;

  const handleAddCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customUrl.trim()) {
      setCustomError('Нэр болон URL хаягийг бүтэн оруулна уу!');
      return;
    }
    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
      setCustomError('URL хаяг заавал http:// эсвэл https://-ээр эхлэх ёстой!');
      return;
    }
    onAddCustomStream(customName, customUrl);
    setCustomName('');
    setCustomUrl('');
    setCustomError('');
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
      />

      {/* Selector Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-3xl z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white font-display font-bold text-lg">HLS Видео Тохиргоо</h3>
            <p className="text-xs text-white/50">Дэвсгэр HLS (.m3u8) урсгал видеог удирдах</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Existing streams list */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] text-white/40 font-mono block uppercase">Нөөцлөгдсөн урсгалууд</span>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {streams.map((stream) => {
              const isActive = stream.id === activeStreamId;
              return (
                <button
                  key={stream.id}
                  onClick={() => onSelectStream(stream.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-600/15 border-purple-500/45 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold block font-display">{stream.name}</span>
                    <span className="text-[10px] text-white/40 block font-mono capitalize">{stream.category} • {stream.description}</span>
                  </div>
                  {isActive ? (
                    <span className="text-[10px] font-mono text-brand-neon bg-brand-neon/10 border border-brand-neon/20 px-2 py-0.5 rounded-full">ИДЭВХТЭЙ</span>
                  ) : (
                    <Play className="w-3.5 h-3.5 text-white/40" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom HLS URL Add Form */}
        <form onSubmit={handleAddCustom} className="border-t border-white/5 pt-4">
          <span className="text-[10px] text-white/40 font-mono block mb-3 uppercase">Шинэ HLS урсгал нэмэх (.m3u8)</span>
          
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Урсгалын нэр (Жнь: Миний Стрийм)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/playlist.m3u8"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500 font-mono"
              />
              <Link className="absolute left-3.5 top-3 w-3.5 h-3.5 text-white/40" />
            </div>

            {customError && <p className="text-[10px] text-rose-400 font-mono">{customError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-display font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              Урсгал Холбох (M3U8)
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center gap-2 text-[10px] text-white/40 font-mono bg-white/5 p-3 rounded-xl border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>HLS нь аюулгүй холболттой, зөвхөн шууд дамжуулах зөвшөөрөлтэй (CORS) байхыг анхаарна уу.</span>
        </div>
      </motion.div>
    </div>
  );
}
