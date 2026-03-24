import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL;

let client;

function getClient() {
  if (!token) return null;
  if (!client) client = new WebClient(token);
  return client;
}

export async function sendSlackMessage(text) {
  try {
    const c = getClient();
    if (!c || !channel) {
      console.warn("[slack] SLACK_BOT_TOKEN or SLACK_CHANNEL is not set");
      return;
    }
    await c.chat.postMessage({ channel, text });
    console.log("[slack] Message sent successfully");
  } catch (error) {
    console.error("[slack] Error sending message:", error);
  }
}
