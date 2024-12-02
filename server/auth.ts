import type { Jwtobject } from './types'
import Jwt from 'jsonwebtoken'

export function signJWT(obj: Jwtobject): string {
  return Jwt.sign(obj, getJWTsecret(), {
    expiresIn: '30000ms'
  })
}

function getJWTsecret(): string {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    console.error('no secret')
    process.exit(1)
  }
  return secret
}

export function verifyJWT(token: string): Jwtobject {
  return Jwt.verify(token, getJWTsecret()) as Jwtobject
}
