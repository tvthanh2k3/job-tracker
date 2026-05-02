import type { ReactNode } from 'react';

interface MetaProps {
  label: string;
  value: ReactNode;
}

export default function Meta({ label, value }: MetaProps) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">{label}</div>
      <div className="text-[13px] text-stone-800">{value}</div>
    </div>
  );
}
