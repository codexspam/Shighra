import React, { useState, useRef } from 'react';
import { Eye, Layers, Scan, SlidersHorizontal, ZoomIn, ZoomOut, RotateCcw, Sparkles, Info } from 'lucide-react';
import { LesionLocation } from '../../types';

interface RetinalImageViewerProps {
  originalImage: string;
  lesions?: LesionLocation[];
  eye?: 'OD (Right Eye)' | 'OS (Left Eye)';
  onSelectLesion?: (lesion: LesionLocation) => void;
  selectedLesionId?: string | null;
}

export const RetinalImageViewer: React.FC<RetinalImageViewerProps> = ({
  originalImage,
  lesions = [],
  eye = 'OD (Right Eye)',
  onSelectLesion,
  selectedLesionId,
}) => {
  const [viewMode, setViewMode] = useState<'original' | 'heatmap' | 'lesions' | 'compare'>('lesions');
  const [compareSplit, setCompareSplit] = useState<number>(50);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeTooltip, setActiveTooltip] = useState<LesionLocation | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (offsetX / rect.width) * 100;
    setCompareSplit(percentage);
  };

  return (
    <div 
      id="retinal-image-viewer-card"
      className="bg-[#ffffff] rounded-3xl p-5 sm:p-7 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-4"
    >
      {/* Top Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#f1f6e1] flex items-center justify-center text-[#476800]">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-[#191d11]">
              Retinal Fundus Viewer
            </h4>
            <p className="text-xs text-[#727a62]">
              Field Photograph • <span className="font-semibold text-[#191d11]">{eye}</span>
            </p>
          </div>
        </div>

        {/* View Mode Pill Switcher */}
        <div className="flex items-center bg-[#f1f6e1] p-1 rounded-full border border-[#c2caae]/30 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            id="viewmode-original-btn"
            onClick={() => setViewMode('original')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'original'
                ? 'bg-[#050505] text-[#ffffff] shadow-xs'
                : 'text-[#424934] hover:text-[#191d11]'
            }`}
          >
            Original
          </button>
          <button
            id="viewmode-heatmap-btn"
            onClick={() => setViewMode('heatmap')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'heatmap'
                ? 'bg-[#050505] text-[#b8ff32] shadow-xs'
                : 'text-[#424934] hover:text-[#191d11]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>AI Heatmap</span>
          </button>
          <button
            id="viewmode-lesions-btn"
            onClick={() => setViewMode('lesions')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'lesions'
                ? 'bg-[#050505] text-[#ffffff] shadow-xs'
                : 'text-[#424934] hover:text-[#191d11]'
            }`}
          >
            Lesions ({lesions.length})
          </button>
          <button
            id="viewmode-compare-btn"
            onClick={() => setViewMode('compare')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'compare'
                ? 'bg-[#050505] text-[#ffffff] shadow-xs'
                : 'text-[#424934] hover:text-[#191d11]'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Main Fundus Stage Container */}
      <div 
        ref={containerRef}
        id="fundus-viewport"
        className="relative w-full aspect-square max-h-[500px] bg-[#050505] rounded-2xl overflow-hidden select-none flex items-center justify-center border border-[#191d11]"
      >
        {/* Base / Original Layer */}
        <div 
          className="w-full h-full flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={originalImage}
            alt="Retinal Fundus"
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* AI Heatmap Attention Mask Layer (Grad-CAM style subtle organic overlay) */}
          {(viewMode === 'heatmap' || viewMode === 'compare') && (
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75"
              style={
                viewMode === 'compare'
                  ? { clipPath: `polygon(${compareSplit}% 0, 100% 0, 100% 100%, ${compareSplit}% 100%)` }
                  : undefined
              }
            >
              <svg className="w-full h-full" viewBox="0 0 760 760">
                <defs>
                  <radialGradient id="heat1" cx="58%" cy="40%" r="28%">
                    <stop offset="0%" stopColor="#ff3838" stopOpacity="0.8" />
                    <stop offset="45%" stopColor="#ff9f1a" stopOpacity="0.55" />
                    <stop offset="75%" stopColor="#b8ff32" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="heat2" cx="62%" cy="58%" r="22%">
                    <stop offset="0%" stopColor="#ff3838" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#ff9f1a" stopOpacity="0.45" />
                    <stop offset="85%" stopColor="#b8ff32" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="heat3" cx="52%" cy="64%" r="18%">
                    <stop offset="0%" stopColor="#ff9f1a" stopOpacity="0.6" />
                    <stop offset="60%" stopColor="#b8ff32" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="440" cy="300" r="160" fill="url(#heat1)" />
                <circle cx="470" cy="440" r="130" fill="url(#heat2)" />
                <circle cx="390" cy="490" r="110" fill="url(#heat3)" />
              </svg>
            </div>
          )}

          {/* Interactive Lesion Markers Layer */}
          {(viewMode === 'lesions' || (viewMode === 'compare' && compareSplit < 80)) && (
            <div className="absolute inset-0 pointer-events-auto">
              {lesions.map((lesion) => {
                const isSelected = selectedLesionId === lesion.id;
                return (
                  <div
                    key={lesion.id}
                    id={`lesion-marker-${lesion.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesion?.(lesion);
                      setActiveTooltip(activeTooltip?.id === lesion.id ? null : lesion);
                    }}
                    style={{
                      left: `${lesion.x}%`,
                      top: `${lesion.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute cursor-pointer transition-all duration-200 group ${
                      isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-115'
                    }`}
                  >
                    {/* Pulsing ring */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      lesion.severity === 'high'
                        ? 'border-[#ff3b30] bg-[#ff3b30]/20'
                        : lesion.severity === 'moderate'
                          ? 'border-[#ff9500] bg-[#ff9500]/20'
                          : 'border-[#b8ff32] bg-[#b8ff32]/20'
                    } ${isSelected ? 'ring-4 ring-white shadow-lg' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${
                        lesion.severity === 'high' ? 'bg-[#ff3b30]' : lesion.severity === 'moderate' ? 'bg-[#ff9500]' : 'bg-[#b8ff32]'
                      }`}></div>
                    </div>

                    {/* Tag badge on hover/select */}
                    <div className={`absolute left-1/2 -top-7 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap pointer-events-none shadow-md transition-opacity ${
                      isSelected || activeTooltip?.id === lesion.id
                        ? 'opacity-100 bg-[#050505] text-[#b8ff32]'
                        : 'opacity-0 group-hover:opacity-100 bg-[#ffffff] text-[#191d11]'
                    }`}>
                      {lesion.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Compare Divider Line and Draggable Handle */}
        {viewMode === 'compare' && (
          <>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white z-30 pointer-events-none shadow-lg"
              style={{ left: `${compareSplit}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-white text-[#b8ff32] flex items-center justify-center shadow-md">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
            {/* Interactive Drag Surface */}
            <div
              className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            />
            {/* Split Labels */}
            <div className="absolute bottom-3 left-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white">
              Original Fundus
            </div>
            <div className="absolute bottom-3 right-4 z-20 px-2.5 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md text-[11px] font-bold text-[#b8ff32]">
              AI Neural Heatmap
            </div>
          </>
        )}

        {/* Zoom & Reset Toolbar in bottom right */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
          <button
            onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
            className="w-7 h-7 rounded-full text-white/80 hover:text-white flex items-center justify-center text-xs"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.25))}
            className="w-7 h-7 rounded-full text-white/80 hover:text-white flex items-center justify-center text-xs"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="w-7 h-7 rounded-full text-white/80 hover:text-white flex items-center justify-center text-xs"
              title="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Diagnostic scanning guide line animation if analyzing */}
        {viewMode === 'heatmap' && (
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b8ff32] to-transparent animate-scan-line pointer-events-none z-20"></div>
        )}
      </div>

      {/* Lesion Tooltip / Selected info pill */}
      {activeTooltip && (
        <div className="p-3.5 bg-[#f1f6e1] rounded-2xl border border-[#c2caae]/40 flex items-start gap-3 animate-in fade-in">
          <Info className="w-4 h-4 text-[#476800] shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-[#191d11]">{activeTooltip.label}</p>
            <p className="text-[#424934] leading-relaxed">{activeTooltip.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
