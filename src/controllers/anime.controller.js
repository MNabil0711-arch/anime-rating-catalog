const mongoose = require("mongoose");
const Anime = require("../models/anime.model");

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getAllAnime = async (req, res) => {
  try {
    const { search, genre, status, minRating, sort } = req.query;
    const filter = {};

    if (search) filter.title = { $regex: escapeRegex(String(search)), $options: "i" };
    if (genre) filter.genre = { $regex: `^${escapeRegex(String(genre))}$`, $options: "i" };
    if (status) filter.status = String(status);
    if (minRating !== undefined) {
      if (isNaN(Number(minRating))) {
        return res.status(400).json({ success: false, message: "minRating harus berupa angka" });
      }
      filter.rating = { $gte: Number(minRating) };
    }

    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const data = await Anime.find(filter).sort(sortBy);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: error.message });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const anime = await Anime.findById(id);
    if (!anime) {
      return res.status(404).json({ success: false, message: "Anime tidak ditemukan" });
    }
    res.status(200).json({ success: true, data: anime });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: error.message });
  }
};

const createAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.status(201).json({ success: true, message: "Anime berhasil ditambahkan", data: anime });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validasi gagal", errors: messages });
    }
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: error.message });
  }
};

const updateAnime = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const anime = await Anime.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!anime) {
      return res.status(404).json({ success: false, message: "Anime tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Anime berhasil diperbarui", data: anime });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validasi gagal", errors: messages });
    }
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: error.message });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const anime = await Anime.findByIdAndDelete(id);
    if (!anime) {
      return res.status(404).json({ success: false, message: "Anime tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Anime berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: error.message });
  }
};

module.exports = { getAllAnime, getAnimeById, createAnime, updateAnime, deleteAnime };