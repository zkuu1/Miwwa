# Implementasi Fitur Backend, Auth, dan Dashboard Miiwa (Task 5-9)

Rencana ini merinci langkah-langkah untuk menyelesaikan Task 5 hingga 9 berdasarkan file `planning.md`. Ini melibatkan integrasi Supabase (Authentication & Database), Cloudinary (Image Upload), serta pembuatan halaman Login, Register, dan Dashboard Admin.

## User Review Required

> [!CAUTION]
> Kita akan membutuhkan **credential untuk Supabase** (Project URL & API Key) dan **Cloudinary** (Cloud Name, API Key, API Secret) untuk menghubungkan aplikasi ke backend. Apakah Anda sudah memiliki akun dan credentials ini? Jika belum, saya akan memberikan instruksi pembuatannya. Saya juga akan membuat file `.env` lokal.

> [!WARNING]
> Untuk tabel `user`, Supabase secara default memiliki fitur pengelolaan user bawaan menggunakan `auth.users`. Apakah kita sebaiknya menggunakan tabel bawaan Supabase Auth untuk mencatat `id, email, password`, dan menyimpan `username` & `role` di tabel `public.users`? Ini adalah best practice saat menggunakan Supabase. 

## Proposed Changes

### Setup & Dependencies
Kita akan menginstal beberapa pustaka tambahan:
- `@supabase/supabase-js` dan `@supabase/ssr` untuk interaksi Next.js dengan Supabase (Auth & Database).
- `next-cloudinary` untuk mempermudah upload ke Cloudinary.
- Komponen relasional dari `shadcn/ui`: `toast` (untuk notifikasi), `dialog` (untuk modal create/update), `input`, `label`, `table` (untuk dashboard).

---

### [Login & Register Section (Task 5 & 6)]

#### [NEW] [login page](file:///e:/coding/vibe/miiwa-website/src/app/login/page.tsx)
- Desain grid glassmorphism yang responsif.
- Form untuk `email` (atau `username` jika custom auth) dan `password` (untuk Auth dengan Supabase).
- Tombol: *Login*, *Register* (mengarahkan ke `/register`), *Back* (kembali ke homepage).

#### [NEW] [register page](file:///e:/coding/vibe/miiwa-website/src/app/register/page.tsx)
- Desain grid glassmorphism.
- Form untuk `username`, `email`, dan `password`.
- Tombol *Register* dan *Back*.  
- Akan memanggil API Supabase untuk registrasi user dan menyimpan `role` default.

---

### [Supabase Integration (Task 7)]

#### [NEW] [supabase utils](file:///e:/coding/vibe/miiwa-website/src/utils/supabase/client.ts)
- Konfigurasi inisialisasi *Supabase SSR Client*.

#### [NEW] [database schema](file:///e:/coding/vibe/miiwa-website/supabase/schema.sql)
- Saya akan sediakan schema database yang berisi tabel:
  - `users` (id, username, email, role).
  - `projects` (id, title, description, image, link).
  - `events` (id, title, date, description, image, link).
- Skema ini perlu Anda jalankan di SQL Editor dashboard Supabase.

---

### [Admin Dashboard & Role Guard (Task 8)]

#### [NEW] [middleware](file:///e:/coding/vibe/miiwa-website/src/middleware.ts)
- *Role Guard*: Middleware ini akan mengecek session Supabase secara aktif. 
- Jika pengunjung mencoba masuk ke subpath `/admin` sedangkan role-nya bukan admin/belum login, pengunjung akan di-redirect ke halaman utama/login.

#### [NEW] [admin layout](file:///e:/coding/vibe/miiwa-website/src/app/admin/layout.tsx)
- Menyediakan arsitektur Sidebar yang memiliki navigasi ke Overview, User, Project, dan Event.

#### [NEW] [admin pages](file:///e:/coding/vibe/miiwa-website/src/app/admin/page.tsx)
- **Overview**: Grid ringkasan total pengguna, proyek, dan event.
- **Subpages (`/admin/users`, `/admin/projects`, `/admin/events`)**: Menampilkan *Table*. Dilengkapi aksi CRUD (Create, Edit, Delete).
- Menggunakan **Shadcn Modal (Dialog)** untuk form tambah/edit, dan **Shadcn Toaster** untuk feedback toast keberhasilan/kegagalan.

---

### [Cloudinary Integration (Task 9)]

#### [NEW] [upload component](file:///e:/coding/vibe/miiwa-website/src/components/ui/image-upload.tsx)
- Komponen upload menggunakan `next-cloudinary` widget untuk mendapatkan URL gambar Cloudinary usai diupload.
- Diimplementasikan di dalam modal Create/Edit di halaman `/admin/projects` dan `/admin/events`.

## Open Questions

1. **Supabase & Cloudinary Keys:** Apakah Anda sudah siap dengan API Keys keduanya, atau ingin disiapkan `.env.example` dulu sehingga Anda yang mengisinya nanti?
2. **Setup Shadcn UI:** Boleh saya jalankan command npm untuk menginstall kompenen interaktif shadcn seperti form dialog, input, dan label langsung ke project ini?
3. **Role & Auth Setup:** Karena menggunakan Supabase, lebih baik menggunakan `email` & `password` untuk login bawaannya. Apakah Anda tidak masalah menggunakan `email` dibanding `username` untuk login, sementara username kita tampilkan di menu/profile saja?

## Verification Plan
### Manual Verification
- Testing Login & Register: Mendaftar akun, dan login untuk mengecek perpindahan session di Supabase.
- Testing Rute Admin: Mengakses `/admin` tanpa login untuk menguji rute ditolak. Login sebagai admin dan menjelajahi dashboard.
- Testing Manajemen Data: Mencoba membuat project baru beserta gambar Cloudinary-nya melalui Dashboard Admin.
