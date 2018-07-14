import gql from 'graphql-tag'

export default gql`
  query searchPodcasts($name: String, $first: Int) {
    podcasts(name: $name, first: $first) {
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
