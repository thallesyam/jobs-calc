import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { query as q } from 'faunadb'
import nookies from 'nookies'

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
  ref: any
}

export type JobItemServerProps = {
  data: [
    {
      jobs: {
        ref: any
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
  let workingJobs = 0
  let notWorkingJobs = 0

  jobs.forEach((job) => {
    if (job.isWorking) {
      workingJobs += 1
    } else {
      notWorkingJobs += 1
    }
  })

  const countJobs = {
    allJobs: jobs.length,
    workingJobs,
    notWorkingJobs,
  }

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

      <Header isHome count={count} countJobs={countJobs} />

      <JobsList jobs={jobs} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userIdToken = nookies.get(ctx)

  const response: any = await fauna.query(
    q.Map(
      q.Paginate(q.Match(q.Index('job_by_userId'), userIdToken.userId)),
      q.Lambda(
        'f',
        q.Let(
          {
            jobs: q.Get(q.Var('f')),
          },
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
        ref,
        data: { userId, jobname, hoursDayjob, allhourJob, jobValue, isWorking },
      },
    } = item

    return {
      ref: JSON.stringify(ref),
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
    props: { jobs, count },
  }
}
