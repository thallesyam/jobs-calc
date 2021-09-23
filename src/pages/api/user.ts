import { NextApiRequest, NextApiResponse } from "next"
import Iron from '@hapi/iron'
import CookieService from '../../utils/cookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (error) {
    res.status(401).end()
  }

  res.json(user)
}