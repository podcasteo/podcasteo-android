import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Platform,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
const HeaderContainer = styled.View`
  width: 100%;
  height: ${APPBAR_HEIGHT};
  padding-top: ${STATUSBAR_HEIGHT};
  background-color: white;
  z-index: 100;
  ${(props) => props.shadow && 'boxShadow: -5px 5px 10px black; elevation: 5;'}
`
const HeaderBox = styled.View`
  flex: 1;
  flex-direction: row;
`
const FirstSpacing = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const TitleSpacing = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Title = styled.Text`
  margin-bottom: 15;
  font-size: 10;
`
const SearchSpacing = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
const SearchButton = styled.TouchableOpacity`
  height: ${APPBAR_HEIGHT};
  width:  ${APPBAR_HEIGHT};
  background-color: white;
  justify-content: center;
  align-items: center;
`

export default class Header extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    shadow: PropTypes.bool,
  }

  static defaultProps = {
    shadow: false,
  }

  _onSearchPress = () => {
    const {
      history,
    } = this.props

    history.push('/app/search')
  }

  render() {
    const {
      shadow,
    } = this.props

    return (
      <HeaderContainer shadow={shadow}>
        <HeaderBox>
          <FirstSpacing />
          <TitleSpacing>
            <Title>
              PODCASTEO
            </Title>
          </TitleSpacing>
          <SearchSpacing>
            <SearchButton
              onPress={this._onSearchPress}
            >
              <FontAwesome
                name="search"
                size={18}
                color="black"
              />
            </SearchButton>
          </SearchSpacing>
        </HeaderBox>
      </HeaderContainer>
    )
  }
}
