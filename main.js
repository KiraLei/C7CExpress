const express = require("express");
const fs = require("fs");
const { title } = require("process");

const app = express();

let url1 = 0;
let url2 = 0;

app.get("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));

  const prod = data.map((e) => {
    return e.title;
  });
  const cant = data.length;
  ++url1;

  res.json({ items: [prod], cantidad: cant });
});
app.get("/item-random", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));

  const randome = data.map((e) => {
    return e.title;
  });
  const random = randome.sort(() => Math.random() - Math.random()).slice(0, 1);
  ++url2;

  res.json({ items: { random } });
});

app.get("/visitas", (req, res) => {
  //conta= conta + 1;

  res.json({ visitas: { items: url1, item: url2 } });
});

const PORT = 8082;

const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${server.address().port}`);
});

app.on("error", (err) => console.log(err));
