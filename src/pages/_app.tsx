import { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'

import { LoginContextProvider } from '../contexts/LoginContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  )
}

export default MyApp
