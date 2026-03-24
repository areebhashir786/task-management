# 🚀 Task Management App

A full-stack task management application built with modern web technologies. This app helps users manage tasks efficiently with real-time notifications and a clean user interface.

---

## ✨ Features

- ✅ User Authentication (Register/Login)
- 📝 Create, update, delete tasks
- 📊 Organized task management
- 🔔 Slack notifications for updates
- 🧪 Unit & integration testing with Jest
- 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- Prisma ORM
- MySQL

### Other Tools

- Slack API (Notifications)
- Jest (Testing)

---

## 📂 Project Structure

task-manager/
│
├── client/ # React frontend
├── server/ # Node.js backend
├── prisma/ # Prisma schema & migrations
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

2️⃣ Setup Backend

cd server
npm install

Create a .env file in the server folder:

PORT=
DATABASE_URL=
JWT_SECRET=
SLACK_BOT_TOKEN=
SLACK_CHANNEL=

Run Prisma migrations:

npx prisma migrate dev

Start backend server:
npm run dev
```

3️⃣ Setup Frontend

cd client
npm install
npm run dev
