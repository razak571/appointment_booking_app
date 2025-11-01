# 🔧 Backend - Appointment Booking API

Express.js + MongoDB backend for the appointment booking application.

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   └── appointmentController.js # Business logic
├── models/
│   └── Appointment.js           # Mongoose schema
├── routes/
│   └── appointmentRoutes.js     # API endpoints
├── utils/
│   └── slotGenerator.js         # Generate weekly slots
├── .env                         # Environment variables
├── server.js                    # Entry point
└── package.json
```

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Middleware:** CORS, dotenv

---

## 🚀 Setup & Run

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Create `.env` File

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_BASE_URL=http://localhost:5173
```

### 3️⃣ Start Server

```bash
npm run dev
```

Server runs on: `http://localhost:4000`

---

## 📡 API Endpoints

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/available`        | Get available slots  |
| POST   | `/api/appointments`     | Book appointment     |
| GET    | `/api/appointments`     | Get all appointments |
| DELETE | `/api/appointments/:id` | Cancel appointment   |

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "nodemon": "^3.0.1"
}
```

---

## 🔑 Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGO_URI` - MongoDB connection string
- `FRONTEND_BASE_URL` - Frontend URL for CORS

---
