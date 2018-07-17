import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RankingInformation = styled.View`
  flex-direction: row;
`
const RankingBox = styled.TouchableOpacity`
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

  constructor(props) {
    super(props)

    this.state = {
      audience: false,
      frequency: false,
      itunes: false,
      network: false,
    }
  }

  changeRender(type) {
    const typeState = this.state

    typeState[`${type}`] = !this.state[`${type}`]
    this.setState(typeState)
  }

  renderValue(type) {
    if (this.state[type]) {
      return this.props.ranking[`${type}Grade`]
    }

    const value = this.props.ranking[`${type}Score`]

    return value < 1 ? '?' : value
  }

  render() {
    return (
      <RankingInformation>
        <RankingBox color="#69E197" onPress={() => this.changeRender('audience')}>
          <RankingItemValue>
            {this.renderValue('audience')}
          </RankingItemValue>
          <RankingItemDescription>
            AUDIENCE
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#EE4435" onPress={() => this.changeRender('frequency')}>
          <RankingItemValue>
            {this.renderValue('frequency')}
          </RankingItemValue>
          <RankingItemDescription>
            FRÉQUENCE
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#F1B82C" onPress={() => this.changeRender('itunes')}>
          <RankingItemValue>
            {this.renderValue('itunes')}
          </RankingItemValue>
          <RankingItemDescription>
            ITUNES
          </RankingItemDescription>
        </RankingBox>
        <RankingBox color="#EA672A" onPress={() => this.changeRender('network')}>
          <RankingItemValue>
            {this.renderValue('network')}
          </RankingItemValue>
          <RankingItemDescription>
            RÉSEAUX
          </RankingItemDescription>
        </RankingBox>
      </RankingInformation>
    )
  }
}
