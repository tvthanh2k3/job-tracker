import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Globe, Building2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge, jobStatusVariant } from '@/components/ui/Badge';
import { formatDate, formatSalary } from '@/lib/utils';
import type { Job } from '@/types/job.types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card hover className="flex flex-col h-full group transition-all duration-200">
      <CardContent className="p-5 flex-1 cursor-pointer">
        <Link to={`/jobs/${job.id}`} className="block h-full group-hover:no-underline">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center text-muted-foreground gap-1.5">
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{job.company}</span>
              </div>
            </div>
            
            <Badge variant={jobStatusVariant[job.status]} className="shrink-0">
              {job.status}
            </Badge>
          </div>

          <div className="space-y-2.5 mt-4">
            {(job.location || job.remoteStatus) && (
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                {job.remoteStatus === 'Remote' ? (
                  <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <MapPin className="w-4 h-4 shrink-0" />
                )}
                <span className="line-clamp-1">
                  {job.remoteStatus === 'Remote' ? 'Remote' : job.location}
                  {job.remoteStatus === 'Hybrid' && ' (Hybrid)'}
                </span>
              </div>
            )}

            {(job.salaryMin || job.salaryMax) && (
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <DollarSign className="w-4 h-4 shrink-0 text-amber-500" />
                <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              </div>
            )}
          </div>
        </Link>
      </CardContent>
      
      <CardFooter className="px-5 py-3 border-t border-border/50 bg-secondary/30 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{job.appliedAt ? `Applied ${formatDate(job.appliedAt)}` : 'Not applied yet'}</span>
        </div>
        
        {job.interviews && job.interviews.length > 0 && (
          <span className="font-medium text-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {job.interviews.length} Interviews
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
