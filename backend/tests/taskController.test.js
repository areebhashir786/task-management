// tests/taskController.test.js
import { jest } from "@jest/globals";

// Mock prismaClient BEFORE importing the controller
jest.unstable_mockModule("../routes/index.js", () => ({
  prismaClient: {
    task: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

// Mock slack utility
jest.unstable_mockModule("../utils/slack.js", () => ({
  sendSlackMessage: jest.fn().mockResolvedValue(undefined),
}));

// Dynamic imports AFTER mocks are set up
const {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getAllTaskController,
} = await import("../controllers/taskController.js");

const { prismaClient } = await import("../routes/index.js");

describe("createTaskController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 400 if title is missing", async () => {
    const req = { body: {}, user: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  it("should return 200 and create a task when title is provided", async () => {
    const fakeTask = {
      id: 1,
      title: "Test Task",
      description: "Testing",
      status: "Pending",
      dueDate: null,
      userId: 1,
    };

    prismaClient.task.create.mockResolvedValue(fakeTask);

    const req = {
      body: { title: "Test Task", description: "Testing", status: "Pending" },
      user: { id: 1, name: "John" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createTaskController(req, res);

    expect(prismaClient.task.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("updateTaskController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 400 if title or description is missing", async () => {
    const req = {
      params: { id: "1" },
      body: { title: "Only title" },
      user: { id: 1 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 if task not found", async () => {
    prismaClient.task.findUnique.mockResolvedValue(null);

    const req = {
      params: { id: "99" },
      body: { title: "Title", description: "Desc" },
      user: { id: 1 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("deleteTaskController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 200 on successful delete", async () => {
    prismaClient.task.delete.mockResolvedValue({ id: 1 });

    const req = { params: { id: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("getAllTaskController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 200 with tasks", async () => {
    prismaClient.task.findMany.mockResolvedValue([{ id: 1, title: "Task 1" }]);

    const req = { user: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getAllTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
