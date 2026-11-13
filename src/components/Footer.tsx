import React from 'react';
import { SYSTEM_INFO } from '../data/reportData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-500">
        <div className="space-y-1">
          <div className="font-serif text-sm font-semibold text-slate-900">
            {SYSTEM_INFO.title}
          </div>
          <div>{SYSTEM_INFO.tagline}</div>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="#engine"
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Guidance Engine
          </a>
          <a
            href="#problem"
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Problem Study
          </a>
          <a
            href="#methodology"
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            Methodology
          </a>
          <a
            href="#sdg"
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            SDG Impact
          </a>
          <a
            href="#archive"
            className="hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            References
          </a>
        </div>
      </div>
    </footer>
  );
};
