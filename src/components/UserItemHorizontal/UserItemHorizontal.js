import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import defaultUserImage from 'assets/defaults/user.png'
import ImageLoader from 'components/ImageLoader'

const UserItemContainer = styled.TouchableOpacity`
  height: 70;
`
const UserItemView = styled.View`
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
    height: 70,
    width: 80,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
})

export default class UserItemHorizontal extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    user: {},
    onPress: () => {},
  }

  _onPress = async () => {
    const {
      history,
      user,
      onPress,
    } = this.props

    if (user.slug) {
      history.push(`/app/users/${user.slug}`)
    }

    onPress()
  }

  render() {
    const {
      user,
    } = this.props

    return (
      <UserItemContainer onPress={this._onPress}>
        <UserItemView>
          <ImageLoader
            style={styles.avatar}
            containerStyle={styles.container}
            source={{
              uri: user.avatar,
            }}
            placeholderSource={defaultUserImage}
          />
          <NameView>
            <Name>{user.username}</Name>
          </NameView>
        </UserItemView>
      </UserItemContainer>
    )
  }
}