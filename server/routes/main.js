const express = require('express');

const router = express.Router();

router.put(
  '/findCharities',
  (req, res) => res.status(200).send({ message: 'Success on /findCharities' })
);

router.post(
  '/findCharities',
  (req, res) => res.status(200).send({ message: 'Success on /findCharities' })
);

module.exports = router;
