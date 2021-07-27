import {validateRecommendation} from '../services/recommendationService';
import {create, getId, changeScore, getRandomRecommendation} from '../repositories/recommendationRepository';
import { Request, Response } from "express";
import { random } from 'faker';

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

async function getRandom(req: Request, res: Response) {
    let p = Math.random();
    let randomRecommendation = await getRandomRecommendation(p);
    if (!randomRecommendation){
        res.status(404).send({message: 'no recommendation found'});
        
    }
    else {
        res.status(200).send(randomRecommendation);
    }
}

export { post, upvote, downvote, getRandom};