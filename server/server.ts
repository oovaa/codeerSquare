import { initdb } from './datastore'
import { SignInUserHandler, SignUpUserHandler } from './handlers/AuthHandles'
import { createPostHAndler, listPostsHandler } from './handlers/postHandlers'
import { authMiddleware } from './middleware/authMiddleware'
import { errorHandler } from './middleware/errormiddleware'
import { requestLoggerMilddleware } from './middleware/loggerMiddleware'
import dotenv from 'dotenv'
import express from 'express'
import asyncHandler from 'express-async-handler'
import cors from "cors"

dotenv.config()
const port = process.env.PORT || 4000

;(async () => await initdb())()

const app = express()
app.use(cors());
app.use(express.json())

app.use(requestLoggerMilddleware)

// Public routes
app.get('/z', (req, res) => res.status(200).send({ status: 'OK all good' }))
app.post('/api/v1/signup', asyncHandler(SignUpUserHandler))
app.post('/api/v1/signin', asyncHandler(SignInUserHandler))

// Authenticated routes
// app.use(authMiddleware)
app.get('/api/v1/posts', asyncHandler(listPostsHandler))
app.post('/api/v1/posts', asyncHandler(createPostHAndler))

// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`)
})
