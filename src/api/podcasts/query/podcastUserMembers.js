import gql from 'graphql-tag'

export default gql`
  query podcastUserMembers($slug: String, $first: Int, $offset: Int) {
    podcast(slug: $slug) {
      id
      slug
      members(first: $first, offset: $offset) {
        pageInfo {
          totalCount
          pageCount
          hasNextPage
          hasPreviousPage
        }
        data {
          id
          user {
            id
            avatar
            slug
            username
          }
        }
      }
    }
  }
`
