import Head from 'next/head'

import { useLoginContext } from '../contexts/LoginContext'

import { Header } from '../components/Header'

export default function Home() {
  const { user } = useLoginContext()

  console.log(user)

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
    </>
  )
}
