import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../../components/Form"
import { client, QUERY_COUNTRIES, QUERY_COUNTRY, UPDATE_DATA } from "../../lib/utils"

function ShowData({data}) {
  const router = useRouter()
  const [dataDetails, setDataDetails] = useState({
    ...data
  });
  const handleChange = (event) => {
    const { name, value } = event.target
    setDataDetails({
      ...dataDetails,
      [name]: value
    })
  }

  const handleSave = async () => {
    try {
      const data = await client.mutate({
        mutation: UPDATE_DATA,
        variables: {
          id: dataDetails.id,
          input: {
            Country: dataDetails.Country,
            Year: dataDetails.Year,
            Total: parseInt(dataDetails.Total),
            Area: parseInt(dataDetails.Area)
          }
        }
      })
      if (data) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="mt-20">
      <h1 className="text-center font-bold text-xl mb-5">Update an entry</h1>
      <Form data={{...dataDetails}} handleChange={handleChange} handleSave={handleSave} />
    </div>
  )
}

export default ShowData

export async function getStaticProps(content) {
  const {params: {id}} = content
    const {data} = await client.query({
      query: QUERY_COUNTRY,
      variables: {
        id
      }
    })
    return {
      props: {
        data: data.country
      }
    }
}

export async function getStaticPaths() {
  const {data} = await client.query({query: QUERY_COUNTRIES})
  const paths = data.countries.slice(0, 3).map(country => {
    return {params: {id: (country.id).toString()}}
  })
  return {
    paths,
    fallback: true
  }
}
