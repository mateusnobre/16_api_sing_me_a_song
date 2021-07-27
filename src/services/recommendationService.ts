import {create} from '../repositories/recommendationRepository';

async function validateRecommendation(name: string, youtubeLink: string){
    const isValid = await create(name, youtubeLink);
    return isValid;
}

export { validateRecommendation }