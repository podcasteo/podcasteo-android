import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  StyleSheet,
} from 'react-native'

import defaultPodcastImage from 'assets/defaults/podcast.png'
import ImageLoader from 'components/ImageLoader'

const Screen = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  box-shadow: -5px 5px 10px black;
  margin: 10px;
  background: #fff;
  elevation: 8;
  align-items: center;
`
const Rank = styled.Text`
  padding-top: 30;
  padding-bottom: 30;
  padding-left: 20;
  padding-right: 20;
  background-color: red;
  font-size: 20px;
  color: white;
`
const Title = styled.Text`
  font-size: 14;
  margin-left: 10;
  font-weight: bold;
`
const RankingProgression = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  border-width: 0;
  border-color: rgba(0,0,0,0);
  background-color: ${(props) => props.color};
  width: 60;
  height: 60;
  padding-left: 15;
  padding-top: 10;
  border-top-left-radius: 100;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const RankingText = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: white;
  align-items: center;
`
const styles = StyleSheet.create({
  avatar: {
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

export default class RankingItem extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    podcast: PropTypes.object.isRequired,
    previous: PropTypes.object,
    ranking: PropTypes.object.isRequired,
  }

  static defaultProps = {
    previous: null,
  }

  onPress = () => {
    const {
      history,
      podcast,
    } = this.props

    history.push(`/app/podcasts/${podcast.id}`)
  }

  getRankingProgression = () => {
    const {
      previous,
      ranking,
    } = this.props
    let color
    let symbol

    if (!previous) {
      color = '#FBCE33'
      symbol = 'N'
    } else {
      const previousRank = get(previous, 'data.ranking')
      const currenRank = get(ranking, 'ranking')

      if (currenRank < previousRank) {
        color = '#5B58F3'
        symbol = `${previousRank - currenRank}↗`
      } else if (currenRank > previousRank) {
        color = '#ED495A'
        symbol = `${currenRank - previousRank}↘`
      } else {
        color = '#68A8A5'
        symbol = '='
      }
    }

    return (
      <RankingProgression color={color}>
        <RankingText>{symbol}</RankingText>
      </RankingProgression>
    )
  }

  render() {
    const {
      ranking,
      podcast,
    } = this.props

    return (
      <Screen onPress={this.onPress}>
        <Rank>
          {ranking.ranking}
        </Rank>
        <ImageLoader
          style={styles.avatar}
          source={podcast.avatar}
          defaultSource={defaultPodcastImage}
        />
        <Title>{podcast.name}</Title>
        {this.getRankingProgression()}
      </Screen>
    )
  }
}
