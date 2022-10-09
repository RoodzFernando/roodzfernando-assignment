import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

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

export const ADD_DATA = gql`
  mutation AddData($input: CountryInput) {
    addNewData(input: $input) {
      id,
      Area
    }
  }
`