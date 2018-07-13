import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import defaultPodcastImage from 'assets/defaults/podcast.png'
import ImageLoader from 'components/ImageLoader'

const PodcastItemContainer = styled.TouchableOpacity`
  height: 80;
`
const PodcastItemView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const NameView = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 2%;
`
const Name = styled.Text`
  height: 20;
  font-weight: bold;
`
const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    height: 80,
    width: 80,
  },
  avatar: {
    height: 80,
    width: 80,
  },
})

export default class PodcastItemHorizontal extends React.PureComponent {
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
        <PodcastItemView>
          <ImageLoader
            style={styles.avatar}
            containerStyle={styles.container}
            source={{
              uri: podcast.avatar,
            }}
            placeholderSource={defaultPodcastImage}
          />
          <NameView>
            <Name>{podcast.name}</Name>
          </NameView>
        </PodcastItemView>
      </PodcastItemContainer>
    )
  }
}
