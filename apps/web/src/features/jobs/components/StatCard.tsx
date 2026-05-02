interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  accent: 'stone' | 'violet' | 'amber' | 'emerald';
}

const accents: Record<string, string> = {
  stone:   '#78716C',
  violet:  '#8B5CF6',
  amber:   '#EAB308',
  emerald: '#10B981',
};

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="col-span-3 rounded-xl bg-white border border-stone-200/70 p-4 relative">
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full" style={{ background: accents[accent] }} />
      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{label}</div>
      <div className="mt-2 text-[28px] font-bold text-stone-900 tracking-tight leading-none">{value}</div>
      <div className="mt-1.5 text-[11px] text-stone-400">{sub}</div>
    </div>
  );
}
