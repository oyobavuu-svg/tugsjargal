import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HLSVideoBackgroundProps {
  streamUrl: string;
  fallbackUrl?: string;
  onStreamStatusChange?: (status: 'loading' | 'playing' | 'error') => void;
}

export default function HLSVideoBackground({
  streamUrl,
  fallbackUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  onStreamStatusChange,
}: HLSVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [status, setStatus] = useState<'loading' | 'playing' | 'error'>('loading');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setStatus('loading');
    onStreamStatusChange?.('loading');

    // Attempt to load HLS stream
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => {
          setStatus('playing');
          onStreamStatusChange?.('playing');
        }).catch(() => {
          // Playback failed (usually auto-play block, retry)
          video.muted = true;
          video.play().then(() => {
            setStatus('playing');
            onStreamStatusChange?.('playing');
          });
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          console.warn('HLS fatal error, trying fallback stream...', data);
          hls.destroy();
          hlsRef.current = null;
          loadFallback(video);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari, iOS)
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().then(() => {
          setStatus('playing');
          onStreamStatusChange?.('playing');
        }).catch(() => {
          video.muted = true;
          video.play().then(() => {
            setStatus('playing');
            onStreamStatusChange?.('playing');
          });
        });
      });
      video.addEventListener('error', () => {
        loadFallback(video);
      });
    } else {
      // No HLS support, use direct fallback
      loadFallback(video);
    }

    function loadFallback(vid: HTMLVideoElement) {
      setStatus('error');
      onStreamStatusChange?.('error');
      vid.src = fallbackUrl;
      vid.loop = true;
      vid.muted = true;
      vid.play().then(() => {
        setStatus('playing'); // consider playing since fallback is active
      }).catch((e) => console.error('Fallback playback error', e));
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl, fallbackUrl, onStreamStatusChange]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Dark overlay to ensure ultimate legibility of custom copy */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      <video
        ref={videoRef}
        id="bg-hls-video"
        className="w-full h-full object-cover scale-[1.03]"
        muted
        playsInline
        loop
        autoPlay
      />
    </div>
  );
}
