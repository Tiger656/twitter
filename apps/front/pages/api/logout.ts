import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from 'pages/api/user'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  //res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
  res.json({ isLoggedIn: false, accessToken: "", _id: null,
  username: "",
  roles: [],
  iat: null})

}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)