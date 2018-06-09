import gql from 'graphql-tag'

export default gql`
  mutation handleFacebook($input: FacebookInput!) {
    handleFacebook(input: $input) {
      token
    }
  }
`
