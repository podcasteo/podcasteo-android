import gql from 'graphql-tag'

export default gql`
  query podcastContent($slug: String) {
    podcast(slug: $slug) {
      id
      members(first: 1) {
        pageInfo {
          totalCount
        }
        data {
          id
          user {
            id
            avatar
          }
        }
      }
      likes(first: 1) {
        pageInfo {
          totalCount
        }
        data {
          id
          user {
            id
            avatar
          }
        }
      }
      rankings(first: 1) {
        data {
          id
          data {
            id
            ranking
            grade
          }
        }
      }
      categorie
      facebook
      twitter
      soundcloud
      itunes
    }
  }
`
