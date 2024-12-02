import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('uncoaught error', err)
  res.status(500)
  return res.status(500).send('Oops we have a problem in our servers')
}
