import express from "express";
import cors from "cors";
import { post }  from './controllers/recommendationController'

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  console.log(process.env.DATABASE_USER);
  res.send("OK!");
});

app.post("/recommendations", post);

export default app;
