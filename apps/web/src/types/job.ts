export type StageId =
  | 'saved'
  | 'applied'
  | 'phone'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'ghosted';

export type Priority = 'dream' | 'urgent';

export type InterviewStatus = 'passed' | 'failed' | 'upcoming';

export interface Interview {
  round: string;
  with: string;
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
  priority?: Priority;
  jdLink?: string;
  note?: string;
  interviews: Interview[];
}
