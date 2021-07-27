import connection from "../src/database";
import app from "../src/app";
import supertest from "supertest";
import { createRecommendation, createRecommendationBody } from './factories/recommendationFactory'

beforeEach(async () => {
  await connection.query("DELETE FROM recommendations");
});

const agent = supertest(app);

describe("post /recommendations", () => {
  it("returns 201 for valid params", async () => {
    const body = await createRecommendationBody();
    const result = await agent.post("/recommendations").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });
});

describe("post /recommendations/:id/upvote", () => {
  it("returns 200 for valid recommendation id", async () => {
    const id = await createRecommendation();
    const result = await agent.post(`/recommendations/${id}/upvote`)
    const status = result.status;
    expect(status).toEqual(200);
  });
});

describe("post /recommendations/:id/downvote", () => {
  it("returns 200 for valid recommendation id", async () => {
    const id = await createRecommendation();
    const result = await agent.post(`/recommendations/${id}/downvote`)
    const status = result.status;
    expect(status).toEqual(200);
  });
});


afterAll(() => {
  connection.end();
});
