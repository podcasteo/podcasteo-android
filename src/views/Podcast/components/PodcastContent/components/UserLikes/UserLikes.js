import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'

import MoreUserLikes from './components/MoreUserLikes'

import UserItem from 'components/UserItem'

const Container = styled.View`
  margin-top: 5%;
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
  margin-right: 10px;
`

export default class UserLikes extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    slug: PropTypes.string.isRequired,
  }

  static defaultProps = {
    data: null,
  }

  _renderFooter = () => {
    const {
      data,
      slug,
    } = this.props
    const dataLikes = get(data, 'data', [])
    const pageInfo = get(data, 'pageInfo', {})
    let component = null

    if (pageInfo.hasNextPage) {
      component = (
        <MoreUserLikes slug={slug} number={pageInfo.totalCount - dataLikes.length} />
      )
    }

    return component
  }

  render() {
    const {
      data,
    } = this.props
    const dataLikes = get(data, 'data', [])

    return (
      <Container>
        <Title>Abonnés</Title>
        <SubContainer>
          {
            dataLikes.length > 0 ? (
              <FlatList
                horizontal
                enableEmptySections
                data={dataLikes}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) => // eslint-disable-line
                  (<UserItem
                    user={item.user}
                  />)
                }
                ListFooterComponent={this._renderFooter}
              />
            ) : (
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
