import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, ChevronRight, CheckCircle2, Eye, Award } from 'lucide-react';
import { EducationalArticle } from '../types';
import { EDUCATIONAL_ARTICLES } from '../data/mockRetinalData';

export const EducationView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(EDUCATIONAL_ARTICLES[0]);

  return (
    <div id="education-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
          Field Clinical Knowledge
        </h2>
        <p className="text-base text-[#424934] mt-1">
          Ophthalmic screening guides, lesion identification, and technician best practices.
        </p>
      </div>

      {/* Grid: Article Selector List & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Article Cards List */}
        <div className="lg:col-span-5 space-y-3.5">
          {EDUCATIONAL_ARTICLES.map((article) => {
            const isSelected = selectedArticle?.id === article.id;
            return (
              <div
                key={article.id}
                id={`edu-article-${article.id}`}
                onClick={() => setSelectedArticle(article)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex gap-4 items-center ${
                  isSelected
                    ? 'bg-[#ffffff] border-[#476800] shadow-[0px_10px_40px_rgba(0,0,0,0.06)] ring-1 ring-[#b8ff32]/40'
                    : 'bg-[#ffffff]/80 hover:bg-[#ffffff] border-[#c2caae]/30'
                }`}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-16 h-16 rounded-2xl object-cover bg-black shrink-0 border border-[#c2caae]/30"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-[#f1f6e1] text-[#476800] rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#191d11] line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#727a62] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#476800] translate-x-1' : 'text-[#c2caae]'}`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Interactive Article Content */}
        {selectedArticle && (
          <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-6 animate-in fade-in">
            {/* Article Header */}
            <div className="space-y-3 pb-4 border-b border-[#c2caae]/30">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#050505] text-[#b8ff32] text-xs font-black rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-[#727a62] font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#191d11] tracking-tight leading-tight">
                {selectedArticle.title}
              </h3>
              <p className="text-sm font-medium text-[#424934]">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Fundus Reference Image */}
            <div className="relative aspect-video max-h-[260px] w-full rounded-2xl overflow-hidden bg-black border border-[#191d11] shadow-inner flex items-center justify-center">
              <img
                src={selectedArticle.imageUrl}
                alt="Retinal illustration"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-bold text-[#b8ff32]">
                Clinical Retinal Reference
              </div>
            </div>

            {/* Key Clinical Takeaways */}
            <div className="p-5 rounded-2xl bg-[#f1f6e1] border border-[#c2caae]/40 space-y-2.5">
              <p className="text-xs font-black text-[#476800] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Technician Key Clinical Takeaways:</span>
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#191d11]">
                {selectedArticle.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#476800] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Text Content */}
            <div className="space-y-4 text-xs sm:text-sm text-[#424934] leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
