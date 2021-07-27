import faker from "faker";


export async function createRecommendationBody () {
  const body = {
    name: faker.name.findName(),
    youtubeLink: 'https://www.youtube.com/watch?v=pwXzC6W8TDc'
  };
  return body;
} 