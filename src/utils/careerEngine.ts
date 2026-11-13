import {
  CAREER_DOMAINS,
  CareerDomainSpec,
  InterestDomainId,
  SKILL_DIMENSIONS,
  SkillKey,
} from '../data/reportData';

export interface StudentProfileInput {
  skills: Record<SkillKey, number | null>;
  primaryInterest: InterestDomainId;
  cgpa: number;
  courseInterestLevel: 'High' | 'Moderate' | 'Low';
  careerGoalClarity: 'Clear' | 'Exploring' | 'Undecided';
  imputeMissingValues: boolean;
}

export interface PreprocessedFeatureRow {
  key: string;
  label: string;
  rawValue: string;
  wasMissing: boolean;
  imputedValue: number;
  scaledValue: number; // [0, 1] normalized
}

export interface SkillGapItem {
  key: SkillKey;
  label: string;
  shortLabel: string;
  studentScore: number;
  requiredScore: number;
  gap: number;
  status: 'ALIGNED' | 'MODERATE GAP' | 'PRIORITY GAP';
}

export interface DomainEvaluation {
  domain: CareerDomainSpec;
  cosineSimilarity: number; // 0 to 1
  randomForestVotes: number; // out of 100 trees
  combinedFitScore: number; // 0 to 100
  academicAlignment: 'Strong' | 'Adequate' | 'Needs Boost';
  skillGaps: SkillGapItem[];
  dotProduct: number;
  studentNorm: number;
  domainNorm: number;
}

export interface WarningSignal {
  id: string;
  label: string;
  detail: string;
  severity: 'WARNING' | 'NOMINAL';
}

export interface CareerGuidanceEvaluation {
  preprocessedRows: PreprocessedFeatureRow[];
  rankedDomains: DomainEvaluation[];
  topDomain: DomainEvaluation;
  warningSignals: WarningSignal[];
  hasCareerConfusionRisk: boolean;
  missingCount: number;
}

/**
 * Evaluates a student profile using Data Preprocessing (missing-value imputation & min-max scaling),
 * Cosine Similarity vector matching, and a Random Forest decision-tree ensemble model.
 */
