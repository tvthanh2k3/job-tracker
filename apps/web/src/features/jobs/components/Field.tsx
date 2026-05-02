import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export default function Field({ label, required, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 inline-block">
        {label}
        {required && <span className="ml-0.5" style={{ color: '#3B82F6' }}>*</span>}
      </span>
      {children}
    </label>
  );
}
