import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../../components/Form"
import { client, QUERY_COUNTRY, UPDATE_DATA } from "../../lib/utils"

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

  console.log(data)
  const handleSave = async () => {
    console.log(data)
    try {
      const data = await client.mutate({
        mutation: UPDATE_DATA,
        variables: {
          id: dataDetails.id,
          input: {
            // ...dataDetails,
            Country: dataDetails.Country,
            Year: dataDetails.Year,
            Total: parseInt(dataDetails.Total),
            Area: parseInt(dataDetails.Area)
          }
        }
      })
      console.log(data)
      if (data) {
        router.push('/')
      }
    } catch (error) {
      // console.log((error.networkError.result.errors));
      console.log(error)
    }
  }
  return (
    <>
      <h1>Data Show here</h1>
      <Form data={{...dataDetails}} handleChange={handleChange} handleSave={handleSave} />
    </>
  )
}

export default ShowData

export async function getStaticProps(content) {
  const {params: {id}} = content
  try {
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
  } catch (error) {
    console.log((error.networkError.result.errors))
  }
}

export async function getStaticPaths(content) {
  return {
    paths: [{
      params: {id: '1'}
    }],
    fallback: true
  }
}
