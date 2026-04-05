'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020617]">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center z-10">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass px-6 py-2 rounded-2xl border border-white/10 shadow-2xl skew-x-[-10deg]">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                PAGE NOT FOUND
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Opps! Link Terputus</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau memang tidak pernah ada sejak awal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-8">
              <Home className="mr-2 size-4" /> Kembali ke Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto rounded-2xl glass border-white/10 hover:bg-white/5"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 size-4" /> Halaman Sebelumnya
          </Button>
        </div>

        {/* Brand Footer */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-50">
          <div className="size-1.5 rounded-full bg-blue-500" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white">Miiwa Creative</span>
          <div className="size-1.5 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  )
}
