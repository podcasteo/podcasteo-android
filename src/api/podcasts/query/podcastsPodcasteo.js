import gql from 'graphql-tag'

export default gql`
  query podcastsPodcasteo($first: Int, $offset: Int) {
    podcasts(first: $first, offset: $offset, isPodcasteo: true) {
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
