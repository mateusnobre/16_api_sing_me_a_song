async function validateRecommendation(name: string, youtubeLink: string){
    let youtubeHttpsPattern = new RegExp('^https://www.youtube.com');
    let youtubePattern = new RegExp('^www.youtube.com');
    if (name === '' || youtubeLink === '') {
        throw new Error('Name and youtube link are required');
    }
    else if (typeof name !== 'string' || typeof youtubeLink !== 'string') {
        throw new Error('Name and youtube link must be strings');
    }
    else if (youtubePattern.test(youtubeLink) === false && youtubeHttpsPattern.test(youtubeLink) === false) {
        throw new Error('Invalid youtube link');
    }
    else {
        return true;
    }
}

export { validateRecommendation }