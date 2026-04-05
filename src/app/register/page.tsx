'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserPlus, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: 'user',
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/login?registered=true')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-gradient mb-2">Miiwa</h1>
          <p className="text-muted-foreground">Buat akun baru Anda</p>
        </div>

        {/* Glass Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <UserPlus className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Daftar Akun</h2>
              <p className="text-sm text-muted-foreground">Isi data diri Anda di bawah</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username_anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-blue-400/50 h-12 rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-blue-400/50 h-12 rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-blue-400/50 h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-base font-semibold shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              {loading ? (
                <><Loader2 className="size-5 mr-2 animate-spin" /> Mendaftarkan...</>
              ) : (
                <><UserPlus className="size-5 mr-2" /> Daftar Sekarang</>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">atau</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl glass-dark border-white/10 hover:bg-white/10 transition-all"
              >
                Sudah punya akun? Masuk
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full h-11 rounded-xl text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4 mr-2" /> Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
