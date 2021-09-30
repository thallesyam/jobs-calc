import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna'


type User = {
  id: {
    '@ref': {
      id: number
    }
  }
  name: string
  imageUrl: string
  yieldMonth: number
  hoursDay: number
  daysWeek: number
  vacationWeek: number
}

type UserData = {
  data: User
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
    
  const { id ,name, imageUrl, yieldMonth, hoursDay, daysWeek, vacationWeek }: User = req.body

  const user = {
    name,
    imageUrl,
    yieldMonth,
    hoursDay,
    daysWeek,
    vacationWeek,
    valueHour: yieldMonth / (daysWeek * hoursDay),
  }


  const { data } = await fauna.query<UserData>(
    q.Update(q.Ref(q.Collection("users"), id["@ref"].id), { data: user })
  )


  res.status(200).json({ data })

  try {

  } catch (error) {
    res.status(200).json({ })
  }


}