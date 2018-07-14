import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FlatList,
} from 'react-native'

import PodcastItem from 'components/PodcastItem'

const Screen = styled.View`
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

export default class PodcastHorizontalList extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    podcasts: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    podcasts: [],
  }

  render() {
    const {
      title,
      podcasts,
    } = this.props

    return (
      <Screen>
        <Title>
          {title}
        </Title>
        <FlatList
          horizontal
          enableEmptySections
          data={podcasts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          renderItem={
            ({item}) => ( //eslint-disable-line
              <PodcastItem
                podcast={item}
                key={item.id}
              />
            )
          }
        />
      </Screen>
    )
  }
}
