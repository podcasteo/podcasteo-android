import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  StyleSheet,
} from 'react-native'

import defaultUserImage from 'assets/defaults/user.png'
import ImageLoader from 'components/ImageLoader'

const Screen = styled.TouchableOpacity`
  flex-direction: row;
  box-shadow: -5px 5px 10px black;
  margin: 10px;
  background: #fff;
  elevation: 8;
  align-items: center;
  padding-top: 10;
  padding-bottom: 10;
`
const TextContainer = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
`
const TextRow = styled.View`
  flex-direction: row;
`
const Title = styled.Text`
  font-size: 14;
  margin-left: 10;
  font-weight: bold;
`
const TextInformation = styled.Text`
  font-size: 14;
  margin-left: 10;
  font-style: italic;
  color: darkgrey;
`
const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 10,
  },
})

export default class ProfileUserFollowerItem extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    data: null,
  }

  _onPress = () => {
    const {
      data,
      history,
    } = this.props
    const slug = get(data, 'user.slug')

    if (slug) {
      history.push(`/app/users/${slug}`)
    }
  }

  render() {
    const {
      data,
    } = this.props

    if (!data) {
      return null
    }

    const {
      createdAt,
      user,
    } = data

    return (
      <Screen onPress={this._onPress}>
        <ImageLoader
          style={styles.image}
          source={{
            uri: user.avatar,
          }}
          placeholderSource={defaultUserImage}
        />
        <TextContainer>
          <Title>{user.username}</Title>
          <TextRow>
            <Title>Ajouté le :</Title>
            <TextInformation>{new Date(createdAt).toLocaleString()}</TextInformation>
          </TextRow>
        </TextContainer>
      </Screen>
    )
  }
}
