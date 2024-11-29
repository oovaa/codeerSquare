import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import { createPostHAndler, listPostsHandler } from './server/handlers/postHandlers'
const app = express()
app.use(express.json())

const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '- body', req.body);
  next()
}

app.use(requestLoggerMilddleware)

app.get('/posts', listPostsHandler)
app.post('/posts', createPostHAndler)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('uncoaught error', err);
  res.status(500)
  return res.status(500).send('Oops we have a problem in our servers')
}

app.use(errorHandler)

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`);
})
