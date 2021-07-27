import {validateRecommendation} from '../services/recommendationService';
import { Request, Response } from "express";

async function post(req: Request, res: Response) {
    const body = req.body;
    res.sendStatus(401);
}

export { post };