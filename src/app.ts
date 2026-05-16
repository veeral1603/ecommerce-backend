import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { globalErrorHandler } from "./utils/globalErrorHandler";

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools like Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
