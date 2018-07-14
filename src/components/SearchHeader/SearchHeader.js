import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Platform,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import KohanaInput from 'components/CustomInput/Kohana'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
const HeaderContainer = styled.View`
  width: 100%;
  height: ${APPBAR_HEIGHT};
  padding-top: ${STATUSBAR_HEIGHT};
  background-color: white;
  z-index: 100;
  boxShadow: -5px 5px 10px black;
  elevation: 5;
`
const HeaderBox = styled.View`
  flex: 1;
  margin-left: 10%;
  margin-right: 10%;
`

export default class Header extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    onSubmit: () => {},
  }

  render() {
    return (
      <HeaderContainer>
        <HeaderBox>
          <KohanaInput
            label="Recherche"
            iconClass={FontAwesome}
            iconName="search"
            iconColor="#287CAA"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.props.onSubmit}
          />
        </HeaderBox>
      </HeaderContainer>
    )
  }
}
