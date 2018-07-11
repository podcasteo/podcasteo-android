import gql from 'graphql-tag'

export default gql`
  query podcast($slug: String) {
    podcast(slug: $slug) {
      id
      name
      slug
      avatar
      description
    }
  }
`
