export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  location: string;
  availability: string;
  headline: {
    lead: string;
    sub: string;
  };
  supportingText: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export type DataFlowStepId = 'question' | 'data' | 'analysis' | 'model' | 'insight';

export interface DataFlowStep {
  id: DataFlowStepId;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  coordinates: string;
  metricsLabel: string;
  metricsValue: string;
}

export interface ProblemItem {
  id: string;
  category: string;
  title: string;
  description: string;
  audience: 'recruiter' | 'client' | 'both';
  deliverables: string[];
}

export interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  dates: string;
  description: string;
  githubUrl?: string;
  highlights?: string[];
}

export interface EducationTimelineItem {
  period: string;
  degree: string;
  institution: string;
  location?: string;
  statusOrScore: string;
  isPending?: boolean;
  score?: string;
}

export interface SkillWithProjectRef {
  name: string;
  projectRefs?: string[]; // e.g. ['Telco Customer Churn', 'VoltSense AI']
}

export interface StructuredSkillGroup {
  number: string;
  category: string;
  skills: SkillWithProjectRef[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: string;
  focusAreas: string[];
}

export type ProjectFilterCategory = 'all' | 'ml' | 'analysis' | 'apps';

export interface CaseStudyData {
  openingSummary: string;
  section01Problem: {
    title: string;
    description: string;
  };
  section02Data: {
    datasetName: string;
    description: string;
    isSynthetic?: boolean;
    pipeline: [string, string, string]; // Raw records, Prepared features, Model input
  };
  section03Approach: {
    description: string;
    workflowSteps: string[];
    keyMethod: string;
  };
  section04Model: {
    description: string;
    modelsUsed: string[];
  };
  section05Evaluation: {
    concepts: string[];
    note: string;
  };
  section06WhatIBuilt: {
    architectureSteps: string[];
    details: string[];
  };
}

export interface ProjectImageEvidence {
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  filterCategories: ProjectFilterCategory[];
  problemQuestion: string;
  description: string;
  methods: string[];
  githubUrl: string;
  liveDemoUrl: string;
  isFeatured?: boolean;
  evidenceImages: [ProjectImageEvidence, ProjectImageEvidence, ProjectImageEvidence];
  caseStudy: CaseStudyData;
}
