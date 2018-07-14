import gql from 'graphql-tag'

export default gql`
  mutation createLikePodcast($input: LikePodcastEdgeInput!) {
    createLikePodcast(input: $input) {
      id
    }
  }
`
