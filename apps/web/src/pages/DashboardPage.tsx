import { useState, useMemo } from 'react';
import type { Job } from '@/types/job';
import type { ViewMode } from '@/types/view';
import { SAMPLE_JOBS } from '@/features/jobs/data/mockJobs';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import JobDetailModal from '@/features/jobs/components/JobDetailModal';
import QuickAdd from '@/features/jobs/components/QuickAdd';
import TableView from '@/features/jobs/components/TableView';
import ListView from '@/features/jobs/components/ListView';
import Board from '@/features/board/components/Board';

export default function DashboardPage() {
  const [jobs,         setJobs]         = useState<Job[]>(SAMPLE_JOBS);
  const [search,       setSearch]       = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view,         setView]         = useState<ViewMode>('kanban');
  const [openJobId,    setOpenJobId]    = useState<string | null>(null);
  const [quickOpen,    setQuickOpen]    = useState(false);

  const openJob = jobs.find((j) => j.id === openJobId) ?? null;

  const filtered = useMemo(() => {
    let list = jobs;

    if (activeFilter === 'active') {
      list = list.filter((j) => !['rejected', 'ghosted', 'offer'].includes(j.stage));
    } else if (activeFilter === 'starred') {
      list = list.filter((j) => j.priority === 'dream');
    } else if (activeFilter === 'archive') {
      list = list.filter((j) => ['rejected', 'ghosted'].includes(j.stage));
    } else if (activeFilter.startsWith('stage:')) {
      const sid = activeFilter.split(':')[1];
      list = list.filter((j) => j.stage === sid);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.company.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q) ||
          (j.note ?? '').toLowerCase().includes(q) ||
          (j.location ?? '').toLowerCase().includes(q),
      );
    }

    return list;
  }, [jobs, activeFilter, search]);

  const updateJob = (next: Job) => setJobs((prev) => prev.map((j) => (j.id === next.id ? next : j)));
  const createJob = (job: Job)  => setJobs((prev) => [job, ...prev]);

  return (
    <div
      className="h-screen w-screen flex bg-white text-stone-900 overflow-hidden"
      style={{ fontFamily: "'Inter','SF Pro Text',system-ui,sans-serif" }}
    >
      <Sidebar jobs={jobs} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          search={search}
          setSearch={setSearch}
          view={view}
          setView={setView}
          onQuickAdd={() => setQuickOpen(true)}
        />
        {view === 'kanban' && (
          <Board jobs={filtered} setJobs={setJobs} onCardClick={(j) => setOpenJobId(j.id)} />
        )}
        {view === 'table' && (
          <TableView jobs={filtered} onCardClick={(j) => setOpenJobId(j.id)} />
        )}
        {view === 'list' && (
          <ListView jobs={filtered} onCardClick={(j) => setOpenJobId(j.id)} />
        )}
      </main>

      <JobDetailModal key={openJobId ?? ''} job={openJob} onClose={() => setOpenJobId(null)} onUpdate={updateJob} />
      <QuickAdd open={quickOpen} onClose={() => setQuickOpen(false)} onCreate={createJob} />
    </div>
  );
}
