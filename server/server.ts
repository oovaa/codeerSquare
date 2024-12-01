import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import { createPostHAndler, listPostsHandler } from "./handlers/postHandlers";
import { SignInUserHandler, SignUpUserHandler } from "./handlers/AuthHandles";
import asyncHandler from "express-async-handler";
import { initdb } from "./datastore";
import { requestLoggerMilddleware } from "./middleware/loggerMiddleware";
import { errorHandler } from "./middleware/errormiddleware";

(async () => await initdb())();

const app = express();
app.use(express.json());



app.use(requestLoggerMilddleware);

//posts
app.get("/posts", asyncHandler(listPostsHandler));
app.post("/posts", asyncHandler(createPostHAndler));

//user
app.post("/signup", asyncHandler(SignUpUserHandler));
app.post("/signin", asyncHandler(SignInUserHandler));


app.use(errorHandler);

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`);
});
