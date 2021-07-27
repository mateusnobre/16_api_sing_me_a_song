import connection from "../database";

async function create(name: string, youtubeLink: string) {
  await connection.query(
    `INSERT INTO recommendations 
    (name, "youtubeLink")
    VALUES ($1, $2)
    `,
    [name, youtubeLink]
  );
  const recommendation = await connection.query(`
        SELECT *
        FROM recommendations
        ORDER BY id DESC
        LIMIT 1`)
  return recommendation.rows[0];
}

export { create };