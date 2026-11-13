import React, { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { SYSTEM_INFO } from '../data/reportData';

interface HeroSectionProps {
  onLaunchProfiler: () => void;
  onExploreMethodology: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchProfiler,
  onExploreMethodology,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="pt-10 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-200 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column balanced hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide mb-4">
              {SYSTEM_INFO.tagline}
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.12] mb-5">
              {SYSTEM_INFO.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Moving beyond generic one-size-fits-all counselling. This system
              structures student Skills (S), Interests (I), and Academic
              Performance (A) and pairs a{' '}
              <span className="text-slate-900 font-medium">
                Random Forest classifier
              </span>{' '}
              with{' '}
              <span className="text-slate-900 font-medium">
                Cosine Similarity matching
              </span>{' '}
              to rank best-fit career domains and uncover exact skill gaps.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onLaunchProfiler}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A]"
              >
                <span>Open Interactive Profiler</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreMethodology}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
              >
                <Layers className="w-4 h-4 text-[#1E3A8A]" />
                <span>Explore Methodology</span>
              </button>
            </div>
          </div>

          {/* Right visual frame matching split height */}
          <div className="lg:col-span-5 flex">
            <figure className="w-full flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="relative flex-1 min-h-[260px] lg:min-h-[340px] bg-[#F3F1EB] overflow-hidden">
                {!imgError ? (
                  <img
                    src="/src/assets/images/career_guidance_hero_1794592472359.jpg"
                    alt="Decision tree and multidimensional vector space diagram mapping student profiles into four career domains"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <svg
                      viewBox="0 0 240 160"
                      className="w-48 h-32 text-[#1E3A8A] mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="90" y="120" width="60" height="24" rx="4" />
                      <path d="M120 120V92M120 92L60 60M120 92L180 60M60 60L35 28M60 60L85 28M180 60L155 28M180 60L205 28" />
                      <circle cx="35" cy="24" r="6" fill="currentColor" />
                      <circle cx="85" cy="24" r="6" fill="currentColor" />
                      <circle cx="155" cy="24" r="6" fill="currentColor" />
                      <circle cx="205" cy="24" r="6" fill="currentColor" />
                    </svg>
                    <p className="text-xs font-medium text-slate-600">
                      Random Forest &amp; Cosine Similarity Architecture
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="px-5 py-3.5 bg-white border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between gap-4">
                <span className="font-serif italic text-slate-600">
                  Student Profiling Vector &amp; Decision Tree Ensemble
                </span>
                <span className="font-mono text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                  S · I · A → 4 Domains
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-width 4-column KPI strip below hero split */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500 mb-1.5">
              Identified Career Domains
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums font-mono">
              04
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Data, Software, Cloud, Creative
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500 mb-1.5">
              Student Profiling Vectors
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums font-mono">
              S · I · A
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Skills, Interests &amp; CGPA
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500 mb-1.5">
              Evaluated Skill Dimensions
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums font-mono">
              06
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Normalized via Min-Max Scaling
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500 mb-1.5">
              UN SDGs Mapped
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums font-mono">
              8 · 9 · 12
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Work, Innovation &amp; Consumption
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
