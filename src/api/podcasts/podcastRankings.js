import gql from 'graphql-tag'

export default gql`
  query podcastRankings($id: String, $first: Int, $offset: Int,) {
    podcast(id: $id) {
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
