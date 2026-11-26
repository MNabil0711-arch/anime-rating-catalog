const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Judul wajib diisi"], trim: true },
    genre: { type: [String], default: [] },
    episodes: { type: Number, min: [1, "Episode minimal 1"] },
    status: {
      type: String,
      enum: { values: ["ongoing", "completed"], message: "Status harus ongoing atau completed" },
      default: "completed",
    },
    rating: {
      type: Number,
      min: [0, "Rating minimal 0"],
      max: [10, "Rating maksimal 10"],
      default: 0,
    },
    releaseYear: { type: Number },
    synopsis: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", animeSchema);