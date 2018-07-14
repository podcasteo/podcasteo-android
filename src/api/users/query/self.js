import gql from 'graphql-tag'

export default gql`
  query self {
    self {
      id
      email
      username
      avatar
      description
      firstname
      lastname
      birthday
      gender
      facebook
      twitter
      soundcloud
      itunes
    }
  }
`
