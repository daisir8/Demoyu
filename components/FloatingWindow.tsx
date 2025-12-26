import React, { useState, useEffect, useRef } from 'react';
import { Settings } from '../types';
import { Move, Maximize2, X, ExternalLink, Search } from 'lucide-react';

interface FloatingWindowProps {
  content: string;
  isWebMode: boolean;
  webUrl: string;
  settings: Settings;
  visible: boolean;
  onClose: () => void;
  onUrlChange?: (url: string) => void;
}

// Helper to convert standard URLs to Embed URLs to bypass some X-Frame-Options
const getEmbedUrl = (url: string): string => {
  try {
    if (!url.startsWith('http')) return url;
    const urlObj = new URL(url);
    
    // Bilibili Video -> Player (Only for video pages)
    // Example: https://www.bilibili.com/video/BV1xx411c7mD
    if (urlObj.hostname.includes('bilibili.com') && urlObj.pathname.includes('/video/')) {
       const bvid = urlObj.pathname.split('/video/')[1]?.split('/')[0]?.split('?')[0];
       if (bvid) return `https://player.bilibili.com/player.html?bvid=${bvid}&high_quality=1&danmaku=0&autoplay=0`;
    }

    // YouTube Video -> Embed (Only for video pages)
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
    }

    return url;
  } catch (e) {
    return url;
  }
};

const FloatingWindow: React.FC<FloatingWindowProps> = ({ 
  content, 
  isWebMode, 
  webUrl, 
  settings, 
  visible,
  onClose,
  onUrlChange
}) => {
  // Use state for position and size
  const [position, setPosition] = useState({ x: window.innerWidth - 450, y: window.innerHeight - 350 });
  const [size, setSize] = useState({ w: 400, h: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Update size based on settings initially, but allow override
  useEffect(() => {
     setSize({ w: 400 * settings.windowScale, h: 300 * settings.windowScale });
  }, [settings.windowScale]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
      // Prevent dragging when clicking buttons/inputs
      if ((e.target as HTMLElement).closest('button')) return;
      
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // Handle Resizing
  const handleResizeMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsResizing(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (isDragging) {
              setPosition({
                  x: e.clientX - dragStartRef.current.x,
                  y: e.clientY - dragStartRef.current.y
              });
          }
          if (isResizing) {
              const deltaX = e.clientX - dragStartRef.current.x;
              const deltaY = e.clientY - dragStartRef.current.y;
              setSize(prev => ({
                  w: Math.max(200, prev.w + deltaX),
                  h: Math.max(150, prev.h + deltaY)
              }));
              dragStartRef.current = { x: e.clientX, y: e.clientY };
          }
      };

      const handleMouseUp = () => {
          setIsDragging(false);
          setIsResizing(false);
      };

      if (isDragging || isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isDragging, isResizing]);

  // Handle External Popup (Anti-Block Mode)
  const openExternalPopup = () => {
      const popup = window.open(
          webUrl, 
          'MoyuBrowser', 
          `width=${size.w},height=${size.h},left=${position.x},top=${position.y},menubar=no,toolbar=no,location=yes,status=no`
      );
      if (!popup) {
          alert('Popup blocked! Please allow popups for this site to use Anti-Block mode.');
      }
  };

  const setGoogle = () => onUrlChange && onUrlChange('https://www.google.com/search?igu=1');
  const setBing = () => onUrlChange && onUrlChange('https://cn.bing.com/');

  // Transform URL for better compatibility in Iframe
  const finalUrl = getEmbedUrl(webUrl);

  return (
    <div 
      ref={windowRef}
      className="fixed shadow-2xl rounded-lg overflow-hidden z-40 bg-white flex flex-col border border-gray-400"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.w}px`,
        height: `${size.h}px`,
        opacity: settings.windowOpacity,
        // CRITICAL FIX: Use display: none instead of unmounting to persist Iframe state
        display: visible ? 'flex' : 'none' 
      }}
    >
        {/* Drag Handle Bar */}
        <div 
            className="h-7 bg-gray-200 cursor-move flex items-center justify-between px-2 shrink-0 select-none border-b border-gray-300"
            onMouseDown={handleMouseDown}
        >
            <div className="flex items-center text-xs text-gray-600 font-medium">
                <Move size={12} className="mr-1"/> 
                <span>{isWebMode ? 'Web Browser' : 'Reader'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
                {isWebMode && (
                    <>
                        <button 
                            onClick={setGoogle}
                            className="px-1.5 py-0.5 text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-700 rounded border border-blue-300"
                            title="Google Search (Iframe Friendly)"
                        >
                            Google
                        </button>
                        <button 
                            onClick={setBing}
                            className="px-1.5 py-0.5 text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-700 rounded border border-blue-300"
                            title="Bing Search (China Friendly)"
                        >
                            Bing
                        </button>
                        <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
                        <button 
                            onClick={openExternalPopup}
                            className="p-0.5 hover:bg-gray-300 rounded text-gray-600"
                            title="Open in Popup (Use this if site is blocked)"
                        >
                            <ExternalLink size={14} />
                        </button>
                    </>
                )}
                <button 
                    onClick={onClose}
                    className="p-0.5 hover:bg-red-500 hover:text-white rounded text-gray-600 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-white">
            {isWebMode ? (
                <div className="w-full h-full relative">
                    <iframe 
                        src={finalUrl} 
                        className="w-full h-full border-0"
                        title="Web Browser"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <div className="w-full h-full overflow-y-auto p-4 bg-[#f8f9fa] text-gray-800 font-sans text-sm whitespace-pre-wrap leading-6">
                    {content}
                </div>
            )}
        </div>

        {/* Resize Handle */}
        <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end p-[1px]"
            onMouseDown={handleResizeMouseDown}
        >
            <Maximize2 size={10} className="text-gray-400 rotate-90"/>
        </div>
    </div>
  );
};

export default FloatingWindow;