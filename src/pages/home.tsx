import Head from 'next/head'
import { query as q } from 'faunadb'
import { fauna } from '../services/fauna'

import { Header } from '../components/Header'
import { JobsList } from '../components/JobsList'

export default function Home() {
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

      <Header isHome />

      <JobsList />
    </>
  )
}

export async function getStaticProps() {
  const response = await fauna.query(
    q.Paginate(q.Get(q.Match(q.Index('job_by_userId'))))
  )

  console.log(response)

  return {
    props: {}, // will be passed to the page component as props
  }
}
