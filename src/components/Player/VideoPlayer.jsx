import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlay, 
  FiPause, 
  FiSkipBack, 
  FiSkipForward, 
  FiVolume2, 
  FiVolumeX, 
  FiMaximize, 
  FiRotateCw 
} from 'react-icons/fi'; // Perbaiki semua import

const VideoPlayer = ({ movie }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [orientation, setOrientation] = useState(movie.orientation || 'landscape');

  // Handle video metadata loaded
  useEffect(() => {
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Handle time update
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Handle screen orientation
  useEffect(() => {
    if (window.screen.orientation && orientation === 'portrait') {
      window.screen.orientation.lock('portrait').catch(() => {});
    }

    return () => {
      if (window.screen.orientation) {
        window.screen.orientation.unlock();
      }
    };
  }, [orientation]);

  // Auto hide controls
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  // Skip backward 10 seconds
  const skipBackward = () => {
    videoRef.current.currentTime -= 10;
    setShowControls(true);
  };

  // Skip forward 10 seconds
  const skipForward = () => {
    videoRef.current.currentTime += 10;
    setShowControls(true);
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
    setShowControls(true);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    setShowControls(true);
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current;
    
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
    setShowControls(true);
  };

  // Toggle orientation
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'landscape' ? 'portrait' : 'landscape');
    setShowControls(true);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${orientation === 'portrait' ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'} bg-black rounded-xl overflow-hidden`}
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        poster={movie.thumbnail}
      />

      {/* Overlay Controls */}
      <motion.div
        initial={false}
        animate={{ opacity: showControls ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${!showControls && 'pointer-events-none'}`}
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleOrientation}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiRotateCw className="text-xl" /> {/* Ganti RotateCw jadi FiRotateCw */}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiMaximize className="text-xl" /> {/* Ganti Maximize jadi FiMaximize */}
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <button
              onClick={skipBackward}
              className="p-4 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiSkipBack className="text-3xl" /> {/* Ganti SkipBack jadi FiSkipBack */}
            </button>
            
            <button
              onClick={togglePlay}
              className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
            >
              {isPlaying ? (
                <FiPause className="text-4xl" /> {/* Ganti Pause jadi FiPause */}
              ) : (
                <FiPlay className="text-4xl ml-1" /> {/* Ganti Play jadi FiPlay */}
              )}
            </button>
            
            <button
              onClick={skipForward}
              className="p-4 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiSkipForward className="text-3xl" /> {/* Ganti SkipForward jadi FiSkipForward */}
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          {/* Volume and Other Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <FiPause className="text-xl" /> {/* Ganti Pause jadi FiPause */}
                ) : (
                  <FiPlay className="text-xl" /> {/* Ganti Play jadi FiPlay */}
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isMuted ? (
                  <FiVolumeX className="text-xl" />
                ) : (
                  <FiVolume2 className="text-xl" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
              />
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiMaximize className="text-xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;