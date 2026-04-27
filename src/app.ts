import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes"
import taskRoutes from "./routes/task.routes"
import userRoutes from "./routes/user.routes"
import analyticsRoutes from "./routes/analytics.routes"



dotenv.config();
// console.log("MONGO:", process.env.MONGO_URI);
const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/tasks", taskRoutes)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/analytics", analyticsRoutes)

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server started")
  })
}

export default app