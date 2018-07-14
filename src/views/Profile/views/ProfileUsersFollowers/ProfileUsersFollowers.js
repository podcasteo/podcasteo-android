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

import ProfileUserFollowerItem from './components/ProfileUserFollowerItem'

import Loader from 'components/Loader'

const Container = styled.View`
  flex: 1;
`
const Header = styled.View`
  padding-left: 5;
  margin-left: 10;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 10;
  flex-direction: row;
  border-left-width: 2;
  border-left-color: red;
  align-items: baseline;
`
const Title = styled.Text`
  font-size: 20;
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

export default class ProfileUsersFollowers extends React.PureComponent {
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
    const dataFollowers = get(data, 'data', [])

    return (
      <Container>
        <Header>
          <Title>MES ABONNÉS</Title>
        </Header>
        {
          dataFollowers.length === 0 && networkStatus === 7 ? (
            <SubText>
              Aucun utilisateur
            </SubText>
          ) : (
            <FlatList
              data={dataFollowers.map((item) => ({
                ...item,
                key: item.id,
              }))}
              refreshing={networkStatus === 4}
              onRefresh={refetch}
              initialNumToRender={7}
              onEndReachedThreshold={0.7}
              onEndReached={this._onLoadMore}
              renderItem={({ item }) => ( //eslint-disable-line
                <ProfileUserFollowerItem
                  data={item}
                  key={item.id}
                />
              )}
              ListFooterComponent={this._renderFooter}
            />
          )
        }
      </Container>
    )
  }
}
