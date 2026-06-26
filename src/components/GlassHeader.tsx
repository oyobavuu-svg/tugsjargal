import { useState } from 'react';
import { ActiveSection } from '../types';
import { Play, Settings, Menu, X, Radio, Activity, Gamepad2, Trophy, Compass, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GlassHeaderProps {
  activeSection: ActiveSection;
  setActiveSection: (sec: ActiveSection) => void;
  streamStatus: 'loading' | 'playing' | 'error';
  currentStreamName: string;
  onOpenStreamControl: () => void;
}

export default function GlassHeader({
  activeSection,
  setActiveSection,
  streamStatus,
  currentStreamName,
  onOpenStreamControl,
}: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Нүүр хуудас', icon: Compass },
    { id: 'football', label: 'Хөлбөмбөг', icon: Trophy },
    { id: 'anime', label: 'Жүжүцү Каисэн', icon: Activity },
    { id: 'gremix', label: 'Gremix Секц', icon: Gamepad2 },
    { id: 'song', label: 'Миний Дуу', icon: Music },
  ] as const;

  const getStatusBadge = () => {
    switch (streamStatus) {
      case 'playing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ШУУД ДАМЖУУЛАЛТ
          </span>
        );
      case 'loading':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-spin" />
            УНШИЖ БАЙНА
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            FALLBACK ХОЛБОГДСОН
          </span>
        );
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel-light backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] pointer-events-auto">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 flex items-center justify-center shadow-lg">
            <span className="text-white font-display font-bold text-base">ТЖ</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-display font-bold text-sm tracking-widest leading-none">ТӨГСЖАРГАЛ</h1>
            <span className="text-white/50 text-[10px] font-mono tracking-tight">11 НАСТАЙ АЯЛАГЧ</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-display font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-neon' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Stream Health */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end">
            {getStatusBadge()}
            <span className="text-[10px] text-white/40 font-mono mt-0.5 max-w-[150px] truncate text-right">
              урсгал: {currentStreamName}
            </span>
          </div>
          
          <button
            onClick={onOpenStreamControl}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all text-white cursor-pointer"
            title="HLS Урсгал Тохиргоо"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenStreamControl}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="mt-2 mx-auto max-w-full glass-panel border border-white/10 rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto md:hidden"
          >
            <div className="flex justify-between items-center px-2 pb-2 border-b border-white/5 mb-2">
              <span className="text-[10px] text-white/40 font-mono uppercase">Цэс хайлт</span>
              {getStatusBadge()}
            </div>
            
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-white/10 text-brand-neon' : 'text-white/75 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-display font-medium">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
