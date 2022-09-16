import express from "express";

const dotenv = require('dotenv').config()]

const sever = express();

sever.all("/", (req, res, next) => {
  const body = req.body;
  console.log(body);
});

const port = process.env['ENV'] === 'PRODUCTION' ? process.env['PORT'] : 3000

sever.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});


module.exports = sever