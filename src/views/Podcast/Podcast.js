import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import PodcastContent from './components/PodcastContent'
import PodcastHeader from './components/PodcastHeader'
import RankingBar from './components/RankingBar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default class Podcast extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    podcast: PropTypes.object.isRequired,
  }

  static defaultProps = {
    loading: true,
  }

  render() {
    const {
      loading,
      podcast,
    } = this.props

    return (
      <View style={styles.container}>
        <PodcastHeader loading={loading} podcast={podcast} />
        <RankingBar />
        <PodcastContent slug={podcast.slug} />
      </View>
    )
  }
}
