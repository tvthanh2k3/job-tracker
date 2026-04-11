import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { JobStatus, RemoteStatus } from '../job.types';
import type { Job, CreateJobRequest } from '../job.types';

const jobSchema = z.object({
  title: z.string().min(1, 'Nghề nghiệp là bắt buộc'),
  company: z.string().min(1, 'Công ty là bắt buộc'),
  location: z.string().optional(),
  salaryMin: z.union([z.string(), z.number()]).optional().transform((val) => (val === '' || val === undefined || isNaN(Number(val)) ? undefined : Number(val))),
  salaryMax: z.union([z.string(), z.number()]).optional().transform((val) => (val === '' || val === undefined || isNaN(Number(val)) ? undefined : Number(val))),
  currency: z.string().optional(),
  status: z.nativeEnum(JobStatus).optional(),
  remoteStatus: z.nativeEnum(RemoteStatus).optional(),
  jobUrl: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  description: z.string().optional(),
  notes: z.string().optional(),
  appliedAt: z.string().optional(),
});

type JobFormValues = z.input<typeof jobSchema>;

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: CreateJobRequest) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function JobForm({ initialData, onSubmit, isSubmitting, onCancel }: JobFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      salaryMin: undefined,
      salaryMax: undefined,
      currency: 'USD',
      status: JobStatus.Wishlist,
      remoteStatus: RemoteStatus.OnSite,
      jobUrl: '',
      description: '',
      notes: '',
      appliedAt: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        company: initialData.company,
        location: initialData.location || '',
        salaryMin: initialData.salaryMin,
        salaryMax: initialData.salaryMax,
        currency: initialData.currency || 'USD',
        status: initialData.status,
        remoteStatus: initialData.remoteStatus,
        jobUrl: initialData.jobUrl || '',
        description: initialData.description || '',
        notes: initialData.notes || '',
        appliedAt: initialData.appliedAt ? initialData.appliedAt.split('T')[0] : '',
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as unknown as CreateJobRequest))} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Vị trí / Nghề nghiệp" placeholder="Frontend Developer" error={errors.title?.message} {...register('title')} />
        <Input label="Tên công ty" placeholder="Tên Cty" error={errors.company?.message} {...register('company')} />
        
        <Input label="Nơi làm việc" placeholder="Hồ Chí Minh, HN..." error={errors.location?.message} {...register('location')} />
        
        <Select
          label="Mô hình làm việc"
          error={errors.remoteStatus?.message}
          {...register('remoteStatus')}
          options={[
            { label: 'On-site', value: RemoteStatus.OnSite },
            { label: 'Remote', value: RemoteStatus.Remote },
            { label: 'Hybrid', value: RemoteStatus.Hybrid },
          ]}
        />

        <div className="flex gap-2">
          <Input type="number" className="w-full" label="Lương từ" placeholder="0" error={errors.salaryMin?.message} {...register('salaryMin')} />
          <Input type="number" className="w-full" label="Lương đến" placeholder="0" error={errors.salaryMax?.message} {...register('salaryMax')} />
        </div>

        <Select
          label="Trạng thái"
          error={errors.status?.message}
          {...register('status')}
          options={[
            { label: 'Wishlist', value: JobStatus.Wishlist },
            { label: 'Applied', value: JobStatus.Applied },
            { label: 'Interview', value: JobStatus.Interview },
            { label: 'Offer', value: JobStatus.Offer },
            { label: 'Rejected', value: JobStatus.Rejected },
          ]}
        />
      </div>

      <Input label="Link tuyển dụng" placeholder="https://..." error={errors.jobUrl?.message} {...register('jobUrl')} />
      <Input label="Ngày nộp đơn" type="date" error={errors.appliedAt?.message} {...register('appliedAt')} />
      
      <Textarea label="Mô tả công việc (JD)" placeholder="..." error={errors.description?.message} {...register('description')} className="min-h-[120px]" />
      <Textarea label="Ghi chú thêm" placeholder="..." error={errors.notes?.message} {...register('notes')} />

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Hủy
          </Button>
        )}
        <Button type="submit" loading={isSubmitting}>
          {initialData ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>
      </div>
    </form>
  );
}
