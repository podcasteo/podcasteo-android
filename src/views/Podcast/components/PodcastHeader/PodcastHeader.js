import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Alert,
  StyleSheet,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import defaultPodcastImage from 'assets/defaults/podcast.png'
import ImageBackgroundLoader from 'components/ImageBackgroundLoader'
import ImageLoader from 'components/ImageLoader'

const Cover = styled.View`
  height: 40%;
`
const BackgroundContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`
const ImageRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const IconButton = styled.TouchableOpacity`
  width: 25;
  height: 25;
  margin-right: 20;
  margin-left: 20;
  justify-content: center;
  align-items: center;
  border-radius: 100;
  background-color: ${(props) => (props.isActive ? 'white' : 'black')};
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: white;
  margin-bottom: 5;
`
const Description = styled.Text`
  color: white;
  text-align: center;
`
const HeaderContainer = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: center;
`
const DescriptionContainer = styled.ScrollView`
  flex: 1;
  margin-bottom: 5;
  margin-left: 10;
  margin-right: 10;
`
const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
})

export default class PodcastHeader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    podcast: PropTypes.object,
    likePodcast: PropTypes.func.isRequired,
    dislikePodcast: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: true,
    podcast: {},
  }

  onPressLike = () => {
    const {
      podcast,
    } = this.props

    Alert.alert(
      'Abonnement',
      podcast.isLike ? `Se désabonner de ${podcast.name} ?` : `Suivre ${podcast.name} ?`,
      [
        {
          text: 'Non', onPress: () => {}, style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => this._likePodcast(),
        },
      ],
      {
        cancelable: false,
      },
    )
  }

    _likePodcast = async () => {
      const {
        podcast,
        likePodcast,
        dislikePodcast,
      } = this.props

      try {
        if (podcast.isLike) {
          await dislikePodcast(podcast.id)
        } else {
          await likePodcast(podcast.id)
        }
      } catch (error) {
        Alert.alert(
          `Suivre ${podcast.name}`,
          `Error: ${error.message}`,
          [
            {
              text: 'Cancel', onPress: () => {}, style: 'cancel',
            },
            {
              text: 'Close',
              onPress: () => {},
            },
          ],
          {
            cancelable: true,
          },
        )
      }
    }

    render() {
      const {
        loading,
        podcast,
      } = this.props

      return (
        <Cover>
          <ImageBackgroundLoader
            style={styles.background}
            source={{
            uri: podcast.avatar,
          }}
            placeholderSource={defaultPodcastImage}
            blurRadius={5}
            opacity={0.7}
          >
            <BackgroundContainer>
              <HeaderContainer>
                <ImageRow>
                  <IconButton
                    onPress={this.onPressMember}
                  >
                    <FontAwesome
                      size={10}
                      color={podcast.isMember ? 'black' : 'white'}
                      name={podcast.isMember ? 'user-times' : 'user-plus'}
                    />
                  </IconButton>
                  <ImageLoader
                    style={styles.avatar}
                    source={{
                    uri: podcast.avatar,
                  }}
                    placeholderSource={defaultPodcastImage}
                  />
                  <IconButton
                    onPress={this.onPressLike}
                  >
                    <FontAwesome
                      size={10}
                      color={podcast.isLike ? 'red' : 'white'}
                      name="heart"
                    />
                  </IconButton>
                </ImageRow>
                <Title>{loading ? '...' : podcast.name.toUpperCase()}</Title>
              </HeaderContainer>
              <DescriptionContainer>
                <Description>
                  {podcast.description}
                </Description>
              </DescriptionContainer>
            </BackgroundContainer>
          </ImageBackgroundLoader>
        </Cover>
      )
    }
}
