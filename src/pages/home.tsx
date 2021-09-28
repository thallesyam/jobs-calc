import Head from 'next/head'

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
