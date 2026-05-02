import { useState, useEffect } from 'react';
import type { Job } from '@/types/job';
import { STAGES } from '@/types/stage';
import { fmtDate, daysAgo } from '@/utils/date';
import CompanyLogo from '@/components/CompanyLogo';
import PriorityFlag from '@/components/PriorityFlag';
import StagePill from '@/components/StagePill';
import Icon from '@/components/Icon';
import Meta from './Meta';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onUpdate: (job: Job) => void;
}

type Tab = 'overview' | 'interviews' | 'activity';

const interviewStatusMap = {
  passed:   { color: '#10B981', bg: '#D1FAE5', label: 'Đã qua' },
  failed:   { color: '#EF4444', bg: '#FEE2E2', label: 'Không qua' },
  upcoming: { color: '#EAB308', bg: '#FEF3C7', label: 'Sắp diễn ra' },
};

export default function JobDetailModal({ job, onClose, onUpdate }: JobDetailModalProps) {
  const [tab, setTab]           = useState<Tab>('overview');
  const [noteEdit, setNoteEdit] = useState(false);
  const [noteVal, setNoteVal]   = useState(job?.note ?? '');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!job) return null;

  const saveNote = () => { onUpdate({ ...job, note: noteVal }); setNoteEdit(false); };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview',   label: 'Tổng quan' },
    { id: 'interviews', label: `Phỏng vấn (${job.interviews.length})` },
    { id: 'activity',   label: 'Hoạt động' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      style={{ animation: 'fadeIn 150ms ease-out' }}
    >
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[860px] max-w-[94vw] max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 200ms cubic-bezier(.2,.8,.2,1)' }}
      >
        {/* Header */}
        <div className="px-7 pt-6 pb-4 border-b border-stone-100 flex items-start gap-4">
          <CompanyLogo company={job.company} size={56} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] font-medium text-stone-500">{job.company}</span>
              <PriorityFlag priority={job.priority} />
            </div>
            <h2 className="text-[22px] font-bold tracking-tight text-stone-900 leading-tight">{job.title}</h2>
            <div className="mt-2 flex items-center gap-2.5 flex-wrap">
              <StagePill stageId={job.stage} />
              <span className="text-[12px] text-stone-400">·</span>
              <span className="text-[12px] text-stone-500 inline-flex items-center gap-1.5">
                <Icon name="map" size={12} />{job.location}
              </span>
              <span className="text-[12px] text-stone-400">·</span>
              <span className="text-[12px] text-stone-500 inline-flex items-center gap-1.5">
                <Icon name="cash" size={12} />{job.salary ?? '—'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 transition">
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-7 border-b border-stone-100 flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-3 text-[13px] font-medium transition relative ${tab === t.id ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full" style={{ background: '#3B82F6' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {tab === 'overview' && (
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2 space-y-5">
                {/* Notes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[12px] font-semibold uppercase tracking-wider text-stone-500">Ghi chú</h3>
                    {!noteEdit && (
                      <button onClick={() => setNoteEdit(true)} className="text-[11px] text-stone-500 hover:text-stone-900 font-medium">
                        Chỉnh sửa
                      </button>
                    )}
                  </div>
                  {noteEdit ? (
                    <div>
                      <textarea
                        value={noteVal}
                        onChange={(e) => setNoteVal(e.target.value)}
                        rows={5}
                        className="w-full px-3.5 py-3 rounded-lg border border-stone-200 text-[13px] text-stone-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300"
                      />
                      <div className="mt-2 flex gap-2 justify-end">
                        <button
                          onClick={() => { setNoteEdit(false); setNoteVal(job.note ?? ''); }}
                          className="px-3 py-1.5 rounded-md text-[12px] text-stone-600 hover:bg-stone-100"
                        >
                          Huỷ
                        </button>
                        <button onClick={saveNote} className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-white" style={{ background: '#3B82F6' }}>
                          Lưu
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-3.5 rounded-lg bg-stone-50 border border-stone-100 text-[13px] text-stone-700 leading-relaxed whitespace-pre-wrap">
                      {job.note ?? <span className="text-stone-400 italic">Chưa có ghi chú. Bấm Chỉnh sửa để thêm.</span>}
                    </div>
                  )}
                </div>

                {/* JD Link */}
                {job.jdLink && (
                  <div>
                    <h3 className="text-[12px] font-semibold uppercase tracking-wider text-stone-500 mb-2">Mô tả công việc</h3>
                    <a
                      href={job.jdLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition text-[13px] text-stone-700 font-medium"
                    >
                      <Icon name="link" size={13} className="text-stone-400" />
                      <span className="truncate max-w-[460px]">{job.jdLink}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <Meta label="Giai đoạn"      value={<StagePill stageId={job.stage} />} />
                <Meta label="Ngày ứng tuyển" value={job.appliedAt ? `${fmtDate(job.appliedAt)} · ${daysAgo(job.appliedAt)}` : '—'} />
                <Meta label="Nguồn"          value={job.source ?? '—'} />
                <Meta label="Mức lương"      value={job.salary ?? '—'} />
                <Meta label="Địa điểm"       value={job.location} />
              </div>
            </div>
          )}

          {tab === 'interviews' && (
            <div className="space-y-3">
              {job.interviews.length === 0 && (
                <div className="text-center py-12 text-stone-400 text-[13px]">Chưa có buổi phỏng vấn nào.</div>
              )}
              {job.interviews.map((iv, idx) => {
                const s = interviewStatusMap[iv.status];
                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-stone-200/70 bg-white">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                        <Icon name={iv.status === 'upcoming' ? 'clock' : iv.status === 'failed' ? 'x' : 'check'} size={14} />
                      </div>
                      {idx < job.interviews.length - 1 && <div className="w-px flex-1 bg-stone-200 mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] font-semibold text-stone-900">{iv.round}</h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                      </div>
                      <div className="text-[12px] text-stone-500 mb-2">
                        {iv.with && <span className="inline-flex items-center gap-1 mr-3"><Icon name="user" size={11} />{iv.with}</span>}
                        {iv.date && <span className="inline-flex items-center gap-1"><Icon name="cal" size={11} />{fmtDate(iv.date)}</span>}
                      </div>
                      {iv.notes && <p className="text-[13px] text-stone-700 leading-relaxed">{iv.notes}</p>}
                    </div>
                  </div>
                );
              })}
              <button className="w-full py-3 rounded-xl border border-dashed border-stone-300 text-stone-500 text-[12px] font-medium hover:bg-stone-50 transition flex items-center justify-center gap-1.5">
                <Icon name="plus" size={12} />Thêm vòng phỏng vấn
              </button>
            </div>
          )}

          {tab === 'activity' && (
            <div className="space-y-3">
              {[
                { d: new Date().toISOString().slice(0, 10), t: 'Bạn đã mở đơn ứng tuyển này' },
                ...job.interviews.map((iv) => ({
                  d: iv.date,
                  t: `${iv.round}${iv.with ? ` với ${iv.with}` : ''} — ${{ passed: 'đã qua', failed: 'không qua', upcoming: 'sắp diễn ra' }[iv.status]}`,
                })),
                job.appliedAt ? { d: job.appliedAt, t: `Đã ứng tuyển qua ${job.source ?? 'không rõ'}` } : null,
              ]
                .filter(Boolean)
                .sort((a, b) => (b!.d ?? '').localeCompare(a!.d ?? ''))
                .map((e, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2" />
                    <div className="flex-1">
                      <div className="text-[13px] text-stone-700">{e!.t}</div>
                      <div className="text-[11px] text-stone-400">{fmtDate(e!.d)}</div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-3.5 border-t border-stone-100 bg-stone-50/40 flex items-center justify-between">
          <select
            value={job.stage}
            onChange={(e) => onUpdate({ ...job, stage: e.target.value as Job['stage'] })}
            className="px-2.5 py-1.5 rounded-md bg-white border border-stone-200 text-[12px] font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300/40"
          >
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>Chuyển sang {s.label}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-md text-[12px] text-stone-600 hover:bg-stone-100">Lưu trữ</button>
            <button onClick={onClose} className="px-4 py-1.5 rounded-md text-[12px] font-semibold text-white" style={{ background: '#3B82F6' }}>
              Xong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
