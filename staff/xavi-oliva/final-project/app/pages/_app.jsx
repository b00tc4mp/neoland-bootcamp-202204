import Head from 'next/head'
import '../styles/globals.css'
import { Header, Footer } from '../components'
import { useRouter } from "next/router"

if (typeof XMLHttpRequest === 'undefined') {
  var XMLHttpRequest = require('xhr2');

  global.XMLHttpRequest = XMLHttpRequest
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const showCompo = router.pathname === "/login" ? false : true && router.pathname === "/register" ? false : true;

  return (
    <>
      <Head>
        <title>Brun's Flats</title>
      </Head>
      <main className='flex flex-col w-full h-screen'>
        {showCompo && <Header />}
        <Component {...pageProps} />
        {showCompo && <Footer />}
      </main>
    </>
  )
}

export default MyApp
