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

async function getId(id:number) {
  const recommendation = await connection.query(`
        SELECT *
        FROM recommendations
        WHERE id = $1`,
    [id]);
  if (recommendation.rows.length === 0) {
    return false;
  }
  else { return true} 
}

async function changeScore(id:number, amount:number) {
  await connection.query(`
        UPDATE recommendations
        SET score = score + $1
        WHERE id = $2`,
    [amount ,id]);
  await connection.query(`
        DELETE FROM recommendations
        WHERE score < -5`);
  return;
}

export { create, getId, changeScore };