import React from 'react'
import styled from 'styled-components'

const Separator = styled.View`
  height: 1;
  background-color: #CED0CE;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-left: 2%;
  margin-right: 2%;
`

export default class ListFooter extends React.PureComponent {
  render() {
    return (
      <Separator />
    )
  }
}
