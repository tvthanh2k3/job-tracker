import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from './jobsApi';
import type { JobFilters, CreateJobRequest, UpdateJobRequest, UpdateJobStatusRequest } from '@/types/job.types';
import { toast } from '@/components/ui/Toast';
import { jobKeys } from '@/constants/queryKeys';

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: jobKeys.list(filters || {}),
    queryFn: () => jobsApi.getJobs(filters),
    placeholderData: (previousData) => previousData,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobRequest) => jobsApi.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      toast.success('Công việc đã được tạo thành công');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi tạo công việc');
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobRequest }) => jobsApi.updateJob(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      toast.success('Đã cập nhật thông tin công việc');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật công việc');
    },
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobStatusRequest }) => jobsApi.updateJobStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      toast.success('Đã chuyển trạng thái công việc');
    },
    onError: () => {
      toast.error('Lỗi chuyển trạng thái công việc');
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobsApi.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      toast.success('Đã xóa công việc');
    },
    onError: () => {
      toast.error('Lỗi khi xóa công việc');
    },
  });
}
