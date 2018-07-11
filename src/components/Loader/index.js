import React from 'react'
import styled from 'styled-components'
import {
  ActivityIndicator,
} from 'react-native'

const LoaderView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default class Loader extends React.PureComponent {
  render() {
    return (
      <LoaderView>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoaderView>
    )
  }
}
