import gql from 'graphql-tag'

export default gql`
  mutation deleteLikePodcast($input: DeleteLikePodcastEdgeInput!) {
    deleteLikePodcast(input: $input) {
      result
    }
  }
`
