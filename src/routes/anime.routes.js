const express = require("express");
const {
  getAllAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/anime.controller");

const router = express.Router();

router.route("/").get(getAllAnime).post(createAnime);
router.route("/:id").get(getAnimeById).put(updateAnime).delete(deleteAnime);

module.exports = router;