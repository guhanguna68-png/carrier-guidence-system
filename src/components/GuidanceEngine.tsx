import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react';
import {
  CAREER_DOMAINS,
  InterestDomainId,
  SKILL_DIMENSIONS,
  SkillKey,
  STUDENT_PRESETS,
} from '../data/reportData';
import { evaluateStudentProfile } from '../utils/careerEngine';

export const GuidanceEngine: React.FC = () => {
  const defaultPreset = STUDENT_PRESETS[0];
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [skills, setSkills] = useState<Record<SkillKey, number | null>>(
    defaultPreset.skills
  );
  const [primaryInterest, setPrimaryInterest] = useState<InterestDomainId>(
    defaultPreset.primaryInterest
  );
  const [cgpa, setCgpa] = useState<number>(defaultPreset.cgpa);
  const [courseInterestLevel, setCourseInterestLevel] = useState<
    'High' | 'Moderate' | 'Low'
  >(defaultPreset.courseInterestLevel);
  const [careerGoalClarity, setCareerGoalClarity] = useState<
    'Clear' | 'Exploring' | 'Undecided'
  >(defaultPreset.careerGoalClarity);
  const [imputeMissingValues, setImputeMissingValues] = useState<boolean>(true);
  const [stageTab, setStageTab] = useState<'results' | 'preprocessing'>(
    'results'
  );
  const [inspectedDomainId, setInspectedDomainId] =
    useState<InterestDomainId | null>(null);

  const evaluation = useMemo(
    () =>
      evaluateStudentProfile({
        skills,
        primaryInterest,
        cgpa,
        courseInterestLevel,
        careerGoalClarity,
        imputeMissingValues,
      }),
    [
      skills,
      primaryInterest,
      cgpa,
      courseInterestLevel,
      careerGoalClarity,
      imputeMissingValues,
    ]
  );

  const activeDomainEval = useMemo(() => {
    if (!inspectedDomainId) return evaluation.topDomain;
    return (
      evaluation.rankedDomains.find((d) => d.domain.id === inspectedDomainId) ??
      evaluation.topDomain
    );
  }, [evaluation, inspectedDomainId]);

  const applyPreset = (presetId: string) => {
    const preset = STUDENT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setSkills({ ...preset.skills });
    setPrimaryInterest(preset.primaryInterest);
    setCgpa(preset.cgpa);
    setCourseInterestLevel(preset.courseInterestLevel);
    setCareerGoalClarity(preset.careerGoalClarity);
    setInspectedDomainId(null);
  };

  const handleSkillChange = (key: SkillKey, val: number) => {
    setActivePresetId('custom');
    setSkills((prev) => ({ ...prev, [key]: val }));
  };

  const toggleMissingSkill = (key: SkillKey) => {
    setActivePresetId('custom');
    const dim = SKILL_DIMENSIONS.find((d) => d.key === key);
    setSkills((prev) => ({
      ...prev,
      [key]: prev[key] === null ? (dim?.medianImputationValue ?? 6.0) : null,
    }));
  };

  return (
    <section
      id="engine"
      className="py-16 lg:py-24 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#1E3A8A] mb-2">
              Interactive System Prototype · Chapters 3 &amp; 4
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
              Student Profiling &amp; Career Recommendation Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Adjust Skills (S), Interests (I), and Academic Performance (A) to
              run live data preprocessing, Random Forest ensemble voting,
              Cosine Similarity ranking, and Skill Gap Analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-1">
              Sample Profiles:
            </span>
            {STUDENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activePresetId === preset.id
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => applyPreset(STUDENT_PRESETS[0].id)}
              title="Reset profile to default"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Two-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Control Deck (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1E3A8A]" />
                <h3 className="text-base font-semibold text-slate-900">
                  Student Profile Inputs (S · I · A)
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {evaluation.missingCount > 0
                  ? `${evaluation.missingCount} NaN field(s)`
                  : 'Complete record'}
              </span>
            </div>

            {/* 1. Skills (S) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  1. Skills Vector (S) · 0–10 Scale
                </h4>
                <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={imputeMissingValues}
                    onChange={(e) => setImputeMissingValues(e.target.checked)}
                    className="rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <span>Median Imputation</span>
                </label>
              </div>

              {SKILL_DIMENSIONS.map((dim) => {
                const rawVal = skills[dim.key];
                const isMissing = rawVal === null;
                const sliderVal = isMissing ? dim.medianImputationValue : rawVal;

                return (
                  <div key={dim.key} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <label
                        htmlFor={`skill-${dim.key}`}
                        className="font-medium text-slate-800 truncate"
                      >
                        {dim.label}
                      </label>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleMissingSkill(dim.key)}
                          className={`text-[11px] font-mono px-1.5 py-0.5 rounded border cursor-pointer transition-colors ${
                            isMissing
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
                          }`}
                        >
                          {isMissing ? 'NaN (Simulate Fill)' : 'Set NaN'}
                        </button>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums w-14 text-right">
                          {isMissing
                            ? imputeMissingValues
                              ? `~${dim.medianImputationValue.toFixed(1)}`
                              : '0.0'
                            : `${rawVal.toFixed(1)} / 10`}
                        </span>
                      </div>
                    </div>
                    <input
                      id={`skill-${dim.key}`}
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={sliderVal}
                      disabled={isMissing}
                      onChange={(e) =>
                        handleSkillChange(dim.key, parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A] disabled:opacity-45 disabled:cursor-not-allowed"
                    />
                  </div>
                );
              })}
            </div>

            {/* 2. Interests (I) */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                2. Primary Domain Interest (I)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {CAREER_DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => {
                      setActivePresetId('custom');
                      setPrimaryInterest(domain.id);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                      primaryInterest === domain.id
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {domain.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Academic Performance (A) & Early Warning Indicators */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                3. Academic Performance (A) &amp; Clarity
              </h4>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="cgpa-slider" className="font-medium text-slate-800">
                    Academic CGPA
                  </label>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {cgpa.toFixed(1)} / 10.0 CGPA
                  </span>
                </div>
                <input
                  id="cgpa-slider"
                  type="range"
                  min={4.0}
                  max={10.0}
                  step={0.1}
                  value={cgpa}
                  onChange={(e) => {
                    setActivePresetId('custom');
                    setCgpa(parseFloat(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>4.0</span>
                  <span>6.5 Benchmark</span>
                  <span>10.0</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Course Interest
                  </label>
                  <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
                    {(['High', 'Moderate', 'Low'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setActivePresetId('custom');
                          setCourseInterestLevel(lvl);
                        }}
                        className={`flex-1 py-1.5 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                          courseInterestLevel === lvl
                            ? lvl === 'Low'
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Career Goal Clarity
                  </label>
                  <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
                    {(['Clear', 'Exploring', 'Undecided'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          setActivePresetId('custom');
                          setCareerGoalClarity(g);
                        }}
                        className={`flex-1 py-1.5 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                          careerGoalClarity === g
                            ? g === 'Undecided'
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setStageTab('results')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    stageTab === 'results'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Career Match &amp; Skill Gap
                </button>
                <button
                  type="button"
                  onClick={() => setStageTab('preprocessing')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    stageTab === 'preprocessing'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Data Preprocessing &amp; Math
                </button>
              </div>

              <div className="text-xs text-slate-500 font-mono tabular-nums">
                Model: Random Forest (100 trees) + Cosine Similarity
              </div>
            </div>

            {stageTab === 'results' ? (
              <>
                {/* Early Warning Banner if Fig 2.1 Confusion Signs Detected */}
                {evaluation.hasCareerConfusionRisk && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <div className="text-xs font-semibold uppercase tracking-wide text-red-800">
                          Early Warning Signs Detected (Fig. 2.1 — Career Confusion Risk)
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-900">
                          {evaluation.warningSignals
                            .filter((w) => w.severity === 'WARNING')
                            .map((w) => (
                              <div key={w.id}>
                                <span className="font-semibold">{w.label}:</span>{' '}
                                {w.detail}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Recommendation Summary */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-medium text-[#1E3A8A] mb-1">
                        {activeDomainEval.domain.id === evaluation.topDomain.domain.id
                          ? 'Primary Best-Fit Recommendation'
                          : 'Inspected Career Domain Comparison'}
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-slate-900">
                        {activeDomainEval.domain.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Target Roles:{' '}
                        <span className="font-medium text-slate-900">
                          {activeDomainEval.domain.targetRoles.join(' · ')}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <div className="text-[11px] font-medium text-slate-500">
                          Cosine Similarity
                        </div>
                        <div className="text-2xl font-semibold font-mono text-[#1E3A8A] tabular-nums">
                          {activeDomainEval.cosineSimilarity.toFixed(3)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] font-medium text-slate-500">
                          RF Tree Votes
                        </div>
                        <div className="text-2xl font-semibold font-mono text-slate-900 tabular-nums">
                          {activeDomainEval.randomForestVotes}/100
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All 4 Career Domains Ranked */}
                  <div className="pt-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        Ranked Domain Suitability (Click any domain to inspect its Skill Gap)
                      </span>
                      <span className="font-mono tabular-nums">
                        Combined Fit %
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {evaluation.rankedDomains.map((item, idx) => {
                        const isSelected =
                          item.domain.id === activeDomainEval.domain.id;
                        return (
                          <button
                            key={item.domain.id}
                            type="button"
                            onClick={() => setInspectedDomainId(item.domain.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-white border-[#1E3A8A] shadow-xs'
                                : 'bg-white/70 border-slate-200 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-4 mb-1.5">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                                  0{idx + 1}
                                </span>
                                <span className="text-sm font-semibold text-slate-900 truncate">
                                  {item.domain.name}
                                </span>
                                {idx === 0 && (
                                  <span className="text-[11px] font-medium text-emerald-700 whitespace-nowrap">
                                    · Top Fit
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 font-mono text-xs tabular-nums shrink-0">
                                <span className="text-slate-500 hidden sm:inline">
                                  CS {item.cosineSimilarity.toFixed(2)}
                                </span>
                                <span className="font-semibold text-slate-900">
                                  {item.combinedFitScore}%
                                </span>
                              </div>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  idx === 0 ? 'bg-[#1E3A8A]' : 'bg-slate-400'
                                }`}
                                style={{ width: `${item.combinedFitScore}%` }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Skill Gap Analysis (SGA) Table & Benchmark Bars */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 mb-5">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">
                        Skill Gap Analysis (SGA) — {activeDomainEval.domain.shortName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Compares your current skill vector against industry readiness benchmarks
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-600 shrink-0">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#1E3A8A]" />
                        Your Profile
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-0.5 h-3.5 bg-slate-900" />
                        Target Benchmark
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeDomainEval.skillGaps.map((sg) => {
                      const statusColor =
                        sg.status === 'ALIGNED'
                          ? 'text-emerald-700'
                          : sg.status === 'MODERATE GAP'
                            ? 'text-amber-700'
                            : 'text-red-700';

                      return (
                        <div key={sg.key} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-4 text-xs">
                            <span className="font-medium text-slate-800">
                              {sg.label}
                            </span>
                            <div className="flex items-center gap-3 font-mono tabular-nums shrink-0">
                              <span className="text-slate-600">
                                {sg.studentScore.toFixed(1)} / req{' '}
                                {sg.requiredScore.toFixed(1)}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 font-semibold ${statusColor}`}
                              >
                                {sg.status === 'ALIGNED' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                ) : (
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                )}
                                <span>
                                  {sg.status === 'ALIGNED'
                                    ? 'ALIGNED'
                                    : `${sg.status} (-${sg.gap.toFixed(1)})`}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            {/* Student bar */}
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                sg.status === 'ALIGNED'
                                  ? 'bg-emerald-600'
                                  : sg.status === 'MODERATE GAP'
                                    ? 'bg-amber-500'
                                    : 'bg-red-600'
                              }`}
                              style={{ width: `${(sg.studentScore / 10) * 100}%` }}
                            />
                            {/* Required threshold marker */}
                            <div
                              title={`Required: ${sg.requiredScore}/10`}
                              className="absolute top-0 bottom-0 w-0.5 bg-slate-900"
                              style={{ left: `${(sg.requiredScore / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Strategic Recommendation (Section 4.2) */}
                  <div className="mt-6 pt-5 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                          Actionable Strategy (Chapter 4.2)
                        </div>
                        <p className="text-sm font-medium text-slate-900">
                          {activeDomainEval.domain.strategicRecommendation}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          {activeDomainEval.domain.recommendedModules.map((mod) => (
                            <li
                              key={mod}
                              className="text-xs text-slate-700 bg-[#F8FAFC] border border-slate-200 rounded-lg p-2.5"
                            >
                              {mod}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Data Preprocessing & Cosine Similarity Math Inspector */
              <div className="space-y-6">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    Section 3.3 Data Preprocessing Pipeline (Pandas / NumPy)
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    1) Handling Missing Values via median imputation so incomplete
                    records do not distort the model. 2) Min-Max Feature Scaling
                    into [0.000, 1.000] so CGPA marks do not overshadow skill
                    ratings.
                  </p>

                  <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="py-2.5 px-3 font-semibold">Feature</th>
                          <th className="py-2.5 px-3 font-semibold">Raw Input</th>
                          <th className="py-2.5 px-3 font-semibold">
                            Imputed Value
                          </th>
                          <th className="py-2.5 px-3 font-semibold text-right">
                            Normalized [0–1]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {evaluation.preprocessedRows.map((row) => (
                          <tr key={row.key}>
                            <td className="py-2.5 px-3 font-medium text-slate-900">
                              {row.label}
                            </td>
                            <td className="py-2.5 px-3 font-mono tabular-nums">
                              <span
                                className={
                                  row.wasMissing
                                    ? 'text-amber-700 font-semibold'
                                    : 'text-slate-600'
                                }
                              >
                                {row.rawValue}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                              {row.wasMissing
                                ? imputeMissingValues
                                  ? `${row.imputedValue.toFixed(1)} (Median Fill)`
                                  : '0.0 (Dropped/Zero)'
                                : row.key === 'interest'
                                  ? 'One-Hot / Encoded'
                                  : row.imputedValue.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-mono tabular-nums text-right font-semibold text-[#1E3A8A]">
                              {row.scaledValue.toFixed(3)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cosine Similarity Computation Proof */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    Section 3.2 Cosine Similarity Vector Calculation
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-xs text-slate-800 space-y-2 tabular-nums">
                    <div>
                      cos(θ) = (A · B) / (‖A‖ × ‖B‖)
                    </div>
                    <div className="text-slate-600">
                      Inspected Domain:{' '}
                      <span className="text-slate-900 font-semibold">
                        {activeDomainEval.domain.name}
                      </span>
                    </div>
                    <div>
                      Dot Product (A · B) ={' '}
                      <span className="font-semibold">
                        {activeDomainEval.dotProduct.toFixed(3)}
                      </span>
                      <span className="mx-3 text-slate-300">|</span>
                      ‖A‖ ={' '}
                      <span className="font-semibold">
                        {activeDomainEval.studentNorm.toFixed(3)}
                      </span>
                      <span className="mx-3 text-slate-300">|</span>
                      ‖B‖ ={' '}
                      <span className="font-semibold">
                        {activeDomainEval.domainNorm.toFixed(3)}
                      </span>
                    </div>
                    <div className="pt-1 text-[#1E3A8A] font-semibold">
                      cos(θ) = {activeDomainEval.dotProduct.toFixed(3)} / (
                      {activeDomainEval.studentNorm.toFixed(3)} ×{' '}
                      {activeDomainEval.domainNorm.toFixed(3)}) ={' '}
                      {activeDomainEval.cosineSimilarity.toFixed(3)} (
                      {(activeDomainEval.cosineSimilarity * 100).toFixed(1)}%
                      vector alignment)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
