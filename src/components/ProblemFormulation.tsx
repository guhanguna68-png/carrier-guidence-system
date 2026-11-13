import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  HelpCircle,
  TrendingDown,
  XCircle,
} from 'lucide-react';

type FigureTab = 'fig21' | 'fig22' | 'fig23';

export const ProblemFormulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FigureTab>('fig21');
  const [counsellingMode, setCounsellingMode] = useState<'generic' | 'ai'>(
    'generic'
  );
  const [selectedWarning, setSelectedWarning] = useState<number>(0);

  const warnings = [
    {
      title: 'Low Interest in Chosen Course',
      impact:
        'Disengagement during foundational semesters often goes unnoticed until final-year placement pressure begins.',
      icon: TrendingDown,
    },
    {
      title: 'Poor Marks in Core Subjects',
      impact:
        'Weak grades in core quantitative or programming subjects signal misalignment between current track and natural strengths.',
      icon: BarChart3,
    },
    {
      title: 'No Clear Career Goals',
      impact:
        'Following peer trends without structured self-assessment results in indecision between unrelated career tracks (Option A, B, or C).',
      icon: HelpCircle,
    },
  ];

  return (
    <section
      id="problem"
      className="py-16 lg:py-24 border-b border-slate-200 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-2">
            Chapter 2 · Problem Formulation
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
            Why Traditional Career Counselling Breaks Down
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            In the digital era, students face hundreds of career options,
            courses, and certifications yet receive little personalized advice.
            Explore the three core challenges modeled in Figures 2.1 through 2.3.
          </p>
        </div>

        {/* Interactive Figure Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('fig21')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'fig21'
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Fig. 2.1 · Career Confusion &amp; Warning Signs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fig22')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'fig22'
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Fig. 2.2 · Generic Counselling &amp; Skill Mismatch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fig23')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'fig23'
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Fig. 2.3 · Data Complexity &amp; Information Overload
          </button>
        </div>

        {/* Interactive Figure Canvas */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          {activeTab === 'fig21' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    2.1 The Challenge of Career Confusion
                  </h3>
                  <p className="text-sm text-slate-600">
                    Career confusion is often silent—students follow peer
                    pressure until early warning signs compound into lost years.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0">
                  Interactive Diagnostic Flow
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Node 1: Final Year Undecided */}
                <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      Final Year State
                    </div>
                    <div className="text-base font-semibold text-slate-900 mt-0.5">
                      No Clear Goal
                    </div>
                  </div>
                  <div className="py-1.5 px-3 bg-red-600 text-white text-xs font-semibold rounded-md inline-block">
                    UNDECIDED ?
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex lg:col-span-1 justify-center text-slate-400">
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* Node 2: Interactive Warning Signs */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Select Warning Sign to Inspect Impact
                  </div>
                  {warnings.map((w, idx) => {
                    const Icon = w.icon;
                    const active = selectedWarning === idx;
                    return (
                      <button
                        key={w.title}
                        type="button"
                        onClick={() => setSelectedWarning(idx)}
                        className={`w-full text-left p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                          active
                            ? 'bg-red-50/70 border-red-300'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            active ? 'text-red-700' : 'text-slate-600'
                          }`}
                        />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {w.title}
                          </div>
                          {active && (
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                              {w.impact}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex lg:col-span-1 justify-center text-slate-400">
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* Node 3: Lost Direction Signpost */}
                <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-red-700">
                    Lost Direction
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="py-1.5 px-2 bg-slate-900 text-white rounded">
                      Option A ?
                    </div>
                    <div className="py-1.5 px-2 bg-slate-700 text-white rounded">
                      Option B ?
                    </div>
                    <div className="py-1.5 px-2 bg-slate-500 text-white rounded">
                      Option C ?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fig22' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    2.2 Generic Counselling and Skill Mismatch
                  </h3>
                  <p className="text-sm text-slate-600">
                    Compare how generic one-size-fits-all counselling fails
                    distinct student profiles versus AI-driven personalization.
                  </p>
                </div>
                <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCounsellingMode('generic')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      counsellingMode === 'generic'
                        ? 'bg-red-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    One-Size-Fits-All
                  </button>
                  <button
                    type="button"
                    onClick={() => setCounsellingMode('ai')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      counsellingMode === 'ai'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    AI-Personalized Guidance
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Analytical Student Card */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-slate-900">
                      Analytical Student
                    </h4>
                    <span className="font-mono text-xs text-slate-500">
                      Profile Type A
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>• Strong in mathematics &amp; logic</li>
                    <li>• Loves coding &amp; structured data</li>
                    <li>• Needs a Data Science / ML career path</li>
                  </ul>
                  <div
                    className={`p-3.5 rounded-lg border text-xs font-medium flex items-start gap-2.5 ${
                      counsellingMode === 'generic'
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    {counsellingMode === 'generic' ? (
                      <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold">
                        {counsellingMode === 'generic'
                          ? 'RESULT: Generic Advice & Missed Potential'
                          : 'RESULT: Matched to Data Science & Analytics'}
                      </div>
                      <p className="mt-0.5 opacity-90">
                        {counsellingMode === 'generic'
                          ? 'Receives the same standard course list as everyone else; analytical aptitude goes underutilized.'
                          : 'Random Forest & Cosine Similarity map directly to Data Analyst / ML Engineer with targeted ML projects.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Creative Student Card */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-slate-900">
                      Creative Student
                    </h4>
                    <span className="font-mono text-xs text-slate-500">
                      Profile Type B
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>• Strong communication &amp; leadership skills</li>
                    <li>• Loves design, empathy &amp; storytelling</li>
                    <li>• Needs a Creative / Management career path</li>
                  </ul>
                  <div
                    className={`p-3.5 rounded-lg border text-xs font-medium flex items-start gap-2.5 ${
                      counsellingMode === 'generic'
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    {counsellingMode === 'generic' ? (
                      <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold">
                        {counsellingMode === 'generic'
                          ? 'RESULT: Skill Mismatch & Lost Interest'
                          : 'RESULT: Matched to Management & Creative Roles'}
                      </div>
                      <p className="mt-0.5 opacity-90">
                        {counsellingMode === 'generic'
                          ? 'Pushed into generic technical tracks misaligned with strengths, widening the industry skill gap.'
                          : 'Routed to Business Analyst / UI-UX Designer tracks with team leadership & design-tool training.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 text-xs sm:text-sm font-medium text-slate-700">
                Right Guidance for the Right Student = Better Career Fit &amp; Higher Employability
              </div>
            </div>
          )}

          {activeTab === 'fig23' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  2.3 Data Complexity and Information Overload
                </h3>
                <p className="text-sm text-slate-600">
                  The challenge is not a lack of information, but extracting
                  actionable guidance from massive daily streams of job postings,
                  skill matrices, course catalogues, and industry trends.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-2">
                      Stage 01 · Unstructured Inputs
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-3">
                      Massive Volume of Data
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      <li>• Thousands of live job postings</li>
                      <li>• Shifting technical skill requirements</li>
                      <li>• Sprawling university &amp; online course catalogues</li>
                      <li>• Rapidly evolving industry trends</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
                    High Dimensionality &amp; Variety
                  </div>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-amber-800 mb-2">
                      Stage 02 · Bottleneck
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Information Overload</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Without a structured analytical framework, students cannot
                      synthesize noisy market signals against their own CGPA,
                      skills, and personal interests—resulting in paralysis and
                      suboptimal course choices.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200 text-xs font-mono text-amber-800">
                    Unfiltered Signals → Confusion
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-emerald-800 mb-2">
                      Stage 03 · CGS Solution
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-3">
                      Structured Insights Driving Growth
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Personalized Career Paths</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Explicit Skill Gap Insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Confident, Better Decisions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Higher Graduate Employability</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-200 text-xs font-mono text-emerald-800">
                    RF + Cosine Similarity Output
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
