import { useState, useEffect, useRef } from 'react';
import type { Job, StageId, Interview, InterviewStatus } from '@/types/job';
import { STAGES } from '@/types/stage';
import { fmtDate, daysAgo } from '@/utils/date';
import { useUpdateJob, type UpdateJobPayload } from '@/features/jobs/queries/useUpdateJob';
import { useCreateInterview } from '@/features/interviews/queries/useCreateInterview';
import { useUpdateInterview } from '@/features/interviews/queries/useUpdateInterview';
import { useDeleteInterview } from '@/features/interviews/queries/useDeleteInterview';
import CompanyLogo from '@/components/CompanyLogo';
import StagePill from '@/components/StagePill';
import Icon from '@/components/Icon';
import Meta from './Meta';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
}

type Tab = 'overview' | 'interviews' | 'activity';

const interviewStatusMap = {
  passed:   { color: '#10B981', bg: '#D1FAE5', label: 'Đã qua' },
  failed:   { color: '#EF4444', bg: '#FEE2E2', label: 'Không qua' },
  upcoming: { color: '#EAB308', bg: '#FEF3C7', label: 'Sắp diễn ra' },
};

const EDIT_FIELD_LABELS: Record<string, string> = {
  title:    'Tiêu đề vị trí',
  company:  'Công ty',
  location: 'Hình thức làm việc',
  salary:   'Mức lương',
  source:   'Nguồn',
  jdLink:   'Link JD',
};

