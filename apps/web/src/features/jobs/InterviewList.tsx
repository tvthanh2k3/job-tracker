import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge, interviewResultVariant } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/utils';
import type { Interview, InterviewResult } from '@/types/interview.types';

interface InterviewListProps {
  interviews: Interview[];
  onAddClick?: () => void;
}

export function InterviewList({ interviews, onAddClick }: InterviewListProps) {
  if (!interviews || interviews.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-border rounded-xl bg-card/50">
        <h4 className="text-base font-medium text-foreground mb-1">Chưa có lịch phỏng vấn</h4>
        <p className="text-sm text-muted-foreground mb-4">Bạn chưa thêm lịch phỏng vấn nào cho công việc này.</p>
        {onAddClick && (
          <button 
            onClick={onAddClick}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            + Thêm mới
          </button>
        )}
      </div>
    );
  }

  const getResultIcon = (result: InterviewResult) => {
    switch(result) {
      case 'Passed': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {interviews.map((interview) => (
        <Card key={interview.id} className="overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 shrink-0">
                {getResultIcon(interview.result)}
              </div>
              <div>
                <h4 className="font-medium text-foreground">{interview.type} Interview</h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(interview.scheduledAt)}</span>
                </div>
              </div>
            </div>

            <Badge variant={interviewResultVariant[interview.result]}>
              {interview.result}
            </Badge>

          </div>
          {interview.notes && (
            <div className="px-4 py-3 bg-muted/50 border-t border-border text-sm text-muted-foreground">
              {interview.notes}
            </div>
          )}
        </Card>
      ))}

      {onAddClick && (
        <button 
          onClick={onAddClick}
          className="w-full py-3 mt-4 text-sm font-medium border border-dashed border-border rounded-xl text-muted-foreground hover:bg-accent hover:border-primary/50 transition-colors"
        >
          + Thêm lịch phỏng vấn khác
        </button>
      )}
    </div>
  );
}
