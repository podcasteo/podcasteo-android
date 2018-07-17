import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'

import MorePodcastWomen from './components/MorePodcastWomen'

import PodcastItem from 'components/PodcastItem'

const Container = styled.View`
  flex: 1;
  height: 150;
  margin-left: 5%;
  margin-top: 5%;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-bottom: 5;
`
const Separator = styled.View`
  margin-right: 5px;
`

export default class PodcastsWomen extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: null,
  }

  _renderFooter = () => {
    const {
      data,
    } = this.props
    const dataPodcasts = get(data, 'data', [])
    const pageInfo = get(data, 'pageInfo', {})
    let component = null

    if (pageInfo.hasNextPage) {
      component = (
        <MorePodcastWomen number={pageInfo.totalCount - dataPodcasts.length} />
      )
    }

    return component
  }

  render() {
    const {
      data,
    } = this.props
    const dataPodcasts = get(data, 'data', [])
    const title = 'Podcasts par des femmes'

    return (
      <Container>
        <Title>{title}</Title>
        <FlatList
          horizontal
          enableEmptySections
          data={dataPodcasts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          renderItem={({item}) => // eslint-disable-line
            (<PodcastItem
              podcast={item}
            />)
          }
          ListFooterComponent={this._renderFooter}
        />
      </Container>
    )
  }
}
