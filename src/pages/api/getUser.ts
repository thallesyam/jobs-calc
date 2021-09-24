import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'
import Iron from '@hapi/iron'
import CookieService from '../../utils/cookies'

import { fauna } from '../../services/fauna'


type User = {
  email: string
  name?: string
  image?: string
}

type UserData = {
  data: User
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end()
    
  try {
    const getUser = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)

    if(getUser.email) {
      const response = await fauna.query<UserData>(
        q.If(
          q.Match(q.Index('user_by_email'), q.Casefold( getUser.email )),
          q.Get(q.Match(q.Index('user_by_email'), q.Casefold( getUser.email ))),
          null
        )
      )
  
      const { data: { email } } = response
  
      const user = {
        email
      }
  
      res.status(200).json({ user })
    }

  } catch (error) {
    res.status(200).json({ })
  }


}