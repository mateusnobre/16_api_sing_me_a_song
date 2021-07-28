import faker from "faker";
import connection from "../../src/database";

export async function createRecommendation (score = 11) {
  const body = await createRecommendationBody();

  await connection.query(
    `INSERT INTO recommendations 
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
    `,
    [body.name, body.youtubeLink, score]
  );
  const id = await connection.query(`
        SELECT id
        FROM recommendations
        ORDER BY id DESC
        LIMIT 1`)
  return id.rows[0].id;
} 

export async function createRecommendationBody () {
  const body = {
    name: faker.name.findName(),
    youtubeLink: 'https://www.youtube.com/watch?v=pwxzc6w8tdc'
  };
  return body;
} 

export async function create10Recommendations() {
  for(let i = 0; i < 7; i++){
    await createRecommendation()
  }
  for(let i = 0; i < 3; i++){
    await createRecommendation(-4);
  }
  return;
}

export async function getScore(id:number) {
  const recommendation = await connection.query(
    `SELECT score 
    FROM recommendations 
    WHERE id = $1`,
    [id]
  );
  return recommendation.rows[0].score;
}