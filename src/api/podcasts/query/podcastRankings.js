import gql from 'graphql-tag'

export default gql`
  query podcastRankings($slug: String, $first: Int, $offset: Int,) {
    podcast(slug: $slug) {
      id
      rankings(first: $first, offset: $offset) {
        data {
          id
          createdAt
          data {
            id
            score
            audienceScore
            audienceGrade
            frequencyScore
            frequencyGrade
            networkScore
            networkGrade
            itunesScore
            itunesGrade
          }
        }
      }
    }
  }
`
