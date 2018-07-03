import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FlatList,
} from 'react-native'

const Screen = styled.View`
  flex: 1;
`

import RankingItem from './components/RankingItem'

export default class RankingsList extends React.Component {
  static propTypes = {
    rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
    // onLoadMore: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    })

    // _onRefresh

    this.setState({
      refreshing: false,
    })
  }

  render() {
    return (
      <Screen>
        <FlatList
          enableEmptySections
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          data={this.props.rankings}
          keyExtractor={(item) => item.id}
          renderItem={
            ({item}) => ( //eslint-disable-line
              <RankingItem
                ranking={item.data}
                podcast={item.podcast}
                previous={item.previous}
                key={item.id}
              />
            )
          }
        />
      </Screen>
    )
  }
}
