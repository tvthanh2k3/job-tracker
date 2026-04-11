import type { ReactNode } from 'react'

interface KpiCardProps {
  title: string
  value: number | string
  icon: ReactNode
  description?: string
}

export default function KpiCard({ title, value, icon, description }: KpiCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 flex flex-col gap-2 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-muted-foreground w-4 h-4">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}
