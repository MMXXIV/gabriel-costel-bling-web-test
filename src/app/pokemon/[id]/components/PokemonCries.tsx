import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Play,
  Pause,
  PauseCircleIcon,
  PlayCircleIcon,
  RefreshCwIcon, // Add this icon for replay
} from 'lucide-react';

interface PokemonCriesProps {
  cries: { latest: string; legacy: string };
}

export default function PokemonCries({ cries }: PokemonCriesProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false); // Track if the audio has ended
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  const initialBarHeights = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10,
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('loadedmetadata', () =>
        setDuration(audio.duration)
      );
      audio.addEventListener('timeupdate', () =>
        setCurrentTime(audio.currentTime)
      );
      audio.addEventListener('ended', () => {
        setIsEnded(true);
        setIsPlaying(false); // Stop animation when the audio ends
        cancelAnimationFrame(animationRef.current!);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', () =>
          setDuration(audio.duration)
        );
        audio.removeEventListener('timeupdate', () =>
          setCurrentTime(audio.currentTime)
        );
        audio.removeEventListener('ended', () => setIsEnded(true));
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (isEnded) {
      // If the audio has ended, replay it from the beginning
      audioRef.current!.currentTime = 0;
      setIsEnded(false);
    }

    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(animate);
    }
    setIsPlaying(!isPlaying);
  };

  const animate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
    animationRef.current = requestAnimationFrame(animate);
  };

  const waveformBars = initialBarHeights.length;

  const getBarHeight = (index: number) => {
    const progress = currentTime / duration;

    // Scale the bar height based on the current progress of the audio playback
    const initialHeight = initialBarHeights[index];
    const scaledHeight =
      initialHeight * (index / waveformBars < progress ? 1 : 0.5);

    return scaledHeight;
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Cry</CardTitle>
        <CardDescription>The unique sound this species makes when you see it or send it into battle</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <svg width="100%" height="100" className="waveform">
            {[...Array(waveformBars)].map((_, index) => (
              <rect
                key={index}
                x={`${(index / waveformBars) * 100}%`}
                y={50 - getBarHeight(index) / 2}
                rx="5" // Rounded corners for smooth look
                width="4%" // Width of each bar
                height={getBarHeight(index)}
                fill="black" // Fill color
                className="transition-all duration-300 ease-in-out"
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-end">
          <Button onClick={togglePlayPause} variant="ghost" size="icon">
            {isEnded ? (
              <RefreshCwIcon className="size-8" /> // Show replay icon if audio ended
            ) : isPlaying ? (
              <PauseCircleIcon className="size-8" />
            ) : (
              <PlayCircleIcon className="size-8" />
            )}
          </Button>
        </div>
        <audio ref={audioRef} src={cries.latest} preload="metadata" />
      </CardContent>
    </Card>
  );
}
