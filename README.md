# Anime Rating Catalog API

- **Nama: Muhammad Nabil Faris Keandre**
- **NIM: 2610512080**
- **Judul Project: Anime Rating Catalog API**
- **Final Project:** Study Club Backend Basic - KSM Veterantech UPNVJ 2026

REST API sederhana untuk mengelola katalog anime beserta rating, dibuat dengan ExpressJS dan MongoDB (Mongoose).

## Teknologi
Node.js, ExpressJS, MongoDB, Mongoose, dotenv, Git & GitHub, Postman.

## Struktur Folder
```
anime-rating-catalog/
├── server.js
├── src/
│   ├── config/db.js
│   ├── models/anime.model.js
│   ├── controllers/anime.controller.js
│   ├── routes/anime.routes.js
│   └── middlewares/error.middleware.js
├── postman/Anime-Catalog.postman_collection.json
├── .env.example
└── .gitignore
```

## Cara Instalasi
```bash
git clone https://github.com/<username>/anime-rating-catalog.git
cd anime-rating-catalog
npm install
cp .env.example .env
```
Lalu sesuaikan isi `.env`.

## Environment Variable
| Variable | Contoh | Keterangan |
|---|---|---|
| `PORT` | `3000` | Port server |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/anime_catalog` | Connection string MongoDB |

## Menjalankan Server
```bash
npm run dev   # development (nodemon)
npm start     # production
```
Server berjalan di `http://localhost:3000`.

## Daftar Endpoint
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/anime` | Menampilkan semua anime |
| GET | `/anime/:id` | Menampilkan satu anime |
| POST | `/anime` | Menambah anime |
| PUT | `/anime/:id` | Mengubah anime |
| DELETE | `/anime/:id` | Menghapus anime |

### Query Parameter (GET /anime)
| Parameter | Contoh | Fungsi |
|---|---|---|
| `search` | `?search=naruto` | Cari berdasarkan judul |
| `genre` | `?genre=action` | Filter genre |
| `status` | `?status=ongoing` | Filter status |
| `minRating` | `?minRating=8` | Rating minimal |
| `sort` | `?sort=-rating` | Urutkan (awali `-` untuk descending) |

### Contoh Body (POST / PUT)
```json
{
  "title": "Fullmetal Alchemist: Brotherhood",
  "genre": ["Action", "Adventure", "Fantasy"],
  "episodes": 64,
  "status": "completed",
  "rating": 9.1,
  "releaseYear": 2009,
  "synopsis": "Dua bersaudara mencari Philosopher's Stone."
}
```

## Pengujian
Import file `postman/Anime-Catalog.postman_collection.json` ke Postman. Variabel `base_url` default `http://localhost:3000`.