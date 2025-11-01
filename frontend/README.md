# 🎨 Frontend - Appointment Booking App

React + Vite frontend for the appointment booking application.

---

## 📁 Folder Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── components/              # Reusable components
│   │   ├── AppointmentForm.jsx
│   │   ├── AppointmentList.jsx
│   │   └── AvailableSlots.jsx
│   ├── pages/                   # Page components
│   │   └── Home.jsx
│   ├── services/                # API calls
│   │   └── api.js
│   ├── App.jsx                  # Main component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── vite.config.js
└── package.json
```

---

## ⚙️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **HTTP Client:** Fetch
- **Styling:** CSS / Tailwind (optional)

---

## 🚀 Setup & Run

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Create `.env` File

```env
VITE_API_BASE_URL=http://localhost:4000
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

App runs on: `http://localhost:5173`

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^5.0.0"
}
```

---

## 🌐 Build for Production

```bash
npm run build
```

Output folder: `dist/`

---

## 🔑 Environment Variables

- `VITE_BACKEND_BASE_URL` - Backend API URL

---

## ✨ Features

- ✅ View available time slots
- ✅ Book appointments with name and email
- ✅ View all booked appointments
- ✅ Cancel appointments
- ✅ Real-time slot updates

---
