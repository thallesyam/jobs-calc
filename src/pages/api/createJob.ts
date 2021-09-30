import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna'

type JobDataProps = {
  userId: {
    '@ref': {
      id: number
    }
  }
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
    
  const { userId  ,jobname, hoursDayjob, allhourJob, jobValue }: JobDataProps = req.body

  const job = {
    userId,
    jobname,
    hoursDayjob,
    allhourJob,
    isWorking: true,
    jobValue: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(jobValue),
  }

  const { data } = await fauna.query<Job>(
    q.Create(
      q.Collection('jobs'),
      { data: job },
    )
  )

  res.status(200).json({ data })

  try {

  } catch (error) {
    res.status(200).json({ })
  }


}