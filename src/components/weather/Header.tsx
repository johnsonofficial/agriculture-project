
import React, { useState, useEffect } from 'react';
import { Cloud, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  };

  // Update fullscreen state if user uses F11 or Esc
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mb-8 text-center relative">
      <div className="absolute right-0 top-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleFullscreen}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
        <Cloud className="h-4 w-4" />
        <span>Weather Intelligence</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Agricultural Weather Forecast</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Access precise weather data optimized for agricultural planning and decision-making.
      </p>
    </div>
  );
};

export default Header;
