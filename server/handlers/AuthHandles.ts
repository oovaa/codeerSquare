import { pbkdf2Sync, randomUUID } from 'crypto'
import type { SiginupResponse, SigninRequest, SigninResponse, SignupRequest } from '../api'
import { db } from '../datastore'
import type { Expresshandler, User } from '../types'
import { signJWT } from '../auth'

export const SignInUserHandler: Expresshandler<SigninRequest, SigninResponse> = async (req, res, next) => {
  const { login, password } = req.body

  if (!login || !password) {
    return res.sendStatus(400) // Bad Request
  }

  try {
    const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login))
    console.log('Existing user found:', existing)

    if (!existing || existing.password !== hash(password)) {
      console.log('Invalid credentials')
      return res.sendStatus(403) // Forbidden
    }

    const jwt = signJWT({ userId: existing.id })

    // If the user exists and the password matches, proceed with the response
    res.status(200).send({
      user: {
        email: existing.email,
        username: existing.username,
        id: existing.id,
        firstName: existing.firstName,
        lastName: existing.lastName
      },
      jwt
    })
  } catch (error) {
    console.error('Error during sign-in:', error)
    next(error)
  }
}

export const SignUpUserHandler: Expresshandler<SignupRequest, SiginupResponse> = async (req, res, next) => {
  const { lastName, firstName, email, password, username } = req.body

  if (!lastName || !firstName || !email || !password || !username) {
    return res.status(400).send({ error: 'all feilds are required' })
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username))

  if (existing) {
    return res.status(403).send({ error: 'user already exists' })
  }

  const newUser: User = {
    id: randomUUID(),
    firstName,
    lastName,
    email,
    password: hash(password),
    username
  }

  await db.createUser(newUser)
  const jwt = signJWT({ userId: newUser.id })
  res.status(201).send({ jwt }) // Send a response after creating the user
}

function hash(password: string): string {
  return pbkdf2Sync(password, process.env.pass_solt!, 42, 64, 'sha512').toString()
}
