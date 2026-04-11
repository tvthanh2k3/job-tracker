import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import {
  JobFilters,
  type JobFiltersState,
  JobCard,
  JobForm,
  useJobs,
  useCreateJob,
} from '@/features/jobs';

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFiltersState>({
    search: '',
    status: '',
    remoteStatus: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: paginatedJobs, isLoading, isError } = useJobs({
    ...filters,
    status: filters.status || undefined,
    remoteStatus: filters.remoteStatus || undefined,
  });

  const { mutate: createJob, isPending: isCreating } = useCreateJob();

  const handleCreateJob = (data: any) => {
    createJob(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleClearFilters = () => {
    setFilters({ search: '', status: '', remoteStatus: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Jobs</h1>
          <p className="text-muted-foreground mt-1">Quản lý và theo dõi các công việc đã lưu.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Thêm công việc</span>
        </Button>
      </div>

      <JobFilters filters={filters} onChange={setFilters} onClear={handleClearFilters} />

      {isLoading ? (
        <div className="py-24 flex justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="py-12 flex justify-center text-destructive">Đã có lỗi xảy ra tải dữ liệu.</div>
      ) : paginatedJobs?.items.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center bg-card rounded-xl border border-dashed border-border">
          <h3 className="text-lg font-semibold text-foreground mb-1">Không có công việc nào</h3>
          <p className="text-muted-foreground">Thử đổi bộ lọc hoặc thêm một công việc mới.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedJobs?.items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {paginatedJobs && paginatedJobs.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <span className="text-sm text-muted-foreground">Hiển thị phân trang ở đây trong tương lai.</span>
        </div>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm công việc mới"
        size="lg"
      >
        <JobForm
          onSubmit={handleCreateJob}
          isSubmitting={isCreating}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
