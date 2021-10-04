import { useEffect, useState } from 'react'

import { Job } from '../Job'

import { JobProps } from '../../pages/home'

export function JobsList({ jobs }: JobProps) {
  const [jobsData, setJobsData] = useState(jobs)

  useEffect(() => {
    setJobsData(jobs)
  }, [jobs])

  return (
    <main className="max-w-wild w-screen mx-auto relative -top-11 flex flex-col gap-2 px-4">
      {jobsData?.map((job, index) => {
        return <Job key={index} job={job} />
      })}
    </main>
  )
}
