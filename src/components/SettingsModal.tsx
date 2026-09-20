import React from 'react';
import { Settings, User, Camera, Cpu, ShieldCheck, Database, X, Globe, Sliders } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onOpenSyncModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onOpenSyncModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-[#ffffff] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c2caae]/40 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c2caae]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#050505] text-[#b8ff32] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#191d11]">
                System Settings & Profile
              </h3>
              <p className="text-xs text-[#727a62]">Field unit configuration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Worker Profile Box */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#191d11] text-[#b8ff32] font-black text-base flex items-center justify-center shadow-xs">
            AD
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-base text-[#191d11]">Anil Deshmukh</h4>
            <p className="text-xs text-[#727a62]">Senior Field Ophthalmic Technician • ID: <span className="font-mono text-[#191d11]">TECH-8821</span></p>
            <p className="text-[11px] text-[#476800] font-semibold">Solapur District Rural Screening Division</p>
          </div>
        </div>

        {/* Field Hardware & Camera */}
        <div className="space-y-3 text-xs">
          <h5 className="font-bold text-[#191d11] uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-[#476800]" />
            <span>Fundus Camera & Optics</span>
          </h5>
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/40 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Capture Device</span>
              <span className="px-3 py-1 bg-white rounded-full border border-[#c2caae]/30 font-bold">Volk VistaView / Smartphone Lens</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Auto Quality Gate</span>
              <span className="text-[#476800] font-bold">Enabled (Strict 80% threshold)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Aperture Field of View</span>
              <span className="font-bold">45° Non-Mydriatic Central Fundus</span>
            </div>
          </div>
        </div>

        {/* AI Model Specs */}
        <div className="space-y-3 text-xs">
          <h5 className="font-bold text-[#191d11] uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#476800]" />
            <span>AI Neural Architecture</span>
          </h5>
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/40 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Multimodal LLM / Vision</span>
              <span className="font-bold text-[#476800]">Gemini 3.7 Flash + Shighra Edge v3.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Grading Standard</span>
              <span className="font-bold">ICDR 5-Stage Disease Severity Scale</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#191d11]">Explainability Engine</span>
              <span className="font-bold">Grad-CAM++ Multiscale Lesion Maps</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-between items-center">
          <button
            onClick={() => {
              onClose();
              onOpenSyncModal();
            }}
            className="text-xs font-bold text-[#476800] hover:underline"
          >
            Manage Offline Data Cache →
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#050505] text-[#ffffff] font-bold text-xs hover:bg-[#1a1a1a]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
