import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (

    <SessionProvider session={ session }>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
