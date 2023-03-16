import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import noteRouters from "./routes/notesRouter";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/notes", noteRouters);

app.use((req, res, next) => {
  next(createHttpError(404, "end point not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
