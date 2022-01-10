const express = require("express");
const app = express();
const db = require("./models");
const postRouter = require("./Routes/route.post");
const commentsRouter = require("./Routes/route.comments");
const usersRouter = require("./Routes/route.users");
const likesRouter = require("./Routes/route.likes");
// cors est obligatoire pour la relation entre mon back et mon front
const cors = require("cors");
require("dotenv").config();


app.use(express.json());
app.use(cors());

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001);
  console.log("serveur lancé sur le port 3001");
});
