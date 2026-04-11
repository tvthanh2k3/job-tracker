import { useJobs } from '@/features/jobs';
import { KanbanBoard } from '@/features/kanban';
import { Spinner } from '@/components/ui/Spinner';

export default function DashboardPage() {
  const { data: paginatedJobs, isLoading, isError } = useJobs({ pageSize: 100 });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
        <p className="text-muted-foreground mt-1">
          Kéo thả các công việc ứng tuyển để cập nhật trạng thái nhanh chóng.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-full text-destructive">
            Đã có lỗi xảy ra tải dữ liệu bảng.
          </div>
        ) : (
          <KanbanBoard jobs={paginatedJobs?.items || []} />
        )}
      </div>
    </div>
  );
}
