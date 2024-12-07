import type { Jwtobject } from '../shared'
import Jwt from 'jsonwebtoken'

export function signJWT(obj: Jwtobject): string {
  return Jwt.sign(obj, getJWTsecret(), {
    expiresIn: '15d'
  })
}

/**
 * Retrieves the JWT secret from the environment variables.
 *
 * @returns {string} The JWT secret.
 * @throws Will terminate the process if the JWT secret is not found in the environment variables.
 */
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
