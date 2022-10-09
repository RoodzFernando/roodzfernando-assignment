import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { removeDuplicates } from '../lib/utils'
import Link from 'next/link'
import { FaFilter, FaPlusCircle } from 'react-icons/fa'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter({countries, setSelection}) {
  const countriesSelection = removeDuplicates(countries)
  const [selected, setSelected] = useState('All')
  setSelection(selected)
  return (
    <div className="flex justify-end px-11 mb-10">
      <Link href="/data/new" >
        <a className="self-center mr-5 cursor-pointer flex border p-2 rounded-md bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700 shadow-md shadow-green-500" rel="noopener noreferrer">
          <FaPlusCircle className="mr-1 mt-1" /> New Entry
        </a>
      </Link>
      <Listbox value={selected} onChange={setSelected} className="flex mr-12">
        {({ open }) => (
          <div className="flex"> {/**justify-content: flex-end */}
            <Listbox.Label className="flex self-center text-lg font-medium text-gray-700 mr-2">Filter <FaFilter className="ml-1 mt-1" /></Listbox.Label> {/**align-self"center */}
            <div className="relative mt-1">
              <Listbox.Button className="relative w-60 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {countriesSelection.map((country, id) => (
                    <Listbox.Option
                      key={id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {country}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  )
}

