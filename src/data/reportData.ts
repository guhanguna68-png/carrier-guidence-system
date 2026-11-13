export type SkillKey =
  | 'mathStats'
  | 'pythonData'
  | 'codingAlgorithms'
  | 'networksSecurity'
  | 'communicationLeadership'
  | 'designStorytelling';

export type InterestDomainId =
  | 'data-science'
  | 'software-dev'
  | 'cloud-security'
  | 'management-creative';

export interface SkillDimension {
  key: SkillKey;
  label: string;
  shortLabel: string;
  description: string;
  medianImputationValue: number;
}

export interface CareerDomainSpec {
  id: InterestDomainId;
  name: string;
  shortName: string;
  targetRoles: string[];
  summary: string;
  strategicRecommendation: string;
  recommendedModules: string[];
  requiredVector: Record<SkillKey, number>;
  minRecommendedCgpa: number;
}

export interface StudentPreset {
  id: string;
  name: string;
  subtitle: string;
  skills: Record<SkillKey, number | null>;
  primaryInterest: InterestDomainId;
  cgpa: number;
  courseInterestLevel: 'High' | 'Moderate' | 'Low';
  careerGoalClarity: 'Clear' | 'Exploring' | 'Undecided';
}

export const SKILL_DIMENSIONS: SkillDimension[] = [
  {
    key: 'mathStats',
    label: 'Mathematics & Statistics',
    shortLabel: 'Math & Stats',
    description: 'Linear algebra, probability distributions, and statistical inference',
    medianImputationValue: 6.5,
  },
  {
    key: 'pythonData',
    label: 'Python & Data Modeling',
    shortLabel: 'Python & ML',
    description: 'Pandas, NumPy, exploratory analysis, and predictive modeling',
    medianImputationValue: 6.0,
  },
  {
    key: 'codingAlgorithms',
    label: 'Coding & Problem Solving',
    shortLabel: 'Algorithms & Dev',
    description: 'Data structures, algorithms, backend logic, and full-stack engineering',
    medianImputationValue: 6.5,
  },
  {
    key: 'networksSecurity',
    label: 'Networks & Cloud Security',
    shortLabel: 'Cloud & Security',
    description: 'Cloud infrastructure, network protocols, Linux, and system hardening',
    medianImputationValue: 5.5,
  },
  {
    key: 'communicationLeadership',
    label: 'Communication & Leadership',
    shortLabel: 'Leadership',
    description: 'Stakeholder alignment, business analysis, and team coordination',
    medianImputationValue: 6.5,
  },
  {
    key: 'designStorytelling',
    label: 'Design & Storytelling',
    shortLabel: 'UI/UX & Design',
    description: 'UI/UX design, visual communication, and user-centered narratives',
    medianImputationValue: 6.0,
  },
];

