# 🧠 TaskTracker

A full-stack Task & Project Management web application built using **React**, **Node.js**, **Express**, and **MongoDB**. Users can sign up, create projects, and manage tasks inside each project.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📁 Create, View, Update, Delete Projects
- ✅ Add and manage tasks inside projects
- 🔄 Persistent session using tokens and cookies
- 🧼 Fully responsive and modern UI
- 📦 RESTful API

---

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- dotenv

---

## 📂 Folder Structure
contetn-management/
│
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios instances or API calls
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components (e.g., Dashboard, Login)
│   │   ├── styles/             # Tailwind or custom CSS
│   │   └── main.jsx
│   ├── .env                   # Frontend environment config
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/                # DB connection, config files
│   ├── controllers/           # Request handlers
│   ├── middlewares/           # JWT auth, error handlers
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes (user, project, task)
│   ├── utils/                 # Helper functions (optional)
│   ├── server.js              # Entry point
│   └── .env                   # Backend environment config
│
              
├── .gitignore
└── README.md