export default function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const [tab, setTab]           = useState<Tab>('overview');
  const [noteEdit, setNoteEdit] = useState(false);
  const [noteVal, setNoteVal]   = useState(job?.note ?? '');
  const [editMode, setEditMode] = useState(false);
  const [editVals, setEditVals] = useState({
    title:    '',
    company:  '',
    location: '',
    salary:   '',
    source:   '',
    jdLink:   '',
    note:     '',
  });

  const updateJob = useUpdateJob();
  const createInterview = useCreateInterview();
  const updateInterview = useUpdateInterview();
  const deleteInterview = useDeleteInterview();
  const backdropDown = useRef(false);

  const [ivForm, setIvForm] = useState({
    open: false,
    editingId: null as string | null,
    round: '',
    date: '',
    notes: '',
    status: 'upcoming' as InterviewStatus,
  });

  const openCreate = () =>
    setIvForm({ open: true, editingId: null, round: '', date: '', notes: '', status: 'upcoming' });

  const openEdit = (iv: Interview) =>
    setIvForm({ open: true, editingId: iv.id, round: iv.round, date: iv.date.slice(0, 10), notes: iv.notes ?? '', status: iv.status });

  const closeIvForm = () =>
    setIvForm((f) => ({ ...f, open: false, editingId: null }));

  const submitIvForm = () => {
    const scheduledAt = `${ivForm.date}T00:00:00Z`;
    if (ivForm.editingId) {
      updateInterview.mutate(
        { id: ivForm.editingId, scheduledAt, round: ivForm.round, notes: ivForm.notes || undefined, status: ivForm.status },
        { onSuccess: closeIvForm },
      );
    } else {
      createInterview.mutate(
        { jobId: job?.id ?? '', scheduledAt, round: ivForm.round, notes: ivForm.notes || undefined },
        { onSuccess: closeIvForm },
      );
    }
  };

  const ivPending = createInterview.isPending || updateInterview.isPending;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editMode) { setEditMode(false); return; }
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, editMode]);

  if (!job) return null;

  const buildPayload = (overrides: Partial<UpdateJobPayload> = {}): UpdateJobPayload => ({
    id:       job.id,
    title:    job.title,
    company:  job.company,
    location: job.location,
    salary:   job.salary,
    url:      job.jdLink,
    note:     job.note,
    source:   job.source,
    status:   job.stage,
    ...overrides,
  });

  const saveNote = () => {
    updateJob.mutate(buildPayload({ note: noteVal }), {
      onSuccess: () => setNoteEdit(false),
    });
  };

  const startEdit = () => {
    setEditVals({
      title:    job.title,
      company:  job.company,
      location: job.location ?? '',
      salary:   job.salary ?? '',
      source:   job.source ?? '',
      jdLink:   job.jdLink ?? '',
      note:     job.note ?? '',
    });
    setNoteEdit(false);
    setEditMode(true);
  };

  const cancelEdit = () => setEditMode(false);

  const saveEdit = () => {
    updateJob.mutate(
      buildPayload({
        title:    editVals.title,
        company:  editVals.company,
        location: editVals.location || undefined,
        salary:   editVals.salary || undefined,
        source:   editVals.source || undefined,
        url:      editVals.jdLink || undefined,
        note:     editVals.note || undefined,
      }),
      { onSuccess: () => setEditMode(false) },
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview',   label: 'Tổng quan' },
    { id: 'interviews', label: `Phỏng vấn (${job.interviews.length})` },
    { id: 'activity',   label: 'Hoạt động' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: 'fadeIn 150ms ease-out' }}
    >
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onMouseDown={() => { backdropDown.current = true; }}
        onMouseUp={() => { if (backdropDown.current) onClose(); backdropDown.current = false; }}
      />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[860px] max-w-[94vw] max-h-[88vh] flex flex-col overflow-hidden"
        onMouseDown={() => { backdropDown.current = false; }}
        style={{ animation: 'slideUp 200ms cubic-bezier(.2,.8,.2,1)' }}
      >
        <div className="px-7 pt-6 pb-4 border-b border-stone-100 flex items-start gap-4">
          <CompanyLogo company={job.company} size={56} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] font-medium text-stone-500">{job.company}</span>
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

        <div className="px-7 border-b border-stone-100 flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-3 text-[13px] font-medium transition relative ${tab === t.id ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5">

          {tab === 'overview' && editMode && (
            <div className="grid grid-cols-2 gap-4">
              {(['title', 'company', 'location', 'salary', 'source', 'jdLink'] as const).map((key) => (
                <div key={key}>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                    {EDIT_FIELD_LABELS[key]}
                  </label>
                  <input
                    value={editVals[key]}
                    onChange={(e) => setEditVals((v) => ({ ...v, [key]: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-[13px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Ghi chú</label>
                <textarea
                  value={editVals.note}
                  onChange={(e) => setEditVals((v) => ({ ...v, note: e.target.value }))}
                  rows={4}
                  className="w-full px-3.5 py-3 rounded-lg border border-stone-200 text-[13px] text-stone-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300"
                />
              </div>
            </div>
          )}

          {tab === 'overview' && !editMode && (
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
                        <button
                          onClick={saveNote}
                          disabled={updateJob.isPending}
                          className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-white bg-primary disabled:opacity-50"
                        >
                          {updateJob.isPending ? 'Đang lưu…' : 'Lưu'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-3.5 rounded-lg bg-stone-50 border border-stone-100 text-[13px] text-stone-700 leading-relaxed whitespace-pre-wrap">
                      {job.note ?? <span className="text-stone-400 italic">Chưa có ghi chú. Bấm Chỉnh sửa để thêm.</span>}
                    </div>
                  )}
                </div>

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

              <div className="space-y-4">
                <Meta label="Giai đoạn"      value={<StagePill stageId={job.stage} />} />
                <Meta label="Ngày ứng tuyển" value={job.appliedAt ? `${fmtDate(job.appliedAt)} · ${daysAgo(job.appliedAt)}` : '—'} />
                <Meta label="Nguồn"          value={job.source ?? '—'} />
                <Meta label="Mức lương"      value={job.salary ?? '—'} />
                <Meta label="Hình thức làm việc" value={job.location} />
              </div>
            </div>
          )}

          {tab === 'interviews' && (
            <div className="space-y-3">
              {job.interviews.length === 0 && !ivForm.open && (
                <div className="text-center py-12 text-stone-400 text-[13px]">Chưa có buổi phỏng vấn nào.</div>
              )}
              {job.interviews.map((iv, idx) => {
                const s = interviewStatusMap[iv.status];
                return (
                  <div key={iv.id} className="flex gap-4 p-4 rounded-xl border border-stone-200/70 bg-white">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                        <Icon name={iv.status === 'upcoming' ? 'clock' : iv.status === 'failed' ? 'x' : 'check'} size={14} />
                      </div>
                      {idx < job.interviews.length - 1 && <div className="w-px flex-1 bg-stone-200 mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] font-semibold text-stone-900">{iv.round}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                          <button
                            onClick={() => openEdit(iv)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                          >
                            <Icon name="note" size={12} />
                          </button>
                          <button
                            onClick={() => deleteInterview.mutate(iv.id)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Icon name="x" size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-[12px] text-stone-500 mb-2">
                        {iv.date && <span className="inline-flex items-center gap-1"><Icon name="cal" size={11} />{fmtDate(iv.date)}</span>}
                      </div>
                      {iv.notes && <p className="text-[13px] text-stone-700 leading-relaxed">{iv.notes}</p>}
                    </div>
                  </div>
                );
              })}

              {ivForm.open ? (
                <div className="p-4 rounded-xl border border-stone-300 bg-stone-50 space-y-3">
                  <h4 className="text-[12px] font-semibold uppercase tracking-wider text-stone-500">
                    {ivForm.editingId ? 'Chỉnh sửa vòng phỏng vấn' : 'Thêm vòng phỏng vấn'}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Tên vòng</label>
                      <input
                        value={ivForm.round}
                        onChange={(e) => setIvForm((f) => ({ ...f, round: e.target.value }))}
                        placeholder="Vd: Vòng kỹ thuật"
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 text-[13px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Ngày</label>
                      <input
                        type="date"
                        value={ivForm.date}
                        onChange={(e) => setIvForm((f) => ({ ...f, date: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 text-[13px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300 bg-white"
                      />
                    </div>
                    {ivForm.editingId && (
                      <div>
                        <label className="block text-[11px] font-medium text-stone-500 mb-1">Kết quả</label>
                        <select
                          value={ivForm.status}
                          onChange={(e) => setIvForm((f) => ({ ...f, status: e.target.value as InterviewStatus }))}
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-[13px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300/40 bg-white"
                        >
                          <option value="upcoming">Sắp diễn ra</option>
                          <option value="passed">Đã qua</option>
                          <option value="failed">Không qua</option>
                        </select>
                      </div>
                    )}
                    <div className={ivForm.editingId ? '' : 'col-span-2'}>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Ghi chú</label>
                      <input
                        value={ivForm.notes}
                        onChange={(e) => setIvForm((f) => ({ ...f, notes: e.target.value }))}
                        placeholder="Tuỳ chọn"
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 text-[13px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={closeIvForm} className="px-3 py-1.5 rounded-md text-[12px] text-stone-600 hover:bg-stone-200">
                      Huỷ
                    </button>
                    <button
                      onClick={submitIvForm}
                      disabled={ivPending || !ivForm.round || !ivForm.date}
                      className="px-4 py-1.5 rounded-md text-[12px] font-semibold text-white bg-primary disabled:opacity-50"
                    >
                      {ivPending ? 'Đang lưu…' : 'Lưu'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={openCreate}
                  className="w-full py-3 rounded-xl border border-dashed border-stone-300 text-stone-500 text-[12px] font-medium hover:bg-stone-50 transition flex items-center justify-center gap-1.5"
                >
                  <Icon name="plus" size={12} />Thêm vòng phỏng vấn
                </button>
              )}
            </div>
          )}

          {tab === 'activity' && (
            <div className="space-y-3">
              {[
                { d: new Date().toISOString().slice(0, 10), t: 'Bạn đã mở đơn ứng tuyển này' },
                ...job.interviews.map((iv) => ({
                  d: iv.date,
                  t: `${iv.round} — ${{ passed: 'đã qua', failed: 'không qua', upcoming: 'sắp diễn ra' }[iv.status]}`,
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

        <div className="px-7 py-3.5 border-t border-stone-100 bg-stone-50/40 flex items-center justify-between">
          {editMode ? (
            <>
              <button
                onClick={cancelEdit}
                className="px-3 py-1.5 rounded-md text-[12px] text-stone-600 hover:bg-stone-100"
              >
                Huỷ
              </button>
              <button
                onClick={saveEdit}
                disabled={updateJob.isPending}
                className="px-4 py-1.5 rounded-md text-[12px] font-semibold text-white bg-primary disabled:opacity-50"
              >
                {updateJob.isPending ? 'Đang lưu…' : 'Lưu thay đổi'}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={job.stage}
                    onChange={(e) => updateJob.mutate(buildPayload({ status: e.target.value as StageId }))}
                    className="appearance-none pl-2.5 pr-8 py-1.5 rounded-md bg-white border border-stone-200 text-[12px] font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300/40"
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id}>Chuyển sang {s.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <Icon name="chevD" size={12} className="text-stone-500" />
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-md border border-stone-200 text-[12px] text-stone-600 hover:bg-stone-100">Lưu trữ</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={startEdit} className="px-3 py-1.5 rounded-md border border-stone-200 text-[12px] text-stone-600 hover:bg-stone-100">
                  Chỉnh sửa
                </button>
                <button onClick={onClose} className="px-4 py-1.5 rounded-md text-[12px] font-semibold text-white bg-primary">
                  Xong
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
