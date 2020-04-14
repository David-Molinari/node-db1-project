const express = require("express");

// database access using knex
const db = require("./dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db.select("*")
      .from("accounts")
      .then(accounts => {
        res.status(200).json({ data: accounts });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .then(accounts => {
      if (accounts.length) {
        res.json(accounts);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get user' });
    });}
})})


router.post("/", (req, res) => {
    const postData = req.body;
    db("accounts")
      .insert(postData, "id")
      .then(ids => {
        const id = ids[0];
        db("accounts")
          .where({ id })
          .first()
          .then(account => {
            res.status(201).json({ data: account });
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
});


router.patch("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db("accounts")
        .where({ id })
        .update(changes)
        .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "update successful" });
        } else {
            res.status(404).json({ message: "no posts by that id found" });
        }
        });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db("accounts")
        .where({ id })
        .del()
        .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "update successful" });
        } else {
            res.status(404).json({ message: "no posts by that id found" });
        }
        });
  });


module.exports = router;