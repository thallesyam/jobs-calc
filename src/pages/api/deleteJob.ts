import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { jobId } = req.body
  
  try {    
    await fauna.query(
      q.Delete(q.Ref(q.Collection("jobs"), jobId))
    )
    
    res.status(200).json({})

  } catch (error) {
    console.log(error)

    res.status(200).json({ })
  }


}