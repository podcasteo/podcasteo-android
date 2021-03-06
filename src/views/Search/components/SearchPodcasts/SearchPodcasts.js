import React from 'react'
import PropType from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FlatList,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import PodcastItemHorizontal from 'components/PodcastItemHorizontal'
import Loader from 'components/Loader'

const Container = styled.View``
const Title = styled.Text`
  font-size: 18;
  margin-bottom: 5;
  color: darkgray;
`
const SubText = styled.Text`
  margin-top: 10;
  margin-bottom: 20;
  font-size: 14px;
  margin-left: 5%;
`
const Separator = styled.View`
  height: 1;
  background-color: #CED0CE;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-right: 10%;
`
const Footer = styled.View`
  margin-top: 3%;
  margin-bottom: 3%;
  margin-right: 10%;
  padding-top: 10;
  padding-bottom: 20;
  border-top-width: 1;
  border-color: #CED0CE;
  justify-content: center;
  align-items: center;
`

export default class SearchPodcasts extends React.PureComponent {
  static propTypes = {
    data: PropType.object,
    networkStatus: PropType.number.isRequired,
  }
  static defaultProps = {
    data: null,
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
    } = this.props
    const dataPodcasts = get(data, 'data', [])

    return (
      <Container>
        <Title>Podcasts</Title>
        {
          dataPodcasts.length === 0 && networkStatus === 7 ? (
            <SubText>
              Aucun podcast
            </SubText>
          ) : (
            <FlatList
              data={dataPodcasts.map((item) => ({
                ...item,
                key: item.id,
              }))}
              renderItem={({ item }) => ( //eslint-disable-line
                <PodcastItemHorizontal
                  podcast={item}
                  key={item.id}
                />
              )}
              ItemSeparatorComponent={Separator}
              ListFooterComponent={this._renderFooter}
            />
          )
        }
      </Container>
    )
  }
}
