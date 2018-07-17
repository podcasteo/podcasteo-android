import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import StaticImage from 'helpers/StaticImage'
import ImageLoader from 'components/ImageLoader'

const UserItemContainer = styled.TouchableOpacity`
  height: 70;
  border-radius: 35;
`
const styles = StyleSheet.create({
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
})

export default class userItem extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  static defaultProps = {
    user: {},
  }

  _onPress = () => {
    const {
      history,
      user,
    } = this.props

    if (user.slug) {
      history.push(`/app/users/${user.slug}`)
    }
  }
  render() {
    const {
      user,
    } = this.props

    return (
      <UserItemContainer onPress={this._onPress}>
        <ImageLoader
          style={styles.avatar}
          source={{
            uri: user.avatar,
          }}
          placeholderSource={StaticImage.user}
        />
      </UserItemContainer>
    )
  }
}
