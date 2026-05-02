type IconName =
  | 'search' | 'plus' | 'bell' | 'settings' | 'map' | 'cal' | 'cash'
  | 'link' | 'note' | 'chevR' | 'chevL' | 'chevD' | 'x' | 'grid' | 'list'
  | 'table' | 'filter' | 'dot3' | 'briefcase' | 'trend' | 'user' | 'check'
  | 'clock' | 'archive' | 'home' | 'flag' | 'star' | 'inbox' | 'chart';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const paths: Record<IconName, React.ReactNode> = {
  search:    <path d="M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z"/>,
  plus:      <path d="M12 5v14M5 12h14"/>,
  bell:      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>,
  settings:  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>,
  map:       <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></>,
  cal:       <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  cash:      <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></>,
  link:      <><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/></>,
  note:      <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
  chevR:     <path d="M9 18l6-6-6-6"/>,
  chevL:     <path d="M15 18l-6-6 6-6"/>,
  chevD:     <path d="M6 9l6 6 6-6"/>,
  x:         <path d="M18 6L6 18M6 6l12 12"/>,
  grid:      <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  list:      <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>,
  table:     <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></>,
  filter:    <path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>,
  dot3:      <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,
  trend:     <><path d="M22 7l-8.5 8.5L9 11l-7 7"/><path d="M16 7h6v6"/></>,
  user:      <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
  check:     <path d="M20 6L9 17l-5-5"/>,
  clock:     <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  archive:   <><rect x="2" y="4" width="20" height="5" rx="1"/><path d="M4 9v10a2 2 0 002 2h12a2 2 0 002-2V9M10 13h4"/></>,
  home:      <><path d="M3 11l9-8 9 8M5 9v11h5v-6h4v6h5V9"/></>,
  flag:      <><path d="M4 22V4M4 4h12l-2 4 2 4H4"/></>,
  star:      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>,
  inbox:     <><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></>,
  chart:     <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></>,
};

export default function Icon({ name, size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
