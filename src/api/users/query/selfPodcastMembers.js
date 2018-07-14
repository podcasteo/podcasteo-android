import gql from 'graphql-tag'

export default gql`
  query selfPodcastMembers($first: Int, $offset: Int) {
    self {
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
          createdAt
          role
          type
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
