# Reff Fishing Frenzy - Automation User

Proyek ini adalah skrip otomatisasi yang digunakan untuk membuat pengguna secara otomatis, login sebagai tamu, dan memverifikasi kode referensi untuk sebuah sistem berbasis API.

## Deskripsi

Skrip ini secara otomatis membuat pengguna baru, melakukan login sebagai tamu menggunakan ID perangkat unik, dan kemudian memverifikasi kode referensi untuk setiap pengguna. Token akses yang diterima selama proses login disimpan ke dalam file untuk digunakan lebih lanjut.

Fitur utama:
- Login sebagai tamu dengan ID perangkat unik.
- Memverifikasi kode referensi untuk setiap pengguna.
- Menyimpan token akses yang diterima ke dalam file untuk referensi selanjutnya.
- Proses otomatis untuk membuat banyak pengguna sekaligus.

## Fitur

- **Automatisasi pembuatan pengguna**: Membuat pengguna baru secara otomatis dengan nama pengguna yang dihasilkan secara acak.
- **Login sebagai tamu**: Setiap pengguna melakukan login sebagai tamu dengan ID perangkat yang unik.
- **Verifikasi kode referensi**: Setiap pengguna mencoba untuk memverifikasi kode referensi yang diberikan.
- **Penyimpanan token**: Token akses yang diperoleh disimpan dalam file `tokens.txt`.

## Persyaratan

- Node.js versi 14 atau lebih tinggi
- npm (Node Package Manager)
- Akses ke API untuk melakukan login dan verifikasi kode referensi

## Konfigurasi config.txt

- klik F12 atau CTRL + SHIFT + I 
- klik Network Lalu scroll kebawah cari Sessions
- Ambil PRIVY_APP_ID dan PRIVY_CA_ID masukkan di config.txt

## Instalasi

### 1. Clone Repositori

Clone repositori ini ke komputer lokal Anda:

```bash
git clone https://github.com/HarunTampan/Auto-Reff-FishingFrenzy.git
cd Auto-Reff-FishingFrenzy
```

### 2. install modul

Install modul ini di PC/LAPTOP

```bash
npm install
```

## Cara Running

```bash
node index <numUsers> <koderef>
```
