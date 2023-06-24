const supertest = require("supertest");
const app = require("../app");
require("../models");

const BASE_URL = "/api/v1/movies";

let movieId;

test("POST -> 'URL' should return status code 201", async () => {
  const movie = {
    name: "Harry Potter and the Philosopher's Stone",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg",
    synopsis:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem assumenda, possimus veniam similique saepe natus eos repudiandae nostrum nemo. Illum nulla alias modi aliquid magni, magnam necessitatibus quae reprehenderit error!",
    releaseYear: 2001,
  };

  const res = await supertest(app).post(BASE_URL).send(movie);

  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movie.name);
});

test("GET ALL -> 'URL' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL/:id' should return status code 200", async () => {
  const movie = {
    name: "Harry Potter and the Philosopher's Stone",
  };

  const res = await supertest(app).put(`${BASE_URL}/${movieId}`).send(movie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("DELETE -> 'URL/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
