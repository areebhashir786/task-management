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

```
task-management/
│
├── frontend/         # React frontend
├── backend/          # Node.js backend
│   └── prisma/       # Prisma schema & migrations
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-management.git
cd task-management
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/taskdb"
JWT_SECRET=your_secret_key
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_CHANNEL=your_slack_channel
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start backend server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Running Tests

```bash
cd backend
npm run test
```

---

## 🔔 Slack Integration

This app sends task updates to Slack whenever a task is created or updated.

### Setup

1. Create a Slack App at [api.slack.com](https://api.slack.com)
2. Add a Bot User
3. Enable required permissions (`chat:write`)
4. Install the app to your workspace
5. Copy the Bot Token and Channel ID
6. Add them to your `.env` file

---

## 🚀 Future Improvements

- 🔄 Real-time updates with WebSockets
- 📱 Better mobile responsiveness
- 🧑‍🤝‍🧑 Team collaboration features
- 📅 Task deadlines & reminders

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Author

**Areeb Hashir**
