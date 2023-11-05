import type { User } from './user'

import { Octokit } from 'octokit'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from "jwt-decode"
//const octokit = new Octokit()

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body
  //http://localhost:3000/auth/login
  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username })
    const response = await fetch("http://localhost:3000/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    })

    const {access_token} = await response.json()
    const decodedJwt = jwt_decode(access_token) as any;


    //const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User
    const user = { isLoggedIn: true, accessToken: access_token, _id: decodedJwt._id,
      username: decodedJwt.username, roles: decodedJwt.roles, iat: decodedJwt.iat } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)