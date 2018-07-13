import gql from 'graphql-tag'

export default gql`
  query searchPodcasts($name: String, $first: Int) {
    users(name: $name, first: $first) {
      pageInfo {
        totalCount
        pageCount
        hasNextPage
        hasPreviousPage
      }
      data {
        id
        slug
        name
        avatar
      }
    }
  }
`
