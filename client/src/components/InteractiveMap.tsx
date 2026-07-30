import { useState, useRef, useEffect } from 'react';
import { LANDMARKS } from '@shared/landmarks';
import { CHARACTERS } from '@shared/characters';
import type { Landmark } from '@shared/types';

interface InteractiveMapProps {
  onLandmarkClick: (landmark: Landmark) => void;
  mapImageUrl: string;
}

export default function InteractiveMap({ onLandmarkClick, mapImageUrl }: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // 計算容器尺寸
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 滑鼠滾輪縮放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(1, Math.min(3, scale * delta));
    setScale(newScale);
  };

  // 拖曳地圖
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 觸控縮放（行動裝置）
  const [touchDistance, setTouchDistance] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      setTouchDistance(Math.sqrt(dx * dx + dy * dy));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (touchDistance > 0) {
        const delta = newDistance / touchDistance;
        const newScale = Math.max(1, Math.min(3, scale * delta));
        setScale(newScale);
        setTouchDistance(newDistance);
      }
    }
  };

  // 點擊熱區
  const handleHotspotClick = (landmark: Landmark, e: React.MouseEvent) => {
    e.stopPropagation();
    onLandmarkClick(landmark);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-background overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* 地圖背景 */}
      <div
        className="absolute transition-transform duration-75"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={mapImageUrl}
          alt="情緒小參室地圖"
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
        />

        {/* 熱區層 */}
        <div className="absolute inset-0">
          {LANDMARKS.map((landmark) => (
            <button
              key={landmark.id}
              onClick={(e) => handleHotspotClick(landmark, e)}
              className="absolute group transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
              style={{
                left: `${landmark.x}%`,
                top: `${landmark.y}%`,
                width: `${landmark.width}%`,
                height: `${landmark.height}%`,
              }}
              title={landmark.name}
              aria-label={landmark.name}
            >
              {/* 懸停時的視覺反饋 */}
              <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* 地標標籤 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card/95 backdrop-blur-sm text-foreground text-sm font-medium rounded-lg shadow-soft border-gentle opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {landmark.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 縮放控制 (行動裝置) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10 md:hidden">
        <button
          onClick={() => setScale(Math.min(3, scale * 1.2))}
          className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm border-gentle shadow-soft hover:bg-card transition-colors"
          aria-label="放大"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(1, scale / 1.2))}
          className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm border-gentle shadow-soft hover:bg-card transition-colors"
          aria-label="縮小"
        >
          −
        </button>
      </div>

      {/* 提示文字 */}
      <div className="absolute top-4 left-4 text-muted-foreground text-sm pointer-events-none">
        <p className="hidden md:block">滾輪縮放 / 拖曳移動</p>
        <p className="md:hidden">雙指縮放 / 拖曳移動</p>
      </div>
    </div>
  );
}
