import React, { useState } from 'react';
import { Award, BookOpen } from 'lucide-react';
import { ABBREVIATIONS, REFERENCES_LIST } from '../data/reportData';

type ArchiveTab = 'summary' | 'abbreviations' | 'references';

export const ReportArchiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('summary');

  const tabs: { id: ArchiveTab; label: string }[] = [
    { id: 'summary', label: 'Summary & Future Scope' },
    { id: 'abbreviations', label: 'Symbols & Abbreviations' },
    { id: 'references', label: 'References (13)' },
  ];

  return (
    <section
      id="archive"
      className="py-16 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-2">
            Technical Reference &amp; Literature
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
            System Summary, Glossary &amp; References
          </h2>
        </div>

        {/* Segmented Tab Bar */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                  : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                <span>System Overview</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                Personalized Guidance via Data Science
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-prose">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-slate-900">
                  In an increasingly competitive job market, understanding which
                  career best fits a student’s abilities and interests is vital
                  for individual success and workforce development. This
                  system leverages academic, skill, and interest data to
                  recommend suitable careers through machine learning
                  techniques.
                </p>
                <p>
                  By building a structured student profile (skills, interests,
                  and academic performance) combined with a Random Forest
                  classifier and cosine similarity matching, the system ranks
                  best-fit careers and highlights the exact skills the student
                  still needs to acquire—moving from generic counselling to
                  personalized, actionable guidance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 lg:pl-8 lg:border-l lg:border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Award className="w-4 h-4 text-[#1E3A8A]" />
                <span>Conclusion &amp; Future Enhancements</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                Continuous Learning &amp; Future Scope
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-prose">
                <p>
                  Career guidance is not a one-time task but a continuous
                  process. As job-market trends shift and new data become
                  available, models must be updated to maintain recommendation
                  accuracy.
                </p>
                <ul className="space-y-2 text-sm text-slate-800 pt-1">
                  <li className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-3">
                    <strong className="text-slate-900">
                      Real-Time Job-Market Integration:
                    </strong>{' '}
                    Connecting live job-portal data streams to dynamically
                    refresh skill demand vectors.
                  </li>
                  <li className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-3">
                    <strong className="text-slate-900">
                      NLP Resume Analysis:
                    </strong>{' '}
                    Extracting verified competencies directly from student
                    resumes and project portfolios using Natural Language
                    Processing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'abbreviations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Symbols and Abbreviations
              </h3>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {ABBREVIATIONS.length} Entries
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ABBREVIATIONS.map((item) => (
                <div
                  key={item.abbr}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-sm font-semibold text-[#1E3A8A]">
                    {item.abbr}
                  </span>
                  <span className="text-sm text-slate-700 text-right">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Research References
              </h3>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                13 Citations
              </span>
            </div>
            <ol className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-[#F8FAFC]">
              {REFERENCES_LIST.map((ref, idx) => (
                <li
                  key={idx}
                  className="px-5 py-3.5 flex items-baseline gap-4 text-sm text-slate-700"
                >
                  <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums w-6 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-relaxed">{ref}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};
