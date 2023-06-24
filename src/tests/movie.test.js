const supertest = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

const BASE_URL = "/api/v1/movies";

let movieId;

test("POST -> 'URL' should return status code 201 and res.body.name === movie.name", async () => {
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

test("GET ALL -> 'URL' should return status code 200, res.body.length === 1 and the movies have to be related to the actors, directors and genres", async () => {
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
});

test("PUT -> 'URL/:id' should return status code 200 and res.body.name === movie.name", async () => {
  const movie = {
    name: "Harry Potter and the Philosopher's Stone",
  };

  const res = await supertest(app).put(`${BASE_URL}/${movieId}`).send(movie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("POST -> 'URL/:id/actors' should return status code 200 and res.body.length === 1", async () => {
  const actorBody = {
    firstName: "Daniel",
    lastName: "Radcliffe",
    nationality: "English",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Daniel_Radcliffe_SDCC_2014.jpg/220px-Daniel_Radcliffe_SDCC_2014.jpg",
    birthday: "1989-07-23",
  };

  const actor = await Actor.create(actorBody);

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await actor.destroy();
});

test("POST -> 'URL/:id/directors' should return status code 200 and res.body.length === 1", async () => {
  const directorBody = {
    firstName: "Chris",
    lastName: "Columbus",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chris_Columbus.jpg/367px-Chris_Columbus.jpg",
    birthday: "1958-08-10",
  };

  const director = await Director.create(directorBody);

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await director.destroy();
});

test("POST -> 'URL/:id/genres' should return status code 200 and res.body.length === 1", async () => {
  const genreBody = {
    name: "Fantasy",
  };

  const genre = await Genre.create(genreBody);

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await genre.destroy();
});

test("DELETE -> 'URL/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
