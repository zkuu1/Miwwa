# Planning: Miiwa Website

Dokumen ini berisi kriteria dan fitur utama untuk pengembangan website Miwwa.

## Kriteria Desain
1. **Warna**: Perpaduan gradient warna biru muda (Light Blue) dan biru tua (Dark Blue).
2. **Tema Konten**: Menggunakan tema gelap (Dark Theme).
3. **Estetika**: Menggunakan gaya desain **Glassmorphism** (efek transparan, blur, dan border tipis).

## Fitur Utama

### 1. Navbar
- Navigasi utama yang berisi tautan: **Home**, **About**, **Project**, dan **Contact**.
- Desain menggunakan efek glassmorphism yang responsif.

### 2. Hero Section
- Menampilkan gambar utama dari `public/image/miwa.png`.
- Teks sapaan "**Miiwa**" yang diletakkan di samping gambar (atau layout yang harmonis).

### 3. About Section
- Paragraf perkenalan tentang tujuan dan visi website.
- Grid dengan tema glassmorphism yang berisi kriteria atau nilai-nilai utama yang dibutuhkan.

### 4. Project Section
- Grid kartu project yang menampilkan:
    - Gambar project
    - Judul project
    - Deskripsi singkat
    - Link (Tautan) menuju project terkait.
mengambil api dari project yang sudah dibuat di dashboard admin

### 5. Event section
- Mengikuti standar profesional perusahaan.
- Mengambil api dari event yang sudah dibuat di dashboard admin

### 6. Login section
- Grid glassmorphism dengan form yang berisi
    - username
    - password
    - button login
    - button register
    - button back

### 7. Register section
- Grid glassmorphism dengan form yang berisi
    - username
    - email
    - password
    - button register
    - button back

### 8. Integrasi dengan supabase
- Membuat tabel yang berisi 
    - user (id, username, email, role, password)
    - project (id, title, description, image, link)
    - event (id, title, date, description, image, link)

### 9. dashboard admin section
- Membuat dashboard admin dengan role guard middleware agar tidak bisa diakses dengan user ataupun dengan non user yang berisi :
    - sidebar yang berisi 
        - overview ( berisi page dengan grid total user, project dan event)
        - user ( berisi page dengan tabel user)
        - project ( berisi page dengan tabel user)
        - event ( berisi page dengan tabel event)
    dashboard memiliki action untuk ( create, edit, dan delete dengan ui berupa modal dan toast)

### 10. integrasi dengan cloudinary
- Membuat fitur upload image pada project dan event 


### 11. Contact Section
1. judul : meet our member berisi foto saja dengan ratio circle atau lingkaran dan hover foto dengan link
2. judul : meet our admin berisi foto saja dengan ratio circle atau lingkaran dan hover foto dengan link
3. Media komunikasi yang berisi ikon sosial media dengan tautan aktif:
    - **WhatsApp**
    - **Instagram**
    - **Discord**

### 12. Footer
- Mengikuti standar profesional perusahaan.
- Mencantumkan informasi Copyright.


