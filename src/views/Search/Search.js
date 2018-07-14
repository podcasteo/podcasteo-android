import React from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import SearchPodcasts from './components/SearchPodcasts'
import SearchUsers from './components/SearchUsers'

import SearchHeader from 'components/SearchHeader'

const Screen = styled.View`
  flex: 1;
`
const HeaderContainer = styled.View`
  background-color: white;
  boxShadow: -5px 5px 10px black;
  elevation: 5;
`
const ScrollContainer = styled.ScrollView`

`
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 30;
  margin-top: 10;
`
const Title = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: darkgray;
  margin-bottom: 10;
`

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }

    this._onSubmit = debounce(this._onSubmit, 500)
  }

  _onSubmit = (value) => this.setState({
    search: value,
  })

  render() {
    const {
      search,
    } = this.state

    return (
      <Screen>
        <HeaderContainer>
          <SearchHeader onSubmit={this._onSubmit} value={this.state.search} />
        </HeaderContainer>
        <ScrollContainer>
          <Container>
            <Title>RÉSULTATS :</Title>
            <SearchPodcasts search={search} />
            <SearchUsers search={search} />
          </Container>
        </ScrollContainer>
      </Screen>
    )
  }
}
