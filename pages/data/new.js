import { useRouter } from 'next/router';
import {useState} from 'react'
import Form from '../../components/Form'
import { ADD_DATA, client } from '../../lib/utils';

function NewEntry() {
  const router = useRouter()
  const [dataDetails, setDataDetails] = useState({
    Country: '',
    Area: '',
    Year: '',
    Total: ''
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
        mutation: ADD_DATA,
        variables: {
          input: {
            ...dataDetails,
            Total: parseInt(dataDetails.Total),
            Area: parseInt(dataDetails.Area)
          }
        }
      })
      if (data) {
        router.push('/')
      }
    } catch (error) {
      console.log((error.networkError.result.errors));
    }

  }
  return (
    <div className="mt-20">
      <h1 className="text-center font-bold text-xl mb-5">Add a new Data</h1>
      <Form data={{...dataDetails}} handleChange={handleChange} handleSave={handleSave} />
    </div>
  )
}

export default NewEntry
