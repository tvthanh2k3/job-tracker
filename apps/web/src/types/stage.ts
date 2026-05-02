import type { StageId } from './job';

export type Tone = 'neutral' | 'blue' | 'purple' | 'yellow' | 'green' | 'red' | 'gray';

export interface Stage {
  id: StageId;
  label: string;
  tone: Tone;
  dot: string;
}

export const STAGES: Stage[] = [
  { id: 'saved',     label: 'Quan tâm',       tone: 'neutral', dot: '#9CA3AF' },
  { id: 'applied',   label: 'Đã ứng tuyển',   tone: 'blue',    dot: '#3B82F6' },
  { id: 'phone',     label: 'PV sơ bộ',       tone: 'purple',  dot: '#8B5CF6' },
  { id: 'interview', label: 'Phỏng vấn',      tone: 'yellow',  dot: '#EAB308' },
  { id: 'offer',     label: 'Có offer',       tone: 'green',   dot: '#10B981' },
  { id: 'rejected',  label: 'Bị từ chối',     tone: 'red',     dot: '#EF4444' },
  { id: 'ghosted',   label: 'Không phản hồi', tone: 'gray',    dot: '#9CA3AF' },
];

export const STAGE_BY_ID: Record<StageId, Stage> = Object.fromEntries(
  STAGES.map((s) => [s.id, s]),
) as Record<StageId, Stage>;