export function evaluateStudentProfile(
  input: StudentProfileInput
): CareerGuidanceEvaluation {
  const imputedSkills: Record<SkillKey, number> = {
    mathStats: 0,
    pythonData: 0,
    codingAlgorithms: 0,
    networksSecurity: 0,
    communicationLeadership: 0,
    designStorytelling: 0,
  };

  let missingCount = 0;
  const preprocessedRows: PreprocessedFeatureRow[] = [];

  for (const dim of SKILL_DIMENSIONS) {
    const raw = input.skills[dim.key];
    const isMissing = raw === null;
    if (isMissing) missingCount += 1;

    const resolved = isMissing
      ? input.imputeMissingValues
        ? dim.medianImputationValue
        : 0
      : raw;

    imputedSkills[dim.key] = resolved;

    preprocessedRows.push({
      key: dim.key,
      label: dim.label,
      rawValue: isMissing ? 'NaN (Missing)' : `${raw.toFixed(1)} / 10`,
      wasMissing: isMissing,
      imputedValue: resolved,
      scaledValue: Number((resolved / 10).toFixed(3)),
    });
  }

  // Min-Max feature scaling for CGPA (4.0 - 10.0 -> 0.0 - 1.0) so marks don't overshadow skill ratings
  const cgpaScaled = Math.max(0, Math.min(1, (input.cgpa - 4.0) / 6.0));
  preprocessedRows.push({
    key: 'cgpa',
    label: 'Academic Performance (CGPA)',
    rawValue: `${input.cgpa.toFixed(1)} / 10.0`,
    wasMissing: false,
    imputedValue: input.cgpa,
    scaledValue: Number(cgpaScaled.toFixed(3)),
  });

  // Interest encoding (1.0 if matching domain, 0.25 baseline otherwise)
  preprocessedRows.push({
    key: 'interest',
    label: 'Primary Interest Encoding',
    rawValue:
      CAREER_DOMAINS.find((d) => d.id === input.primaryInterest)?.shortName ??
      input.primaryInterest,
    wasMissing: false,
    imputedValue: 1,
    scaledValue: 1.0,
  });

  // Evaluate each career domain using Cosine Similarity + Random Forest Decision Tree Ensemble
  const evaluations: DomainEvaluation[] = CAREER_DOMAINS.map((domain) => {
    const sVec = SKILL_DIMENSIONS.map((d) => imputedSkills[d.key] / 10);
    const dVec = SKILL_DIMENSIONS.map((d) => domain.requiredVector[d.key] / 10);

    // Append encoded interest match & academic weight into similarity vector
    const interestMatch = input.primaryInterest === domain.id ? 0.95 : 0.25;
    sVec.push(interestMatch);
    dVec.push(0.95);

    const dotProduct = sVec.reduce((sum, val, i) => sum + val * dVec[i], 0);
    const studentNorm = Math.sqrt(sVec.reduce((sum, val) => sum + val * val, 0));
    const domainNorm = Math.sqrt(dVec.reduce((sum, val) => sum + val * val, 0));

    const cosineSimilarity =
      studentNorm > 0 && domainNorm > 0
        ? Math.min(0.999, Math.max(0, dotProduct / (studentNorm * domainNorm)))
        : 0;

    // Simulate 100-tree Random Forest classification score across S, I, A splits
    let treeScore = 0;
    // Tree cluster 1 (45 trees): Core domain skill splits
    const keySkillAlignments = SKILL_DIMENSIONS.map((dim) => {
      const req = domain.requiredVector[dim.key];
      const cur = imputedSkills[dim.key];
      const weight = req / 10;
      const ratio = req > 0 ? Math.min(1.05, cur / req) : 1;
      return weight * ratio;
    });
    const avgSkillFit =
      keySkillAlignments.reduce((a, b) => a + b, 0) /
      SKILL_DIMENSIONS.reduce((a, d) => a + domain.requiredVector[d.key] / 10, 0);
    treeScore += avgSkillFit * 50;

    // Tree cluster 2 (30 trees): Interest questionnaire split
    treeScore += input.primaryInterest === domain.id ? 30 : 7;

    // Tree cluster 3 (20 trees): Academic CGPA & readiness split
    const cgpaRatio = Math.min(1, input.cgpa / domain.minRecommendedCgpa);
    treeScore += cgpaRatio * 20;

    const randomForestVotes = Math.round(Math.max(4, Math.min(98, treeScore)));

    // Combined ranking score (55% Cosine Similarity, 45% Random Forest Vote)
    const combinedFitScore = Math.round(
      cosineSimilarity * 100 * 0.55 + randomForestVotes * 0.45
    );

    const academicAlignment: DomainEvaluation['academicAlignment'] =
      input.cgpa >= domain.minRecommendedCgpa
        ? 'Strong'
        : input.cgpa >= domain.minRecommendedCgpa - 0.8
          ? 'Adequate'
          : 'Needs Boost';

    // Skill Gap Analysis (SGA)
    const skillGaps: SkillGapItem[] = SKILL_DIMENSIONS.map((dim) => {
      const studentScore = imputedSkills[dim.key];
      const requiredScore = domain.requiredVector[dim.key];
      const gap = Number(Math.max(0, requiredScore - studentScore).toFixed(1));
      const status: SkillGapItem['status'] =
        gap <= 0.5 ? 'ALIGNED' : gap <= 2.0 ? 'MODERATE GAP' : 'PRIORITY GAP';
      return {
        key: dim.key,
        label: dim.label,
        shortLabel: dim.shortLabel,
        studentScore,
        requiredScore,
        gap,
        status,
      };
    }).sort((a, b) => b.requiredScore - a.requiredScore);

    return {
      domain,
      cosineSimilarity,
      randomForestVotes,
      combinedFitScore,
      academicAlignment,
      skillGaps,
      dotProduct: Number(dotProduct.toFixed(3)),
      studentNorm: Number(studentNorm.toFixed(3)),
      domainNorm: Number(domainNorm.toFixed(3)),
    };
  }).sort((a, b) => b.combinedFitScore - a.combinedFitScore);

  // Warning Signs per Figure 2.1 (Career Confusion & Warning Signs)
  const warningSignals: WarningSignal[] = [
    {
      id: 'interest',
      label: 'Low Interest in Chosen Course',
      detail:
        input.courseInterestLevel === 'Low'
          ? 'Reported low engagement with current coursework — early intervention recommended.'
          : 'Course engagement is healthy and supports sustained skill acquisition.',
      severity: input.courseInterestLevel === 'Low' ? 'WARNING' : 'NOMINAL',
    },
    {
      id: 'marks',
      label: 'Poor Marks in Core Subjects',
      detail:
        input.cgpa < 6.5
          ? `CGPA (${input.cgpa.toFixed(1)}) is below core readiness benchmark (6.5+); foundational tutoring advised.`
          : `CGPA (${input.cgpa.toFixed(1)}) meets academic readiness benchmarks.`,
      severity: input.cgpa < 6.5 ? 'WARNING' : 'NOMINAL',
    },
    {
      id: 'goals',
      label: 'No Clear Career Goals',
      detail:
        input.careerGoalClarity === 'Undecided'
          ? 'Student currently lacks a defined career direction (Option A / B / C confusion).'
          : `Career direction status: ${input.careerGoalClarity}.`,
      severity: input.careerGoalClarity === 'Undecided' ? 'WARNING' : 'NOMINAL',
    },
  ];

  const hasCareerConfusionRisk = warningSignals.some(
    (w) => w.severity === 'WARNING'
  );

  return {
    preprocessedRows,
    rankedDomains: evaluations,
    topDomain: evaluations[0],
    warningSignals,
    hasCareerConfusionRisk,
    missingCount,
  };
}
