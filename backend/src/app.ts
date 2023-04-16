import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import noteRouters from "./routes/notesRouter";
import userRouters from "./routes/userRouter";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validatenv";
import MongoStore from "connect-mongo";
const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      sameSite: false,
      httpOnly: true, //cookies can be accessed with http only
      secure: false, // cookies sent with https
      maxAge: 60 * 1000 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECT_STRING,
    }),
  })
);

app.use("/users", userRouters);
app.use("/notes", noteRouters);

//end point not found error handler
app.use((req, res, next) => {
  next(createHttpError(404, "end point not found"));
});

//default error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "an unknown error occurred";
  let statusCode = 500;
  if (isHttpError(err)) {
    errorMessage = err.message;
    statusCode = err.status;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;
