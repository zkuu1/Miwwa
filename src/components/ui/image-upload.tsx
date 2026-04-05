'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ImagePlus, X, Loader2, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary belum dikonfigurasi. Isi .env terlebih dahulu.')
      return
    }

    setError(null)
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()

      if (data.secure_url) {
        onChange(data.secure_url)
      } else {
        setError('Upload gagal. Coba lagi.')
      }
    } catch {
      setError('Upload gagal. Periksa koneksi Anda.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function handleRemove() {
    onChange('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {value && (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden glass-dark border border-white/10 group">
          <Image
            src={value}
            alt="Preview gambar"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              className="rounded-xl gap-2"
            >
              <X className="size-4" /> Hapus Gambar
            </Button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!value && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full h-36 rounded-2xl border-2 border-dashed border-white/15 hover:border-blue-400/50 bg-white/3 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-blue-400 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="size-6 animate-spin text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Mengupload...</span>
            </>
          ) : (
            <>
              <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="size-6" />
              </div>
              <span className="text-sm font-medium">Klik untuk upload gambar</span>
              <span className="text-xs">PNG, JPG, WebP · Maks 5MB</span>
            </>
          )}
        </button>
      )}

      {/* Manual URL input (fallback) */}
      {value && (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL gambar..."
            className="flex-1 h-9 rounded-xl bg-white/5 border border-white/10 px-3 text-xs text-muted-foreground focus:outline-none focus:border-blue-400/50"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded-xl gap-1.5 h-9 text-xs hover:bg-blue-500/10 hover:text-blue-400"
          >
            <ImagePlus className="size-3.5" /> Ganti
          </Button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
