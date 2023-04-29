const request = require("supertest");
const app = require("../app");

describe("GET /employees", () => {
  it("responds with all employees if no query params are provided", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("responds with employees that have privileges equal to 'user'", async () => {
    const response = await request(app).get("/api/employees?user=true");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.every((employee) => employee.privileges === "user")).toBe(true);
  });

  it("responds with two employees per page when the 'page' query param is provided", async () => {
    const response = await request(app).get("/api/employees?page=2");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("responds with employees that have 'black' in their badges array", async () => {
    const response = await request(app).get("/api/employees?badges=black");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.every((employee) => employee.badges.includes("black"))).toBe(true);
  });
});

describe("GET /employees/oldest", () => {
  it("responds with the oldest employee", async () => {
    const response = await request(app).get("/api/employees/oldest");
    expect(response.status).toBe(200);
    expect(response.body.age).toBe(43);
  });

});

describe("POST /api/employees", () => {
  it("creates a new employee", async () => {
    const newEmployee = {
      name: "Juan Perez",
      age: 25,
      phone: {
        personal: "555-123-456",
        work: "555-789-012",
        ext: "1234"
      },
      privileges: "admin",
      favorites: {
        artist: "Van Gogh",
        food: "sushi"
      },
      finished: [5, 12],
      badges: ["red", "yellow"],
      points: [{ points: 100, bonus: 25 }]
    };

    const response = await request(app)
      .post("/api/employees")
      .send(newEmployee);

    expect(response.status).toBe(201); // 201 for successfully created
    expect(response.body).toMatchObject(newEmployee);
  });
});

describe("GET /api/employees/NAME", () => {
  it("responds with the employee object if exists", async () => {
    const name = "Sue"; // replace with an existing employee name in your dataset
    const response = await request(app).get(`/api/employees/${name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: name })]));
  });

  it("responds with 404 if employee does not exist", async () => {
    const name = "employee que no existe!!!"; 
    const response = await request(app).get(`/api/employees/${name}`);
    expect(response.status).toBe(404);
  });
});
