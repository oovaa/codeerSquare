import express from 'express'
import { createPostHAndler, listPostsHandler } from './handlers/postHandlers'
import { SignInUserHandler, SignUpUserHandler } from './handlers/AuthHandles'
import asyncHandler from 'express-async-handler'
import { initdb } from './datastore'
import { requestLoggerMilddleware } from './middleware/loggerMiddleware'
import { errorHandler } from './middleware/errormiddleware'
import dotenv from 'dotenv'
import { authMiddleware } from './middleware/authMiddleware'

dotenv.config()
const port = process.env.PORT || 4000

;(async () => await initdb())()

const app = express()
app.use(express.json())

app.use(requestLoggerMilddleware)

//user
app.get('/z', (req,res) => res.status(200).send({status: "OK"}))
app.post('/signup', asyncHandler(SignUpUserHandler))
app.post('/signin', asyncHandler(SignInUserHandler))

app.use(authMiddleware)
//posts
app.get('/posts', asyncHandler(listPostsHandler))
app.post('/posts', asyncHandler(createPostHAndler))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`hi there app is on http://0.0.0.0:${port}`)
})
