import { useState } from 'react';
import { ActiveSection, HLSStream } from './types';
import HLSVideoBackground from './components/HLSVideoBackground';
import GlassHeader from './components/GlassHeader';
import DetailSections from './components/DetailSections';
import HLSStreamSelector from './components/HLSStreamSelector';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Activity, Gamepad2, Sparkles, Flame, Play, HelpCircle, ChevronRight, Music } from 'lucide-react';
import userAvatarVoxel from './assets/images/user_avatar_voxel_1782282209468.jpg';

const INITIAL_STREAMS: HLSStream[] = [
  {
    id: 'mux-bunny',
    name: 'Mux Big Buck Bunny (HLS)',
    url: 'https://test-streams.mux.dev/x36xhg/playlist.m3u8',
    category: 'sports',
    description: 'Нөхөрсөг, өнгөлөг анимаци урсгал'
  },
  {
    id: 'blender-spring',
    name: 'Spring Cinematic Nature (HLS)',
    url: 'https://test-streams.mux.dev/01/playlist.m3u8',
    category: 'ambient',
    description: 'Уран зөгнөлт байгалийн гайхалтай зураглал'
  },
  {
    id: 'tears-scifi',
    name: 'Tears of Steel Sci-Fi (HLS)',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    category: 'anime',
    description: 'Технологи болон уран зөгнөлт өрнөл'
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [streamStatus, setStreamStatus] = useState<'loading' | 'playing' | 'error'>('loading');
  const [streams, setStreams] = useState<HLSStream[]>(INITIAL_STREAMS);
  const [activeStreamId, setActiveStreamId] = useState('mux-bunny');
  const [isStreamControlOpen, setIsStreamControlOpen] = useState(false);

  const currentStream = streams.find(s => s.id === activeStreamId) || streams[0];

  const handleSelectStream = (streamId: string) => {
    setActiveStreamId(streamId);
    setIsStreamControlOpen(false);
  };

  const handleAddCustomStream = (name: string, url: string) => {
    const newStream: HLSStream = {
      id: `custom-${Date.now()}`,
      name,
      url,
      category: 'ambient',
      description: 'Хэрэглэгчийн оруулсан урсгал хаяг'
    };
    setStreams(prev => [...prev, newStream]);
    setActiveStreamId(newStream.id);
    setIsStreamControlOpen(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020205] font-sans text-slate-100">
      
      {/* Cinematic Background Simulation with Blue/Purple Blur Blobs under HLS background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0b1e] via-[#1a123a] to-[#050508]" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        
        {/* Video Overlay Texture */}
        <div className="absolute inset-0 opacity-[0.04] dot-matrix" />
      </div>

      {/* Full-screen HLS Video Background */}
      <HLSVideoBackground
        streamUrl={currentStream.url}
        onStreamStatusChange={setStreamStatus}
      />

      {/* Scanline dynamic visual filter */}
      <div className="absolute inset-0 pointer-events-none z-45 scanlines-overlay opacity-[0.4]" />

      {/* Glassmorphic Navigation Header */}
      <GlassHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        streamStatus={streamStatus}
        currentStreamName={currentStream.name}
        onOpenStreamControl={() => setIsStreamControlOpen(true)}
      />

      {/* Visual Design Corner Accents */}
      <div className="absolute top-[12%] right-8 w-16 h-[1px] bg-white/10 z-20 hidden md:block" />
      <div className="absolute top-[12%] right-8 w-[1px] h-16 bg-white/10 z-20 hidden md:block" />

      {/* Main content layouts */}
      <div className="relative w-full h-full z-15">
        
        {/* HOME VIEW: Hero item situated strictly at bottom-left */}
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <div className="absolute inset-0 w-full h-full flex items-end justify-start p-6 md:p-16 z-25 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 25, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl md:max-w-2xl glass-panel p-6 md:p-10 rounded-lg text-left border border-white/15 pointer-events-auto bg-white/[0.03] backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Subtle light streak inside the card to look ultra polished */}
                <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Profile header with photo circle and active stats */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border border-cyan-500/40 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center bg-[#0a0b1e] overflow-hidden relative group">
                    <img
                      src={userAvatarVoxel}
                      alt="Төгсжаргал Voxel Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] border border-cyan-500/40 text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-none font-mono font-bold tracking-widest">
                        v4.2.0 STABLE
                      </span>
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">11 Настай Аялагч</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter leading-[0.95] mb-5 uppercase">
                  UNLEASH THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/45 text-glow-cyan">DIGITAL VOID.</span>
                </h1>

                <p className="text-white/65 text-xs md:text-sm leading-relaxed mb-6 font-light max-w-lg">
                  Сайн байна уу? Намайг Төгсжаргал гэдэг. Би 11 настай. Энэ бол миний дуртай зүйлс болох хөлбөмбөг, Жүжүцү Каисэн аниме болон Грэмиксийн хөгжилтэй контентуудыг багтаасан интерактив хувийн портфолио юм!
                </p>

                {/* Switcher Cards triggers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
                  
                  <button
                    onClick={() => setActiveSection('football')}
                    className="group flex flex-col items-start p-3 bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 hover:bg-white/5 rounded-none transition-all duration-300 text-left cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-[8px] font-mono text-white/40 uppercase">Хобби</span>
                    <span className="text-xs font-semibold text-white font-display mt-0.5 leading-none">Хөлбөмбөг</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('anime')}
                    className="group flex flex-col items-start p-3 bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/5 rounded-none transition-all duration-300 text-left cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-[8px] font-mono text-white/40 uppercase">Аниме</span>
                    <span className="text-xs font-semibold text-white font-display mt-0.5 leading-none">Жүжүцү</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('gremix')}
                    className="group flex flex-col items-start p-3 bg-white/[0.02] border border-white/10 hover:border-rose-500/40 hover:bg-white/5 rounded-none transition-all duration-300 text-left cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-[8px] font-mono text-white/40 uppercase">Юүтүб</span>
                    <span className="text-xs font-semibold text-white font-display mt-0.5 leading-none">Gremix</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('song')}
                    className="group flex flex-col items-start p-3 bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 hover:bg-white/5 rounded-none transition-all duration-300 text-left cursor-pointer"
                  >
                    <Music className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-[8px] font-mono text-white/40 uppercase">Миний</span>
                    <span className="text-xs font-semibold text-white font-display mt-0.5 leading-none">Дуу сонсох</span>
                  </button>

                </div>

                {/* Footer status trigger action */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-mono text-white/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-none bg-cyan-400 animate-pulse" />
                    <span>ВЭБ ШИНЭЧЛЭГДСЭН (2026-06-22)</span>
                  </div>
                  <button 
                    onClick={() => setActiveSection('football')}
                    className="text-white hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer uppercase font-display text-xs tracking-wider"
                  >
                    Танилцах <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* DETAILS SECTION views: Football, Anime, Gremix */}
        {activeSection !== 'home' && (
          <DetailSections activeSection={activeSection} />
        )}

      </div>

      {/* Stream Selector Modal Dialog overlay */}
      <AnimatePresence>
        {isStreamControlOpen && (
          <HLSStreamSelector
            isOpen={isStreamControlOpen}
            onClose={() => setIsStreamControlOpen(false)}
            streams={streams}
            activeStreamId={activeStreamId}
            onSelectStream={handleSelectStream}
            onAddCustomStream={handleAddCustomStream}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
