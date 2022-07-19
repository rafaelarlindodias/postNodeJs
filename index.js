const express = require("express");
const app = express();

const mongoose = require('mongoose');
const db_access = require('./setup/db').mongoURL;

//--------------------banco de dados--------------------------------
mongoose
.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexão com MongoDB Cloud bem sucedida!"))
.catch((err => console.log(err)));

//-------------------login--------------------------------------
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const auth = require("./routes/auth");

app.use("/auth", auth)

app.get("/", (req, res) => {
  res.send("Hello Word");
});

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));
