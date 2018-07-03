import React from 'react'
import styled from 'styled-components'
import {
  StyleSheet,
  View,
} from 'react-native'

import RankingsList from './components/RankingsList'

import MonthPicker from 'components/MonthPicker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
})
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
      <View style={styles.container}>
        <Header>
          <Title>CLASSEMENT</Title>
          <MonthPicker onSelect={this._selectDate} />
        </Header>
        <RankingsList date={date} />
      </View>
    )
  }
}
