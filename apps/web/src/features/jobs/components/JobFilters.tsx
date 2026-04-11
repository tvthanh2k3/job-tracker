import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { JobStatus, RemoteStatus } from '../job.types';

export interface JobFiltersState {
  search: string;
  status: JobStatus | '';
  remoteStatus: RemoteStatus | '';
}

interface JobFiltersProps {
  filters: JobFiltersState;
  onChange: (filters: JobFiltersState) => void;
  onClear: () => void;
}

export function JobFilters({ filters, onChange, onClear }: JobFiltersProps) {
  const hasActiveFilters = filters.search || filters.status || filters.remoteStatus;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center bg-card p-3 rounded-xl border border-border shadow-sm">
      <div className="flex-1 w-full relative">
        <Input 
          placeholder="Search roles, companies..." 
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          leftIcon={<Search className="w-4 h-4" />}
          className="bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-10"
        />
      </div>

      <div className="hidden sm:block w-px h-8 bg-border"></div>

      <div className="grid grid-cols-2 sm:flex items-center gap-3 w-full sm:w-auto">
        <Select
          className="h-10 min-w-[140px]"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as JobStatus | '' })}
          options={[
            { label: 'All Statuses', value: '' },
            { label: 'Wishlist', value: JobStatus.Wishlist },
            { label: 'Applied', value: JobStatus.Applied },
            { label: 'Interview', value: JobStatus.Interview },
            { label: 'Offer', value: JobStatus.Offer },
            { label: 'Rejected', value: JobStatus.Rejected },
          ]}
        />

        <Select
          className="h-10 min-w-[130px]"
          value={filters.remoteStatus}
          onChange={(e) => onChange({ ...filters, remoteStatus: e.target.value as RemoteStatus | '' })}
          options={[
            { label: 'Any Workplace', value: '' },
            { label: 'On-Site', value: RemoteStatus.OnSite },
            { label: 'Remote', value: RemoteStatus.Remote },
            { label: 'Hybrid', value: RemoteStatus.Hybrid },
          ]}
        />
      </div>

      {hasActiveFilters && (
        <>
          <div className="hidden sm:block w-px h-8 bg-border"></div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </>
      )}
    </div>
  );
}
