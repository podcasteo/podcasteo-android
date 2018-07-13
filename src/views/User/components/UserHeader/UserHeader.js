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

import defaultUserImage from 'assets/defaults/user.png'
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
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 100,
  },
})

export default class UserHeader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    unfollowUser: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: true,
    user: {},
  }

  onPressFollower = () => {
    const {
      user,
    } = this.props

    Alert.alert(
      'Abonnement',
      user.isFollowing ? `Se désabonner de ${user.username} ?` : `Suivre ${user.username} ?`,
      [
        {
          text: 'Non', onPress: () => {}, style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => this._followUser(),
        },
      ],
      {
        cancelable: false,
      },
    )
  }

  _followUser = async () => {
    const {
      user,
      followUser,
      unfollowUser,
    } = this.props

    try {
      if (user.isFollowing) {
        await unfollowUser(user.id)
      } else {
        await followUser(user.id)
      }
    } catch (error) {
      Alert.alert(
        `Suivre ${user.username}`,
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
      user,
    } = this.props

    return (
      <Cover>
        <ImageBackgroundLoader
          style={styles.background}
          source={{
            uri: user.avatar,
          }}
          placeholderSource={defaultUserImage}
          blurRadius={5}
          opacity={0.7}
        >
          <BackgroundContainer>
            <HeaderContainer>
              <ImageRow>
                <IconButton
                  onPress={this.onPressFollower}
                >
                  <FontAwesome
                    size={10}
                    color="white"
                    name={user.isFollowing ? 'user-times' : 'user-plus'}
                  />
                </IconButton>
                <ImageLoader
                  style={styles.avatar}
                  source={{
                    uri: user.avatar,
                  }}
                  placeholderSource={defaultUserImage}
                />
                <IconButton
                  onPress={this.onPressMember}
                >
                  <FontAwesome
                    size={10}
                    color="white"
                    name="bookmark"
                  />
                </IconButton>
              </ImageRow>
              <Title>{loading ? '...' : user.username}</Title>
            </HeaderContainer>
            <DescriptionContainer>
              <Description>
                {user.description}
              </Description>
            </DescriptionContainer>
          </BackgroundContainer>
        </ImageBackgroundLoader>
      </Cover>
    )
  }
}
