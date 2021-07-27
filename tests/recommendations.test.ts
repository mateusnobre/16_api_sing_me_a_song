import connection from "../src/database";
import app from "../src/app";
import supertest from "supertest";
import { createRecommendationBody } from './factories/recommendationFactory'
import { post } from'../src/controllers/recommendationController'

beforeEach(async () => {
  await connection.query("DELETE FROM recommendations");
});

const agent = supertest(app);

describe("post /recommendations", () => {
  it("returns 200 for valid params", async () => {
    const body = await createRecommendationBody();
    const result = await agent.post("/recommendations").send(body);
    const status = result.status;
    expect(status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
