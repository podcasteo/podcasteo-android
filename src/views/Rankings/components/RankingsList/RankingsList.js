import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native'

const Screen = styled.View`
  flex: 1;
`

import RankingItem from './components/RankingItem'

export default class RankingsList extends React.PureComponent {
  static propTypes = {
    rankings: PropTypes.object,
    refetch: PropTypes.func.isRequired,
    networkStatus: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    rankings: null,
  }

  _onLoadMore = () => {
    const {
      onLoadMore,
      rankings,
      networkStatus,
    } = this.props

    if (!rankings.pageInfo.hasNextPage || networkStatus === 3 || networkStatus === 4 || networkStatus === 1) {
      return
    }

    onLoadMore()
  }

  _renderFooter = () => (
    <View
      style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
    >
      <ActivityIndicator animating size="small" />
    </View>
  )

  render() {
    const {
      rankings,
      networkStatus,
      refetch,
    } = this.props

    if (!rankings) {
      return this._renderFooter()
    }

    return (
      <Screen>
        <FlatList
          data={rankings.data.map((item) => ({
            ...item,
            key: item.id,
          }))}
          refreshing={networkStatus === 4}
          onRefresh={refetch}
          initialNumToRender={7}
          onEndReachedThreshold={0.6}
          onEndReached={this._onLoadMore}
          renderItem={({ item }) => ( //eslint-disable-line
            <RankingItem
              ranking={item.data}
              podcast={item.podcast}
              previous={item.previous}
              key={item.id}
            />
          )}
          ListFooterComponent={this._renderFooter}
        />
      </Screen>
    )
  }
}
