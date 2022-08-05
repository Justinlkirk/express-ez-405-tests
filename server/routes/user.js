const express = require('express');

const router = express.Router();

router.post(
  '/signUp',
  (req, res) => res.status(200).send({ message: 'Success on /signUp' })
);

router.post(
  '/makeAD',
  (req, res) => res.status(200).send({ message: 'Success on /makeAD' })
);

router.put(
  '/makeAD',
  (req, res) => res.status(200).send({ message: 'Success on /makeAD' })
);

router.put(
  '/changeFav',
  (req, res) => res.status(200).send({ message: 'Success on /changeFav' })
);

router.put(
  '/login',
  (req, res) => res.status(200).send({ message: 'Success on /login' })
);

module.exports = router;
