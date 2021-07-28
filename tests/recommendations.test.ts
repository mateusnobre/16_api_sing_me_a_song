import connection from "../src/database";
import app from "../src/app";
import supertest from "supertest";
import { createRecommendation, createRecommendationBody, create10Recommendations, getScore } from './factories/recommendationFactory'

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
  it("returns 400 for empty params", async () => {
    const body = {name: '',
                  youtubeLink: ''
    };
    const result = await agent.post("/recommendations").send(body);
    const status = result.status;
    expect(status).toEqual(400);
  });
  it("returns 400 for non string name", async () => {
    const body = {name: 2,
                  youtubeLink: 'https://www.youtube.com/watch?v=pwxzc6w8tdc'
    };
    const result = await agent.post("/recommendations").send(body);
    const status = result.status;
    expect(status).toEqual(400);
  });
  it("returns 400 for non youtube link", async () => {
    const body = {name: 'name_test',
                  youtubeLink: 'https://www.google.com/watch?v=pwxzc6w8tdc'
    };
    const result = await agent.post("/recommendations").send(body);
    const status = result.status;
    expect(status).toEqual(400);
  });
});

describe("post /recommendations/:id/upvote", () => {
  it("returns 200 for valid recommendation id", async () => {
    const id = await createRecommendation();
    const initialScore = await getScore(id);
    const result = await agent.post(`/recommendations/${id}/upvote`)
    const status = result.status;
    const finalScore = await getScore(id);
    expect(status).toEqual(200);
    expect(finalScore).toEqual(initialScore+1);
  });
});

describe("post /recommendations/:id/downvote", () => {
  it("returns 200 for valid recommendation id", async () => {
    const id = await createRecommendation();
    const initialScore = await getScore(id);
    const result = await agent.post(`/recommendations/${id}/downvote`)
    if (initialScore <= -5){
      const finalScore = await getScore(id);
      expect(finalScore).toEqual(initialScore-1);
    }
    const status = result.status;
    expect(status).toEqual(200);
  });
});

describe("get /recommendations/random", () => {
  it("returns 200 if we have recommendations", async () => {
    await create10Recommendations();
    const result = await agent.get(`/recommendations/random`)
    const status = result.status;
    expect(status).toEqual(200);
  });
  it("returns 404 if we don't have recommendations", async () => {
    const result = await agent.get(`/recommendations/random`)
    const status = result.status;
    expect(status).toEqual(404);
  });
});

describe("get recommendations/top/:amount", () => {
  it("returns 200 if we have recommendations", async () => {
    await create10Recommendations();
    let amount = Math.floor(Math.random() * 10) + 1;
    const result = await agent.get(`/recommendations/top/${amount}`)
    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.length).toEqual(amount);
  });
  it("returns 404 if we don't have recommendations", async () => {
    let amount = Math.floor(Math.random() * 10) + 1;
    const result = await agent.get(`/recommendations/top/${amount}`)
    const status = result.status;
    expect(status).toEqual(404);
  });
});




afterAll(() => {
  connection.end();
});
