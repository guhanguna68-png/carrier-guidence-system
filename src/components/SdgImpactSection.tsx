import React from 'react';
import { SDG_MAPPING } from '../data/reportData';

export const SdgImpactSection: React.FC = () => {
  return (
    <section
      id="sdg"
      className="py-16 lg:py-24 border-b border-slate-200 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-2">
            United Nations 2030 Agenda
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
            Sustainable Development Goals Alignment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            The 17 SDGs recognize that action in one area affects outcomes in
            others, balancing social, economic, and environmental
            sustainability. This Career Guidance System directly contributes to
            three priority global goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SDG_MAPPING.map((sdg) => (
            <article
              key={sdg.number}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"
            >
              <div
                className="px-6 py-4 text-white flex items-center justify-between"
                style={{ backgroundColor: sdg.colorHex }}
              >
                <div>
                  <div className="font-mono text-xs opacity-90">
                    UN Global Goal
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">
                    SDG {sdg.number}: {sdg.title}
                  </h3>
                </div>
                <span className="font-mono text-3xl font-bold opacity-90 tabular-nums">
                  {sdg.number}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Project Outcome
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {sdg.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
