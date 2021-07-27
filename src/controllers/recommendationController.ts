import {validateRecommendation} from '../services/recommendationService';
import {create} from '../repositories/recommendationRepository';
import { Request, Response } from "express";

async function post(req: Request, res: Response) {
    const {name, youtubeLink} = req.body;
    const isValid = await validateRecommendation(name, youtubeLink);
    if (isValid) {
        const recommendation = await create(name, youtubeLink);
        res.status(201).send({message: 'Recommendation added successfully', recommendation: recommendation});
    }
    else {
        res.status(400).send({message: 'Invalid data'});
    }
}

export { post };