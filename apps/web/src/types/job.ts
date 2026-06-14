export type StageId =
  | 'applied'
  | 'test'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'ghosted';

export type InterviewStatus = 'passed' | 'failed' | 'upcoming';

export interface Interview {
  id: string;
  round: string;
  date: string;
  status: InterviewStatus;
  notes?: string;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  salary?: string;
  appliedAt?: string;
  stage: StageId;
  source?: string;
  jdLink?: string;
  note?: string;
  interviews: Interview[];
}

export const locationLabel: Record<string, string> = {
  Onsite: 'Trực tiếp',
  Hybrid: 'Linh hoạt',
  Remote: 'Từ xa',
};