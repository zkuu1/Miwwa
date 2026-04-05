'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Users, Trash2, Pencil, Loader2, Shield, User } from 'lucide-react'

type UserRow = {
  id: string
  username: string
  email: string
  role: string
  created_at: string
}

export default function AdminUsersPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState<UserRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Gagal memuat data users')
    else setUsers(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  async function handleSaveEdit() {
    if (!editUser) return
    setSaving(true)
    const { error } = await supabase
      .from('users')
      .update({ username: editUser.username, role: editUser.role })
      .eq('id', editUser.id)

    if (error) toast.error('Gagal menyimpan perubahan')
    else {
      toast.success('User berhasil diperbarui')
      setEditUser(null)
      fetchUsers()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) toast.error('Gagal menghapus user')
    else {
      toast.success('User berhasil dihapus')
      fetchUsers()
    }
    setDeleteConfirm(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="size-4" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          </div>
          <p className="text-muted-foreground ml-11">Kelola akun pengguna terdaftar.</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-3xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="size-5 animate-spin" /> Memuat data...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Belum ada user terdaftar.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Username</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Bergabung</TableHead>
                <TableHead className="text-muted-foreground text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-white/10 text-muted-foreground'
                    }`}>
                      {user.role === 'admin' ? <Shield className="size-3" /> : <User className="size-3" />}
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditUser(user)}
                        className="rounded-xl hover:bg-blue-500/20 hover:text-blue-400"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(user.id)}
                        className="rounded-xl hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent className="glass-dark border-white/10 rounded-3xl sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={editUser?.username ?? ''}
                onChange={(e) => setEditUser(prev => prev ? { ...prev, username: e.target.value } : prev)}
                className="bg-white/5 border-white/10 rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select
                value={editUser?.role ?? 'user'}
                onChange={(e) => setEditUser(prev => prev ? { ...prev, role: e.target.value } : prev)}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm text-foreground"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setEditUser(null)} className="rounded-xl">Batal</Button>
            <Button onClick={handleSaveEdit} disabled={saving} className="rounded-xl">
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : null} Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
        <DialogContent className="glass-dark border-white/10 rounded-3xl sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>Hapus User?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm py-2">Tindakan ini tidak bisa dibatalkan.</p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Batal</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="rounded-xl"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
