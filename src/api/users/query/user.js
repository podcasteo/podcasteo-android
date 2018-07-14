import gql from 'graphql-tag'

export default gql`
  query user($slug: String) {
    user(slug: $slug) {
      id
      slug
      username
      avatar
      description
      isFollower
      isFollowing
      facebook
      twitter
      itunes
      soundcloud
    }
  }
`
