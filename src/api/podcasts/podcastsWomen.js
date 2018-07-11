import gql from 'graphql-tag'

export default gql`
  query podcastsWomen($first: Int, $offset: Int) {
    podcasts(first: $first, offset: $offset, haveWomen: true) {
      pageInfo {
        totalCount
        pageCount
        hasNextPage
        hasPreviousPage
      }
      data {
        id
        name
        slug
        avatar
        description
      }
    }
  }
`
