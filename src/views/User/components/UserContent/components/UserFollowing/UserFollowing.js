import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'

import MoreUserFollowing from './components/MoreUserFollowing'

import UserItem from 'components/UserItem'
import Loader from 'components/Loader'

const Container = styled.View`
  margin-top: 5%;
  min-height: 100;
`
const Title = styled.Text`
  margin-left: 5%;
  font-weight: bold;
  font-size: 16;
`
const SubContainer = styled.View`
  margin-top: 3%;
  margin-left: 5%;
`
const SubText = styled.Text`
  font-size: 14px;
  margin-left: 5%;
`
const Separator = styled.View`
  margin-right: 5px;
`

export default class UserFollowing extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    slug: PropTypes.string.isRequired,
    networkStatus: PropTypes.number.isRequired,
  }

  static defaultProps = {
    data: null,
  }

  _renderFooter = () => {
    const {
      data,
      slug,
    } = this.props
    const dataFollowing = get(data, 'data', [])
    const pageInfo = get(data, 'pageInfo', {})
    let component = null

    if (pageInfo.hasNextPage) {
      component = (
        <MoreUserFollowing slug={slug} number={pageInfo.totalCount - dataFollowing.length} />
      )
    }

    return component
  }

  render() {
    const {
      data,
      networkStatus,
    } = this.props
    const dataFollowing = get(data, 'data', [])

    return (
      <Container>
        <Title>Abonnement</Title>
        <SubContainer>
          {
            networkStatus !== 7 && (
              <Loader />
            )
          }
          {
            (networkStatus === 7 && dataFollowing.length > 0) && (
              <FlatList
                horizontal
                enableEmptySections
                data={dataFollowing}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) => // eslint-disable-line
                  (<UserItem
                    user={item.user}
                  />)
                }
                ListFooterComponent={this._renderFooter}
              />
            )
          }
          {
            (networkStatus === 7 && dataFollowing.length === 0) && (
              <SubText>
                Aucun utilisateur
              </SubText>
            )
          }
        </SubContainer>
      </Container>
    )
  }
}
