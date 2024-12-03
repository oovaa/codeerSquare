import { verifyJWT } from '../auth'
import { db } from '../datastore'
import type { Expresshandler } from '../types'

export const authMiddleware: Expresshandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.sendStatus(401)
  }
  try {
    const payload = verifyJWT(token)
    const user = await db.getUserById(payload.userId)
    if (!user) {
      throw 'user not found'
    }

    res.locals.userId = payload.userId

    next()
  } catch (error) {
    res.status(401).send({ error: 'bad token' })
  }
}
