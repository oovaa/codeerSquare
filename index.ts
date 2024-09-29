import express, { type RequestHandler } from 'express'
import { db } from './datastore'
const app = express()
app.use(express.json())

const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '- body', req.body);
  next()
}

app.use(requestLoggerMilddleware)

app.get('/posts', (req, res) => {
  res.send({ posts: db.listPost() })
})

app.post('/posts', (req, res) => {
  const newpost = req.body
  db.createPost(newpost)
  res.sendStatus(201)
})

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`)
})
