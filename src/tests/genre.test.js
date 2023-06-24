const supertest = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/genres";

let genreId;

test("POST -> 'URL' should return status code 201", async () => {
  const genre = {
    name: "Fantasy",
  };

  const res = await supertest(app).post(BASE_URL).send(genre);

  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(genre.name);
});

test("GET ALL -> 'URL' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL/:id' should return status code 200", async () => {
  const genre = {
    name: "Fantasy",
  };

  const res = await supertest(app).put(`${BASE_URL}/${genreId}`).send(genre);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test("DELETE -> 'URL/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(204);
});
