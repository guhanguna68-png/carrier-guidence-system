import React from 'react';
import { CAREER_DOMAINS, OBJECTIVES_LIST } from '../data/reportData';

export const MethodologySection: React.FC = () => {
  return (
    <section
      id="methodology"
      className="py-16 lg:py-24 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Study Objectives & Methodology Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-2">
              Chapters 1 &amp; 3 · Architecture
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 mb-4">
              Proposed Solution &amp; Machine Learning Pipeline
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every academic score, project, skill, and interest a student
              holds is a data point describing their potential. Our methodology
              transforms raw student records into ranked career intelligence.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-4">
              1.3 Objectives of the Study
            </h3>
            <ol className="space-y-4">
              {OBJECTIVES_LIST.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] bg-white border border-slate-200 rounded-md w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {obj}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 3-Part Methodology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="font-mono text-xs text-[#1E3A8A] font-medium">
              3.1 Student Profiling Model
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Three-Component Vector (S · I · A)
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed pt-1">
              <li>
                <strong className="text-slate-900">Skills (S):</strong> Technical
                and soft skills such as programming, statistics, and
                communication.
              </li>
              <li>
                <strong className="text-slate-900">Interests (I):</strong> Domains
                and activities preferred by the student, captured via structured
                questionnaire.
              </li>
              <li>
                <strong className="text-slate-900">
                  Academic Performance (A):
                </strong>{' '}
                The student’s grades and cumulative CGPA.
              </li>
            </ul>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="font-mono text-xs text-[#1E3A8A] font-medium">
              3.2 Classification &amp; Matching
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Random Forest &amp; Cosine Similarity
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              A supervised <strong className="text-slate-900">Random Forest</strong>{' '}
              classifier builds multiple decision trees and combines their
              outputs to predict the best-fit career domain. Simultaneously,{' '}
              <strong className="text-slate-900">Cosine Similarity</strong>{' '}
              measures how closely the student’s vector aligns with each
              domain’s benchmark requirements to rank matches and compute exact
              skill gaps.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="font-mono text-xs text-[#1E3A8A] font-medium">
              3.3 Data Preprocessing (Pandas/NumPy)
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Imputation &amp; Feature Scaling
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed pt-1">
              <li>
                <strong className="text-slate-900">
                  Handling Missing Values:
                </strong>{' '}
                Filling or removing incomplete records so missing entries never
                distort predictions.
              </li>
              <li>
                <strong className="text-slate-900">
                  Encoding &amp; Feature Scaling:
                </strong>{' '}
                Converting categorical interests into numerical vectors and
                normalizing scales so marks do not overshadow skill ratings.
              </li>
            </ul>
          </div>
        </div>

        {/* Chapter 4.1 & 4.2 Results and Strategic Recommendations Table */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-1">
              Chapter 4 · Results and Discussion
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slate-900">
              4.1 Identified Career Domains &amp; 4.2 Strategic Recommendations
            </h3>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-5">Career Domain</th>
                  <th className="py-3.5 px-5">Target Roles</th>
                  <th className="py-3.5 px-5">Core Profile Traits</th>
                  <th className="py-3.5 px-5">
                    Actionable Strategy (Fig. 4.2)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {CAREER_DOMAINS.map((domain) => (
                  <tr
                    key={domain.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-slate-900 whitespace-nowrap">
                      {domain.name}
                    </td>
                    <td className="py-4 px-5 text-slate-700 whitespace-nowrap">
                      {domain.targetRoles.join(' · ')}
                    </td>
                    <td className="py-4 px-5 text-slate-600 max-w-xs">
                      {domain.summary}
                    </td>
                    <td className="py-4 px-5 text-slate-800 font-medium max-w-sm">
                      {domain.strategicRecommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
