import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
