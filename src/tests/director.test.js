const supertest = require("supertest");
const app = require("../app");

let directorId;

const BASE_URL = "/api/v1/directors";

test("POST -> 'URL' should return status code 201", async () => {
  const director = {
    firstName: "Chris",
    lastName: "Columbus",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chris_Columbus.jpg/367px-Chris_Columbus.jpg",
    birthday: "1958-08-10",
  };

  const res = await supertest(app).post(BASE_URL).send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(director.name);
});

test("GET ALL -> 'URL' sould return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT - 'URL/:id' should return status code 200", async () => {
  const director = {
    firstName: "Chris",
  };

  const res = await supertest(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(director);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(director.name);
});

test("DELETE -> 'URL/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});
