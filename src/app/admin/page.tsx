import { createClient } from '@/utils/supabase/server'
import { Users, FolderOpen, CalendarDays, TrendingUp } from 'lucide-react'

async function getStats() {
  const supabase = await createClient()

  const [usersRes, projectsRes, eventsRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }),
  ])

  return {
    users: usersRes.count ?? 0,
    projects: projectsRes.count ?? 0,
    events: eventsRes.count ?? 0,
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      desc: 'Pengguna terdaftar',
    },
    {
      label: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'text-violet-400',
      bg: 'bg-violet-500/20',
      desc: 'Proyek aktif',
    },
    {
      label: 'Total Events',
      value: stats.events,
      icon: CalendarDays,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      desc: 'Event terdaftar',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <TrendingUp className="size-4" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        </div>
        <p className="text-muted-foreground ml-11">Ringkasan statistik platform Miiwa.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass rounded-3xl p-8 group hover:bg-white/8 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`size-12 rounded-2xl ${card.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon className={`size-6 ${card.color}`} />
              </div>
            </div>
            <div className={`text-5xl font-black mb-2 ${card.color}`}>
              {card.value}
            </div>
            <div className="font-semibold text-foreground mb-1">{card.label}</div>
            <div className="text-sm text-muted-foreground">{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="glass rounded-3xl p-8">
        <h2 className="text-lg font-semibold mb-6">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/admin/users', label: 'Kelola Users', icon: Users },
            { href: '/admin/projects', label: 'Kelola Projects', icon: FolderOpen },
            { href: '/admin/events', label: 'Kelola Events', icon: CalendarDays },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-2xl glass-dark hover:bg-white/10 transition-all group"
            >
              <item.icon className="size-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
