import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import RankingItem from './components/RankingItem'

import Loader from 'components/Loader'

const Screen = styled.View`
  flex: 1;
`
const SubText = styled.Text`
  font-size: 14px;
  margin-left: 5%;
`
const Footer = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  border-top-width: 1;
  border-color: #CED0CE;
  justify-content: center;
  align-items: center;
`

export default class RankingsList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    networkStatus: PropTypes.number.isRequired,
    refetch: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: null,
  }

  _onLoadMore = () => {
    const {
      onLoadMore,
      data,
      networkStatus,
    } = this.props
    const pageInfo = get(data, 'pageInfo', {})

    if (!pageInfo.hasNextPage || networkStatus === 3 || networkStatus === 4 || networkStatus === 1) {
      return
    }

    onLoadMore()
  }

  _renderFooter = () => {
    const {
      networkStatus,
    } = this.props

    return (
      <Footer>
        {
          networkStatus === 7 ? (
            <FontAwesome
              size={32}
              color="gray"
              name="caret-up"
            />
          ) : (
            <Loader />
          )
        }
      </Footer>
    )
  }

  render() {
    const {
      data,
      networkStatus,
      refetch,
    } = this.props
    const rankings = get(data, 'data', [])

    return (
      <Screen>
        {
          rankings.length === 0 && networkStatus === 7 ? (
            <SubText>
              Aucun podcast
            </SubText>
          ) : (
            <FlatList
              data={rankings.map((item) => ({
                ...item,
                key: item.id,
              }))}
              refreshing={networkStatus === 4}
              onRefresh={refetch}
              initialNumToRender={7}
              onEndReachedThreshold={0.7}
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
          )
        }
      </Screen>
    )
  }
}
