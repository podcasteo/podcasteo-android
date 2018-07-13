import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'

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
  margin-right: 5px;
`

export default class PodcastMembers extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: null,
  }

  render() {
    const {
      data,
    } = this.props
    const dataMembers = get(data, 'data', [])

    return (
      <Container>
        <Title>Abonnements</Title>
        <SubContainer>
          {
            dataMembers.length > 0 ? (
              <FlatList
                horizontal
                enableEmptySections
                data={dataMembers}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) => // eslint-disable-line
                  (<UserItem
                    user={item.user}
                  />)
                }
              />
            ) : (
              <SubText>
                Aucun utilisateur... :(
              </SubText>
            )
          }
        </SubContainer>
      </Container>
    )
  }
}
