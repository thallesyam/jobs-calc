import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna'

type JobDataProps = {
  userId: {
    '@ref': {
      id: number
    }
  }
  jobId: number
  jobname: string
  hoursDayjob: number
  allhourJob: number
  jobValue: number
}

type Job = {
  data: JobDataProps
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { jobId }: JobDataProps = req.body
  
  try {  
    const isWorking = false
  
    
    const { data } = await fauna.query<Job>(
      q.Update(q.Ref(q.Collection("jobs"), jobId), { data: { isWorking} })
    )
    
    console.log(data)
  

    res.status(200).json({ data })

  } catch (error) {
    console.log(error)

    res.status(200).json({ })
  }


}