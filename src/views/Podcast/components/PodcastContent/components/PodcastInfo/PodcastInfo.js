import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'

const Container = styled.View`
  margin-left: 5%;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
`
const ContainerRow = styled.View`
  margin-top: 5%;
  flex: 1;
  flex-direction: row;
`
const ItemContent = styled.View`
  flex: 1;
  flex-direction: column;
`
const Text = styled.Text``

export default class PodcastInfo extends React.PureComponent {
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
    const position = get(data, 'rankings.data[0].data.ranking') || 'Inconnu'
    const score = get(data, 'rankings.data[0].data.score') || 'Inconnu'
    const region = get(data, 'region') || 'Inconnu'
    const categorie = get(data, 'categorie') || 'Inconnu'

    return (
      <Container>
        <ContainerRow>
          <ItemContent>
            <Title>Position</Title>
            <Text>
              {position}
            </Text>
          </ItemContent>
          <ItemContent>
            <Title>Score</Title>
            <Text>
              {score}
            </Text>
          </ItemContent>
        </ContainerRow>
        <ContainerRow>
          <ItemContent>
            <Title>Région</Title>
            <Text>
              {region}
            </Text>
          </ItemContent>
          <ItemContent>
            <Title>Catégorie</Title>
            <Text>
              {categorie}
            </Text>
          </ItemContent>
        </ContainerRow>
      </Container>
    )
  }
}
