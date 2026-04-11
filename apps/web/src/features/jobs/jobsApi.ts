import { api } from '@/lib/axios';
import type {
  Job,
  CreateJobRequest,
  UpdateJobRequest,
  UpdateJobStatusRequest,
  JobFilters
} from './job.types';
import type { PaginatedResponse } from '@/types/common.types';

export const jobsApi = {
  getJobs: async (filters?: JobFilters): Promise<PaginatedResponse<Job>> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.remoteStatus) params.append('remoteStatus', filters.remoteStatus);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const response = await api.get<PaginatedResponse<Job>>('/api/jobs', { params });
    return response.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get<Job>(`/api/jobs/${id}`);
    return response.data;
  },

  createJob: async (data: CreateJobRequest): Promise<Job> => {
    const response = await api.post<Job>('/api/jobs', data);
    return response.data;
  },

  updateJob: async (id: string, data: UpdateJobRequest): Promise<Job> => {
    const response = await api.put<Job>(`/api/jobs/${id}`, data);
    return response.data;
  },

  updateJobStatus: async (id: string, data: UpdateJobStatusRequest): Promise<void> => {
    await api.patch(`/api/jobs/${id}/status`, data);
  },

  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/api/jobs/${id}`);
  }
};
