import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import AwesomeButton from 'react-native-really-awesome-button'
import {
  Alert,
  AsyncStorage,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import settings from 'helpers/settings'
import validateEmail from 'helpers/validateEmail'
import HideoInput from 'components/CustomInput/Hideo'

const Screen = styled.View`
  flex: 1;
`
const InformationContainer = styled.ScrollView`
  margin-top: 10%
  margin-bottom: 20%;
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

export default class SignIn extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoading: false,
    }
  }

  _onLogin = async () => {
    const {
      email,
      password,
    } = this.state
    const {
      onLogin,
      history,
    } = this.props

    try {
      if (!validateEmail(email)) {
        throw new Error('email invalide')
      }

      if (get(password, 'length', 0) < 3) {
        throw new Error('mot de passe invalide')
      }

      this.setState({
        isLoading: true,
      })

      const result = await onLogin({
        email,
        password,
      })

      await AsyncStorage.setItem(settings.authToken, result.data.login.token)

      this.setState({
        isLoading: false,
      })

      return history.push('/app/dashboard')
    } catch (error) {
      Alert.alert(
        'Connexion',
        `Une erreur est survenue : ${error.message}`,
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

      this.setState({
        isLoading: false,
      })

      return true
    }
  }

  render() {
    return (
      <Screen>
        <InformationContainer>
          <InputLine>
            <HideoInput
              iconClass={FontAwesome}
              iconName="envelope"
              iconColor="white"
              iconBackgroundColor="#247DAB"
              onChangeText={(email) => this.setState({
                email,
              })}
              inputStyle={{
                color: 'black',
              }}
              placeholder="chuck.norris@mail.com"
              value={this.state.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onSubmitEditing={() => {
                this.passwordInput.focus()
              }}
            />
          </InputLine>
          <InputLine>
            <HideoInput
              ref={(passwordInput) => this.passwordInput = passwordInput} // eslint-disable-line
              iconClass={FontAwesome}
              iconName="lock"
              iconColor="white"
              iconBackgroundColor="#247DAB"
              onChangeText={(password) => this.setState({
                password,
              })}
              inputStyle={{
                color: 'black',
              }}
              placeholder="mot de passe"
              value={this.state.password}
              autoCapitalize="none"
              autoCorrect={false}
              isPassword
            />
          </InputLine>
        </InformationContainer>
        <ButtonContainer>
          <AwesomeButton
            progress
            backgroundColor={this.state.isLoading ? '#DFDFDF' : '#FF4242'}
            backgroundDarker={this.state.isLoading ? '#CACACA' : '#B62828'}
            onPress={async (next) => {
              await this._onLogin()
              next()
            }}
            disabled={this.state.isLoading}
          >
            Connexion
          </AwesomeButton>
        </ButtonContainer>
      </Screen>
    )
  }
}
