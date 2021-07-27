import express from "express";
import cors from "cors";
import { post, upvote, downvote }  from './controllers/recommendationController'

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", post);
app.post("/recommendations/:id/upvote", upvote);
app.post("/recommendations/:id/downvote", downvote);

export default app;
