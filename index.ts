import express, { type RequestHandler } from 'express'

const app = express()
app.use(express.json())

const posts: string[] = []

const timer: RequestHandler = (req, res, next) => {
  console.log(Date.now());
  next()
}
const logger: RequestHandler = (req, res, next) => {
  console.log("new request:", req.path, req.body);
  next()
}

app.use(logger)
app.use(timer)


app.get('/posts', (req, res) => {
  res.send({ posts })
})

app.post('/posts', (req, res) => {
  // console.log("body: ", req.body)
  const newpost = req.body
  posts.push(newpost)
  res.sendStatus(201)
})

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`)
})
