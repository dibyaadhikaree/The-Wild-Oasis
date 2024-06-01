const express = require("express");

const router = express.Router();

const cabinsController = require("../controllers/cabinsController");

router
  .route("/")
  .get(cabinsController.getCabins)
  .post(cabinsController.createCabin);

router
  .route("/:id")
  .delete(cabinsController.deleteCabin)
  .patch(cabinsController.editCabin);

module.exports = router;
