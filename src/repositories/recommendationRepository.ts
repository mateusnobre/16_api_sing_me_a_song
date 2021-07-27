import connection from "../database";

async function create(name: string, youtubeLink: string) {
  const result = await connection.query(
    `
    INSERT INTO sessions
    (token, "userId")
    VALUES ($1, $2)
    RETURNING *
  `,
    [name, youtubeLink]
  );

  return false;
}

export { create };