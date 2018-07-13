import gql from 'graphql-tag'

export default gql`
  query podcastContent($slug: String) {
    podcast(slug: $slug) {
      id
      slug
      rankings(first: 1) {
        data {
          id
          data {
            id
            ranking
            score
          }
        }
      }
      region
      categorie
      facebook
      twitter
      soundcloud
      itunes
    }
  }
`
