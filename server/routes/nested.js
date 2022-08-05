const express = require("express");

const router = express.Router();

router.post("/goal/found", (req, res) =>
  res.status(200).send({ message: "Success on /goal/found" })
);

module.exports = router;
