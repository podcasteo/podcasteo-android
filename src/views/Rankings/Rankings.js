import React from 'react'
import styled from 'styled-components'

import RankingsList from './components/RankingsList'

import MonthPicker from 'components/MonthPicker'
import CustomHeader from 'components/CustomHeader'

const Screen = styled.View`
  flex: 1;
`
const HeaderContainer = styled.View`
  background-color: white;
  boxShadow: -5px 5px 10px black;
  elevation: 5;
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
  background-color: white;
`
const Title = styled.Text`
  font-size: 20;
`

export default class Rankings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString(),
    }
  }

  _selectDate = (date) => this.setState({
    date,
  })

  render() {
    const {
      date,
    } = this.state

    return (
      <Screen>
        <HeaderContainer>
          <CustomHeader />
          <Header>
            <Title>CLASSEMENT</Title>
            <MonthPicker onSelect={this._selectDate} />
          </Header>
        </HeaderContainer>
        <RankingsList date={date} />
      </Screen>
    )
  }
}
