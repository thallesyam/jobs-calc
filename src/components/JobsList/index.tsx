import { Job } from '../Job'

import { JobProps } from '../../pages/home'

export function JobsList({ jobs }: JobProps) {
  return (
    <main className="max-w-wild w-screen mx-auto h-screen relative -top-11 flex flex-col gap-2">
      {jobs.map((job, index) => {
        return <Job key={index} job={job} />
      })}
    </main>
  )
}
