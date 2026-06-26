import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Zap, Shield, Flame, Swords, Compass, 
  Sparkles, Youtube, Play, Target, Award,
  Users, CheckCircle2, RotateCcw, Volume2, VolumeX,
  Sliders, Gauge, Music, Pause
} from 'lucide-react';
import userAvatarVoxel from '../assets/images/user_avatar_voxel_1782282209468.jpg';
import cursedMasqueradeCover from '../assets/images/cursed_masquerade_cover_1782282997454.jpg';

interface DetailSectionsProps {
  activeSection: 'home' | 'football' | 'anime' | 'gremix' | 'song';
}

export default function DetailSections({ activeSection }: DetailSectionsProps) {
  // Football Game configurations
  const footballStrikers = [
    {
      name: 'Мөрөөдлийн Төгсжаргал (You)',
      team: 'Мөрөөдлийн Лиг (Dream FC)',
      rating: 99,
      avatar: '🏃‍♂️',
      image: userAvatarVoxel,
      specialName: 'Галт Тэсрэлттэй Цохилт',
      quote: 'Зүүн хөлөөрөө хаалганы буланд хусна даа! Хэзээ ч алдахгүй.',
      color: 'from-cyan-500 via-teal-600 to-emerald-500',
      accuracy: 0.98,
      difficultyText: 'Төгс хувилбар'
    },
    {
      name: 'Кристиано Роналдо (CR7)',
      team: 'Реал Мадрид (Real Madrid)',
      rating: 96,
      avatar: '👑',
      specialName: 'Хүчит Шүршүүр цохилт',
      quote: 'Receba! SIUUUUUUUUUUUUUU! Энэ бол миний талбай!',
      color: 'from-blue-600 via-indigo-600 to-indigo-950',
      accuracy: 0.88,
      difficultyText: 'Агуу Хүчтэй'
    },
    {
      name: 'Лионель Месси (LM10)',
      team: 'Интер Майами / Барса',
      rating: 97,
      avatar: '🐐',
      specialName: 'Сүүдрийн Илбэт эргүүлэг',
      quote: 'Хаалгач хаашаа үсрэхийг би хөлийнх нь хөдөлгөөнөөр мэдэрдэг.',
      color: 'from-fuchsia-500 via-pink-600 to-rose-700',
      accuracy: 0.96,
      difficultyText: 'Хуурмаг уран'
    },
    {
      name: 'Гремикс (Gremix)',
      team: 'Ютуб Старс (YouTube Stars)',
      rating: 81,
      avatar: '🎮',
      specialName: 'Инээдмийн Санамсаргүй Чип',
      quote: 'ӨӨӨ МАЙ ГОД! Би одоо яаж цохихоо мэдэхгүй байна, зүгээр үсэргэчихье!',
      color: 'from-amber-500 via-orange-500 to-yellow-600',
      accuracy: 0.72,
      difficultyText: 'Оролдож үзэгч'
    }
  ];

  const footballKeepers = [
    {
      name: 'Сэргэлэн GK (Sergelen)',
      level: 'Амархан / Easy',
      avatar: '🧤🐯',
      desc: 'Залуу шинэ хаалгач. Хурдан хөдөлгөөнтэй ч туршлага дутна.',
      saveChance: 0.28,
      color: 'from-slate-800 to-teal-950',
      style: 'Эрч хүчтэй бард'
    },
    {
      name: 'Төмөр Хана Мануэль (Neuer)',
      level: 'Дундаж / Medium',
      avatar: '🧤🦅',
      desc: 'Төв хэсгийг маш сайн хамгаалдаг, ухаалаг байрлал сонгодог.',
      saveChance: 0.48,
      color: 'from-slate-800 to-purple-950',
      style: 'Герман Сургууль'
    },
    {
      name: 'Буффон Домог (Buffon Legend)',
      level: 'Архаг / Hard',
      avatar: '🧤🦁',
      desc: 'Хамгийн аюултай домогт хаалгач. Ямар ч цохилтыг уншина!',
      saveChance: 0.68,
      color: 'from-slate-950 to-red-950',
      style: 'Италийн Легион'
    }
  ];

  const footballBalls = [
    { name: 'Classic Hexagon', icon: '⚽', style: 'bg-[#fafafa]' },
    { name: 'Neon Cyber Glow', icon: '⚽🌌', style: 'bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]' },
    { name: 'Golden Ballon d\'Or', icon: '⚽👑', style: 'bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]' },
    { name: 'Magma Fireball', icon: '⚽🔥', style: 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' }
  ];

  // Football Game states
  const [goals, setGoals] = useState(0);
  const [shots, setShots] = useState(0);
  const [shotResult, setShotResult] = useState<'goal' | 'saved' | 'missed' | 'idle'>('idle');
  const [keeperAction, setKeeperAction] = useState<'left' | 'center' | 'right' | 'idle'>('idle');
  const [playerAim, setPlayerAim] = useState<'left' | 'center' | 'right' | 'idle'>('idle');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [footballDifficulty, setFootballDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [commentaryLogs, setCommentaryLogs] = useState<string[]>(['🏟️ Талбайн шүүгч бэлэн боллоо! Гал гарах цуврал пенальти эхлэхэд бэлэн үү?']);

  // Gorgeous Soccer interactive states
  const [activeFootballChar, setActiveFootballChar] = useState(0);
  const [activeKeeperChar, setActiveKeeperChar] = useState(0);
  const [selectedBallIndex, setSelectedBallIndex] = useState(0);
  const [shotTechnique, setShotTechnique] = useState<'placement' | 'power' | 'panenka' | 'finesse'>('placement');
  const [footballFloatingText, setFootballFloatingText] = useState<{ text: string; isGoal: boolean; isMiss?: boolean } | null>(null);

  // Interactive gameplay expansions
  const [shotPower, setShotPower] = useState(80);
  const [crowdHype, setCrowdHype] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [isPerfectGoalMode, setIsPerfectGoalMode] = useState(false);

  // Cursed Masquerade Rap Song Player interactive states
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songTime, setSongTime] = useState(0);
  const [isSongMuted, setIsSongMuted] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(24).fill(3));

  // Synthesizer parameters (live mixer settings)
  const [tempo, setTempo] = useState(135);
  const [bassVolume, setBassVolume] = useState(80);
  const [drumVolume, setDrumVolume] = useState(80);
  const [melodyPitch, setMelodyPitch] = useState(100); // percentage (100% is original)

  const tempoRef = useRef(135);
  const bassVolumeRef = useRef(80);
  const drumVolumeRef = useRef(80);
  const melodyPitchRef = useRef(100);

  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);

  useEffect(() => {
    bassVolumeRef.current = bassVolume;
  }, [bassVolume]);

  useEffect(() => {
    drumVolumeRef.current = drumVolume;
  }, [drumVolume]);

  useEffect(() => {
    melodyPitchRef.current = melodyPitch;
  }, [melodyPitch]);

  // Refs for audio context and timers
  const songContextRef = useRef<AudioContext | null>(null);
  const songIntervalRef = useRef<any>(null);
  const songProgressIntervalRef = useRef<any>(null);
  const stepRef = useRef<number>(0);
  const nextNoteTimeRef = useRef<number>(0);

  const songLyrics = [
    { time: 0, text: "🎵 [Оршил] Эрдэнийн басс & Синт цохилт" },
    { time: 3, text: "🔥 Yeah, hit 'em with that flicker step, a phantom in the fade!" },
    { time: 6.5, text: "⚡ Got that cursed energy, a funky masquerade!" },
    { time: 10, text: "🔮 Like Yuji jumping on the track, the rhythm's in my soul!" },
    { time: 13.5, text: "💎 11 years of pure technique and taking full control!" },
    { time: 17, text: "👑 It's two-two-two-tug's jargon, you know the way I move!" },
    { time: 20.5, text: "🌀 A blur of motion in the zone, I got nothing left to prove!" },
    { time: 24, text: "🌌 Yeah, that's the JJK funk edit, yeah, we set the pace!" },
    { time: 27.5, text: "🪐 Two-two-two-tug's jargon, winning in this space!" },
    { time: 31, text: "🎵 [Төгсгөл] Хүнд басс & Солиот цохилтууд..." },
    { time: 35, text: "🏆 ТӨГСЖАРГАЛЫН ДУУ ДУУСЛАА! SIUUUU!" }
  ];

  const scheduleNextStep = (ctx: AudioContext, time: number, step: number) => {
    if (isSongMuted) return;

    const drumVol = drumVolumeRef.current / 100;
    const bassVol = bassVolumeRef.current / 100;
    const pitchMul = melodyPitchRef.current / 100;

    // 1. KICK (on steps 0, 8, 11, 14)
    if (step === 0 || step === 8 || step === 11 || step === 14) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
        gain.gain.setValueAtTime(0.4 * drumVol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
      } catch (e) {}
    }

    // 2. SNARE (on steps 4, 12)
    if (step === 4 || step === 12) {
      try {
        // Noise snare
        const bufferSize = ctx.sampleRate * 0.18;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, time);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2 * drumVol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(time);
        noise.stop(time + 0.16);

        // Snare ring oscillator
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, time);
        oscGain.gain.setValueAtTime(0.12 * drumVol, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.13);
      } catch (e) {}
    }

    // 3. HI-HAT (on even steps, and rapid rolls on 14, 15)
    if (step === 15 || (step % 2 === 0)) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(10000, time);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7000, time);

        gain.gain.setValueAtTime(0.06 * drumVol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.05);
      } catch (e) {}
    }

    // 4. PHONK BASS (Low synth bass line)
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      try {
        const notes = [65.41, 77.78, 87.31, 98.00];
        const bassFreq = notes[Math.floor(step / 4) % notes.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(bassFreq, time);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, time);
        filter.frequency.linearRampToValueAtTime(100, time + 0.3);

        gain.gain.setValueAtTime(0.25 * bassVol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.38);
      } catch (e) {}
    }

    // 5. JJK GLITCH MELODY
    if (step === 0 || step === 3 || step === 6 || step === 8 || step === 11 || step === 14) {
      try {
        const melodyNotes = [261.63, 311.13, 349.23, 392.00, 466.16, 392.00];
        const stepIdxMap = { 0: 0, 3: 1, 6: 2, 8: 3, 11: 4, 14: 5 } as any;
        const melodyFreq = melodyNotes[stepIdxMap[step] || 0];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melodyFreq * 2 * pitchMul, time);

        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.25);
      } catch (e) {}
    }
  };

  const startSong = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      songContextRef.current = ctx;
      setIsSongPlaying(true);
      
      stepRef.current = 0;
      nextNoteTimeRef.current = ctx.currentTime + 0.05;
      
      const lookahead = 0.100;
      const scheduleInterval = 40;
      
      songIntervalRef.current = setInterval(() => {
        if (!songContextRef.current) return;
        const currentCtxTime = songContextRef.current.currentTime;
        
        while (nextNoteTimeRef.current < currentCtxTime + lookahead) {
          scheduleNextStep(songContextRef.current, nextNoteTimeRef.current, stepRef.current);
          const currentSecondsPerStep = 60 / tempoRef.current / 4;
          nextNoteTimeRef.current += currentSecondsPerStep;
          stepRef.current = (stepRef.current + 1) % 16;
        }
      }, scheduleInterval);

      const startTime = Date.now() - (songTime * 1000);
      songProgressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        
        if (elapsed >= 36) {
          stopSong();
          setSongTime(0);
          setSongProgress(0);
          setCurrentLyricIndex(-1);
        } else {
          setSongTime(elapsed);
          setSongProgress((elapsed / 36) * 100);
          
          let activeIndex = -1;
          for (let i = 0; i < songLyrics.length; i++) {
            if (elapsed >= songLyrics[i].time) {
              activeIndex = i;
            }
          }
          setCurrentLyricIndex(activeIndex);

          setVisualizerBars(prev => prev.map(() => {
            const isKickStep = stepRef.current % 4 === 0;
            const multiplier = isKickStep ? 18 : 10;
            const randomVal = Math.floor(Math.random() * multiplier) + 4;
            return Math.min(32, Math.max(3, randomVal));
          }));
        }
      }, 100);

      playJjkSfx('win');
    } catch (e) {
      console.error(e);
    }
  };

  const stopSong = () => {
    setIsSongPlaying(false);
    if (songIntervalRef.current) {
      clearInterval(songIntervalRef.current);
      songIntervalRef.current = null;
    }
    if (songProgressIntervalRef.current) {
      clearInterval(songProgressIntervalRef.current);
      songProgressIntervalRef.current = null;
    }
    if (songContextRef.current) {
      try {
        songContextRef.current.close();
      } catch (e) {}
      songContextRef.current = null;
    }
    setVisualizerBars(Array(24).fill(3));
  };

  const toggleSongPlay = () => {
    if (isSongPlaying) {
      stopSong();
    } else {
      startSong();
    }
  };

  useEffect(() => {
    return () => {
      if (songIntervalRef.current) clearInterval(songIntervalRef.current);
      if (songProgressIntervalRef.current) clearInterval(songProgressIntervalRef.current);
      if (songContextRef.current) {
        try {
          songContextRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // Web Audio API Synthesizer
  const playFootballSfx = (type: 'kick' | 'goal' | 'save' | 'miss' | 'whistle' | 'siuu') => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'whistle') {
        const osc1 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1100, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc1.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.25);

        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1100, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.16);
          gain2.gain.setValueAtTime(0.12, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.35);
        }, 150);
      } else if (type === 'kick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'goal') {
        const chords = [261.63, 329.63, 392.00, 523.25];
        chords.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + 0.5);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7 + idx * 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.0);
        });

        // Crowd celebration noise
        const bufferSize = ctx.sampleRate * 1.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(350, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.7);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.3);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
      } else if (type === 'save') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.28);
        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'miss') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.55);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else if (type === 'siuu') {
        const freqs = [140, 180, 280];
        freqs.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(freq - 25, ctx.currentTime + 1.0);
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.3);
        });
      }
    } catch (e) {
      console.warn("Audio Context not allowed or initialized yet", e);
    }
  };

  // Jujutsu Web Audio Synthesizer
  const playJjkSfx = (type: 'attack' | 'curse' | 'domain' | 'shield' | 'win' | 'lose') => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'attack') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'curse') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(320, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.4);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(160, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.45);
        osc2.stop(ctx.currentTime + 0.45);
      } else if (type === 'domain') {
        const rumbleOsc = ctx.createOscillator();
        const rumbleGain = ctx.createGain();
        rumbleOsc.type = 'sawtooth';
        rumbleOsc.frequency.setValueAtTime(55, ctx.currentTime);
        rumbleOsc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 1.5);
        rumbleGain.gain.setValueAtTime(0.2, ctx.currentTime);
        rumbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        rumbleOsc.connect(rumbleGain);
        rumbleGain.connect(ctx.destination);
        rumbleOsc.start();
        rumbleOsc.stop(ctx.currentTime + 1.5);

        const freqs = [220, 277.18, 329.63, 440, 554.37];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          osc.frequency.linearRampToValueAtTime(freq * 1.5, ctx.currentTime + 1.2 + idx * 0.1);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5 + idx * 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + 1.8 + idx * 0.1);
        });
      } else if (type === 'shield') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'win') {
        const chords = [261.63, 329.63, 392.00, 523.25];
        chords.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6 + idx * 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + 0.8 + idx * 0.08);
        });
      } else if (type === 'lose') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
      }
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  // Gremix reaction sound synthesizers
  const playGremixSfx = (index: number) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (index === 0) {
        // Welcoming chimes: 'Юу байцгаана даа залуусаа! Та нартайгаа хамт Гремикс байна!'
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + idx * 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + 0.6 + idx * 0.1);
        });
      } else if (index === 1) {
        // Shock / horror frequency ramp with high vibrato: 'ӨӨӨ МАЙ ГОД! Эне тоглоом ямар аймар юм бэ?! 😱'
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfoGain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.8);

        lfo.frequency.setValueAtTime(16, ctx.currentTime); // 16Hz vibrato
        lfoGain.gain.setValueAtTime(120, ctx.currentTime); // Pitch depth of vibrato

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(ctx.destination);

        lfo.start();
        osc.start();
        lfo.stop(ctx.currentTime + 0.8);
        osc.stop(ctx.currentTime + 0.8);
      } else if (index === 2) {
        // Coin collection ding-ding: 'Энийг ингээд хийчихвэл за тэгээд би супер дупер баян боллоо л гэсэн үг!'
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25 + idx * 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + 0.3 + idx * 0.08);
        });
      } else if (index === 3) {
        // Fast notification sweeps: 'Субскрайб дарахаа бүү мартаарай, за юу? Лайк шэйр гурваа харамлаж болохгүй шүү!'
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.07, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18 + idx * 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + 0.2 + idx * 0.07);
        });
      } else if (index === 4) {
        // Deep descending disappointment: 'Nooo! Би яагаад үхчихэв ээ? Маш харамсалтай байна залуусаа...'
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.95);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.0);
      } else {
        // Default play (such as subscribe booster or random clicks)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn("Gremix audio synthesizer error", e);
    }
  };

  // Jujutsu state
  const [activeJjkChar, setActiveJjkChar] = useState(0);
  const [cursedEnergy, setCursedEnergy] = useState(50);
  const [domainExpanded, setDomainExpanded] = useState(false);

  // Jujutsu game state
  const [jjkGameActive, setJjkGameActive] = useState(false);
  const [playerHp, setPlayerHp] = useState(120);
  const [enemyHp, setEnemyHp] = useState(200);
  const [jjkEnergy, setJjkEnergy] = useState(50);
  const [enemyName, setEnemyName] = useState('Махито (Mahito)');
  const [battleLog, setBattleLog] = useState<string[]>(['Хараалын тулаан эхлэхэд бэлэн боллоо!']);
  const [isDefense, setIsDefense] = useState(false);
  const [battleResult, setBattleResult] = useState<'won' | 'lost' | 'idle'>('idle');

  // Dynamic combat states
  const [selectedEnemyIndex, setSelectedEnemyIndex] = useState(0);
  const [playerShake, setPlayerShake] = useState(false);
  const [enemyShake, setEnemyShake] = useState(false);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; isPlayer: boolean } | null>(null);

  // Gremix state
  const [gremixSubs, setGremixSubs] = useState(1320000); // Gremix subscriber simulator
  const [gremixQuote, setGremixQuote] = useState('Юу байцгаана даа залуусаа! Та нартайгаа хамт Гремикс байна!');
  const [funCount, setFunCount] = useState(0);
  const [isGremixAudioPlaying, setIsGremixAudioPlaying] = useState(false);
  const [gremixChatLogs, setGremixChatLogs] = useState<string[]>([
    '👤 Төгсжаргал: Миний вэб сайт уу оо?! 🤩',
    '👤 bat_erdene: Гремикс ах хамгийн шилдэг нь! 👍',
    '👤 oyobavuu: ӨӨӨ МАЙ ГОД! Энэ дуунууд яаж гарч байна аа!',
    '👤 amaraa: Жоохон аймар тоглоом тоглоорой! 👻'
  ]);

  const jjkEnemies = [
    {
      name: 'Махито (Mahito)',
      hp: 200,
      maxHp: 200,
      difficulty: 'Хялбар (Easy)',
      color: 'from-slate-700 via-teal-900 to-slate-900',
      avatar: '🧟',
      glowColor: 'shadow-[0_0_20px_rgba(20,184,166,0.4)]',
      desc: 'Хүмүүсийн үзэн ядалтаас үүссэн аюултай сүнс. Хүний биеийн хэлбэр өөрчлөх чадвартай.',
      attacks: [
        '👿 Сүнсний хэлбэр өөрчлөх (Idle Transfiguration) дайралт хийв!',
        '👹 Сүнсний Тэсрэлтээр таны цээжийг зүсэв!',
        '☣️ Хортой хараалын мана цацаж, танд дарамт учрууллаа!',
      ]
    },
    {
      name: 'Жого (Jogo)',
      hp: 260,
      maxHp: 260,
      difficulty: 'Дундаж (Medium)',
      color: 'from-orange-950 via-amber-900 to-[#100c08]',
      avatar: '🌋',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      desc: 'Галт уул болон байгалийн гамшгаас үүссэн. Маш ууртай, галт хүчтэй.',
      attacks: [
        '🔥 Галт оргилуурын оч (Ember Insect) үлээв!',
        '☄️ Сүйрлийн солир (Maximum: Meteor) толгой дээр чинь унагалаа!',
        '🌋 Галт уулын халуун лаваар таны хөлийг хайлуулав!',
      ]
    },
    {
      name: 'Ханами (Hanami)',
      hp: 320,
      maxHp: 320,
      difficulty: 'Хэцүү (Hard)',
      color: 'from-[#0d1f14] via-emerald-950 to-[#020d06]',
      avatar: '🌳',
      glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      desc: 'Ой мод, байгаль дэлхийг хамгаалагч эртний сүнс. Мод болон ургамлын мандатаар тулалдана.',
      attacks: [
        '🌳 Үхлийн аюултай модон шорлож (Wooden Spikes) зүрх рүү чиглүүлж сүлбэв!',
        '🥀 Гамшгийн цэцэрлэгт таныг хорьж, энергийг чинь хүчтэй сорлоо!',
        '🍂 Хурц навчин хуй салхи хусч, таныг шархдуулав!',
      ]
    },
    {
      name: 'Рёомэн Сүкүна (Ryomen Sukuna)',
      hp: 420,
      maxHp: 420,
      difficulty: 'ОНЦГОЙ ЗЭРЭГЛЭЛ (Boss)',
      color: 'from-rose-950 via-red-950 to-black',
      avatar: '👑',
      glowColor: 'shadow-[0_0_25px_rgba(239,68,68,0.5)] border-red-500',
      desc: 'Эртний Японы хамгийн аюултай Хараалын Хаан. Домогт 20 хуруугаар тэжээгддэг одот мангас.',
      attacks: [
        '👑 Тасдан хэрчих (Cleave) технологийг уурсан гаргалаа!',
        '🏹 Сүйрлийн Галт Сумаар (Fire Arrow) талбайг бүхэлд нь шатаалаа!',
        '⛩️ Малеволент Шүүх Саваар орчныг устган дайрав!',
      ]
    }
  ];

  const jjkCharacters = [
    {
      name: 'Гожо Сатору (Gojo Satoru)',
      ability: 'Хязгааргүй орон зай (Infinity)',
      domain: 'Хязгааргүй Хөндий (Infinite Void)',
      energy: 9999,
      color: 'from-cyan-500 to-indigo-650',
      avatar: '👁️‍🇲',
      bgGlow: 'rgba(6,182,212,0.35)',
      description: 'Орчин үеийн хамгийн хүчирхэг шидтэн. Түүний цэнхэр нүдний хүч хязгааргүй бөгөөд орон зайг бүрэн захирдаг.',
      quote: 'Санаа зоволтгүй ээ, Би хамгийн хүчтэй нь тул чи бүдрэхгүй ээ.',
      skills: [
        { name: "Шууд нударга", emoji: "👊", cost: 0, dmgMin: 15, dmgMax: 22, type: "attack", desc: "Биеийн хүчний шууд цохилт хийж +15 CP авна." },
        { name: "Цэнхэр таталт (Blue)", emoji: "🔵", cost: 20, dmgMin: 32, dmgMax: 45, type: "curse", desc: "Орон зайг хуримтлуулан дайсныг зайнаас хүчтэй татна." },
        { name: "Улаан туяа (Red)", emoji: "🔴", cost: 35, dmgMin: 50, dmgMax: 68, type: "curse", desc: "Хязгааргүй орон зайг түлхэж маш хүчтэй туяа цацна." },
        { name: "Нэгдсэн Нил Ягаан", emoji: "🟣", cost: 55, dmgMin: 75, dmgMax: 95, type: "curse", desc: "Цэнхэр болон Улаан хүчийг нэгтгэн устгах том хэмжээний туяа тавина." },
        { name: "Хязгааргүй Хөндий", emoji: "🌌", cost: 84, dmgMin: 120, dmgMax: 140, type: "domain", desc: "Төгс домэйн тэлж, дайсныг хөдөлгөөнгүй болгон үхлийн цохилт өгнө!" }
      ]
    },
    {
      name: 'Рёомэн Сүкүна (Ryomen Sukuna)',
      ability: 'Хэрчих, зүсэх (Cleave and Dismantle)',
      domain: 'Малеволент Шүүх Сав (Malevolent Shrine)',
      energy: 9500,
      color: 'from-rose-600 to-red-950',
      avatar: '😈',
      bgGlow: 'rgba(239,68,68,0.35)',
      description: 'Хараалын Хаан гэгддэг, 20 хуруунд хуваагдаж түгжигдсэн эртний агуу хүч ба туйлын галт зэвсэг.',
      quote: 'Чи надаас өндөр рүү харах зүрхтэй байна уу? Үхэл чинь ирлээ.',
      skills: [
        { name: "Цуст Маажилт", emoji: "✊", cost: 0, dmgMin: 16, dmgMax: 24, type: "attack", desc: "Номхотгох нударгаар дайсанд цохих дайралт хийж +15 CP хуримтлуулна." },
        { name: "Далайцтай зүсэлт", emoji: "⚔️", cost: 20, dmgMin: 30, dmgMax: 44, type: "curse", desc: "Агаарт мана сэлмээр дайсныг хэдэн хэсэг зүснэ." },
        { name: "Тасдах (Cleave)", emoji: "🩸", cost: 35, dmgMin: 48, dmgMax: 65, type: "curse", desc: "Мана бүтэц рүү нь чиглүүлэн биеийг нь хэмх тасална." },
        { name: "Галт Сүм (Fire Arrow)", emoji: "🔥", cost: 55, dmgMin: 72, dmgMax: 92, type: "curse", desc: "Хэт өндөр хэмийн галт сумаар дайсны биеийг шатаана." },
        { name: "Малеволент Шүүх", emoji: "⛩️", cost: 80, dmgMin: 120, dmgMax: 140, type: "domain", desc: "Үхлийн домэйн тэлж, секундэд мянга орчим хэрчих үхлийн цохилт өгнө." }
      ]
    },
    {
      name: 'Итадори Юүжи (Yuji Itadori)',
      ability: 'Хар аянга (Black Flash)',
      domain: 'Сүнсний тулаан (Soul Strike)',
      energy: 3500,
      color: 'from-amber-500 to-rose-705',
      avatar: '🐯',
      bgGlow: 'rgba(245,158,11,0.35)',
      description: 'Сүкүнагийн хурууг залгиснаар хараалын сургуульд элссэн цуцашгүй эрч хүчтэй баатрын залгамжлагч.',
      quote: 'Хүмүүсийг зөв үхлээр үхэхэд нь туслахыг би хүсэж байна.',
      skills: [
        { name: "Биеийн хүчний цохилт", emoji: "👊", cost: 0, dmgMin: 14, dmgMax: 20, type: "attack", desc: "Ер бусын биеийн хүчээр хүчтэй цохиж +15 CP авна." },
        { name: "Хойшлогдсон Сүнс", emoji: "⚡", cost: 15, dmgMin: 25, dmgMax: 35, type: "curse", desc: "Хориггүй хүч ашиглан хоёр шатлалт нударгаар цохино." },
        { name: "Хар Аянга (Black Flash)", emoji: "⚡🔥", cost: 35, dmgMin: 52, dmgMax: 70, type: "curse", desc: "Сэргэлт 0.000001 секундэд манагаа нэгтгэж хар аянга буулгана." },
        { name: "Сүнсний хилэгнэл", emoji: "🦁", cost: 50, dmgMin: 70, dmgMax: 90, type: "curse", desc: "Биеийн болон мана хүчийг туйл хүртэл шавхан дайрна." },
        { name: "Сүнсний Тэсрэлт", emoji: "👹", cost: 80, dmgMin: 115, dmgMax: 135, type: "domain", desc: "Ирээдүйн бүх хүч чадлаа шавхан агуу том сүнсний цохилт хийнэ." }
      ]
    },
    {
      name: 'Фүшигүро Мэгүми (Megumi Fushiguro)',
      ability: 'Арван Шигүү Сигнал сүүдэр (Ten Shadows Technique)',
      domain: 'Сүүдрийн цэцэрлэг хууралт (Chimera Shadow Garden)',
      energy: 4800,
      color: 'from-emerald-600 to-indigo-950',
      avatar: '🐺',
      bgGlow: 'rgba(16,185,129,0.35)',
      description: 'Сүүдрээр дамжуулан аюултай шикигами сүүдрийн араатнуудыг дуудаж тулалддаг суутан шидтэн.',
      quote: 'Би хүн болгоныг агуу шидтэн шиг аварч чадахгүй.',
      skills: [
        { name: "Сүүдэр нударга", emoji: "👊", cost: 0, dmgMin: 12, dmgMax: 18, type: "attack", desc: "Сүүдрийн урсгал ашиглан биеийн тулаан хийж +15 CP авна." },
        { name: "Цахилгаан Шувуу Nue", emoji: "🦅", cost: 20, dmgMin: 24, dmgMax: 35, type: "curse", desc: "Сүүдрээс асар том цахилгаан шувуу дуудаж дайсныг цохино." },
        { name: "Үнэнч Сүүдрийн Ноход", emoji: "🐺", cost: 35, dmgMin: 45, dmgMax: 60, type: "curse", desc: "Хамтарсан хурц сүүдрийн нохдоо дайсанд илгээн тасдан хэрчүүлнэ." },
        { name: "Зааны хүнд нуралт", emoji: "🐘", cost: 50, dmgMin: 70, dmgMax: 90, type: "curse", desc: "Хүнд жинтэй зааныг дээрээс нь унагаж дайсныг бяцална." },
        { name: "Химера Сүүдрийн Сав", emoji: "🏰", cost: 80, dmgMin: 115, dmgMax: 135, type: "domain", desc: "Сүүдрийн цэцэрлэг тэлж, хязгааргүй олон шикигами дуудаж бут ниргэнэ." }
      ]
    }
  ];

  const gremixQuotes = [
    'Юу байцгаана даа залуусаа! Та нартайгаа хамт Гремикс байна!',
    'ӨӨӨ МАЙ ГОД! Энэ тоглоом ямар аймар юм бэ?! 😱',
    'Энийг ингээд хийчихвэл за тэгээд би супер дупер баян боллоо л гэсэн үг!',
    'Субскрайб дарахаа бүү мартаарай, за юу? Лайк шэйр гурваа харамлаж болохгүй шүү!',
    'Nooo! Би яагаад үхчихэв ээ? Маш харамсалтай байна залуусаа...',
  ];

  // Football game logic
  const handleShot = (aim: 'left' | 'center' | 'right') => {
    if (playerAim !== 'idle') return; // prevent spamming while animating
    
    // Play referee whistle and then the kick sound
    playFootballSfx('whistle');
    setTimeout(() => {
      playFootballSfx('kick');
    }, 280);

    setPlayerAim(aim);
    setShots(s => s + 1);

    const striker = footballStrikers[activeFootballChar];
    const keeper = footballKeepers[activeKeeperChar];
    const ball = footballBalls[selectedBallIndex];
    const technique = shotTechnique;

    // 1. Calculate accuracy with shotPower influence:
    // If power is extremely high (e.g., 90-100), there is an extra risk of missing (up to 18% miss risk)
    let accuracyMult = 1.0;
    if (technique === 'power') accuracyMult = 0.82;
    if (technique === 'panenka') accuracyMult = 0.96;
    
    // Higher power introduces extra variance
    const powerMissRisk = shotPower > 75 ? (shotPower - 75) * 0.006 : 0;
    // High Crowd Hype (> 85) increases accuracy by 5% as stadium boost!
    const crowdBoost = crowdHype > 85 ? 0.05 : 0;
    const finalAccuracy = (striker.accuracy * accuracyMult) - powerMissRisk + crowdBoost;
    
    const isMissed = isPerfectGoalMode ? false : (Math.random() > finalAccuracy);

    // 2. Keeper guesses direction
    const directions: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
    let keeperChoice: 'left' | 'center' | 'right';

    // Keeper has a base chance to guess correctly
    const correctGuess = isPerfectGoalMode ? false : (Math.random() < keeper.saveChance);
    if (correctGuess) {
      keeperChoice = aim;
    } else {
      const others = directions.filter(d => d !== aim);
      keeperChoice = others[Math.floor(Math.random() * others.length)];
    }

    setKeeperAction(keeperChoice);

    const shotDirectionStr = aim === 'left' ? 'Зүүн' : aim === 'center' ? 'Төв' : 'Баруун';
    const keeperDirectionStr = keeperChoice === 'left' ? 'Зүүн' : keeperChoice === 'center' ? 'Төв' : 'Баруун';

    setTimeout(() => {
      if (isMissed) {
        setShotResult('missed');
        setCurrentStreak(0);
        setCrowdHype(h => Math.max(15, h - 15)); // missed decreases crowd hype heavily
        setFootballFloatingText({ text: '🚫 АЛДЛАА! (Out)', isGoal: false, isMiss: true });
        playFootballSfx('miss');
        
        const missCommentaries = [
          `🚫 ӨӨӨҮ, АЛДЛАА! ${striker.avatar} ${striker.name.split(' (')[0]} ${shotPower}% хүчээр хуссан ч бөмбөг хаалганы гадуур нислээ!`,
          `🚫 ШҮРШҮҮРТ ЦОХИЛТ АЛДАГДЛАА! Бөмбөг хаалганы дээгүүр замхарч, цэнгэлдэх суудалд буув.`,
          `🚫 ИЛҮҮ ДУТУУ ЦОХИЛТ! Бөмбөг хаалганы багана шүргээд гадагшиллаа!`
        ];
        setCommentaryLogs(prev => [missCommentaries[Math.floor(Math.random() * missCommentaries.length)], ...prev]);
        
      } else if (keeperChoice === aim) {
        // Keeper went the right way! But check if technique/power breaks through!
        let brokeThrough = false;
        let specialReason = '';

        // Breakthrough calculations:
        // High power breakthrough: base is 15%. If power is near 100%, extra 35% chance to break through!
        const baseBreakthrough = technique === 'power' ? 0.38 : 0.12;
        const powerBreakthroughBonus = (shotPower / 100) * 0.40; // up to 40% bonus
        const totalBreakthroughChance = baseBreakthrough + powerBreakthroughBonus;

        if (Math.random() < totalBreakthroughChance) {
          brokeThrough = true;
          if (shotPower > 85) {
            specialReason = `🔥 ХЭТ ХҮЧТЭЙ ЦОХИЛТ (${shotPower}% ХҮЧ)! Хаалгач ${keeper.avatar} бөмбөгний замыг хааж гар хүрсэн боловч бөмбөг асар их хүчээр мултран тор руу чихэгдлээ!`;
          } else {
            specialReason = `🔥 ХҮЧИТ ПАУЭР ЦОХИЛТ! Хаалгач ${keeper.avatar} бөмбөг ирэхийг мэдэрч хаасан ч бөмбөг нэвтэрч тор руу орлоо!`;
          }
        } else if (technique === 'finesse' && Math.random() < 0.30) {
          brokeThrough = true;
          specialReason = `🔮 ЭРГҮҮЛЭГТЭЙ СҮДЭР! Хаалгач бөмбөг рүү үсэрсэн ч бөмбөг агаарт уран муруйж хаалгачийн хурууны хажуугаар гоолдов!`;
        }

        if (brokeThrough) {
          setShotResult('goal');
          setGoals(g => g + 1);
          setCrowdHype(h => Math.min(100, h + 25)); // Breakthrough scores massive Hype
          
          let goalMsg = `⚽ ${striker.avatar} ${striker.name.split(' (')[0]} чадвар гарган СУПЕР гоол заллаа!`;
          if (striker.avatar === '👑') {
            goalMsg = '⚽ SIUUUUUUU! Роналдогийн гайхалтай суга цохилт! Тор чичирхийллээ! ⚡';
            playFootballSfx('siuu');
          } else {
            playFootballSfx('goal');
          }
          
          setFootballFloatingText({ text: striker.avatar === '👑' ? '🔥 SIUUUUUU!' : '⚽ ГООЛ!', isGoal: true });

          setCurrentStreak(s => {
            const nextStreak = s + 1;
            if (nextStreak > bestStreak) setBestStreak(nextStreak);
            return nextStreak;
          });

          setCommentaryLogs(prev => [specialReason || goalMsg, ...prev]);
        } else {
          // Saved!
          setShotResult('saved');
          setCurrentStreak(0);
          setCrowdHype(h => Math.max(15, h - 10)); // Save decreases crowd hype
          setFootballFloatingText({ text: '🧤 ХААГДЛАА!', isGoal: false });
          playFootballSfx('save');

          const saveCommentaries = [
            `🧤 АЙМШИГТ ХААЛТ! ${keeper.avatar} ${keeper.name.split(' (')[0]} чиглэлийг төгс мэдэрч ${keeperDirectionStr} тийш үсэрч хаалаа!`,
            `🧤 АВАРГА ГАР! Хаалгач ${keeper.name} агуу хаалт гүйцэтгэн бөмбөгийг гаргаж чадлаа.`,
            `🧤 ХААЛТ! ${striker.name.split(' (')[0]}-ын цохилтыг хаалгач гайхалтайгаар аюулгүй болгов.`
          ];
          setCommentaryLogs(prev => [saveCommentaries[Math.floor(Math.random() * saveCommentaries.length)], ...prev]);
        }
      } else {
        // Goal scored directly (GK guessed wrong)
        setShotResult('goal');
        setGoals(g => g + 1);
        setCrowdHype(h => Math.min(100, h + 15)); // Regular goal increases Hype

        let goalFloat = '⚽ ГООЛ!';
        if (striker.avatar === '👑') {
          goalFloat = '👑 SIUUUUUU!';
          playFootballSfx('siuu');
        } else if (striker.avatar === '🐐') {
          goalFloat = '🐐 ANKARA MESS!!';
          playFootballSfx('goal');
        } else if (striker.avatar === '🎮') {
          goalFloat = '🎮 ӨӨӨ МАЙ ГОД!';
          playFootballSfx('goal');
        } else if (striker.avatar === '🏃‍♂️') {
          goalFloat = '⚽ ТӨГС БҮТЭЭН!';
          playFootballSfx('goal');
        } else {
          playFootballSfx('goal');
        }

        setFootballFloatingText({ text: goalFloat, isGoal: true });

        setCurrentStreak(s => {
          const nextStreak = s + 1;
          if (nextStreak > bestStreak) setBestStreak(nextStreak);
          return nextStreak;
        });

        // Panenka special message if GK dived elsewhere
        let comment = '';
        if (technique === 'panenka') {
          comment = `🥅 ПАНЕНКА ЧИП! ${striker.avatar} бөмбөгийг төв рүү зөөлөн залав! Хаалгач ${keeper.avatar} ${keeperDirectionStr} тийш аль хэдийн үсэрсэн тул гайхалтай дооглон гоолдлоо! 😂`;
        } else if (technique === 'finesse') {
          comment = `🥅 УРАН ЭРГҮҮЛЭГТЭЙ ГООЛ! Хаалганы ${shotDirectionStr} буланд хуурмаг урсгалаар тор сунав!`;
        } else {
          comment = `🥅 ГООООЛ! Бөмбөг хаалганы ${shotDirectionStr} буланд шигдлээ! Хаалгач ${keeper.avatar} ${keeperDirectionStr} зүгт үсэрсэн ч хүрч чадсангүй!`;
        }

        setCommentaryLogs(prev => [comment, ...prev]);
      }
    }, 550); // slight delay to sync ball animation timing

    // Reset round after 3.2 seconds to let them enjoy the splash and celebration
    setTimeout(() => {
      setShotResult('idle');
      setKeeperAction('idle');
      setPlayerAim('idle');
      setFootballFloatingText(null);
    }, 3200);
  };

  const resetFootballGame = () => {
    setGoals(0);
    setShots(0);
    setShotResult('idle');
    setCurrentStreak(0);
    setCrowdHype(60);
    playFootballSfx('whistle');
    setCommentaryLogs([`🏟️ Шинэ тоглоом эхэллээ. Талбайд '${footballStrikers[activeFootballChar].name.split(' (')[0]}' бэлэн! ${footballKeepers[activeKeeperChar].avatar} хаалганы өмнө зогслоо.`]);
    setFootballFloatingText(null);
  };

  const handleDomainExpansion = () => {
    setDomainExpanded(true);
    setCursedEnergy(100);
    playJjkSfx('domain');
    setTimeout(() => setDomainExpanded(false), 3500);
  };

  const handleJjkSkillAction = (skill: { name: string; emoji: string; cost: number; dmgMin: number; dmgMax: number; type: string; desc: string }) => {
    if (battleResult !== 'idle') return;

    const char = jjkCharacters[activeJjkChar];
    const enemy = jjkEnemies[selectedEnemyIndex];

    if (jjkEnergy < skill.cost) {
      setBattleLog(prev => [`⚠️ Хараалын CP хүрэхгүй байна! "${skill.name}" чадварт ${skill.cost} CP хэрэгтэй (Одоо: ${jjkEnergy} CP)`, ...prev]);
      return;
    }

    // Play action sounds
    if (skill.type === 'domain') {
       handleDomainExpansion();
    } else if (skill.cost === 0) {
       playJjkSfx('attack');
    } else {
       playJjkSfx('curse');
    }

    // Trigger enemy damage shake animation
    setEnemyShake(true);
    setTimeout(() => setEnemyShake(false), 500);

    // Calculate Damage
    const dmg = Math.floor(Math.random() * (skill.dmgMax - skill.dmgMin + 1)) + skill.dmgMin;
    
    // Set floating damage indicator for enemy
    setFloatingDamage({ text: `💥 -${dmg}`, isPlayer: false });
    setTimeout(() => setFloatingDamage(null), 1200);

    // Cost deduct & recovery details
    let message = '';
    if (skill.cost === 0) {
      setJjkEnergy(prev => Math.min(100, prev + 15));
      message = `${skill.emoji} ${char.name.split(' (')[0]} "${skill.name}" үндсэн техникээр дайрч ${dmg} хохирол учруулан +15 CP авлаа!`;
    } else {
      setJjkEnergy(prev => Math.max(0, prev - skill.cost));
      message = `${skill.emoji} ${char.name.split(' (')[0]} агуу мана хүчийг цуглуулан "${skill.name}" технологийг гарган дайсанд ${dmg} хүчтэй хохирол учруулав!`;
    }

    const nextEnemyHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp <= 0) {
      setBattleResult('won');
      playJjkSfx('win');
      setBattleLog(prev => [
        `🏆 СУПЕР ЯЛАЛТ! Та ${enemy.avatar} ${enemy.name}-ыг ариусган устгаж ертөнцийг амар амгалан болголоо! 🎉`,
        message,
        ...prev
      ]);
      return;
    }

    // Enemy Turn after slight turn delay to make it realistic
    setTimeout(() => {
      // Check if enemy was already defeated under timed events
      setEnemyHp(currentEnemyHp => {
        if (currentEnemyHp <= 0) return 0;

        // Trigger player damage shake animation
        setPlayerShake(true);
        setTimeout(() => setPlayerShake(false), 500);

        // Enemy damages player
        let enemyDmg = Math.floor(Math.random() * 12) + 16; // 16-28 dmg
        if (isDefense) {
          enemyDmg = Math.floor(enemyDmg * 0.35); // 65% damage reduction
        }

        // Set floating damage indicator for player
        setFloatingDamage({ text: `💔 -${enemyDmg}`, isPlayer: true });
        setTimeout(() => setFloatingDamage(null), 1200);

        // Random enemy attack line
        const enemyAttacks = enemy.attacks;
        const randAttack = enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
        const enemyMsg = `${enemy.avatar} ${enemy.name.split(' (')[0]} зэрлэгээр дайрч: "${randAttack}" Танд ${enemyDmg} хохирол учруулав.`;

        // Play damage/attack sfx for enemy hit if player is alive
        playJjkSfx('attack');

        setPlayerHp(currentPlayerHp => {
          const nextPlayerHp = Math.max(0, currentPlayerHp - enemyDmg);
          if (nextPlayerHp <= 0) {
            setBattleResult('lost');
            playJjkSfx('lose');
            setBattleLog(prev => [
              `💀 ХАРАМСАЛТАЙ НЬ ЯЛАГДЛАА! Хараалын зэрлэг хүч таны сүнсэн биеийг үгүй хийлээ. 💀`,
              enemyMsg,
              message,
              ...prev
            ]);
          } else {
            setBattleLog(prev => [enemyMsg, message, ...prev]);
          }
          return nextPlayerHp;
        });

        setIsDefense(false); // remove defense status
        return currentEnemyHp;
      });
    }, 850);
  };

  const handleJjkDefense = () => {
    if (battleResult !== 'idle') return;
    const char = jjkCharacters[activeJjkChar];
    const enemy = jjkEnemies[selectedEnemyIndex];

    setIsDefense(true);
    playJjkSfx('shield');
    const recoveryAmt = 35;
    setJjkEnergy(prev => Math.min(100, prev + recoveryAmt));
    const message = `🛡️ ${char.name.split(' (')[0]} "Бие хамгаалах орон зай" үүсгэж манаа +${recoveryAmt} CP цэнэглэлээ! Сөрөг дайралтыг сулруулна.`;

    // Enemy Turn after slight turn delay
    setTimeout(() => {
      setEnemyHp(currentEnemyHp => {
        if (currentEnemyHp <= 0) return 0;

        setPlayerShake(true);
        setTimeout(() => setPlayerShake(false), 500);

        // Defended damage
        let enemyDmg = Math.floor(Math.random() * 8) + 12; // lower base
        enemyDmg = Math.floor(enemyDmg * 0.35); // 65% reduction

        setFloatingDamage({ text: `🛡️ Хаав! -${enemyDmg}`, isPlayer: true });
        setTimeout(() => setFloatingDamage(null), 1200);

        const enemyAttacks = enemy.attacks;
        const randAttack = enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
        const enemyMsg = `${enemy.avatar} ${enemy.name.split(' (')[0]} дайрсан ч таны хамгаалалтыг нэвтэлж чадсангүй (${enemyDmg} хохирол).`;

        playJjkSfx('attack');

        setPlayerHp(currentPlayerHp => {
          const nextPlayerHp = Math.max(0, currentPlayerHp - enemyDmg);
          if (nextPlayerHp <= 0) {
            setBattleResult('lost');
            playJjkSfx('lose');
            setBattleLog(prev => [
              `💀 ЯЛАГДЛАА! Хамгаалсан боловч амьд үлдэж чадсангүй.`,
              enemyMsg,
              message,
              ...prev
            ]);
          } else {
            setBattleLog(prev => [enemyMsg, message, ...prev]);
          }
          return nextPlayerHp;
        });

        return currentEnemyHp;
      });
    }, 850);
  };

  const resetJjkGame = () => {
    const enemy = jjkEnemies[selectedEnemyIndex];
    setPlayerHp(120);
    setEnemyHp(enemy.hp);
    setJjkEnergy(50);
    setBattleResult('idle');
    setBattleLog([`⚔️ Шинэ ариусгах тулаан эхэллээ. Та ${enemy.avatar} ${enemy.name}-ын эсрэг бэлэн байна!`]);
    setIsDefense(false);
  };

  const activeImage = () => {
    switch(activeSection) {
      case 'football': return '/src/assets/images/football_action_1782106744642.jpg';
      case 'anime': return '/src/assets/images/jujutsu_kaisen_art_1782106760905.jpg';
      case 'gremix': return '/src/assets/images/gremix_gaming_1782106775411.jpg';
      default: return '';
    }
  }

  return (
    <div className="relative w-full h-full min-h-screen overflow-y-auto overflow-x-hidden pt-28 pb-16 px-4 md:px-8 z-20 pointer-events-none flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto pointer-events-auto">
        <AnimatePresence mode="wait">
          
          {/* FOOTBALL SECTION */}
          {activeSection === 'football' && (
            <motion.div
              key="football-panel"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left bento description: Personal Info, Striker Selection, Ball selection */}
              <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full w-fit">
                    <Trophy className="w-3.5 h-3.5 animate-bounce" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Миний Хобби & Дүрүүд</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                    ХӨЛБӨМБӨГ БОЛ <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-glow-cyan">Миний Хүсэл Тэмүүлэл</span>
                  </h2>
                  
                  <p className="text-white/70 text-xs leading-relaxed font-light">
                    Би 11 настай, чөлөөт цагаараа хөлбөмбөг тоглох маш их дуртай! Ногоон талбай дээр дрибл хийж, багийн нөхдөдөө дамжуулалт өгөн пенальтигаас гоол оруулах тэр мөч бол үнэхээр сэтгэл хөдөлгөм.
                  </p>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                      <span className="text-white/40 block">ШИЛДЭГ БАЙРЛАЛ:</span>
                      <span className="text-xs font-bold text-cyan-400 mt-0.5 block">Довтлогч (Striker)</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                      <span className="text-white/40 block">ДУРТАЙ КЛУБ:</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">Реал Мадрид 👑</span>
                    </div>
                  </div>
                </div>

                {/* Striker Custom Select Hub */}
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider block font-bold">1. ДОВТЛОГЧОО СОНГОХ (Striker Select):</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {footballStrikers.map((striker, index) => (
                      <button
                        key={striker.name}
                        disabled={playerAim !== 'idle'}
                        onClick={() => {
                          setActiveFootballChar(index);
                          setCommentaryLogs(prev => [`🏃 Талбайн довтлогчоор ${striker.avatar} ${striker.name.split(' (')[0]}-ыг дуудлаа!`, ...prev]);
                        }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          activeFootballChar === index 
                            ? 'bg-gradient-to-tr ' + striker.color + ' border-transparent text-white shadow-md'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {(striker as any).image ? (
                            <img 
                              src={(striker as any).image} 
                              alt={striker.name} 
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm shrink-0"
                            />
                          ) : (
                            <span className="text-xl">{striker.avatar}</span>
                          )}
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold truncate text-white">{striker.name.split(' (')[0]}</div>
                            <div className="text-[8px] opacity-75 font-mono">Шүүлт: {striker.rating} / Spec</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Character stats & quote */}
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                      <span>Уран Чадвар:</span>
                      <span className="text-cyan-400 font-bold">{footballStrikers[activeFootballChar].specialName}</span>
                    </div>
                    <p className="text-[10.5px] italic text-white/70 font-light leading-snug">
                       "{footballStrikers[activeFootballChar].quote}"
                    </p>
                  </div>
                </div>

                {/* Ball Styling tray */}
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider block font-bold">2. БӨМБӨГНИЙ ЗАСАЛ (Select Ball Skin):</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {footballBalls.map((b, idx) => (
                      <button
                        key={b.name}
                        onClick={() => setSelectedBallIndex(idx)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedBallIndex === idx
                            ? 'bg-cyan-950/45 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.30)]'
                            : 'bg-white/5 border-transparent text-white/40 hover:text-white/85'
                        }`}
                      >
                        <div className="text-lg">{b.icon.replace('⚽', '') || '⚽'}</div>
                        <div className="text-[7.5px] font-mono mt-1 leading-none truncate">{b.name.split(' ')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video group">
                  <img 
                    src="/src/assets/images/football_action_1782106744642.jpg" 
                    alt="Хөлбөмбөгчин Төгсжаргал" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] text-cyan-400 font-mono font-medium tracking-wider">Мөрөөдлийн дриббл, хүчирхэг цохилт!</span>
                  </div>
                </div>
              </div>

              {/* Right column: Penalty shoot-out interactive game */}
              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between space-y-4">
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  {/* Title & action reset */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-white font-display font-bold text-xl flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400 animate-pulse" />
                        Пенальти Цохих Симулятор 4.0
                      </h3>
                      <p className="text-[10px] text-white/55">Хаалгачийн эсрэг бөмбөгөө чиглүүлэгтэй хувилбараар өшиглөж гоолд!</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const nextMute = !isMuted;
                          setIsMuted(nextMute);
                          if (!nextMute) {
                            setTimeout(() => playFootballSfx('kick'), 50);
                          }
                        }}
                        className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                          isMuted 
                            ? 'bg-rose-950/20 border-rose-500/30 text-rose-400 hover:bg-rose-950/40' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                        }`}
                        title={isMuted ? "Дуу нээх" : "Дуу хаах"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button 
                        onClick={resetFootballGame}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Сэргээх
                      </button>
                    </div>
                  </div>

                  {/* 100% Perfect Goal Mode Toggle widget */}
                  <div className={`mb-4 p-3 rounded-2xl border transition-all flex justify-between items-center ${
                    isPerfectGoalMode 
                      ? 'bg-emerald-950/25 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.12)]' 
                      : 'bg-slate-950/45 border-white/5'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-xl transition-all ${isPerfectGoalMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                        <Sparkles className={`w-4 h-4 ${isPerfectGoalMode ? 'animate-spin-slow' : ''}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-bold text-white tracking-wide uppercase">100% ТӨГС ГООЛЫН ШИДТЭН ГОРИМ</span>
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full font-mono uppercase ${
                            isPerfectGoalMode ? 'bg-emerald-500 text-slate-950 animate-bounce' : 'bg-white/10 text-white/40'
                          }`}>
                            {isPerfectGoalMode ? 'ХОЛБОГДСОН' : 'ИДЭВХГҮЙ'}
                          </span>
                        </div>
                        <p className="text-[8.5px] text-white/50 leading-tight mt-1">Цохисон бүх бөмбөг 100% гоол болж хаалгачийг нэвтлэн тор руу шигдэнэ!</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsPerfectGoalMode(!isPerfectGoalMode);
                        playFootballSfx(isPerfectGoalMode ? 'save' : 'goal');
                      }}
                      className={`relative w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer outline-none flex-shrink-0 ${
                        isPerfectGoalMode ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <motion.div 
                        layout 
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-5 h-5 rounded-full bg-slate-950 shadow-md"
                        animate={{ x: isPerfectGoalMode ? 24 : 0 }}
                      />
                    </button>
                  </div>

                  {/* Goalkeeper selection hub (Difficulty selection) */}
                  <div className="bg-slate-950/45 p-3 rounded-2xl border border-white/5 space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-indigo-400 font-mono tracking-wider block uppercase font-bold">ХААЛГАЧ & ХҮНДРЭЛ ТҮВШИН:</span>
                      <span className="text-[8.5px] font-mono text-white/30">Сөрөг талын хаалтын түвшин</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {footballKeepers.map((k, idx) => (
                        <button
                          key={k.name}
                          disabled={playerAim !== 'idle'}
                          onClick={() => {
                            setActiveKeeperChar(idx);
                            setCommentaryLogs(prev => [`🧤 Хаалгач өөрчлөгдлөө: "${k.avatar} ${k.name.split(' (')[0]}" таныг блок хийхээр бэлдэж байна!`, ...prev]);
                          }}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            activeKeeperChar === idx
                              ? 'bg-indigo-950/40 border-indigo-500/80 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                              : 'bg-white/5 border-transparent text-white/50 hover:bg-white/15'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg">{k.avatar.replace('🧤', '') || '🧤'}</span>
                            <div className="min-w-0">
                              <div className="text-[10px] font-bold text-white leading-tight truncate">{k.name.split(' (')[0]}</div>
                              <div className="text-[8px] font-mono text-indigo-400 font-semibold leading-none">{k.level.split(' ')[0]}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stadium Crowd Hype Progress Bar */}
                  <div className="bg-slate-950/45 p-3 rounded-2xl border border-white/5 space-y-1.5 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-cyan-400 font-mono tracking-wider block uppercase font-bold flex items-center gap-1">
                        <Users className="w-3 h-3 text-cyan-400 animate-pulse" />
                        ЦЭНГЭЛДЭХИЙН ХӨӨРӨЛ (Crowd Hype):
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${crowdHype > 85 ? 'text-emerald-400 animate-bounce' : 'text-cyan-400'}`}>
                        {crowdHype}% {crowdHype > 85 ? '🔥 СУПЕР ХҮЧ!' : crowdHype > 50 ? '🎉 ИДЭВХТЭЙ' : '💤 НАМ ГҮМ'}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5 p-[1px]">
                      <motion.div 
                        initial={{ width: '50%' }}
                        animate={{ width: `${crowdHype}%` }}
                        transition={{ type: 'spring', stiffness: 80 }}
                        className={`h-full rounded-full bg-gradient-to-r transition-all ${
                          crowdHype > 85 
                            ? 'from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]' 
                            : 'from-cyan-600 to-indigo-500'
                        }`}
                      />
                    </div>
                    <span className="text-[8px] text-white/40 block leading-tight">
                      * Гоол оруулахад хөөрөл нэмэгдэж (+15%), хаалгахад буурна. 85%-иас дээш гарвал довтлогчийн нарийвчлал +5% нэмэгдэнэ!
                    </span>
                  </div>

                  {/* Goal keeper tactical field element with interactive hit target net overlay */}
                  <div className="relative h-64 w-full border border-white/10 rounded-2xl bg-gradient-to-b from-slate-950 to-cyan-950/20 backdrop-blur-sm overflow-hidden flex flex-col justify-end items-center p-3 group">
                    
                    {/* Beautiful Field Stripes */}
                    <div className="absolute inset-0 grid grid-rows-6 opacity-[0.06] pointer-events-none">
                      <div className="bg-emerald-900/40 w-full h-full" />
                      <div className="bg-transparent w-full h-full" />
                      <div className="bg-emerald-900/40 w-full h-full" />
                      <div className="bg-transparent w-full h-full" />
                      <div className="bg-emerald-900/40 w-full h-full" />
                      <div className="bg-transparent w-full h-full" />
                    </div>

                    {/* Laser tactical field lines */}
                    <div className="absolute inset-x-0 bottom-0 h-44 border-t border-cyan-500/20 opacity-30 pointer-events-none">
                      <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[length:100%_15px]" />
                    </div>

                    {/* Goal frame line representation with glowing nets */}
                    <div className="absolute top-10 left-12 right-12 bottom-0 border-t-4 border-x-4 border-cyan-400/30 rounded-t-lg z-10 transition-all duration-300 group-hover:border-cyan-400/55 shadow-[inset_0_10px_20px_rgba(6,182,212,0.05)]">
                      {/* Neon tactical grid net */}
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,182,212,0.05)_100%)] bg-[linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:12px_12px]" />
                    </div>

                    {/* Direct clickable overlay targets on network to shoot instantly */}
                    {playerAim === 'idle' && (
                      <div className="absolute top-14 left-14 right-14 bottom-14 z-20 grid grid-cols-3 gap-4 pointer-events-auto">
                        <button
                          onClick={() => handleShot('left')}
                          className="w-full h-full rounded-xl hover:bg-cyan-500/10 border border-dashed border-transparent hover:border-cyan-400/40 transition-all flex flex-col justify-between items-start p-3 group/target text-left cursor-pointer"
                        >
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded leading-none opacity-40 group-hover/target:opacity-100 transition-opacity">ЗҮҮН БУЛАН</span>
                          <span className="text-lg opacity-0 group-hover/target:opacity-100 transition-opacity filter drop-shadow">🎯</span>
                        </button>
                        <button
                          onClick={() => handleShot('center')}
                          className="w-full h-full rounded-xl hover:bg-cyan-500/10 border border-dashed border-transparent hover:border-cyan-400/40 transition-all flex flex-col justify-end items-center p-3 group/target text-center cursor-pointer"
                        >
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded leading-none opacity-40 group-hover/target:opacity-100 transition-opacity">ТӨВ ХЭСЭГ</span>
                        </button>
                        <button
                          onClick={() => handleShot('right')}
                          className="w-full h-full rounded-xl hover:bg-cyan-500/10 border border-dashed border-transparent hover:border-cyan-400/40 transition-all flex flex-col justify-between items-end p-3 group/target text-right cursor-pointer"
                        >
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded leading-none opacity-40 group-hover/target:opacity-100 transition-opacity">БАРУУН БУЛАН</span>
                          <span className="text-lg opacity-0 group-hover/target:opacity-100 transition-opacity filter drop-shadow">🎯</span>
                        </button>
                      </div>
                    )}

                    {/* Fixed visual cue circles */}
                    {playerAim === 'idle' && (
                      <>
                        <div className="absolute top-16 left-16 z-15 w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center opacity-30 animate-pulse pointer-events-none">
                          <span className="text-[9px] text-cyan-400 font-mono">L</span>
                        </div>
                        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-15 w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center opacity-30 animate-pulse pointer-events-none">
                          <span className="text-[9px] text-cyan-400 font-mono">C</span>
                        </div>
                        <div className="absolute top-16 right-16 z-15 w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center opacity-30 animate-pulse pointer-events-none">
                          <span className="text-[9px] text-cyan-400 font-mono">R</span>
                        </div>
                      </>
                    )}

                    {/* Goalkeeper Avatar with glow hands diving beautifully */}
                    <motion.div
                      animate={{
                        x: keeperAction === 'left' ? -125 : keeperAction === 'right' ? 125 : 0,
                        y: keeperAction !== 'idle' ? -25 : 0,
                        scale: keeperAction !== 'idle' ? 1.08 : 1,
                        rotate: keeperAction === 'left' ? -25 : keeperAction === 'right' ? 25 : 0
                      }}
                      className="absolute top-20 z-25 flex flex-col items-center pointer-events-none"
                      transition={{ type: 'spring', damping: 11, stiffness: 90 }}
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md" />
                        
                        {/* Interactive Goalkeeper gloves icons on left/right wings */}
                        <div className={`absolute -left-6 w-6 h-6 bg-indigo-950 border border-indigo-400 flex items-center justify-center rounded-lg transition-transform ${keeperAction !== 'idle' ? 'scale-125' : ''}`}>
                          <span className="text-xs">🧤</span>
                        </div>
                        
                        {/* Goalkeeper central body */}
                        <div className="w-16 h-16 bg-slate-900 border-2 border-indigo-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] relative">
                          <Shield className="w-6 h-6 text-indigo-400 animate-pulse mb-0.5" />
                          <span className="text-[7.5px] text-indigo-300 font-extrabold font-mono tracking-widest leading-none font-black font-sans">GK {footballKeepers[activeKeeperChar].avatar.replace('🧤', '')}</span>
                        </div>

                        <div className={`absolute -right-6 w-6 h-6 bg-indigo-950 border border-indigo-400 flex items-center justify-center rounded-lg transition-transform ${keeperAction !== 'idle' ? 'scale-125' : ''}`}>
                          <span className="text-xs">🧤</span>
                        </div>
                      </div>
                      
                      <span className="text-[9px] text-indigo-300 bg-indigo-950/80 border border-indigo-500/20 px-2.5 py-0.5 rounded-full mt-2 font-mono">
                        {footballKeepers[activeKeeperChar].name}
                      </span>
                    </motion.div>

                    {/* VISIBLE ACTIVE STRIKER (ХӨЛБӨМБӨГЧИН ДҮР) - 'huneeg harahdag bolgoh' */}
                    <motion.div
                      animate={playerAim !== 'idle' ? {
                        x: playerAim === 'left' ? [-60, -10, -35] : playerAim === 'right' ? [-60, 10, -20] : [-60, -5, -30],
                        y: playerAim !== 'idle' ? [-6, -35, -15] : -6,
                        scale: playerAim !== 'idle' ? [1.05, 0.9, 0.95] : 1.05,
                        rotate: playerAim !== 'idle' ? [0, -15, 10, 0] : 0,
                      } : {
                        x: -60,
                        y: -6,
                        scale: 1.05,
                        rotate: 0,
                      }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute bottom-6 left-1/2 z-28 flex flex-col items-center pointer-events-none"
                    >
                      <div className="relative flex flex-col items-center justify-center">
                        {/* Glow halo around the active player */}
                        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${
                          activeFootballChar === 0 ? 'bg-cyan-400/35' : activeFootballChar === 1 ? 'bg-indigo-400/35' : activeFootballChar === 2 ? 'bg-fuchsia-400/35' : 'bg-amber-400/35'
                        }`} />
                        
                        {/* Player bubble avatar */}
                        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 bg-slate-950 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] relative overflow-hidden">
                          {(footballStrikers[activeFootballChar] as any).image ? (
                            <img 
                              src={(footballStrikers[activeFootballChar] as any).image} 
                              alt={footballStrikers[activeFootballChar].name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl filter drop-shadow">{footballStrikers[activeFootballChar].avatar}</span>
                          )}
                          <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-cyan-400 text-slate-950 font-black px-1 py-0.2 rounded-full border border-slate-950 font-sans">
                            ST
                          </span>
                        </div>

                        {/* Interactive boot shoe vector illustration */}
                        <motion.div 
                          animate={playerAim !== 'idle' ? { rotate: [0, 60, -15, 0], scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="absolute -bottom-1 -right-2 bg-slate-900 border border-cyan-400 rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                        >
                          👟
                        </motion.div>
                      </div>
                      
                      {/* Name tag below player */}
                      <span className="text-[8.5px] font-bold text-white bg-slate-950/90 border border-cyan-500/30 px-2 py-0.5 rounded-full mt-2 shadow-lg tracking-wide whitespace-nowrap">
                        {footballStrikers[activeFootballChar].name.split(' (')[0]}
                      </span>
                    </motion.div>

                    {/* Soccer Ball icon using the chosen styled ball design */}
                    <motion.div
                      animate={{
                        x: playerAim === 'left' ? -115 : playerAim === 'right' ? 115 : 0,
                        y: playerAim !== 'idle' ? -145 : 0,
                        scale: playerAim !== 'idle' ? 0.48 : 1,
                        rotate: playerAim !== 'idle' ? 1080 : 0
                      }}
                      className="absolute bottom-6 z-26 pointer-events-none"
                      transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="relative group flex items-center justify-center">
                        {playerAim !== 'idle' && (
                          <div className={`absolute inset-0 rounded-full blur-xl animate-ping ${
                            selectedBallIndex === 1 ? 'bg-cyan-400' : selectedBallIndex === 2 ? 'bg-amber-400' : selectedBallIndex === 3 ? 'bg-rose-500' : 'bg-white'
                          }`} />
                        )}
                        
                        {/* Premium Soccer ball design according to selectedBallIndex */}
                        <div className={`w-12 h-12 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden relative font-sans ${footballBalls[selectedBallIndex].style}`}>
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#ffffff,_#000000)]" />
                          
                          {/* Inner custom patterns resembling soccer geometry */}
                          {selectedBallIndex === 0 ? (
                            <div className="w-full h-full relative">
                              <div className="absolute top-1 left-4 w-4 h-4 bg-slate-900 rotate-45" />
                              <div className="absolute bottom-1 right-4 w-4 h-4 bg-slate-900 rotate-12" />
                              <div className="absolute top-5 left-1 w-3 h-3 bg-slate-900 rotate-90" />
                              <div className="absolute top-5 right-1 w-3 h-3 bg-slate-900 -rotate-45" />
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-sm" />
                            </div>
                          ) : (
                            <span className="text-xl filter drop-shadow">{footballBalls[selectedBallIndex].icon.replace('⚽', '') || '⚽'}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Massive Floating Text Overlay on goal/saved/missed results */}
                    <AnimatePresence>
                      {footballFloatingText && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center z-35 bg-black/60 backdrop-blur-md rounded-2xl"
                        >
                          <div className="text-center p-5 max-w-sm">
                            <span className="text-5xl block mb-2">
                              {footballFloatingText.isGoal ? '⚽🌟🔥' : footballFloatingText.isMiss ? '🚫🌪️' : '🧤❌'}
                            </span>
                            
                            <span className={`text-4xl md:text-5xl font-display font-black uppercase tracking-widest block leading-none ${
                               footballFloatingText.isGoal 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 text-glow-cyan animate-bounce' 
                                : footballFloatingText.isMiss
                                  ? 'text-yellow-400 text-shadow-glow' 
                                  : 'text-rose-500 text-shadow-glow'
                            }`}>
                              {footballFloatingText.text}
                            </span>
                            
                            <p className="text-xs text-white/80 mt-4 max-w-xs mx-auto leading-relaxed">
                              {footballFloatingText.isGoal 
                                ? `${footballStrikers[activeFootballChar].avatar} ${footballStrikers[activeFootballChar].name.split(' (')[0]} үнэхээр дэлхийн хэмжээний төгс гоол цууллаа!`
                                : footballFloatingText.isMiss 
                                  ? 'Бөмбөг хаалганы гадуур нисэн алдагдлаа! Нарийн чиглүүлж дахин өшиглөнө үү.'
                                  : `${footballKeepers[activeKeeperChar].avatar} ${footballKeepers[activeKeeperChar].name.split(' (')[0]} чиглэлийг мэдэрч хаалаа! Даацтай цохиорой.`}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Score stats bar & technique switcher info */}
                <div className="space-y-4 font-sans">
                  {/* Detailed Performance stats bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5 font-mono text-center font-bold">
                    <div>
                      <span className="text-[9px] text-white/40 uppercase block font-bold">НИЙТ ЦОХИЛТ</span>
                      <span className="text-base font-bold text-white mt-0.5 block">{shots}</span>
                    </div>
                    <div className="border-l border-white/5">
                      <span className="text-[9px] text-cyan-400 uppercase block font-bold font-black">ГООЛЫН ТОО</span>
                      <span className="text-base font-bold text-cyan-400 mt-0.5 block">{goals}</span>
                    </div>
                    <div className="border-l border-white/5">
                      <span className="text-[9px] text-amber-400 uppercase block font-bold">ОДООГИЙН ЦУВРАЛ</span>
                      <span className="text-base font-bold text-amber-400 mt-0.5 block">{currentStreak} 🔥</span>
                    </div>
                    <div className="border-l border-white/5">
                      <span className="text-[9px] text-purple-400 uppercase block font-bold">ШИЛДЭГ ЦУВРАЛ</span>
                      <span className="text-base font-bold text-purple-400 mt-0.5 block">{bestStreak} 🏆</span>
                    </div>
                  </div>

                  {/* Commentator Match Feed */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[9px] text-white/40 font-mono block uppercase font-bold">ТАЛБАЙН СУРВАЛЖЛАГЧИЙН ТЭМДЭГЛЭЛ ТҮҮХ:</span>
                    <div className="max-h-[60px] overflow-y-auto space-y-1 pr-1 text-[10px] font-mono leading-relaxed">
                      {commentaryLogs.slice(0, 2).map((log, lIdx) => (
                        <div 
                          key={lIdx} 
                          className={`p-1.5 rounded border border-white/[0.01] ${
                            log.includes('🥅') || log.includes('ГОООЛ') || log.includes('ГООЛ') || log.includes('SIUUU')
                              ? 'bg-cyan-950/30 text-cyan-300 border-cyan-400/20 font-bold' 
                              : log.includes('🧤') || log.includes('ХААЛТ') || log.includes('ХААГДЛАА')
                                ? 'bg-rose-950/30 text-rose-300 border-rose-400/20 font-bold'
                                : 'bg-white/[0.02] text-white/60'
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curving specialty shot technique changer */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-white/45 font-mono block uppercase font-bold">3. ЦОХИХ ТЕХНИК СОНГОХ (Shot Technique):</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'placement', name: 'PLACEMENT', emoji: '🎯', desc: 'Уран, найдвартай цохилт' },
                        { id: 'power', name: 'POWER BLAST', emoji: '🔥', desc: 'Хүчит суга хусах' },
                        { id: 'finesse', name: 'FINESSE CURL', emoji: '🔮', desc: 'Хаалганы ирмэгээр эргүүлэх' },
                        { id: 'panenka', name: 'PANENKA CHIP', emoji: '🍭', desc: 'Зөөлөн давуулж амыг нь хаах' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setShotTechnique(t.id as any)}
                          className={`p-2 rounded-xl text-left border flex flex-col justify-between h-[65px] transition-all cursor-pointer ${
                            shotTechnique === t.id
                              ? 'bg-gradient-to-br from-cyan-950/50 to-indigo-950/40 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)] font-bold'
                              : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[9px] font-bold tracking-tight">{t.name}</span>
                            <span className="text-xs">{t.emoji}</span>
                          </div>
                          
                          <span className="text-[7.5px] opacity-60 leading-none truncate block mt-1">{t.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Shot Power Selector Slider */}
                  <div className="bg-slate-950/45 p-3.5 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-white/45 font-mono block uppercase font-bold flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-cyan-400" />
                        ЦОХИЛТЫН ХҮЧ СҮРД (Shot Power Gauge):
                      </span>
                      <span className={`text-[10px] font-mono font-black ${shotPower > 85 ? 'text-amber-400 animate-pulse' : 'text-cyan-400'}`}>
                        {shotPower}% {shotPower > 85 ? '⚡ THUNDER POWER' : shotPower > 65 ? '🔥 ACCURATE BLAST' : '🎯 PLACED TACKLE'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Interactive Drag Slider */}
                      <input 
                        type="range"
                        min="30"
                        max="100"
                        value={shotPower}
                        disabled={playerAim !== 'idle'}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setShotPower(val);
                          // Play sound click representing power adjustment clicks!
                          if (val % 5 === 0) {
                            playFootballSfx('kick');
                          }
                        }}
                        className="w-full accent-cyan-400 h-1.5 bg-white/10 rounded-lg cursor-pointer appearance-none transition-all disabled:opacity-40"
                      />
                    </div>
                    
                    <div className="flex justify-between text-[8px] font-mono text-white/30">
                      <span>30% (Уран цохилт)</span>
                      <span>65% (Нарийн хусах)</span>
                      <span>100% (Галт пуужин!)</span>
                    </div>
                    <span className="text-[8px] text-white/40 block leading-tight">
                      * Жич: Хүч 85%-иас хэтэрвэл хаалгачийн хаалтыг цөмлөх боломж нэмэгдэнэ (+40% хүртэл), боловч алдах эрсдэл бий болно.
                    </span>
                  </div>

                  {/* Core Manual Button Controls (Alt way of clicking net columns) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleShot('left')}
                        disabled={playerAim !== 'idle'}
                        className="py-3 px-2 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 hover:border-cyan-400 hover:scale-[1.01] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 flex flex-col items-center justify-center gap-0.5 group cursor-pointer shadow-lg"
                      >
                        <span className="group-hover:-translate-x-1 transition-transform">👈 ЗҮҮН ТИЙШ</span>
                        <span className="text-[8px] text-white/30 font-mono font-normal">Булан руу чиглэх</span>
                      </button>
                      
                      <button
                        onClick={() => handleShot('center')}
                        disabled={playerAim !== 'idle'}
                        className="py-3 px-2 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 hover:border-cyan-400 hover:scale-[1.01] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 flex flex-col items-center justify-center gap-0.5 group cursor-pointer shadow-lg"
                      >
                        <span className="group-hover:scale-105 transition-transform">🎯 ТӨВ ХЭСЭГ</span>
                        <span className="text-[8px] text-white/30 font-mono font-normal">Төвөөр хуурах</span>
                      </button>
                      
                      <button
                        onClick={() => handleShot('right')}
                        disabled={playerAim !== 'idle'}
                        className="py-3 px-2 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 hover:border-cyan-400 hover:scale-[1.01] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 flex flex-col items-center justify-center gap-0.5 group cursor-pointer shadow-lg"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">👉 БАРУУН ТИЙШ</span>
                        <span className="text-[8px] text-white/30 font-mono font-normal">Чөлөөт булан</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* JUJUTSU KAISEN SECTION */}
          {activeSection === 'anime' && (
            <motion.div
              key="anime-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left JJK card view: Character switcher list */}
              <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-3 bg-purple-500/10 px-3 py-1 rounded-full w-fit">
                    <Swords className="w-4 h-4 animate-spin-slow" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Шилдэг Аниме</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
                    ЖҮЖҮЦҮ КАИСЭН <span className="text-purple-400 text-glow-purple">Хараалын Ертөнц</span>
                  </h2>
                  
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                    Хүн төрөлхтний сөрөг сэтгэл хөдлөлөөс үүссэн "Хараал"-уудтай тулалддаг шидтэнгүүдийн гайхалтай түүх. Төгсжаргалын хамгийн дуртай, сонирхолтой аниме цуврал юм!
                  </p>

                  <div className="space-y-2 mb-6">
                    {jjkCharacters.map((char, index) => (
                      <button
                        key={char.name}
                        onClick={() => {
                          setActiveJjkChar(index);
                          setCursedEnergy(Math.floor(char.energy / 100));
                        }}
                        className={`w-full text-left p-3 rounded-2xl flex items-center justify-between border transition-all ${
                          activeJjkChar === index 
                            ? 'bg-purple-600/20 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-white' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/70'
                        }`}
                      >
                        <span className="text-xs font-medium font-display">{char.name.split(' (')[0]}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-purple-400">
                          Мана: {char.energy}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
                  <img 
                    src="/src/assets/images/jujutsu_kaisen_art_1782106760905.jpg" 
                    alt="Жүжүцү Каисэн цувралаас" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <span className="text-xs text-white/80 font-mono font-medium">Хараалын хүчний гайхалтай дүрслэл</span>
                  </div>
                </div>
              </div>

              {/* Right panel: Active Character Arena card / Game setup */}
              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                
                {/* Visual domain expanding flash effect overlay */}
                <AnimatePresence>
                  {domainExpanded && (
                    <motion.div
                      initial={{ scale: 0.1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-slate-950 to-indigo-950 z-40 flex flex-col items-center justify-center border border-purple-500"
                    >
                      <motion.div
                        initial={{ rotate: -180, scale: 0.5 }}
                        animate={{ rotate: 360, scale: 1 }}
                        className="text-center p-8 max-w-lg"
                      >
                        <span className="inline-flex items-center gap-1 text-purple-400 font-mono text-xs uppercase mb-2">
                          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Domain Expansion ACTIVE
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-glow-purple tracking-widest leading-none mb-4 uppercase">
                          {jjkCharacters[activeJjkChar].domain}
                        </h2>
                        <span className="text-xs text-white/60 block font-mono italic mb-4 font-light">
                          " {jjkCharacters[activeJjkChar].quote} "
                        </span>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-6">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3.5 }}
                            className="bg-cyan-400 h-full"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section tabs: Info vs Battle Arena Game */}
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] text-purple-400 font-mono tracking-widest block uppercase">ШИДТЭН КАРТ & ТУЛААН</span>
                        <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                          {jjkCharacters[activeJjkChar].name.split(' (')[0]}
                        </h3>
                      </div>
                      
                      {/* Dynamic Switcher tab */}
                      <div className="flex gap-2 bg-slate-950/60 p-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => setJjkGameActive(false)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            !jjkGameActive 
                              ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20' 
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          ℹ️ Дүрийн мэдээлэл
                        </button>
                        <button
                          onClick={() => {
                            setJjkGameActive(true);
                            resetJjkGame();
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                            jjkGameActive 
                              ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20' 
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Хараалын тулаан (Тоглоом)
                        </button>
                      </div>
                    </div>

                    {/* VIEW 1: Standard character details view */}
                    {!jjkGameActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className={`p-6 rounded-2xl bg-gradient-to-tr ${jjkCharacters[activeJjkChar].color} shadow-lg relative overflow-hidden transition-all duration-500`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                          
                          <span className="text-[10px] text-white/70 font-mono tracking-wider block uppercase">АНИМЕ ДҮРИЙН КАРТ</span>
                          <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{jjkCharacters[activeJjkChar].name}</h4>
                          
                          <p className="text-white/90 text-xs md:text-sm italic leading-relaxed mb-6 font-light max-w-md">
                            " {jjkCharacters[activeJjkChar].quote} "
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/40 rounded-xl p-3 border border-white/5">
                              <span className="text-[10px] text-white/50 block font-mono">Үндсэн чадвар</span>
                              <span className="text-xs font-semibold text-white">{jjkCharacters[activeJjkChar].ability}</span>
                            </div>
                            <div className="bg-slate-950/40 rounded-xl p-3 border border-white/5">
                              <span className="text-[10px] text-white/50 block font-mono">Домэйн тэлэлт</span>
                              <span className="text-xs font-semibold text-white">{jjkCharacters[activeJjkChar].domain}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                          {jjkCharacters[activeJjkChar].description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <button
                            onClick={handleDomainExpansion}
                            className="flex-1 py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-display font-bold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/20"
                          >
                            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> DOMAIN EXPANSION АШИГЛАХ
                          </button>
                          
                          <div className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 border border-white/5 justify-center">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span className="text-[10px] font-mono text-white/70">ЭНЕРГИ: {cursedEnergy * 10} / 1000 CP</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* VIEW 2: Interactive Turn-based Battle Game */}
                    {jjkGameActive && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        {/* Enemy Selection Tray */}
                        <div className="bg-slate-950/45 p-4 rounded-2xl border border-white/5 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-purple-400 font-mono tracking-wider block uppercase">ХАРААЛТ ДАЙСНЫГ СОНГОХ (Boss Select):</span>
                            <span className="text-[9px] font-mono text-white/40">Тулаан эхлэхээс өмнө солих боломжтой</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {jjkEnemies.map((enemy, idx) => (
                              <button
                                key={enemy.name}
                                disabled={battleResult !== 'idle'}
                                onClick={() => {
                                  setSelectedEnemyIndex(idx);
                                  setEnemyHp(enemy.hp);
                                  setEnemyName(enemy.name);
                                  setBattleLog([`Шинэ эсрэг зүгийн дайснаар ${enemy.avatar} ${enemy.name}-ыг сонголоо.`]);
                                  setPlayerHp(120);
                                  setJjkEnergy(50);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                  selectedEnemyIndex === idx
                                    ? 'bg-rose-950/30 border-rose-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/50'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{enemy.avatar}</span>
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold font-display truncate text-white">{enemy.name.split(' (')[0]}</div>
                                    <div className="text-[9px] font-mono text-rose-400 font-medium">{enemy.difficulty.split(' ')[0]}</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Combat Arena: "Humuus ni haragddag" (Dual Cards Facing each other) */}
                        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center relative py-2">
                          
                          {/* Fighter 1: Player Character */}
                          <motion.div
                            animate={playerShake ? { x: [-10, 10, -7, 7, -3, 3, 0], scale: [0.97, 1.02, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            className={`md:col-span-5 p-5 rounded-2xl bg-gradient-to-tr ${jjkCharacters[activeJjkChar].color} shadow-xl border border-white/15 relative overflow-hidden flex flex-col justify-between aspect-[1.8/1] md:aspect-auto md:h-52`}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                            
                            {/* Inner custom visual icon representing the active player person */}
                            <div className="absolute right-4 bottom-4 text-8xl md:text-9xl opacity-15 select-none transition-all duration-300">
                              {jjkCharacters[activeJjkChar].avatar}
                            </div>

                            {/* Floating damage effect layout */}
                            <AnimatePresence>
                              {floatingDamage && floatingDamage.isPlayer && (
                                <motion.div
                                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                                  animate={{ opacity: 1, y: -45, scale: 1.3 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-6 top-1/2 -translate-y-1/2 z-50 font-mono font-black text-2xl text-shadow-glow text-red-500 bg-black/40 px-3 py-1 rounded-lg border border-red-500/20"
                                >
                                  {floatingDamage.text}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[9px] text-white/70 font-mono uppercase tracking-wider block">ШИДТЭН (ТА)</span>
                                  <h4 className="text-lg font-bold font-display text-white tracking-tight">{jjkCharacters[activeJjkChar].name.split(' (')[0]}</h4>
                                </div>
                                <span className="text-3xl filter drop-shadow-md select-none">{jjkCharacters[activeJjkChar].avatar}</span>
                              </div>

                              <span className="text-[9px] font-mono text-white/60 italic mt-1 block">
                                "{jjkCharacters[activeJjkChar].quote.slice(0, 42)}..."
                              </span>
                            </div>

                            {/* HP bar */}
                            <div className="space-y-1.5 mt-4 z-10">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-white/80">АМЬ (HP):</span>
                                <span className="font-bold text-white">{playerHp} / 120</span>
                              </div>
                              <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${playerHp < 40 ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`}
                                  style={{ width: `${(playerHp / 120) * 100}%` }}
                                />
                              </div>
                            </div>

                            {/* CP bar */}
                            <div className="space-y-1 mt-2.5 z-10">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-white/70">ХАРААЛЫН МАНА (CP):</span>
                                <span className="text-purple-300 font-bold">{jjkEnergy} / 100 CP</span>
                              </div>
                              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <div 
                                  className="h-full rounded-full bg-purple-500 transition-all duration-350"
                                  style={{ width: `${jjkEnergy}%` }}
                                />
                              </div>
                            </div>
                          </motion.div>

                          {/* VS separator column */}
                          <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-rose-700 flex items-center justify-center border-2 border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse">
                              <span className="text-xs font-black font-mono text-white">VS</span>
                            </div>
                          </div>

                          {/* Fighter 2: Enemy Boss */}
                          <motion.div
                            animate={enemyShake ? { x: [-10, 10, -7, 7, -3, 3, 0], scale: [0.97, 1.02, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            className={`md:col-span-5 p-5 rounded-2xl bg-gradient-to-tr ${jjkEnemies[selectedEnemyIndex].color} ${jjkEnemies[selectedEnemyIndex].glowColor} shadow-xl border border-white/10 relative overflow-hidden flex flex-col justify-between aspect-[1.8/1] md:aspect-auto md:h-52`}
                          >
                            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                            
                            {/* Inner custom visual icon representing the active enemy boss */}
                            <div className="absolute left-4 bottom-4 text-8xl md:text-9xl opacity-15 select-none transition-all duration-300">
                              {jjkEnemies[selectedEnemyIndex].avatar}
                            </div>

                            {/* Floating damage effect layout */}
                            <AnimatePresence>
                              {floatingDamage && !floatingDamage.isPlayer && (
                                <motion.div
                                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                                  animate={{ opacity: 1, y: -45, scale: 1.3 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute right-6 top-1/2 -translate-y-1/2 z-55 font-mono font-black text-2xl text-shadow-glow text-purple-400 bg-black/40 px-3 py-1 rounded-lg border border-purple-500/20"
                                >
                                  {floatingDamage.text}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div>
                              <div className="flex justify-between items-start flex-row-reverse">
                                <div className="text-right">
                                  <span className="text-[9px] text-rose-400 font-mono uppercase tracking-wider block">ОНЦГОЙ СҮНС (ДАЙСАН)</span>
                                  <h4 className="text-lg font-bold font-display text-white tracking-tight">{jjkEnemies[selectedEnemyIndex].name}</h4>
                                </div>
                                <span className="text-3xl filter drop-shadow-md select-none">{jjkEnemies[selectedEnemyIndex].avatar}</span>
                              </div>

                              <span className="text-[9px] font-mono text-white/50 block text-right mt-1">
                                {jjkEnemies[selectedEnemyIndex].desc}
                              </span>
                            </div>

                            {/* HP bar */}
                            <div className="space-y-1.5 mt-8 z-10">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-rose-400">ДАЙСНЫ АМЬ (HP):</span>
                                <span className="font-bold text-rose-400">{enemyHp} / {jjkEnemies[selectedEnemyIndex].maxHp}</span>
                              </div>
                              <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <div 
                                  className="h-full rounded-full bg-rose-500 transition-all duration-300"
                                  style={{ width: `${(enemyHp / jjkEnemies[selectedEnemyIndex].maxHp) * 100}%` }}
                                />
                              </div>
                            </div>
                          </motion.div>

                        </div>

                        {/* Interactive Combat Skill Panel for user selecting abilities */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/40 font-mono block uppercase">ЖҮЖҮЦҮ ЧАДВАРУУДААС СОНГОХ (Select Skill):</span>
                            <span className="text-[9px] font-mono text-purple-400">Мана хүч (CP) хангалттай бол тусгай чадвар идэвхжинэ</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            {/* Dynamic character skills mapping */}
                            <div className="sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {jjkCharacters[activeJjkChar].skills.map((skill) => {
                                const canUse = jjkEnergy >= skill.cost;
                                return (
                                  <button
                                    key={skill.name}
                                    disabled={battleResult !== 'idle' || !canUse}
                                    onClick={() => handleJjkSkillAction(skill)}
                                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                                      battleResult !== 'idle'
                                        ? 'opacity-30 cursor-default'
                                        : !canUse
                                          ? 'bg-slate-950/20 border-white/5 text-white/20 cursor-not-allowed'
                                          : skill.type === 'domain'
                                            ? 'bg-gradient-to-r from-purple-900 via-pink-950 to-indigo-900 border-purple-500 text-white hover:scale-[1.01] shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer'
                                            : 'bg-white/5 border-white/15 hover:bg-purple-950/20 hover:border-purple-500/40 text-white cursor-pointer group'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center w-full">
                                      <span className="text-[11px] font-bold font-display flex items-center gap-1">
                                        <span className="text-sm">{skill.emoji}</span> {skill.name}
                                      </span>
                                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                                        skill.cost === 0
                                          ? 'bg-emerald-950/50 text-emerald-400'
                                          : 'bg-purple-950/60 text-purple-400'
                                      }`}>
                                        {skill.cost === 0 ? '+15 CP' : `-${skill.cost} CP`}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-white/50 block font-light leading-tight truncate w-full mt-1">
                                      {skill.desc}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Dedicated Defense / CP recovery system panel */}
                            <div className="sm:col-span-3 flex flex-col justify-stretch">
                              <button
                                onClick={handleJjkDefense}
                                disabled={battleResult !== 'idle'}
                                className={`w-full h-full p-4 rounded-xl border flex flex-col justify-center items-center text-center transition-all min-h-[80px] bg-slate-900/60 ${
                                  battleResult !== 'idle'
                                    ? 'opacity-30 cursor-default border-white/5'
                                    : 'border-cyan-500/30 hover:bg-cyan-950/20 hover:border-cyan-400/80 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                }`}
                              >
                                <Shield className="w-6 h-6 text-cyan-400 mb-1.5 animate-bounce-slow" />
                                <span className="text-xs font-bold text-white block">🛡️ БИЕ ХАМГААЛАЛТ</span>
                                <span className="text-[8px] font-mono text-cyan-400 font-bold block mt-0.5">+35 CP / ХАМГААЛАХ</span>
                                <span className="text-[8px] text-white/40 block font-light mt-1 max-w-xs leading-none">Дайсны дайралтыг сулруулах</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Recent Battle Logs container */}
                        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-white/5 space-y-2">
                          <span className="text-[9px] text-white/40 block font-mono">ТУЛААНЫ ХОД ТЭМДЭГЛЭЛ ТҮҮХ:</span>
                          <div className="max-h-[85px] overflow-y-auto space-y-1.5 pr-1 text-[11px] font-mono leading-relaxed">
                            {battleLog.slice(0, 3).map((log, lIdx) => (
                              <div 
                                key={lIdx} 
                                className={`p-1.5 rounded border border-white/[0.02] ${
                                  log.includes('🏆') || log.includes('💥') || log.includes('🔮')
                                    ? 'bg-purple-950/30 text-purple-300 border-purple-500/10' 
                                    : log.includes('👿') || log.includes('💀') || log.includes('👹') || log.includes('💔')
                                      ? 'bg-rose-950/30 text-rose-300 border-rose-500/10'
                                      : 'bg-white/[0.02] text-white/70'
                                }`}
                              >
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* GameOver Modal inside the view */}
                        {battleResult !== 'idle' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-black/90 rounded-2xl p-6 border-2 border-purple-500/30 flex flex-col items-center justify-center text-center space-y-4"
                          >
                            <span className="text-3xl">
                              {battleResult === 'won' ? '🎉' : '💀'}
                            </span>
                            <h4 className="text-xl font-display font-bold text-white uppercase tracking-wider">
                              {battleResult === 'won' ? 'ЯЛАЛТЫГ ОЛЖ АВЛАА!' : 'ХАРААЛД ДАРАГДЛАА'}
                            </h4>
                            <p className="text-white/75 text-xs max-w-sm">
                              {battleResult === 'won' 
                                ? 'Та аюултай сөрөг сэтгэл хөдлөлийг амжилттай захирлаа. Хараалын устгал 100% гүйцэт!' 
                                : 'Хараал танаас хүчирхэг байж таны биеийг бүхэлд нь сүйтгэв. Дахин дайтан ялахыг хичээгээрэй!'}
                            </p>
                            <div className="flex gap-3 w-full max-w-xs">
                              <button
                                onClick={resetJjkGame}
                                className="flex-1 py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <RotateCcw className="w-3.5 h-3.5" /> Дахин эхлэх
                              </button>
                              <button
                                onClick={() => setJjkGameActive(false)}
                                className="flex-1 py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/95 text-xs font-bold transition-all cursor-pointer"
                              >
                                🚪 Гарах
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* CURSED MASQUERADE CUSTOM SONG PLAYER */}
                <div className="lg:col-span-12 glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/25 bg-slate-950/70 shadow-[0_0_30px_rgba(168,85,247,0.12)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-slate-950/40 to-indigo-950/20 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col xl:flex-row gap-6 items-stretch">
                    
                    {/* Left Column: Cover & Controls */}
                    <div className="flex flex-col md:flex-row xl:flex-col gap-6 items-center md:items-stretch xl:items-center xl:w-80 shrink-0 border-b xl:border-b-0 xl:border-r border-white/10 pb-6 xl:pb-0 xl:pr-6 justify-center">
                      
                      {/* Rotating Cover with vinyl effect */}
                      <div className="relative group shrink-0">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 blur-md opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" />
                        
                        <motion.div 
                          animate={isSongPlaying ? { rotate: 360 } : {}}
                          transition={isSongPlaying ? { repeat: Infinity, duration: 15, ease: "linear" } : {}}
                          className="w-40 h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl relative"
                        >
                          <img 
                            src={cursedMasqueradeCover} 
                            alt="Cursed Masquerade" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                            {/* Inner circle record spindle hole for Vinyl vibe */}
                            <div className="w-10 h-10 rounded-full bg-slate-950 border-4 border-purple-500/60 shadow-inner flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Floating tag */}
                        <span className="absolute -top-2 -right-2 bg-purple-600 text-white font-mono text-[8px] font-black px-2 py-0.5 rounded-full border border-purple-400 shadow-md uppercase tracking-wider animate-bounce">
                          ТӨГСӨӨ ХИТ!
                        </span>
                      </div>

                      {/* Meta info & main controls */}
                      <div className="flex flex-col justify-center items-center md:items-start xl:items-center text-center md:text-left xl:text-center space-y-3.5 flex-1 min-w-0">
                        <div>
                          <span className="text-[10px] text-cyan-400 font-mono tracking-widest block uppercase font-bold">11 НАСТАЙ ТӨГСӨӨГИЙН ХИТ СҮҮЛЭЛ</span>
                          <h4 className="text-xl font-display font-extrabold text-white leading-tight truncate max-w-[240px] text-glow-purple">
                            Cursed Masquerade
                          </h4>
                          <span className="text-xs text-white/60 font-medium font-mono">Tugsgargal (JJK Funk Edit)</span>
                        </div>

                        {/* Main Music controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              stopSong();
                              setSongTime(0);
                              setSongProgress(0);
                              setCurrentLyricIndex(-1);
                              playJjkSfx('attack');
                            }}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                            title="Эхнээс нь эхлүүлэх"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          <button
                            onClick={toggleSongPlay}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                              isSongPlaying 
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 text-white shadow-purple-500/20'
                            }`}
                          >
                            {isSongPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                          </button>

                          <button
                            onClick={() => {
                              setIsSongMuted(!isSongMuted);
                              playJjkSfx('shield');
                            }}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              isSongMuted 
                                ? 'bg-red-950/30 border-red-500/40 text-red-400' 
                                : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {isSongMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Dynamic Visualizer, Timeline, Scrolling lyrics */}
                    <div className="flex-1 flex flex-col justify-between space-y-6 min-w-0">
                      
                      {/* Visualizer and Time display row */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-black/30 p-3 rounded-2xl border border-white/5">
                        {/* Audio visual bars */}
                        <div className="flex items-end gap-1 h-10 px-2 flex-1 justify-center sm:justify-start">
                          {visualizerBars.map((height, barIdx) => (
                            <motion.div 
                              key={barIdx}
                              animate={{ height: isSongPlaying ? height : 4 }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className={`w-1 rounded-full ${
                                barIdx % 2 === 0 ? 'bg-purple-500' : 'bg-cyan-400'
                              }`}
                              style={{ minHeight: '4px' }}
                            />
                          ))}
                        </div>

                        {/* Live Counter */}
                        <div className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-xl">
                          ⏱️ {Math.floor(songTime / 60)}:{(Math.floor(songTime % 60) < 10 ? '0' : '')}{Math.floor(songTime % 60)} / 0:36
                        </div>
                      </div>

                      {/* Scrubbable Timeline */}
                      <div className="space-y-1">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 relative group cursor-pointer">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-100"
                            style={{ width: `${songProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-white/40 px-1">
                          <span>ЭХЛЭЛ</span>
                          <span>ДУУНЫ ХУГАЦАА</span>
                          <span>ТӨГСГӨЛ</span>
                        </div>
                      </div>

                      {/* Scrolling Lyrics layout - High Fidelity Apple Music style */}
                      <div className="bg-slate-950/90 rounded-2xl border border-white/5 p-4 h-48 md:h-52 overflow-y-auto space-y-3 scrollbar-thin relative scroll-smooth flex flex-col items-center">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />
                        
                        {songLyrics.map((lyric, lyricIdx) => {
                          const isActive = currentLyricIndex === lyricIdx;
                          const isPast = currentLyricIndex > lyricIdx;
                          return (
                            <motion.div
                              key={lyricIdx}
                              animate={{
                                scale: isActive ? 1.03 : 0.97,
                                opacity: isActive ? 1 : isPast ? 0.5 : 0.25,
                              }}
                              className={`p-2 px-4 rounded-xl text-center text-xs md:text-sm font-bold transition-all duration-300 w-full max-w-lg ${
                                isActive 
                                  ? 'bg-gradient-to-r from-purple-950/80 via-purple-900/60 to-indigo-950/80 border border-purple-500/35 text-white shadow-[0_0_15px_rgba(168,85,247,0.18)] text-glow-purple' 
                                  : 'text-white/80'
                              }`}
                            >
                              {lyric.text}
                            </motion.div>
                          );
                        })}
                        
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* GREMIX / YT SIMULATION SECTION */}
          {activeSection === 'gremix' && (
            <motion.div
              key="gremix-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left sidebar card of Gremix fansite */}
              <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 text-rose-400 mb-3 bg-rose-500/10 px-3 py-1 rounded-full w-fit">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Дуртай Юүтүбэр</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
                    ГРЭМИКС <span className="text-rose-400 text-glow-purple">(Gremix) Fan Hub</span>
                  </h2>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Гремикс бол Монголын хамгийн бүтээлч, хөгжилтэй тоглоомын стриймэр, юүтүбэр билээ. Түүний янз бүрийн аймар болон сонирхолтой контентууд нь Төгсжаргалын өдөр бүр үздэг дуртай бичлэгүүд юм.
                  </p>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                        <Youtube className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Gremix Сургууль</span>
                        <span className="text-[10px] text-white/50 block font-mono">YT Creator</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 text-xs font-mono block">1.32 сая+</span>
                      <span className="text-[9px] text-white/40 block font-mono">Дагагчид</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group">
                  <img 
                    src="/src/assets/images/gremix_gaming_1782106775411.jpg" 
                    alt="Gremix Gaming Illustration" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <span className="text-xs text-white/80 font-mono font-medium">Тоглоом, сэтгэл түгшээсэн адал явдал!</span>
                  </div>
                </div>
              </div>

              {/* Right panel: Stream simulator with animated soundboard quotes */}
              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-white font-display font-medium text-lg flex items-center gap-2">
                        <Youtube className="w-5 h-5 text-red-500" />
                        Gremix Реакшн Дэлгэц
                      </h3>
                      <p className="text-xs text-white/55">Товчлуурууд дээр дарж Гремиксийн алдартай хэллэгүүдийг дуугаргаарай!</p>
                    </div>

                    <div className="bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.15)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[9px] text-rose-400 font-mono font-bold uppercase">YT СИМУЛЯТОР</span>
                    </div>
                  </div>

                  {/* Sandbox soundboard display view */}
                  <div className="relative h-56 w-full border border-white/10 rounded-2xl bg-slate-950/70 backdrop-blur-sm overflow-hidden flex flex-col justify-between p-5 space-y-3">
                    
                    {/* Top status frame */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px]">
                        <Youtube className="w-3.5 h-3.5 animate-pulse" /> шууд эфир идэвхтэй (Live Chat Enabled)
                      </div>
                      
                      {/* Audio Visualizer */}
                      <div className="flex items-center gap-1.5">
                        {isGremixAudioPlaying ? (
                          <div className="flex items-end gap-0.5 h-4 px-2 bg-red-500/10 rounded border border-red-500/20">
                            {[1, 2, 3, 4, 5].map((bar) => (
                              <motion.div
                                key={bar}
                                animate={{
                                  height: [3, 12, 4, 10, 2, 14, 3][Math.floor(Math.random() * 7)],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.3 + bar * 0.05,
                                  ease: "easeInOut",
                                }}
                                className="w-0.5 bg-red-500 rounded-full"
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="text-[9px] text-white/30 font-mono">Аниргүй</span>
                        )}
                        <span className="text-[10px] text-white/40 font-mono">Даралт: {funCount} удаа</span>
                      </div>
                    </div>

                    {/* Animated quote message balloon */}
                    <div className="my-auto text-center px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl relative">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={gremixQuote}
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          className="text-white font-display font-extrabold text-sm sm:text-base leading-relaxed text-glow-purple italic text-rose-300"
                        >
                          " {gremixQuote} "
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {/* Simulated live chat messages with beautiful layout */}
                    <div className="border-t border-white/5 pt-2 flex flex-col gap-1 text-[9px] text-white/40 h-16 overflow-y-auto font-mono scrollbar-thin">
                      {gremixChatLogs.map((chat, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/[0.01] px-2 py-0.5 rounded">
                          <span className={`${idx === 0 ? 'text-white/80 font-bold' : 'text-white/40'}`}>{chat}</span>
                          {idx === 0 && <span className="text-[8px] text-rose-500 font-bold">шинэ</span>}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Grid interactive audio list toggles */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-[10px] text-white/45 block font-mono mb-2 uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Дуу өдөөгч самбар (Soundboard):
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {gremixQuotes.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setGremixQuote(q);
                            setFunCount(c => c + 1);
                            setGremixSubs(s => s + Math.floor(Math.random() * 400 + 100));
                            
                            // Audio play and state active
                            playGremixSfx(idx);
                            setIsGremixAudioPlaying(true);
                            setTimeout(() => setIsGremixAudioPlaying(false), 1300);

                            // Dynamic live chat simulator update
                            const randomMongolianChats = [
                              '👤 Төгсөө: Энэ дуунууд үнэхээр янзтай байна аа! 😂',
                              '👤 Бат-Эрдэнэ: Шинэ бичлэг хэзээ орох вэ Гремикс ахаа?',
                              '👤 Солонго: Ооо май год гэдэг нь маш аймар сонсогдлоо хх',
                              '👤 Ганзориг: Хахаха, супер дупер баян боллоо гэнэ ээ!',
                              '👤 Анужин: Лайк шэйрээ дараарай залуусаа!',
                              '👤 Хонгор: Төгсжаргал вэбийг 100% гоё болгожээ!',
                              '👤 Болдоо: Пенальти тоглоом дээр би 10 дараалан гоолдлоо!',
                              '👤 Сүхээ: Гожогийн Хязгааргүй Орон зай үнэхээр сүрдмээр!',
                              '👤 Наранбаатар: SIUUUUUUU!',
                              '👤 Ариунаа: Гремикс ах хамгийн шилдэг юүтүбэр шүү ❤️'
                            ];
                            const randomComment = randomMongolianChats[Math.floor(Math.random() * randomMongolianChats.length)];
                            setGremixChatLogs(prev => [randomComment, ...prev.slice(0, 3)]);
                          }}
                          className="py-3 px-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-rose-500/30 text-white text-xs text-left transition-all flex items-center gap-2 cursor-pointer group"
                        >
                          <Play className="w-3 h-3 text-rose-500 fill-rose-500 min-w-[12px] group-hover:scale-110 transition-transform" />
                          <span className="truncate text-[11px] font-medium">{q.substring(0, 26)}...</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fake Subscribe Counter Booster */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 font-mono">СУБСКРАЙБ СТАТИСТИК</span>
                      <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {gremixSubs.toLocaleString()} SUBSCRIBERS
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setGremixSubs(s => s + 1000);
                        setFunCount(c => c + 1);
                        setGremixQuote('Бүх Субскрайберууддаа маш их баярлалаа! Үнэхээр хайртай шүү! ❤️');
                        
                        playGremixSfx(9); // default chime sound
                        setIsGremixAudioPlaying(true);
                        setTimeout(() => setIsGremixAudioPlaying(false), 500);

                        setGremixChatLogs(prev => [
                          '👤 YouTube: Шинэ 1,000 дагагч нэмэгдлээ! 🎉',
                          ...prev.slice(0, 3)
                        ]);
                      }}
                      className="py-2 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-display font-bold uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/20 active:scale-95"
                    >
                      <Youtube className="w-4 h-4 fill-white" /> СУБСКРАЙБ НЭМЭХ (+1K)
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* SONG / MUSIC PLAYER SECTION */}
          {activeSection === 'song' && (
            <motion.div
              key="song-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: Cover art and main player controls */}
              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/25 bg-slate-950/70 shadow-[0_0_30px_rgba(99,102,241,0.12)] relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-slate-950/40 to-purple-950/20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col xl:flex-row gap-6 items-stretch h-full justify-between">
                  {/* Left inner: Vinyl art */}
                  <div className="flex flex-col items-center xl:w-72 shrink-0 border-b xl:border-b-0 xl:border-r border-white/10 pb-6 xl:pb-0 xl:pr-6 justify-center text-center space-y-4">
                    <div className="relative group shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-30 group-hover:opacity-70 transition-opacity animate-pulse" />
                      
                      <motion.div 
                        animate={isSongPlaying ? { rotate: 360 } : {}}
                        transition={isSongPlaying ? { repeat: Infinity, duration: 12, ease: "linear" } : {}}
                        className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-indigo-500/50 shadow-2xl relative flex items-center justify-center bg-black"
                      >
                        <img 
                          src={cursedMasqueradeCover} 
                          alt="Cursed Masquerade Album Cover" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-full opacity-80"
                        />
                        {/* Vinyl ridges lines effect */}
                        <div className="absolute inset-0 rounded-full border-8 border-white/5 pointer-events-none" />
                        <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
                        
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          {/* Record spindle hole */}
                          <div className="w-12 h-12 rounded-full bg-slate-950 border-4 border-indigo-500 shadow-inner flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Rotating vinyl tag label */}
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full border border-indigo-300 shadow-md uppercase tracking-wider">
                        STUDIO MIX
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-indigo-400 font-mono tracking-widest block uppercase font-bold">11 НАСТАЙ ТӨГСӨӨГИЙН ХИТ СҮҮЛЭЛ</span>
                      <h3 className="text-2xl font-display font-extrabold text-white leading-tight text-glow-purple">
                        Cursed Masquerade
                      </h3>
                      <p className="text-xs text-white/50 font-medium font-mono">Tugsgargal (JJK Funk Edit)</p>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center gap-3 justify-center pt-2">
                      <button 
                        onClick={() => {
                          stopSong();
                          setSongTime(0);
                          setSongProgress(0);
                          setCurrentLyricIndex(-1);
                          playJjkSfx('attack');
                        }}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        title="Эхнээс нь эхлүүлэх"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={toggleSongPlay}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 ${
                          isSongPlaying 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                            : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-indigo-500/20'
                        }`}
                      >
                        {isSongPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                      </button>

                      <button
                        onClick={() => {
                          setIsSongMuted(!isSongMuted);
                          playJjkSfx('shield');
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSongMuted 
                            ? 'bg-red-950/30 border-red-500/40 text-red-400' 
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {isSongMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Right inner: Dynamic visualizer and Scrolling lyrics */}
                  <div className="flex-1 flex flex-col justify-between space-y-6 min-w-0 xl:pl-6 pt-6 xl:pt-0">
                    {/* Visualizer & Timer */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-black/30 p-3 rounded-2xl border border-white/5">
                      <div className="flex items-end gap-1 h-12 px-2 flex-1 justify-center sm:justify-start">
                        {visualizerBars.map((height, barIdx) => (
                          <motion.div 
                            key={barIdx}
                            animate={{ height: isSongPlaying ? height : 4 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className={`w-1 rounded-full ${
                              barIdx % 2 === 0 ? 'bg-indigo-500' : 'bg-pink-500'
                            }`}
                            style={{ minHeight: '4px' }}
                          />
                        ))}
                      </div>

                      <div className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-xl shrink-0">
                        ⏱️ {Math.floor(songTime / 60)}:{(Math.floor(songTime % 60) < 10 ? '0' : '')}{Math.floor(songTime % 60)} / 0:36
                      </div>
                    </div>

                    {/* Timeline bar */}
                    <div className="space-y-1">
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 relative group cursor-pointer">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100"
                          style={{ width: `${songProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 px-1">
                        <span>ЭХЛЭЛ</span>
                        <span className="uppercase text-indigo-400 font-bold">ДУУНЫ ХУГАЦАА</span>
                        <span>ТӨГСГӨЛ</span>
                      </div>
                    </div>

                    {/* Beautiful Apple Music style lyrics */}
                    <div className="bg-slate-950/90 rounded-2xl border border-white/5 p-4 h-48 sm:h-56 overflow-y-auto space-y-3.5 scrollbar-thin relative scroll-smooth flex flex-col items-center">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />
                      
                      {songLyrics.map((lyric, lyricIdx) => {
                        const isActive = currentLyricIndex === lyricIdx;
                        const isPast = currentLyricIndex > lyricIdx;
                        return (
                          <motion.div
                            key={lyricIdx}
                            animate={{
                              scale: isActive ? 1.02 : 0.98,
                              opacity: isActive ? 1 : isPast ? 0.5 : 0.25,
                            }}
                            className={`p-2 px-4 rounded-xl text-center text-xs sm:text-sm font-bold transition-all duration-300 w-full max-w-lg ${
                              isActive 
                                ? 'bg-gradient-to-r from-indigo-950/80 via-purple-900/60 to-pink-950/80 border border-indigo-500/35 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)] text-glow-purple' 
                                : 'text-white/80'
                            }`}
                          >
                            {lyric.text}
                          </motion.div>
                        );
                      })}
                      
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mixer Console & Soundboard launcher */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* 1. Live Mixer Console */}
                <div className="glass-panel p-6 rounded-3xl border border-indigo-500/15 bg-slate-950/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-indigo-400 animate-pulse" />
                      ХӨГЖИМ МИКСЕР (Live Mixer)
                    </h4>
                    <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-2.5 py-0.5 rounded-full font-mono font-bold animate-pulse">
                      STUDIO ENGINE
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Tempo slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">ТЕМПО (Tempo BPM)</span>
                        <span className="text-indigo-400 font-bold">{tempo} BPM</span>
                      </div>
                      <input 
                        type="range" 
                        min="100" 
                        max="180" 
                        value={tempo} 
                        onChange={(e) => setTempo(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                      />
                      <div className="flex justify-between text-[9px] text-white/30 font-mono">
                        <span>Удаан (100)</span>
                        <span>Энгийн (135)</span>
                        <span>Галзуу Phonk (180)</span>
                      </div>
                    </div>

                    {/* Bass Volume slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">БАСС ХУРД (Bass Volume)</span>
                        <span className="text-purple-400 font-bold">{bassVolume}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={bassVolume} 
                        onChange={(e) => setBassVolume(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                      />
                    </div>

                    {/* Drum Volume slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">БӨМБӨР (Drum Intensity)</span>
                        <span className="text-pink-400 font-bold">{drumVolume}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={drumVolume} 
                        onChange={(e) => setDrumVolume(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500" 
                      />
                    </div>

                    {/* Melody Pitch slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">АЯНЫ ӨНДӨР (Melody Pitch)</span>
                        <span className="text-cyan-400 font-bold">{melodyPitch}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        value={melodyPitch} 
                        onChange={(e) => setMelodyPitch(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                      />
                      <div className="flex justify-between text-[9px] text-white/30 font-mono">
                        <span>Муужгай (50)</span>
                        <span>Үндсэн (100)</span>
                        <span>Шившлэг (200)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Sound Effects Trigger Launchpad */}
                <div className="glass-panel p-6 rounded-3xl border border-indigo-500/15 bg-slate-950/50 relative overflow-hidden flex-1 flex flex-col justify-between">
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      ЖҮЖИГЛЭЛТ SFX LAUNCHPAD
                    </h4>
                    <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
                      Дууг явж байх үед доорх товчлуурууд дээр дарж өөрийнхөөрөө нэмэлт чимэг, цохилт хийж тоглоорой!
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => playJjkSfx('attack')}
                        className="py-2.5 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 text-white text-xs text-left transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        💥 Глам шившлэг
                      </button>

                      <button 
                        onClick={() => playJjkSfx('shield')}
                        className="py-2.5 px-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 text-white text-xs text-left transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5 text-purple-400" />
                        🛡️ Орон зай
                      </button>

                      <button 
                        onClick={() => playJjkSfx('win')}
                        className="py-2.5 px-3 rounded-xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40 text-white text-xs text-left transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        ✨ Фанк ялалт
                      </button>

                      <button 
                        onClick={() => {
                          playJjkSfx('attack');
                        }}
                        className="py-2.5 px-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-white text-xs text-left transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                        🎙️ Пенальти цохилт
                      </button>
                    </div>
                  </div>

                  {/* Tracks Facts */}
                  <div className="mt-5 border-t border-white/10 pt-4 flex justify-between items-center text-[10px] font-mono text-white/40">
                    <span>ENGINE: WEB AUDIO SYNTH</span>
                    <span>RELEASE: 2026-06</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
