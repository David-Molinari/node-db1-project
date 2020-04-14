const express = require("express");

const DataRouter = require("../data/router.js");

const server = express();

server.use(express.json());

server.use("/data/router", DataRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;
