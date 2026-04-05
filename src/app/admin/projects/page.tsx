'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ui/image-upload'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { FolderOpen, Plus, Trash2, Pencil, Loader2, ExternalLink } from 'lucide-react'
import Image from 'next/image'

type Project = {
  id: string
  title: string
  description: string | null
  image: string | null
  link: string | null
  created_at: string
}

const emptyProject = { title: '', description: '', image: '', link: '' }

export default function AdminProjectsPage() {
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyProject)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Gagal memuat data projects')
    else setProjects(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  function openCreate() {
    setEditTarget(null)
    setForm(emptyProject)
    setModalOpen(true)
  }

  function openEdit(p: Project) {
    setEditTarget(p)
    setForm({ title: p.title, description: p.description ?? '', image: p.image ?? '', link: p.link ?? '' })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditTarget(null)
    setForm(emptyProject)
  }

  async function handleSave() {
    if (!form.title.trim()) { toast.error('Judul wajib diisi'); return }
    setSaving(true)

    const payload = {
      title: form.title,
      description: form.description || null,
      image: form.image || null,
      link: form.link || null,
    }

    let error = null
    if (editTarget) {
      ({ error } = await supabase.from('projects').update(payload).eq('id', editTarget.id))
    } else {
      ({ error } = await supabase.from('projects').insert(payload))
    }

    if (error) toast.error('Gagal menyimpan project')
    else {
      toast.success(editTarget ? 'Project diperbarui!' : 'Project ditambahkan!')
      closeModal()
      fetchProjects()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) toast.error('Gagal menghapus project')
    else { toast.success('Project dihapus'); fetchProjects() }
    setDeleteConfirm(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-8 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
              <FolderOpen className="size-4" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          </div>
          <p className="text-muted-foreground ml-11">Kelola portfolio proyek Miiwa.</p>
        </div>
        <Button onClick={openCreate} className="rounded-2xl gap-2">
          <Plus className="size-4" /> Tambah Project
        </Button>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="size-5 animate-spin" /> Memuat data...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Belum ada project. Tambah yang pertama!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Gambar</TableHead>
                <TableHead className="text-muted-foreground">Judul</TableHead>
                <TableHead className="text-muted-foreground">Deskripsi</TableHead>
                <TableHead className="text-muted-foreground">Link</TableHead>
                <TableHead className="text-muted-foreground text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    {p.image ? (
                      <div className="relative size-12 rounded-xl overflow-hidden bg-white/10">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground text-xs">N/A</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs truncate">{p.description ?? '-'}</TableCell>
                  <TableCell>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1 text-sm">
                        Buka <ExternalLink className="size-3" />
                      </a>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(p)} className="rounded-xl hover:bg-blue-500/20 hover:text-blue-400">
                        <Pencil className="size-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(p.id)} className="rounded-xl hover:bg-red-500/20 hover:text-red-400">
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

      {/* Create/Edit Dialog */}
      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="glass-dark border-white/10 rounded-3xl sm:rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Project' : 'Tambah Project'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Judul *</Label>
              <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nama project" className="bg-white/5 border-white/10 rounded-xl h-11" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Deskripsi singkat project..."
                rows={3}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-blue-400/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Gambar</Label>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm(f => ({ ...f, image: url }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={form.link} onChange={(e) => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." className="bg-white/5 border-white/10 rounded-xl h-11" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={closeModal} className="rounded-xl">Batal</Button>
            <Button onClick={handleSave} disabled={saving} className="rounded-xl">
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editTarget ? 'Simpan Perubahan' : 'Tambahkan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
        <DialogContent className="glass-dark border-white/10 rounded-3xl sm:rounded-3xl">
          <DialogHeader><DialogTitle>Hapus Project?</DialogTitle></DialogHeader>
          <p className="text-muted-foreground text-sm py-2">Tindakan ini tidak bisa dibatalkan.</p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Batal</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="rounded-xl">Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
