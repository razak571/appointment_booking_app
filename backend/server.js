import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/mongoDB.js";
import appointmentsRouter from "./Routes/appointmentsRoutes.js";

const app = express();
const frontendBaseURL = process.env.FRONTEND_BASE_URL;

// middlewares
app.use(
  cors({
    origin: frontendBaseURL,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

//api endpoints
app.use("/api/appointments", appointmentsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on ${PORT} port`);
});
