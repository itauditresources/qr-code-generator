import express from "express";

const app = express();

app.all("/", (req, res, next) => {
  const body = req.body;
  console.log(body);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
