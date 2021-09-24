import { NextApiRequest, NextApiResponse } from "next"
import { Magic } from '@magic-sdk/admin'
import Iron from '@hapi/iron'

import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna'
import CookieService from '../../utils/cookies'

let magic = new Magic(process.env.MAGIC_SECRET_KEY)

type User = {
  email: string
  name?: string
  image?: string
}

type UserData = {
  data: User
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const request = magic.utils.parseAuthorizationHeader(req.headers.authorization)
  const userMagic = await magic.users.getMetadataByToken(request)

  try {
    const response = await fauna.query<UserData>(
      q.If(
        q.Not(
          q.Exists(
            q.Match(q.Index('user_by_email'), q.Casefold( userMagic.email ))
          )
        ),
        q.Create(q.Collection('users'), { data: { email: userMagic.email } }),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold( userMagic.email )))
      )
    )

    const { data: { email } } = response

    const user = {
      email
    }

    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
    CookieService.setTokenCookie(res, token)

    res.status(200).json({ user })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }


}