export const CAREER_DOMAINS: CareerDomainSpec[] = [
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    shortName: 'Data Science',
    targetRoles: ['Data Analyst', 'ML Engineer'],
    summary:
      'Suited for students with strong mathematics, statistics, and programming capabilities focused on extracting actionable insights from data.',
    strategicRecommendation:
      'Recommend Python, statistics and machine learning courses with real-world dataset projects.',
    recommendedModules: [
      'Exploratory Data Analysis with Pandas & NumPy',
      'Supervised Learning: Random Forest & Ensemble Methods',
      'Applied Statistics & Feature Engineering Labs',
    ],
    requiredVector: {
      mathStats: 8.5,
      pythonData: 9.0,
      codingAlgorithms: 7.0,
      networksSecurity: 4.5,
      communicationLeadership: 6.0,
      designStorytelling: 5.0,
    },
    minRecommendedCgpa: 7.5,
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    shortName: 'Software Dev',
    targetRoles: ['Software Developer', 'Full-Stack Developer'],
    summary:
      'Ideal for students demonstrating strong coding, algorithmic problem solving, and end-to-end application engineering proficiency.',
    strategicRecommendation:
      'Recommend data structures and web development practice with coding challenges.',
    recommendedModules: [
      'Data Structures & Algorithmic Problem Solving',
      'Full-Stack Web Architecture & REST API Design',
      'Automated Testing & Production Deployment Workflows',
    ],
    requiredVector: {
      mathStats: 6.5,
      pythonData: 6.5,
      codingAlgorithms: 9.2,
      networksSecurity: 6.0,
      communicationLeadership: 6.0,
      designStorytelling: 5.5,
    },
    minRecommendedCgpa: 7.2,
  },
  {
    id: 'cloud-security',
    name: 'Cloud & Cybersecurity',
    shortName: 'Cloud & Security',
    targetRoles: ['Cloud Engineer', 'Security Analyst'],
    summary:
      'Tailored for students interested in computer networks, distributed infrastructure, system reliability, and defensive security.',
    strategicRecommendation:
      'Recommend networking, cloud and security certifications with hands-on lab practice.',
    recommendedModules: [
      'Network Protocols, Firewalls & Threat Modeling',
      'Cloud Infrastructure & Identity Access Management Labs',
      'Security Operations & Vulnerability Assessment Practicum',
    ],
    requiredVector: {
      mathStats: 6.0,
      pythonData: 5.5,
      codingAlgorithms: 6.8,
      networksSecurity: 9.2,
      communicationLeadership: 6.0,
      designStorytelling: 4.0,
    },
    minRecommendedCgpa: 7.0,
  },
  {
    id: 'management-creative',
    name: 'Management & Creative Roles',
    shortName: 'Management & Creative',
    targetRoles: ['Business Analyst', 'UI/UX Designer'],
    summary:
      'Designed for students excelling in communication, leadership, user empathy, and visual or strategic storytelling.',
    strategicRecommendation:
      'Recommend communication, leadership and design-tool training with team projects.',
    recommendedModules: [
      'UI/UX Prototyping, Wireframing & Usability Testing',
      'Business Intelligence & Stakeholder Storytelling',
      'Agile Product Leadership & Cross-Functional Team Studio',
    ],
    requiredVector: {
      mathStats: 5.0,
      pythonData: 4.0,
      codingAlgorithms: 4.5,
      networksSecurity: 3.5,
      communicationLeadership: 9.0,
      designStorytelling: 9.0,
    },
    minRecommendedCgpa: 7.0,
  },
];

export const STUDENT_PRESETS: StudentPreset[] = [
  {
    id: 'analytical',
    name: 'Analytical Student',
    subtitle: 'Strong in math, logic & data modeling',
    skills: {
      mathStats: 8.8,
      pythonData: 8.5,
      codingAlgorithms: 7.4,
      networksSecurity: 4.5,
      communicationLeadership: 5.8,
      designStorytelling: 4.2,
    },
    primaryInterest: 'data-science',
    cgpa: 8.6,
    courseInterestLevel: 'High',
    careerGoalClarity: 'Clear',
  },
  {
    id: 'builder',
    name: 'Full-Stack Builder',
    subtitle: 'Strong coding & algorithmic problem solving',
    skills: {
      mathStats: 6.8,
      pythonData: 6.5,
      codingAlgorithms: 9.0,
      networksSecurity: 6.2,
      communicationLeadership: 6.5,
      designStorytelling: 5.8,
    },
    primaryInterest: 'software-dev',
    cgpa: 8.2,
    courseInterestLevel: 'High',
    careerGoalClarity: 'Clear',
  },
  {
    id: 'creative',
    name: 'Creative Student',
    subtitle: 'Strong communication, design & storytelling',
    skills: {
      mathStats: 5.0,
      pythonData: 3.8,
      codingAlgorithms: 4.5,
      networksSecurity: 3.5,
      communicationLeadership: 8.8,
      designStorytelling: 9.1,
    },
    primaryInterest: 'management-creative',
    cgpa: 8.0,
    courseInterestLevel: 'High',
    careerGoalClarity: 'Exploring',
  },
  {
    id: 'warning-signs',
    name: 'Undecided Final-Year',
    subtitle: 'Missing scores & early confusion signals',
    skills: {
      mathStats: 4.8,
      pythonData: null,
      codingAlgorithms: 5.1,
      networksSecurity: null,
      communicationLeadership: 6.0,
      designStorytelling: 5.2,
    },
    primaryInterest: 'cloud-security',
    cgpa: 5.9,
    courseInterestLevel: 'Low',
    careerGoalClarity: 'Undecided',
  },
];

