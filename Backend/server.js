import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { redisClient } from "./src/config/redisDb.js";
import { master } from "./src/config/db.js";
import gigRouter from "./src/routes/gig.route.js";
import authRouter from "./src/routes/auth.route.js";
import gigBuyerRouter from "./src/routes/gig.buyer.route.js";
import getAllGigRoute from "./src/routes/gigAll.route.js";
import orderRoute from "./src/routes/order.route.js";
import conversationRoute from "./src/routes/conversation.route.js";
import userRoute from "./src/routes/user.route.js";
import reviewRoute from "./src/routes/review.route.js";
import messageRoute from "./src/routes/message.route.js";
import { ratelimiter } from "./src/middleware/rateLimit.js";
import { fullapplimiter } from "./src/middleware/globalRateLimit.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE","PATCH","UPDATE"],
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/seller", gigRouter);
app.use("/buyer", gigBuyerRouter);
app.use("/auth",ratelimiter, authRouter);
app.use("/view", getAllGigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/messages", messageRoute);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "active",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use(fullapplimiter)
const Initialize_db_Connection = async () => {
  try {
    await Promise.all([master()]);
    console.log("Both database connected succesfully");
    app.listen(process.env.BACKEND_PORT, () => {
      console.log(`Server listening at port: ${process.env.BACKEND_PORT}`);
    });
  } catch (err) {
    console.log(`Error occured while connecting to the database ${err}`);
  }
};
Initialize_db_Connection();
