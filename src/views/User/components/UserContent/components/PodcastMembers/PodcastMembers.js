import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'

import MorePodcastMembers from './components/MorePodcastMembers'

import PodcastItem from 'components/PodcastItem'

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
    const dataMembers = get(data, 'data', [])
    const pageInfo = get(data, 'pageInfo', {})
    let component = null

    if (pageInfo.hasNextPage) {
      component = (
        <MorePodcastMembers slug={slug} number={pageInfo.totalCount - dataMembers.length} />
      )
    }

    return component
  }

  render() {
    const {
      data,
    } = this.props
    const dataMembers = get(data, 'data', [])

    return (
      <Container>
        <Title>Membre de</Title>
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
                  (<PodcastItem
                    podcast={item.podcast}
                  />)
                }
                ListFooterComponent={this._renderFooter}
              />
            ) : (
              <SubText>
                Aucun Podcast
              </SubText>
            )
          }
        </SubContainer>
      </Container>
    )
  }
}
