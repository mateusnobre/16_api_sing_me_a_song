import faker from "faker";
import connection from "../../src/database";

export async function createRecommendation () {
  const body = await createRecommendationBody();

  await connection.query(
    `INSERT INTO recommendations 
    (name, "youtubeLink")
    VALUES ($1, $2)
    `,
    [body.name, body.youtubeLink]
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