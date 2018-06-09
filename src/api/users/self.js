import gql from 'graphql-tag'

export default gql`
  query self {
    self {
      id
    }
  }
`
