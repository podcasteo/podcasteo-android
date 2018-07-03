import gql from 'graphql-tag'

export default gql`
  query rankings($first: Int, $offset: Int, $date: Date!) {
    rankings(first: $first, offset: $offset, date: $date) {
      pageInfo {
        totalCount
        hasNextPage
      }
      data {
        id
        createdAt
        previous {
          id
          data {
            id
            ranking
          }
        }
        data {
          id
          ranking
        }
        podcast {
          id
          name
          avatar
        }
      }
    }
  }
`
