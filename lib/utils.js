import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

export const removeDuplicates = (data) => {
  const dataSet = new Set()
  data.forEach(element => {
    dataSet.add(element.Country)
  });
  const dataSort = [...dataSet].sort((a, b) => a.localeCompare(b))
  return ['All', ...dataSort]
}

export const QUERY_COUNTRIES = gql`
query getCountries {
  countries {
    id,
    Area
    Year
    Country
    Total
  }
}
`

export const QUERY_COUNTRY = gql`
  query Country($id: ID!) {
    country(id: $id) {
      id
      Country
      Year
      Area
      Total
    }
  }
`

export const ADD_DATA = gql`
  mutation AddData($input: CountryInput) {
    addNewData(input: $input) {
      id,
      Area
    }
  }
`

export const UPDATE_DATA = gql`
  mutation updataData($id: ID!, $input: CountryInput) {
  updateEntry(id: $id, input: $input) {
    Country,
    Year,
    Total
  }
}
`

export const DELETE_DATA = gql`
  mutation DeleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      Country,
      Total,
      Area
    }
  }
`

export const FILTER_DATA  = gql`
  query FilterCountries($country: String) {
    filterCountries(country: $country) {
      id
      Country
      Year
      Area
      Total
    }
  }
`