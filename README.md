# 🍬 SweetShelf – Sweet Shop Management System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

SweetShelf is a full-stack Sweet Shop Management System designed and developed using modern web technologies and Test-Driven Development (TDD) principles. The application enables users to browse and purchase sweets, while administrators can manage inventory with secure, role-based access.

This project was built as part of a TDD Kata to demonstrate backend API design, frontend development, database integration, authentication, testing, clean coding practices, and responsible AI usage.

## 🔗 Live Demo

*Frontend:* [https://your-frontend-url](https://your-frontend-url)  
*Backend API:* [https://your-backend-url](https://your-backend-url)

## 🛠 Tech Stack

### Frontend
- ⚛️ **React** (Vite)
- 📘 **TypeScript**
- 🎨 **Tailwind CSS**
- 🔄 **Axios**
- 🧭 **React Router**

### Backend
- 🟢 **Node.js**
- 🚀 **Express.js**
- 📘 **TypeScript**
- 🍃 **MongoDB + Mongoose**
- 🔐 **JWT Authentication**

### Testing
- 🃏 **Jest**
- 🧪 **Supertest**

### Dev & Tooling
- 📝 **ESLint**
- 🎨 **Prettier**
- 📮 **Postman**
- 🐙 **Git & GitHub**

## ✨ Features

### 👤 User Features
- 🔐 User registration and login
- 🛡️ Secure JWT-based authentication
- 👀 View all available sweets
- 🔍 Search sweets by name, category, and price range
- 🛒 Purchase sweets (disabled when out of stock)

### 👑 Admin Features
- ➕ Add new sweets
- ✏️ Update sweet details
- 🗑️ Delete sweets
- 📦 Restock inventory
- 🔒 Role-based access control (Admin-only routes)

## 🧱 System Architecture

```
React SPA (Frontend)
       │
       │ JWT (HTTP)
       │
Express API (Backend)
       │
       │ Mongoose
       │
MongoDB Database
```

## 📂 Project Structure

### Backend
```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   └── sweets/
│   ├── middlewares/
│   ├── config/
│   ├── app.ts
│   └── server.ts
└── tests/
```

### Frontend
```
frontend/
├── src/
│   ├── auth/
│   ├── components/
│   ├── pages/
│   ├── types/
│   └── api/
```

## 🚀 Getting Started

### Prerequisites
- 🟢 Node.js (v18+ recommended)
- 🍃 MongoDB (local or MongoDB Atlas)
- 📦 npm or pnpm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend root:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 🧪 Testing

Backend tests are written using Jest and Supertest.

```bash
cd backend
npm test
```

### Test Coverage Includes:
- 🔐 Authentication logic
- 🍬 Sweet inventory operations
- 🛒 Purchase and stock validation
- ⚠️ Error handling

## 📸 Screenshots

*Add screenshots of Login, Dashboard, Admin Panel here*

## 🤖 My AI Usage

### AI Tools Used
- 🤖 **ChatGPT**
- 👨‍💻 **GitHub Copilot**

### How I Used AI Tools

I used AI tools as productivity enhancers, not as replacements for understanding or decision-making.

#### ChatGPT
I used ChatGPT to:
- 🏗️ Brainstorm the overall system architecture
- 🔌 Design REST API endpoint structure
- 💻 Generate initial boilerplate code for Express services and React components
- 🔍 Suggest edge cases and test scenarios for inventory management
- 📖 Improve code readability and documentation
- 📋 Review and refine the README content

#### GitHub Copilot
I used GitHub Copilot to:
- ⚡ Speed up repetitive coding tasks
- 🔧 Autocomplete DTOs, interfaces, and test cases
- 🧪 Assist in writing Jest test cases
- 🔄 Suggest small refactors during development

### Reflection on AI Impact

Using AI tools significantly improved my development speed and confidence, especially during:
- 🏁 Initial project setup
- 🔁 Writing repetitive boilerplate
- 🎯 Identifying potential edge cases early

However, I made all architectural decisions myself and ensured I fully understood every line of code. AI acted as a co-pilot, not an autopilot.

### This experience helped me learn how to:
- 🤝 Use AI responsibly
- ✅ Validate AI suggestions critically
- 👑 Maintain code ownership and accountability

## 🧠 Interview Discussion Readiness

I am comfortable discussing:
- 📍 Where and why AI was used
- ⚖️ What parts were AI-assisted vs self-implemented
- 🔍 How I validated AI-generated code
- ⚖️ Trade-offs and alternative approaches
- 👔 How AI fits into a professional development workflow

## 📌 Future Enhancements

- 📄 Pagination and sorting
- 🖼️ Image upload for sweets
- 📜 Order history
- 🔄 Refresh tokens
- 🔄 CI/CD pipeline
- 🐳 Docker support

## 📜 License

This project is for educational and evaluation purposes.

---

<div align="center">
  <p>Made with ❤️ for sweet lovers</p>
  <p>Built with modern web technologies and TDD principles</p>
</div>
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
