const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
};

// Menangkap error global, termasuk JSON body yang rusak
const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Format JSON tidak valid" });
  }
  res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error: err.message });
};

module.exports = { notFound, errorHandler };