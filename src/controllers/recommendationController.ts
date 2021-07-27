import {validateRecommendation} from '../services/recommendationService';
import {create, getId, changeScore} from '../repositories/recommendationRepository';
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

async function upvote(req: Request, res: Response) {
    const { id } = req.params;
    if (!id){
        throw new Error('Id is required');
    }
    else {
        const isValidId = getId(parseInt(id));
        if (!isValidId){
            throw new Error('Id is invalid');
        }
        else {
            await changeScore(parseInt(id),1)
            res.status(200).send({message: 'recommendation upvoted'});
        }
    }
}

async function downvote(req: Request, res: Response) {
    const { id } = req.params;
    if (!id){
        throw new Error('Id is required');
    }
    else {
        const isValidId = getId(parseInt(id));
        if (!isValidId){
            throw new Error('Id is invalid');
        }
        else {
            await changeScore(parseInt(id),-1)
            res.status(200).send({message: 'recommendation downvoted'});
        }
    }
}
export { post, upvote, downvote};