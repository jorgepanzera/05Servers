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
