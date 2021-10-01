import Head from 'next/head'
import { query as q } from 'faunadb'
import { fauna } from '../services/fauna'

import { Header } from '../components/Header'
import { JobsList } from '../components/JobsList'

export type JobItemProps = {
  userId: string
  jobname: string
  hoursDayjob: number
  allhourJob: number
  jobValue: number
  days: number
  isWorking: boolean
}

export type JobItemServerProps = {
  data: [
    {
      jobs: {
        data: JobItemProps
      }
    }
  ]
}

export type JobProps = {
  data?: [JobItemProps]
  jobs?: [JobItemProps]
  count?: number
}

export default function Home({ jobs, count }: JobProps) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (!document.cookie && !document.cookie.includes('authed')) {
              window.location.href = "/"
            }
          `,
          }}
        />

        <title>Home | Jobscalc</title>
      </Head>

      <Header isHome count={count} />

      <JobsList jobs={jobs} />
    </>
  )
}

export async function getStaticProps() {
  const response: any = await fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('jobs'))),
      // and in this function, the magic will happen
      q.Lambda(
        'f',
        q.Let(
          {
            jobs: q.Get(q.Var('f')),
          },
          // And now we return a nested doc
          {
            jobs: q.Var('jobs'),
          }
        )
      )
    )
  )

  const { data }: JobItemServerProps = response
  let count = 0

  const jobs = data.map((item) => {
    const {
      jobs: {
        data: { userId, jobname, hoursDayjob, allhourJob, jobValue, isWorking },
      },
    } = item

    return {
      userId,
      jobname,
      hoursDayjob,
      allhourJob,
      jobValue,
      isWorking,
      days: Math.floor(allhourJob / hoursDayjob),
    }
  })

  jobs.map((job) => {
    count = count + job.hoursDayjob
  })

  return {
    props: { jobs, count }, // will be passed to the page component as props
  }
}
