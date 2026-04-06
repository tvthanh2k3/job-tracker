import { Outlet } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Job Tracker</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your job applications smartly
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card shadow-xl shadow-black/5 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
