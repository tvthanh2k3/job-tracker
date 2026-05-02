import { useState } from 'react';
import type { Job, StageId } from '@/types/job';
import { STAGES } from '@/types/stage';
import Icon from '@/components/Icon';
import Field from './Field';

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-stone-200 text-[13px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300/40 focus:border-stone-300';

interface QuickAddProps {
  open: boolean;
  onClose: () => void;
  onCreate: (job: Job) => void;
}

export default function QuickAdd({ open, onClose, onCreate }: QuickAddProps) {
  const [company,  setCompany]  = useState('');
  const [title,    setTitle]    = useState('');
  const [location, setLocation] = useState('');
  const [salary,   setSalary]   = useState('');
  const [stage,    setStage]    = useState<StageId>('applied');
  const [link,     setLink]     = useState('');
  const [note,     setNote]     = useState('');

  if (!open) return null;

  const reset = () => {
    setCompany(''); setTitle(''); setLocation(''); setSalary('');
    setStage('applied'); setLink(''); setNote('');
  };

  const submit = () => {
    if (!company.trim() || !title.trim()) return;
    onCreate({
      id: 'j' + Date.now(),
      company:   company.trim(),
      title:     title.trim(),
      location:  location.trim() || 'Remote',
      salary:    salary.trim(),
      stage,
      appliedAt: stage === 'saved' ? '' : new Date().toISOString().slice(0, 10),
      jdLink:    link.trim(),
      note:      note.trim(),
      source:    'Tự nhập',
      interviews: [],
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[560px] max-w-[94vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 200ms cubic-bezier(.2,.8,.2,1)' }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold tracking-tight text-stone-900">Đơn ứng tuyển mới</h2>
            <p className="text-[12px] text-stone-500 mt-0.5">Nhập thông tin cơ bản — chi tiết có thể bổ sung sau.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500">
            <Icon name="x" size={15} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Công ty" required>
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="VD: Stripe" className={inputCls} />
            </Field>
            <Field label="Vị trí" required>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Kỹ sư Frontend cao cấp" className={inputCls} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Địa điểm">
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote · Mỹ" className={inputCls} />
            </Field>
            <Field label="Mức lương">
              <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="$180k – $240k" className={inputCls} />
            </Field>
          </div>

          <Field label="Giai đoạn">
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStage(s.id)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider transition border ${
                    stage === s.id
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: s.dot }} />
                  {s.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Đường dẫn JD">
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" className={inputCls} />
          </Field>
          <Field label="Ghi chú">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Người giới thiệu, lý do hứng thú, điều cần nhớ…"
              className={inputCls}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-100 bg-stone-50/40 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1.5 rounded-md text-[13px] text-stone-600 hover:bg-stone-100">Huỷ</button>
          <button
            onClick={submit}
            disabled={!company.trim() || !title.trim()}
            className="px-4 py-1.5 rounded-md text-[13px] font-semibold text-white disabled:opacity-50"
            style={{ background: '#3B82F6' }}
          >
            Thêm đơn ứng tuyển
          </button>
        </div>
      </div>
    </div>
  );
}
