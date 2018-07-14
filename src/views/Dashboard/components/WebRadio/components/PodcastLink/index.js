import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import PodcastLinkView from './PodcastLinkView'

import podcastQuery from 'api/podcasts/query/podcast'

class PodcastLink extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    slug: null,
  }

  onResult = (result) => {
    const {
      data,
    } = result
    const {
      history,
    } = this.props

    return (
      <PodcastLinkView
        history={history}
        podcast={get(data, 'podcast')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return !slug ? (
      <PodcastLinkView
        history={{}}
        podcast={null}
      />
    ) : (
      <Query
        query={podcastQuery}
        variables={{
          slug,
        }}
        fetchPolicy="cache-first"
      >
        {this.onResult}
      </Query>
    )
  }
}

@withRouter
export default class extends PodcastLink {}
