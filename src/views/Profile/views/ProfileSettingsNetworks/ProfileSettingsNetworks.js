import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AwesomeButton from 'react-native-really-awesome-button'
import {
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import HideoInput from 'components/CustomInput/Hideo'

const Container = styled.View`
  flex: 1;
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
`
const Title = styled.Text`
  font-size: 20;
`
const FormsContainer = styled.ScrollView`
  flex: 1;
`
const InformationContainer = styled.ScrollView`
  margin-top: 10%
  margin-bottom: 10%;
`
const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`
const InputLine = styled.View`
  flex: 1;
  margin-bottom: 15;
  margin-right: 15;
  margin-left: 10;
`

export default class ProfileSettingsNetworks extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    updateUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: null,
    loading: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!this.props.loading && prevProps.loading && this.props.user) {
      this.setState({
        ...this.props.user,
        isLoading: false,
      })
    }
  }

  _updateNetworks = async () => {
    const {
      facebook,
      itunes,
      soundcloud,
      twitter,
    } = this.state
    const {
      updateUser,
      user,
    } = this.props

    try {
      await updateUser({
        id: user.id,
        facebook,
        itunes,
        soundcloud,
        twitter,
      })

      return true
    } catch (error) {
      Alert.alert(
        'Profile Information',
        'Une erreur est survenue...',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => {},
          },
        ],
        {
          cancelable: true,
        },
      )

      return true
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>MES RÉSEAUX SOCIAUX</Title>
        </Header>
        <FormsContainer>
          <KeyboardAvoidingView behavior="padding" enabled>
            <InformationContainer>
              <InputLine>
                <HideoInput
                  iconClass={FontAwesome}
                  iconName="facebook"
                  iconColor="white"
                  iconBackgroundColor="#3B5998"
                  onChangeText={(facebook) => this.setState({
                    facebook,
                  })}
                  inputStyle={{
                   color: 'black',
                 }}
                  placeholder="facebook.com/ [facebook.name]"
                  value={this.state.facebook}
                  autoCapitalize="none"
                />
              </InputLine>
              <InputLine>
                <HideoInput
                  iconClass={FontAwesome}
                  iconName="twitter"
                  iconColor="white"
                  iconBackgroundColor="#1DA1F2"
                  onChangeText={(twitter) => this.setState({
                    twitter,
                  })}
                  inputStyle={{
                   color: 'black',
                 }}
                  placeholder="twitter username"
                  value={this.state.twitter}
                  autoCapitalize="none"
                />
              </InputLine>
              <InputLine>
                <HideoInput
                  iconClass={FontAwesome}
                  iconName="music"
                  iconColor="white"
                  iconBackgroundColor="#CE70A5"
                  onChangeText={(itunes) => this.setState({
                    itunes,
                  })}
                  inputStyle={{
                   color: 'black',
                 }}
                  placeholder="itunes.com/artist/ [nomartiste/id1234]"
                  value={this.state.itunes}
                  autoCapitalize="none"
                />
              </InputLine>
              <InputLine>
                <HideoInput
                  iconClass={FontAwesome}
                  iconName="soundcloud"
                  iconColor="white"
                  iconBackgroundColor="#FF993F"
                  onChangeText={(soundcloud) => this.setState({
                    soundcloud,
                  })}
                  inputStyle={{
                   color: 'black',
                 }}
                  placeholder="soundcloud username"
                  value={this.state.soundcloud}
                  autoCapitalize="none"
                />
              </InputLine>
            </InformationContainer>
          </KeyboardAvoidingView>
          <ButtonContainer>
            <AwesomeButton
              progress
              backgroundColor={this.state.isLoading ? '#DFDFDF' : '#FF4242'}
              backgroundDarker={this.state.isLoading ? '#CACACA' : '#B62828'}
              onPress={async (next) => {
                await this._updateNetworks()
                next()
              }}
              disabled={this.state.isLoading}
            >
              Sauvegarder
            </AwesomeButton>
          </ButtonContainer>
        </FormsContainer>
      </Container>
    )
  }
}
