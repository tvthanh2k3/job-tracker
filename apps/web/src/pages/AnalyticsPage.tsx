import { Briefcase, CheckCircle, FileText } from 'lucide-react'
import { useAnalyticsSummary } from '@/features/analytics/useAnalytics'
import KpiCard from '@/features/analytics/KpiCard'
import StatusPieChart from '@/features/analytics/StatusPieChart'
import ApplicationTimeline from '@/features/analytics/ApplicationTimeline'
import { Spinner } from '@/components/ui/Spinner'

export default function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalyticsSummary()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-center text-red-500">
        Failed to load analytics data.
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your job application process.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Total Applications"
          value={data.totalApplications}
          icon={<Briefcase />}
        />
        <KpiCard
          title="Interviews"
          value={data.totalInterviews}
          icon={<FileText />}
          description={`${data.interviewRate.toFixed(1)}% interview rate`}
        />
        <KpiCard
          title="Offers"
          value={data.totalOffers}
          icon={<CheckCircle />}
          description={`${data.offerRate.toFixed(1)}% offer rate`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 overflow-hidden">
          <h3 className="font-semibold mb-4 text-lg">Application Status</h3>
          <StatusPieChart data={data.statusBreakdown} />
        </div>
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 overflow-hidden">
          <h3 className="font-semibold mb-4 text-lg">Application Timeline</h3>
          <ApplicationTimeline data={data.applicationTimeline} />
        </div>
      </div>
    </div>
  )
}
