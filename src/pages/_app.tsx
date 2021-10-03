import { AppProps } from 'next/app'
import ReactModal from 'react-modal'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'

import { LoginContextProvider } from '../contexts/LoginContext'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  )
}

export default MyApp
