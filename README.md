# 🗓️ MERN Appointment Booking App (Full Stack)

A full-stack appointment booking application built using **MERN Stack (MongoDB, Express, React, Node.js)**.

This app allows users to:

- View available time slots (Mon–Fri, 9:00 AM – 5:00 PM)
- Book new appointments
- View all booked appointments
- Cancel existing appointments
- Prevent past slot booking and weekend bookings

---

## 📁 Project Structure

```
mern-appointment-booking/
│
├── backend/                          # Express + MongoDB backend (API server)
│   ├── config/                       # Configuration files
│   ├── controllers/                  # Route controllers
│   ├── models/                       # MongoDB models
│   ├── routes/                       # API routes
│   ├── utils/                        # Helper functions
│   ├── .env                          # Environment variables
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                         # React frontend (Vite)
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API service calls
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── postman_collection.json           # Postman API Collection for testing
│
└── README.md                         # This file
```

---

## ⚙️ Tech Stack

**Frontend:** React (Vite)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Tools:** Postman, dotenv, CORS  
**Deployment:** Render (Free Tier)

---

## 🚀 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/mern-appointment-booking.git
cd mern-appointment-booking
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=4000
MONGO_URI=<your-mongodb-connection-string>
FRONTEND_BASE_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 🧪 API Testing (Postman)

Import the included Postman Collection: `appointment_booking_app_api_postman_collection.json`

It contains all endpoints:

- `GET /api/available` → Fetch available slots
- `POST /api/appointments` → Create new appointment
- `GET /api/appointments` → Fetch all appointments
- `DELETE /api/appointments/:id` → Cancel appointment

Make sure to set environment variables in Postman:

- `base_url` = `http://localhost:4000`
- `slot` = `2025-10-27T07:30:00.000Z`

---

## 🧪 Important Testing Notes:

The app prevents booking of past time slots as per business logic.

`if (start.getTime() <= now.getTime()) {
  return res.status(400).json({ success: false, message: "Cannot book past slots" });
}`

- Since today is a weekend (Saturday/Sunday), the backend blocks new bookings (Mon–Fri only).
  For testing during weekends, you can temporarily comment out the above validation or test on a Monday onwards, when new week slots automatically appear.

`Alternative Option for Reviewers:`

If you’d like to test bookings on a weekend, simply:

- Open /Controllers/appointmentsController.js

- Comment out the “past slots” check temporarily (already marked in code)

- Restart the backend (or use deployed version with test mode)

---

## 🌐 Deployment

`⚙️ Deployment Info`

Frontend (Render):
🔗 https://appointmentapp-ova0.onrender.com

Backend (Render):
🔗 https://appointmentapp-server.onrender.com

⚠️ Note: Both apps are hosted on Render’s free tier.

Render automatically spins down the service after inactivity. First load may take 50–60 seconds to start. Subsequent requests are instant.

💻 GitHub Repository 🔗 https://github.com/razak571/appointment_booking_app

---

## 💡 Features Summary

✅ Weekly slot generation (Mon–Fri, 9AM–5PM)  
✅ Slot-wise booking system  
✅ Prevents weekend and past-time booking  
✅ Cancel and refresh appointments in real-time  
✅ Organized code with modular structure  
✅ Postman collection for quick testing  
✅ Ready for deployment

---

## 👨‍💻 Author

**Razak Attar**  
📧 abdulr87273@gmail.com  
GitHub: https://github.com/razak571

---
