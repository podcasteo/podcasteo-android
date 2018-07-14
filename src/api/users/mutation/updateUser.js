import gql from 'graphql-tag'

export default gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
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
