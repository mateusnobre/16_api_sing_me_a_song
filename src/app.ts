import express from "express";
import cors from "cors";
import { post, upvote }  from './controllers/recommendationController'

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", post);
app.post("/recommendations/:id/upvote", upvote);

export default app;
