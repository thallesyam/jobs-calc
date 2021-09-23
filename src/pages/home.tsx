import Head from 'next/head'
import { useLoginContext } from '../contexts/LoginContext'

export default function Home() {
  const { user } = useLoginContext()

  return (
    <>
      <Head>
        <title>Home | Jobscalc</title>
      </Head>
    </>
  )
}
