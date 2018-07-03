import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Loader from 'components/Loader'

const RankingInformation = styled.View`
  flex-direction: row;
`
const RankingBox = styled.View`
  flex: 1;
  padding-top: 20;
  padding-bottom: 10;
  padding-right: 10;
  padding-left: 10;
  background-color: ${(props) => (props.color)};
  aspect-ratio: 1;
  justify-content: space-around;
`
const RankingItemValue = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20;
  color: white;
`
const RankingItemDescription = styled.Text`
  text-align: center;
  font-size: 10;
  color: white;
`

export default class RankingBar extends React.Component {
  static propTypes = {
    ranking: PropTypes.object.isRequired,
  }

  render() {
    const {
      ranking,
    } = this.props

    return (
      <RankingInformation>
        <RankingBox color="#69E197">
          {
            ranking.audienceScore < 0
            ? <Loader />
            : (
              <RankingItemValue>
                {ranking.audienceScore < -1 || '?'}
              </RankingItemValue>
            )
          }
          <RankingItemDescription>
            AUDIENCE
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#EE4435">
          {
            ranking.audienceScore < 0
            ? <Loader />
            : (
              <RankingItemValue>
                {ranking.audienceScore < -1 || '?'}
              </RankingItemValue>
            )
          }
          <RankingItemDescription>
            FREQUENCE
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#F1B82C">
          {
            ranking.audienceScore < 0
            ? <Loader />
            : (
              <RankingItemValue>
                {ranking.audienceScore < -1 || '?'}
              </RankingItemValue>
            )
          }
          <RankingItemDescription>
            ITUNES
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#EA672A">
          {
            ranking.audienceScore < 0
            ? <Loader />
            : (
              <RankingItemValue>
                {ranking.audienceScore < -1 || '?'}
              </RankingItemValue>
            )
          }
          <RankingItemDescription>
            RESEAUX
          </RankingItemDescription>
        </RankingBox>
      </RankingInformation>
    )
  }
}
