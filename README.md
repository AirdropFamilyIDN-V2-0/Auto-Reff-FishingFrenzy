# Auto Reff Fishing Frenzy
![29 11 2024_20 46 05_REC](https://github.com/user-attachments/assets/b203854a-e1fc-4bc7-80fd-5cb515218719)

Fitur :
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
- Node.js versi 18 atau lebih tinggi

## Jika tanpa Proxy tinggal run saja
## Jika ada proxy edit file ```config.txt```

## Konfigurasi config.txt

- klik F12 atau CTRL + SHIFT + I 
- klik Network Lalu scroll kebawah cari Sessions
- Ambil PRIVY_APP_ID dan PRIVY_CA_ID masukkan di config.txt

## Instalasi

### 1. Clone Repositori

Clone repositori ini ke komputer lokal Anda:

```
git clone https://github.com/AirdropFamilyIDN-V2-0/Auto-Reff-FishingFrenzy.git
```
```
cd Auto-Reff-FishingFrenzy
```
```
npm install
```

## Cara Running

```
node index.js 100 kodereffmu
```
## Contoh penggunaan running
```
node index.js 100 JX0QL8
```
