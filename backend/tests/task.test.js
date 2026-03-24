// tests/task.test.js
import { jest } from "@jest/globals";

jest.unstable_mockModule("../routes/index.js", () => ({
  prismaClient: {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.unstable_mockModule("../utils/slack.js", () => ({
  sendSlackMessage: jest.fn().mockResolvedValue(undefined),
}));

const { createTaskController } =
  await import("../controllers/taskController.js");

// Unit test — no HTTP server needed
test("create task without title returns 400", async () => {
  const req = { body: {}, user: { id: 1 } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  await createTaskController(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
});
