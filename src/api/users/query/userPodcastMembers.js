import gql from 'graphql-tag'

export default gql`
  query userContent($slug: String, $first: Int, $offset: Int) {
    user(slug: $slug) {
      id
      memberPodcasts(first: $first, offset: $offset) {
        pageInfo {
          totalCount
          pageCount
          hasNextPage
          hasPreviousPage
        }
        data {
          id
          podcast {
            id
            slug
            name
            avatar
          }
        }
      }
    }
  }
`
