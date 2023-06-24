const supertest = require("supertest");
const app = require("../app");

let actorId;

const BASE_URL = "/api/v1/actors";

test("POST -> 'URL' should return status 201", async () => {
  const actor = {
    firstName: "Daniel",
    lastName: "Radcliffe",
    nationality: "English",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Daniel_Radcliffe_SDCC_2014.jpg/220px-Daniel_Radcliffe_SDCC_2014.jpg",
    birthday: "1989-07-23",
  };

  const res = await supertest(app).post(BASE_URL).send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(actor.name);
});

test("GET ALL -> 'URL' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> URL/:id' should return status code 200", async () => {
  const actor = {
    firstName: "Daniel",
  };

  const res = await supertest(app).put(`${BASE_URL}/${actorId}`).send(actor);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actor.name);
});

test("DELETE -> 'URL/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});
