import {
  graphql,
} from 'react-apollo'

import PodcastHeaderView from './PodcastHeader'

import likePodcastMutation from 'api/podcasts/mutation/likePodcast'
import dislikePodcastMutation from 'api/podcasts/mutation/dislikePodcast'
import podcastQuery from 'api/podcasts/query/podcast'
import podcastUserLikes from 'api/podcasts/query/podcastUserLikes'

@graphql(likePodcastMutation, {
  props: ({
    mutate,
  }) => ({
    likePodcast: (id) => mutate({
      variables: {
        input: {
          id,
        },
      },
    }),
  }),
  options: (props) => ({
    refetchQueries:
    () => ([
      {
        query: podcastQuery,
        variables: {
          slug: props.podcast.slug,
        },
      },
      {
        query: podcastUserLikes,
        variables: {
          slug: props.podcast.slug,
          first: 5,
          offset: 0,
        },
      },
    ]),
  }),
})
@graphql(dislikePodcastMutation, {
  props: ({
    mutate,
  }) => ({
    dislikePodcast: (id) => mutate({
      variables: {
        input: {
          _to: id,
        },
      },
    }),
  }),
  options: (props) => ({
    refetchQueries:
    () => ([
      {
        query: podcastQuery,
        variables: {
          slug: props.podcast.slug,
        },
      },
      {
        query: podcastUserLikes,
        variables: {
          slug: props.podcast.slug,
          first: 5,
          offset: 0,
        },
      },
    ]),
  }),
})
export default class PodcastHeader extends PodcastHeaderView {}
