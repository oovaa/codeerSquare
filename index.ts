import express, { type RequestHandler } from 'express'
import { createPostHAndler, listPostsHandler } from './handlers/postHandlers'
const app = express()
app.use(express.json())

const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '- body', req.body);
  next()
}

app.use(requestLoggerMilddleware)

app.get('/posts', listPostsHandler)
app.post('/posts', createPostHAndler)

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`)
})
