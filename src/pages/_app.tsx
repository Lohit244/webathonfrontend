import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import NextProgress from 'next-progress'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return <>
    <NextProgress />
    <Navbar />
    <Component {...pageProps} />

  </>
}

