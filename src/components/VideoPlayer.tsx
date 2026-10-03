"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { formatTime } from "@/lib/utils";

export interface VideoPlayerRef {
  seekTo: (time: number) => void;
  play: () => void;
  pause: () => void;
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>((props, ref) => {
  const { src, poster, onTimeUpdate } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useImperativeHandle(ref, () => ({
    seekTo: (time: number) => {
      if (videoRef.current) videoRef.current.currentTime = time;
    },
    play: () => {
      if (videoRef.current) videoRef.current.play().catch(() => {});
    },
    pause: () => {
      if (videoRef.current) videoRef.current.pause();
    }
  }));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src && src.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      video.src = src;
    }
  }, [src]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play().catch(() => {});
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800/80">
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover cursor-pointer"
        poster={poster}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);
            if (onTimeUpdate) onTimeUpdate(time);
          }
        }}
        onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
        onClick={togglePlay}
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={(e) => {
            const time = parseFloat(e.target.value);
            if (videoRef.current) videoRef.current.currentTime = time;
          }}
          className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center space-x-3">
            <button onClick={togglePlay} className="p-1 hover:text-orange-400">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={toggleMute} className="p-1 hover:text-orange-400">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <span className="font-mono text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button onClick={() => videoRef.current?.requestFullscreen()} className="p-1 hover:text-orange-400">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
