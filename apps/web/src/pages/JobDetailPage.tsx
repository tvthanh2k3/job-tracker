import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, MapPin, DollarSign, Calendar, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, jobStatusVariant } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import {
  useJob,
  useUpdateJob,
  useDeleteJob,
  JobForm,
  InterviewList,
  type UpdateJobRequest
} from '@/features/jobs';
import { formatSalary, formatDate } from '@/utils';
import { ROUTES } from '@/constants/routes';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: job, isLoading, isError } = useJob(id!);
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (isError || !job) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy công việc</h2>
        <Button variant="outline" onClick={() => navigate(ROUTES.JOBS)}>Quay lại danh sách</Button>
      </div>
    );
  }

  const handleUpdate = (data: UpdateJobRequest) => {
    updateJob({ id: job.id, data }, {
      onSuccess: () => setIsEditModalOpen(false)
    });
  };

  const handleDelete = () => {
    deleteJob(job.id, {
      onSuccess: () => navigate(ROUTES.JOBS)
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate(ROUTES.JOBS)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
      </Button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-4 flex-1">
          <Badge variant={jobStatusVariant[job.status]} className="mb-2 text-sm px-3 py-1">
            {job.status}
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
          <div className="flex items-center text-muted-foreground gap-1.5 text-lg">
            <Building2 className="w-5 h-5 shrink-0" />
            <span className="font-medium">{job.company}</span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {job.jobUrl && (
            <Button variant="outline" className="flex-1 md:flex-none" onClick={() => window.open(job.jobUrl, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" /> Tuyển dụng
            </Button>
          )}
          <Button variant="secondary" className="flex-1 md:flex-none" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="w-4 h-4 mr-2" /> Sửa
          </Button>
          <Button variant="danger" className="shrink-0 px-3" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mô tả công việc</CardTitle>
            </CardHeader>
            <CardContent>
              {job.description ? (
                <div className="whitespace-pre-wrap text-foreground/90 text-sm leading-relaxed">
                  {job.description}
                </div>
              ) : (
                <span className="text-muted-foreground italic">Chưa có mô tả công việc.</span>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch phỏng vấn</CardTitle>
            </CardHeader>
            <CardContent>
              <InterviewList 
                interviews={job.interviews || []} 
                onAddClick={() => alert('Thêm phỏng vấn sẽ làm ở phần sau.')} 
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-3">
                <div className="p-2 border border-border shadow-sm rounded-lg bg-background text-muted-foreground self-start">
                  {job.remoteStatus === 'Remote' ? <Globe className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Nơi làm việc</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {job.remoteStatus} {job.location && `- ${job.location}`}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 border border-border shadow-sm rounded-lg bg-background text-muted-foreground self-start">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Mức lương</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 border border-border shadow-sm rounded-lg bg-background text-muted-foreground self-start">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Ngày nộp đơn</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {job.appliedAt ? formatDate(job.appliedAt) : 'Chưa nộp'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {job.notes && (
            <Card className="bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50">
              <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-500">Ghi chú</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-900/80 dark:text-amber-400/80 whitespace-pre-wrap">
                {job.notes}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Chỉnh sửa công việc" size="lg">
        <JobForm 
          initialData={job}
          onSubmit={handleUpdate} 
          isSubmitting={isUpdating} 
          onCancel={() => setIsEditModalOpen(false)} 
        />
      </Modal>

      {/* Delete Modal */}
      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xóa công việc" size="sm">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Bạn có chắc chắn muốn xóa công việc <span className="font-semibold text-foreground">{job.title}</span> tại <span className="font-semibold text-foreground">{job.company}</span>? Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Hủy</Button>
            <Button variant="danger" loading={isDeleting} onClick={handleDelete}>Xóa vĩnh viễn</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
