import { prismaClient } from "../routes/index.js";
import { sendSlackMessage } from "../utils/slack.js";

export const createTaskController = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const tasks = await prismaClient.task.create({
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id,
      },
    });

    const due =
      tasks.dueDate instanceof Date
        ? tasks.dueDate.toISOString().slice(0, 10)
        : "N/A";

    const message = [
      "*New task created*",
      `Title: ${tasks.title}`,
      `Description: ${tasks.description || "—"}`,
      `Status: ${tasks.status}`,
      `Due date: ${due}`,
      `Created by: ${req.user.name}`,
    ].join("\n");

    try {
      await sendSlackMessage(message);
    } catch (slackErr) {
      console.error("Slack notification failed:", slackErr);
    }

    return res.status(200).json({ mesage: "Task Created Successfully", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const taskId = await prismaClient.task.findUnique({
      where: { id: Number(id) },
    });

    if (!taskId) {
      return res.status(404).json({ message: "Task not found with this id" });
    }

    const updateTask = await prismaClient.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    return res
      .status(200)
      .json({ mesage: "Task updated Successfully", updateTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const deleteTask = await prismaClient.task.delete({
      where: { id: Number(req.params.id) },
    });

    return res
      .status(200)
      .json({ message: "Task deleted successfully", deleteTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllTaskController = async (req, res) => {
  try {
    const tasks = await prismaClient.task.findMany({
      where: { userId: req.user.id },
    });

    return res
      .status(200)
      .json({ message: "Task fetched successfully", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
