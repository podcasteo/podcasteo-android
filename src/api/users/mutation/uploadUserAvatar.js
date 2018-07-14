import gql from 'graphql-tag'

export default gql`
  mutation uploadUserAvatar($file: Upload!) {
    uploadUserAvatar(file: $file) {
      id
      avatar
    }
  }
`
