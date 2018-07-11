import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  StyleSheet,
  Text,
} from 'react-native'

import defaultUserImage from 'assets/defaults/user.png'
import facebookImage from 'assets/networks/facebook.png'
import twitterImage from 'assets/networks/twitter.png'
import soundcloudImage from 'assets/networks/soundcloud.png'
import itunesImage from 'assets/networks/itunes.png'
import openURL from 'helpers/openURL'
import Loader from 'components/Loader'
import ImageLoader from 'components/ImageLoader'

const Content = styled.View`
  flex: 1;
  flex-direction: row;
`
const ColumnContent = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 10px 20px;
`
const ItemContent = styled.View`
  flex: ${(props) => (props.flex || 1)};
  flex-direction: column;
`
const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 16;
`
const ColumnCircles = styled.View`
  flex: 1;
`
const RowCircles = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: flex-start;
`
const DataContainer = styled.View`
  flex: 1;
  flex-direction: row;
`
const TouchCircle = styled.TouchableOpacity`
  height: 50;
  width: 50;
  align-items: center;
  justify-content: center;
  border-radius: 100;
  background: ${(props) => props.color || 'white'};
  margin-right: 20;
`
const CircleText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: white;
`
const styles = StyleSheet.create({
  userAvatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
})

export default class PodcastContent extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    podcast: PropTypes.object.isRequired,
  }

  renderPosition = () => {
    const {
      loading,
      podcast,
    } = this.props
    let data

    if (loading) {
      data = <Text>...</Text>
    } else {
      const position = get(podcast, 'rankings.data[0].data.ranking') || 'Inconnu'

      data = <Text>{position}</Text>
    }

    return (
      <DataContainer>
        {data}
      </DataContainer>
    )
  }

  renderMembers = () => {
    const {
      loading,
      podcast,
    } = this.props
    const membersTotalCount = get(podcast, 'members.pageInfo.totalCount') || 0
    const memberAvatar = get(podcast, 'members.data[0].user.avatar')
    let firstElement = null
    let secondElement = null

    if (loading) {
      firstElement = (
        <TouchCircle>
          <Loader />
        </TouchCircle>
      )
    } else if (memberAvatar) {
      firstElement = (
        <TouchCircle>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={{
              uri: memberAvatar,
            }}
            placeholderSource={defaultUserImage}
          />
        </TouchCircle>
      )
      secondElement = (
        <TouchCircle color="gray">
          <CircleText>{`+${membersTotalCount - 1}`}</CircleText>
        </TouchCircle>
      )
    } else {
      firstElement = (
        <TouchCircle color="gray">
          <CircleText>0</CircleText>
        </TouchCircle>
      )
    }

    return (
      <RowCircles>
        {firstElement}
        {secondElement}
      </RowCircles>
    )
  }

  renderLikes = () => {
    const {
      loading,
      podcast,
    } = this.props
    const likesTotalCount = get(podcast, 'likes.pageInfo.totalCount') || 0
    const likeAvatar = get(podcast, 'likes.data[0].user.avatar')
    let firstElement = null
    let secondElement = null

    if (loading) {
      firstElement = (
        <TouchCircle>
          <Loader />
        </TouchCircle>
      )
    } else if (likeAvatar) {
      firstElement = (
        <TouchCircle>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={{
              uri: likeAvatar,
            }}
            placeholderSource={defaultUserImage}
          />
        </TouchCircle>
      )
      secondElement = (
        <TouchCircle color="gray">
          <CircleText>{`+${likesTotalCount - 1}`}</CircleText>
        </TouchCircle>
      )
    } else {
      firstElement = (
        <TouchCircle color="gray">
          <CircleText>0</CircleText>
        </TouchCircle>
      )
    }

    return (
      <RowCircles>
        {firstElement}
        {secondElement}
      </RowCircles>
    )
  }

  renderGrade = () => {
    const {
      loading,
      podcast,
    } = this.props
    let data

    if (loading) {
      data = <Text>...</Text>
    } else {
      const grade = get(podcast, 'rankings.data[0].data.grade') || 'Inconnu'

      data = <Text>{grade}</Text>
    }

    return (
      <DataContainer>
        {data}
      </DataContainer>
    )
  }

  renderCategorie = () => {
    const {
      loading,
      podcast,
    } = this.props
    let data

    if (loading) {
      data = <Text>...</Text>
    } else {
      const categorie = get(podcast, 'categorie') || 'Inconnu'

      data = <Text>{categorie}</Text>
    }

    return (
      <DataContainer>
        {data}
      </DataContainer>
    )
  }

  renderNetworks = () => {
    const {
      loading,
      podcast,
    } = this.props

    if (loading) {
      return <Loader />
    }

    const {
      facebook,
      twitter,
      itunes,
      soundcloud,
    } = podcast
    const elements = []

    if (facebook) {
      elements.push(  //eslint-disable-line
        <TouchCircle onPress={() => openURL(facebook, 'facebook', 'podcast')}>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={facebookImage}
          />
        </TouchCircle>)
    }

    if (twitter) {
      elements.push(  //eslint-disable-line
        <TouchCircle onPress={() => openURL(twitter, 'twitter', 'podcast')}>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={twitterImage}
          />
        </TouchCircle>)
    }

    if (soundcloud) {
      elements.push(  //eslint-disable-line
        <TouchCircle onPress={() => openURL(soundcloud, 'soundcloud', 'podcast')}>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={soundcloudImage}
          />
        </TouchCircle>)
    }

    if (itunes) {
      elements.push(  //eslint-disable-line
        <TouchCircle onPress={() => openURL(itunes, 'itunes', 'podcast')}>
          <ImageLoader
            resizeMode="cover"
            style={styles.userAvatar}
            source={itunesImage}
          />
        </TouchCircle>)
    }

    return (
      <ColumnCircles>
        <RowCircles>
          {
            elements.length > 0 && elements[0]
          }
          {
            elements.length > 1 && elements[1]
          }
        </RowCircles>
        <RowCircles>
          {
            elements.length > 2 && elements[2]
          }
          {
            elements.length > 3 && elements[3]
          }
        </RowCircles>
      </ColumnCircles>
    )
  }

  render() {
    return (
      <Content>
        <ColumnContent>
          <ItemContent flex={1}>
            <HeaderText>Position</HeaderText>
            {this.renderPosition()}
          </ItemContent>
          <ItemContent flex={2}>
            <HeaderText>Membre(s)</HeaderText>
            {this.renderMembers()}
          </ItemContent>
          <ItemContent flex={2}>
            <HeaderText>Like(s)</HeaderText>
            {this.renderLikes()}
          </ItemContent>
        </ColumnContent>
        <ColumnContent>
          <ItemContent flex={1}>
            <HeaderText>Note</HeaderText>
            {this.renderGrade()}
          </ItemContent>
          <ItemContent flex={1}>
            <HeaderText>Catégorie</HeaderText>
            {this.renderCategorie()}
          </ItemContent>
          <ItemContent flex={3}>
            <HeaderText>Réseaux</HeaderText>
            {this.renderNetworks()}
          </ItemContent>
        </ColumnContent>
      </Content>
    )
  }
}
