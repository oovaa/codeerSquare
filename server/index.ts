import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import { createPostHAndler, listPostsHandler } from "./handlers/postHandlers";
import { SignInUserHandler, SignUpUserHandler } from "./handlers/UserHandles";
import asyncHandler from "express-async-handler";
import { initdb } from "./datastore";

(async () => await initdb())();

const app = express();
app.use(express.json());

const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body", req.body);
  next();
};

app.use(requestLoggerMilddleware);

//posts
app.get("/posts", asyncHandler(listPostsHandler));
app.post("/posts", asyncHandler(createPostHAndler));

//user
app.post("/signup", asyncHandler(SignUpUserHandler));
app.post("/signin", asyncHandler(SignInUserHandler));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("uncoaught error", err);
  res.status(500);
  return res.status(500).send("Oops we have a problem in our servers");
};

app.use(errorHandler);

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`);
});
