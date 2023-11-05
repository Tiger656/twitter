import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Role } from "types/dist/src/auth/acl";

export type User = {
    isLoggedIn: boolean;
    // login: string;
    // avatarUrl: string;
    accessToken: string;
    _id: string;
    username: string;
    roles: Role[];
    iat: number;

  };
  
  export default withIronSessionApiRoute(userRoute, sessionOptions);
  
  async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    if (req.session.user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      res.json({
        ...req.session.user,
        isLoggedIn: true,
      });
    } else {
      res.json({
        isLoggedIn: false,
        accessToken: "",
        _id: null,
        username: "",
        roles: [],
        iat: null
        // login: "",
        // avatarUrl: "",
      });
    }
  }