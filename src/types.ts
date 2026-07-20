export interface Skill {
  name: string;
  category: 'Technical' | 'Practical' | 'Soft Skills';
  level: number; // 0 to 100
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  category: 'Web Dev' | 'AI & ML' | 'Algorithms' | 'Open Source';
  featured: boolean;
}

export interface EducationTimelineItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  duration: string;
  grade?: string;
  description: string;
  bulletPoints: string[];
  iconType: 'school' | 'college' | 'university' | 'online';
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  category: 'Certification' | 'Award' | 'Hackathon' | 'Milestone';
}

export interface StatItem {
  label: string;
  value: number | string;
  suffix: string;
  description: string;
  iconName: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PersonalData {
  name: string;
  title: string;
  subtitle: string;
  imagePlaceholder: string;
  bio: string;
  subBio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

