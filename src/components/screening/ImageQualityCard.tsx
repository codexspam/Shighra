import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, RotateCcw, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { QualityMetrics, QualityLevel } from '../../types';

interface ImageQualityCardProps {
  metrics: QualityMetrics;
  onRetake: () => void;
  onProceed: () => void;
}

export const ImageQualityCard: React.FC<ImageQualityCardProps> = ({
  metrics,
  onRetake,
  onProceed,
}) => {
  const isGood = metrics.overallQuality === 'GOOD';
  const isBorderline = metrics.overallQuality === 'BORDERLINE';
  const isPoor = metrics.overallQuality === 'POOR';

  const parameters = [
    { name: 'Focus & Sharpness', score: metrics.focusScore, threshold: 80 },
    { name: 'Brightness & Illumination', score: metrics.brightnessScore, threshold: 75 },
    { name: 'Field of View (FOV)', score: metrics.fovScore, threshold: 85 },
    { name: 'Retinal Visibility', score: metrics.retinalVisibilityScore, threshold: 80 },
    { name: 'Artifact Rejection', score: 100 - metrics.artifactScore, threshold: 75 },
  ];

  return (
    <div 
      id="image-quality-assessment-card"
      className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f1f6e1] rounded-full text-[11px] font-extrabold text-[#476800] uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Pre-Inference Quality Gate</span>
          </div>
          <h4 className="font-display font-bold text-2xl text-[#191d11] tracking-tight">
            Image Quality Assessment
          </h4>
          <p className="text-xs sm:text-sm text-[#727a62]">
            Automated validation ensuring diagnostic fundus clarity before neural classification.
          </p>
        </div>

        {/* Big Overall Quality Pill */}
        <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-2.5 self-start sm:self-auto border ${
          isGood
            ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
            : isBorderline
              ? 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]'
              : 'bg-[#FFEBEE] text-[#C62828] border-[#EF9A9A]'
        }`}>
          {isGood ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : isBorderline ? (
            <AlertTriangle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Image Quality</p>
            <p className="font-display font-extrabold text-lg leading-tight">{metrics.overallQuality}</p>
          </div>
        </div>
      </div>

      {/* Parameter Breakdown Progress Bars */}
      <div className="space-y-3.5 pt-2">
        {parameters.map((param) => {
          const passes = param.score >= param.threshold;
          return (
            <div key={param.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#191d11]">
                <span>{param.name}</span>
                <span className={passes ? 'text-[#476800]' : 'text-[#ba1a1a]'}>
                  {param.score}% {passes ? '✓ Passed' : '⚠️ Warning'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#ecf0db] overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    passes ? 'bg-[#476800]' : 'bg-[#ba1a1a]'
                  }`}
                  style={{ width: `${param.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidance Message & Suggestions */}
      {isPoor ? (
        <div className="p-4 rounded-2xl bg-[#FFEBEE] border border-[#EF9A9A] space-y-2">
          <p className="text-xs sm:text-sm font-bold text-[#C62828] flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Image quality is insufficient for reliable screening.</span>
          </p>
          <ul className="text-xs text-[#5f5e5e] space-y-1 list-disc pl-5">
            {metrics.issues.length > 0 ? (
              metrics.issues.map((issue, idx) => <li key={idx}>{issue}</li>)
            ) : (
              <>
                <li>Image is blurry or out of focus.</li>
                <li>Retinal vessels and fovea are partially obscured.</li>
                <li>Exposure is too dark or contains excessive flare artifact.</li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#f1f6e1] border border-[#c2caae]/40 text-xs text-[#424934] space-y-1">
          <p className="font-bold text-[#191d11] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#476800]" />
            <span>Optic disc and macular landmarks clearly resolved.</span>
          </p>
          <p className="text-[#5f5e5e]">
            {metrics.suggestions.join(' ')} Ready for deep neural classification.
          </p>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <button
          id="quality-retake-btn"
          onClick={onRetake}
          className="flex-1 bg-[#f1f6e1] text-[#191d11] px-6 py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#e0e5d0] active:scale-98 transition-all border border-[#c2caae]/40 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-[#727a62]" />
          <span>Retake Image</span>
        </button>

        {!isPoor && (
          <button
            id="quality-proceed-ai-btn"
            onClick={onProceed}
            className="flex-1 bg-[#050505] text-[#ffffff] px-6 py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#1a1a1a] active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-[#b8ff32]" />
            <span>Run AI Analysis</span>
            <ArrowRight className="w-4 h-4 text-[#b8ff32] group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
