import { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
