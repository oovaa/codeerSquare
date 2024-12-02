import type { RequestHandler } from 'express'

export const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '- body', req.body)
  next()
}
