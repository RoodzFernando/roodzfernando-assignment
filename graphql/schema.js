const { gql } = require('apollo-server-micro');

module.exports = gql`
  type Country {
    id: ID,
    Country: String,
    Year: String,
    Area: Int,
    Total: Int
  }

  input CountryInput {
    id: ID,
    Country: String,
    Year: String,
    Area: Int,
    Total: Int
  }

  type Query {
    countries: [Country],
    country(id: ID!): Country
  }

  type Mutation {
    addNewData(input: CountryInput): Country,
    updateEntry(id: ID!, input: CountryInput): Country,
    deleteEntry(id: ID!): Country
  }
`;
