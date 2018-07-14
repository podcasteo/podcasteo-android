import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import defaultPodcastImage from 'assets/defaults/podcast.png'
import ImageLoader from 'components/ImageLoader'

const PodcastLinkContainer = styled.TouchableOpacity`
  width: 80;
  height: 80;
`
const NoPodcast = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F5FBFF;
`
const PodcastTitle = styled.Text``

export default class PodcastLink extends React.PureComponent {
  static propTypes = {
    podcast: PropTypes.object,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    podcast: null,
  }

  _onPress = () => {
    const {
      podcast,
      history,
    } = this.props

    if (podcast && podcast.slug) {
      history.push(`/app/podcasts/${podcast.slug}`)
    }
  }

  _renderCover = () => {
    const {
      podcast,
    } = this.props

    if (podcast) {
      return (
        <ImageLoader
          source={{
            uri: podcast.avatar,
          }}
          placeholderSource={defaultPodcastImage}
          style={{
            height: 80,
            width: 80,
          }}
        />
      )
    }

    return (
      <NoPodcast>
        <PodcastTitle>Podcast</PodcastTitle>
        <PodcastTitle>Inconnu</PodcastTitle>
      </NoPodcast>
    )
  }

  render() {
    return (
      <PodcastLinkContainer
        onPress={this._onPress}
      >
        {this._renderCover()}
      </PodcastLinkContainer>
    )
  }
}
