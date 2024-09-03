import express from 'express'

const app = express()

const posts: any[] = []

posts.push('hi')

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`)
})
