import gql from 'graphql-tag'

export default gql`
  query podcast($id: String) {
    podcast(id: $id) {
      id
      name
      avatar
      description
    }
  }
`
