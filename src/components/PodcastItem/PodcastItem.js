import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import defaultPodcastImage from 'assets/defaults/podcast.png'
import ImageLoader from 'components/ImageLoader'
import shortenString from 'helpers/shortenString'

const PodcastItemContainer = styled.TouchableOpacity`
  aspect-ratio: 1;
  height: 100;
`
const Name = styled.Text`
  height: 20;
  background-color: black;
  color: white;
`
const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 100,
  },
})

export default class PodcastItem extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    podcast: PropTypes.object,
  }

  static defaultProps = {
    podcast: {},
  }

  _onPress = () => {
    const {
      history,
      podcast,
    } = this.props

    if (podcast.slug) {
      history.push(`/app/podcasts/${podcast.slug}`)
    }
  }
  render() {
    const {
      podcast,
    } = this.props

    return (
      <PodcastItemContainer onPress={this._onPress}>
        <ImageLoader
          style={styles.avatar}
          containerStyle={styles.container}
          source={{
            uri: podcast.avatar,
          }}
          placeholderSource={defaultPodcastImage}
        />
        <Name>{shortenString(podcast.name, 12)}</Name>
      </PodcastItemContainer>
    )
  }
}
