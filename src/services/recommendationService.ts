async function validateRecommendation(name: string, youtubeLink: string){
    let youtubeHttpsPattern = new RegExp('^https://www.youtube.com');
    let youtubePattern = new RegExp('^www.youtube.com');
    if (name === '' || youtubeLink === '') {
        return false;
    }
    else if (typeof name !== 'string' || typeof youtubeLink !== 'string') {
        return false;
    }
    else if (youtubePattern.test(youtubeLink) === false && youtubeHttpsPattern.test(youtubeLink) === false) {
        return false;
    }
    else {
        return true;
    }
}

export { validateRecommendation}
