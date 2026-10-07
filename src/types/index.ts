export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface TechGroup {
  title: string;
  description: string;
  items: string[];
  accent: string;
}

export interface ArchNode {
  id: string;
  layer: string;
  detail: string;
  tech: string[];
  icon: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
  repos?: string[];
}

export type ProjectId = "teiwill" | "teicraft" | "pnuel" | "kycinsight";

export interface Project {
  id: ProjectId;
  index: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  capabilities: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  accent: string;
  pattern: "estate" | "market" | "realestate" | "kyc";
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface CaseStudy {
  projectId: ProjectId;
  problem: CaseStudySection;
  solution: CaseStudySection;
  role: CaseStudySection;
  frontend: CaseStudySection;
  backend: CaseStudySection;
  database: CaseStudySection;
  security: CaseStudySection;
  integrations: CaseStudySection;
  challenges: { title: string; detail: string }[];
  outcome: CaseStudySection;
  roles?: string[];
}

export interface WorkflowStep {
  index: string;
  title: string;
  description: string;
}
