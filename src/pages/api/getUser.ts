import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'
import Iron from '@hapi/iron'

import CookieService from '../../utils/cookies'

import { fauna } from '../../services/fauna'


type User = {
  email: string
  name?: string
  imageUrl?: string
  yieldMonth: number
  hoursDay: number
  daysWeek: number
  vacationWeek: number
  valueHour: number
}

type UserData = {
  ref: any
  data: User
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end()
  
  try {
    const getUser = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)

    if(getUser) {
      const response = await fauna.query<UserData>(
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold( getUser.email ))),
      )
  
      const { data: { email, name, imageUrl, yieldMonth, daysWeek, hoursDay, vacationWeek, valueHour }, ref } = response
  
      const user = {
        email,
        name,
        image: imageUrl,
        yieldMonth,
        daysWeek,
        hoursDay,
        vacationWeek,
        valueHour: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valueHour),
        ref
      }
  
      res.status(200).json({ user })
    }

  } catch (error) {
    res.status(200).json({ })
  }


}