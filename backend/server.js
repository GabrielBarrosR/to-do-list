const routes = require("./routes.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

mongoose
  .connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
