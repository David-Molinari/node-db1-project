const express = require("express");

// database access using knex
const db = require("./dbConfig.js");

const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params.id;
  
    db('accounts').where({ id })
    .then(accounts => {
      // we must check the length to find our if our user exists
      if (accounts.length) {
        res.json(accounts);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
    }
});


module.exports = router;