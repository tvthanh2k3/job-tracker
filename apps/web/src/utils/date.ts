export function fmtDate(iso: string | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' });
}

export function daysAgo(iso: string | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'hôm nay';
  if (diff === 1) return 'hôm qua';
  if (diff < 7) return `${diff} ngày trước`;
  if (diff < 30) return `${Math.round(diff / 7)} tuần trước`;
  return `${Math.round(diff / 30)} tháng trước`;
}