export const SYSTEM_INFO = {
  title: 'AI-Based Career Guidance System',
  tagline: 'Student Profiling · Random Forest · Cosine Similarity',
};

export const OBJECTIVES_LIST = [
  'Perform exploratory data analysis on student academic, skill, and interest data to understand career readiness trends.',
  'Build a structured student profile that quantifies readiness across distinct career domains.',
  'Apply Random Forest classification and Cosine Similarity matching to recommend suitable careers and identify skill gaps.',
];

export const SDG_MAPPING = [
  {
    number: 8,
    title: 'Decent Work and Economic Growth',
    colorHex: '#A21942',
    outcome:
      'Accurate, continuously improving predictions help organizations plan better, reduce losses and raise economic productivity.',
  },
  {
    number: 9,
    title: 'Industry, Innovation, and Infrastructure',
    colorHex: '#FD6925',
    outcome:
      'Self-learning models that update themselves from new data drive technological innovation in industry and data infrastructure.',
  },
  {
    number: 12,
    title: 'Responsible Consumption and Production',
    colorHex: '#BF8B2E',
    outcome:
      'Better demand and failure forecasts reduce overproduction, waste and unnecessary use of resources.',
  },
];

export const ABBREVIATIONS = [
  { abbr: 'AI', description: 'Artificial Intelligence' },
  { abbr: 'ML', description: 'Machine Learning' },
  { abbr: 'CGS', description: 'Career Guidance System' },
  { abbr: 'SP', description: 'Student Profile' },
  { abbr: 'RF', description: 'Random Forest' },
  { abbr: 'CS', description: 'Cosine Similarity' },
  { abbr: 'SGA', description: 'Skill Gap Analysis' },
  { abbr: 'NLP', description: 'Natural Language Processing' },
  { abbr: 'EDA', description: 'Exploratory Data Analysis' },
  { abbr: 'RS', description: 'Recommendation System' },
  { abbr: 'TF-IDF', description: 'Term Frequency – Inverse Document Frequency' },
  { abbr: 'CP', description: 'Career Path' },
  { abbr: 'BI', description: 'Business Intelligence' },
  { abbr: 'DL', description: 'Deep Learning' },
];

export const REFERENCES_LIST = [
  'Breiman, L. (2001). Random Forests, Machine Learning, Vol. 45, No. 1, pp. 5–32.',
  'Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python, Journal of Machine Learning Research, Vol. 12, pp. 2825–2830.',
  'United Nations (2015). The 2030 Agenda for Sustainable Development, UN Publishing, pp. 1–40.',
  'Hastie, T., Tibshirani, R. and Friedman, J. (2009). The Elements of Statistical Learning, 2nd edn, Springer, New York.',
  'McKinney, W. (2010). Data Structures for Statistical Computing in Python, Proceedings of the 9th Python in Science Conference, pp. 56–61.',
  'Harris, C. R. et al. (2020). Array Programming with NumPy, Nature, Vol. 585, pp. 357–362.',
  'Salton, G. and Buckley, C. (1988). Term-weighting Approaches in Automatic Text Retrieval, Information Processing & Management, Vol. 24, No. 5, pp. 513–523.',
  'Ricci, F., Rokach, L. and Shapira, B. (2015). Recommender Systems Handbook, 2nd edn, Springer, Boston, MA.',
  'Aggarwal, C. C. (2016). Recommender Systems: The Textbook, Springer, Cham.',
  'Géron, A. (2019). Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow, 2nd edn, O’Reilly Media, Sebastopol, CA.',
  'Han, J., Kamber, M. and Pei, J. (2012). Data Mining: Concepts and Techniques, 3rd edn, Morgan Kaufmann, Waltham, MA.',
  'Provost, F. and Fawcett, T. (2013). Data Science for Business, O’Reilly Media, Sebastopol, CA.',
  'Salton, G. and McGill, M. J. (1983). Introduction to Modern Information Retrieval, McGraw-Hill, New York.',
];
