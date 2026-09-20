import React from 'react';
import { BarChart3, TrendingUp, PieChart, ShieldCheck, CheckCircle2, Users, AlertTriangle, AlertOctagon } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const drDistribution = [
    { label: 'No DR (Normal)', percent: 62, count: 78, color: 'bg-[#476800]' },
    { label: 'Mild NPDR', percent: 16, count: 20, color: 'bg-[#b8ff32]' },
    { label: 'Moderate NPDR', percent: 14, count: 18, color: 'bg-[#F57F17]' },
    { label: 'Severe NPDR / PDR', percent: 8, count: 10, color: 'bg-[#ba1a1a]' },
  ];

  return (
    <div id="analytics-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
          Field Screening Analytics
        </h2>
        <p className="text-base text-[#424934] mt-1">
          Epidemiological insights, diagnostic yield, and referral metrics across rural outreach centers.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-2">
          <div className="flex items-center justify-between text-[#727a62]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Screened</span>
            <Users className="w-4 h-4 text-[#476800]" />
          </div>
          <p className="font-display font-black text-4xl text-[#191d11]">126</p>
          <p className="text-xs text-[#476800] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+38 patients this week</span>
          </p>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-2">
          <div className="flex items-center justify-between text-[#727a62]">
            <span className="text-xs font-bold uppercase tracking-wider">DR Detection Rate</span>
            <AlertTriangle className="w-4 h-4 text-[#F57F17]" />
          </div>
          <p className="font-display font-black text-4xl text-[#F57F17]">38.1%</p>
          <p className="text-xs text-[#727a62]">48 patients with positive DR</p>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-2">
          <div className="flex items-center justify-between text-[#727a62]">
            <span className="text-xs font-bold uppercase tracking-wider">Referral Rate</span>
            <AlertOctagon className="w-4 h-4 text-[#ba1a1a]" />
          </div>
          <p className="font-display font-black text-4xl text-[#ba1a1a]">22.2%</p>
          <p className="text-xs text-[#727a62]">28 specialist referrals created</p>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-2">
          <div className="flex items-center justify-between text-[#727a62]">
            <span className="text-xs font-bold uppercase tracking-wider">Image Quality Pass</span>
            <ShieldCheck className="w-4 h-4 text-[#476800]" />
          </div>
          <p className="font-display font-black text-4xl text-[#476800]">95.4%</p>
          <p className="text-xs text-[#727a62]">Minimal field retake rate</p>
        </div>
      </div>

      {/* DR Distribution Bar Breakdown */}
      <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="font-display font-bold text-xl sm:text-2xl text-[#191d11]">
            Diabetic Retinopathy Severity Distribution
          </h4>
          <span className="text-xs font-bold text-[#727a62]">ICDR Classification</span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full h-5 rounded-full overflow-hidden flex bg-[#ecf0db]">
          {drDistribution.map((item) => (
            <div
              key={item.label}
              className={`${item.color} h-full transition-all`}
              style={{ width: `${item.percent}%` }}
              title={`${item.label}: ${item.percent}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {drDistribution.map((item) => (
            <div key={item.label} className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <span className="text-xs font-bold text-[#191d11]">{item.label}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-display font-extrabold text-2xl text-[#191d11]">{item.percent}%</span>
                <span className="text-xs text-[#727a62] font-semibold">{item.count} patients</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Clinical Validation Card */}
      <div className="bg-[#050505] text-[#ffffff] rounded-3xl p-7 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#b8ff32]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-extrabold px-3 py-1 bg-[#b8ff32] text-[#050505] rounded-full uppercase tracking-wider">
            Clinical Benchmark
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Diagnostic Concordance & Safety
          </h3>
          <p className="text-xs sm:text-sm text-[#c2caae] leading-relaxed">
            Trained and validated on over 180,000 multi-ethnic retinal fundus photographs adhering to the WHO Prevention of Blindness guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
            <p className="text-xs text-[#b8ff32] font-bold">Referable DR Sensitivity</p>
            <p className="font-display font-black text-3xl text-white mt-1">98.4%</p>
            <p className="text-[11px] text-[#c2caae] mt-0.5">High safety margin for zero missed referable cases</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
            <p className="text-xs text-[#b8ff32] font-bold">Clinical Specificity</p>
            <p className="font-display font-black text-3xl text-white mt-1">94.2%</p>
            <p className="text-[11px] text-[#c2caae] mt-0.5">Minimizes unnecessary tertiary hospital referrals</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
            <p className="text-xs text-[#b8ff32] font-bold">AUC-ROC Score</p>
            <p className="font-display font-black text-3xl text-white mt-1">0.988</p>
            <p className="text-[11px] text-[#c2caae] mt-0.5">Validated on non-mydriatic fundus cameras</p>
          </div>
        </div>
      </div>
    </div>
  );
};
