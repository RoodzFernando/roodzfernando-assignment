import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { FaPencilAlt, FaPlus, FaTrashAlt} from 'react-icons/fa'
import { client, QUERY_COUNTRIES } from '../lib/utils';

export default function Home({countries}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stats App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <main>
      <h1>Stats of countries</h1>
      <Link href="/data/new"> New Entry</Link>
      <div className="flex gap-5 flex-wrap ">
      {
        countries.map(({id, Country, Area, Year, Total}) => (
          <div key={id} className="border w-96 h-60 p-5 shadow group">
            <h2 className=" text-3xl font-bold text-center pb-2">{Country}</h2>
            <hr />
            <div className="p-4 text-center">
              <p><span className="font-semibold">Year</span>: {Year}</p>
              <p><span className="font-semibold">Population:</span> {Total}</p>
              <p><span className="font-semibold">Area:</span> {Area} km&sup2;</p>
            </div>
            <div className="hidden group-hover:block mb-0">
              <hr />
              <div className="flex justify-between pt-4">
                <button className="border w-32"><FaPencilAlt className="m-auto" /></button>
                <button className="border w-32 p-1"><FaTrashAlt className="m-auto" /></button>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </main>
    </div>
  )
}

export async function getServerSideProps() {
  const {data} = await client.query({query: QUERY_COUNTRIES})
  return {
    props: {
      countries: data.countries
    }
  }
}
