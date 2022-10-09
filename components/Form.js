import { useState } from "react";

function Form({data, handleChange, handleSave}) {
  const [error, setError] = useState(false);
  const checkEmpty = () => {
   const result = Object.keys(data).every(element => data[element].length > 0)
   setError(!result)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    handleSave()
  }
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-2">
          <div className="mt-5 md:col-span-1 md:mt-0"></div>
          <div className="mt-5 md:col-span-1 md:mt-0">

            <form>
              {
                error && <span classNameName="text-red-500 text-s">All the fields are required</span>
              }
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="Country"
                        value={data.Country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Area (km&sup2;)</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="Number"
                        name="Area"
                        value={data.Area}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Year</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="Year"
                        value={data.Year}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Population</label>
                      <input
                        type="Number"
                        name="Total"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={data.Total}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="submit"
                    onClick={submitHandler}
                  >Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default Form
