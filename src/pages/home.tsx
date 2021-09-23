import { useLoginContext } from '../contexts/LoginContext'

export default function Home() {
  const { user } = useLoginContext()

  return <h1>{user.email}</h1>
}
