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

export default class SignUp extends React.Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      confirmPassword: '',
      email: '',
      password: '',
      isLoading: false,
      username: '',
    }
  }

  _onSignUp = async () => {
    const {
      confirmPassword,
      email,
      password,
      username,
    } = this.state
    const {
      createUser,
      history,
    } = this.props

    try {
      if (get(username, 'length', 0) < 3) {
        throw new Error('pseudo invalide')
      }

      if (!validateEmail(email)) {
        throw new Error('email invalide')
      }

      if (get(password, 'length', 0) < 3 || password !== confirmPassword) {
        throw new Error('invalid password')
      }

      this.setState({
        isLoading: true,
      })

      const result = await createUser({
        username,
        email,
        password,
      })

      await AsyncStorage.setItem(settings.authToken, result.data.createUser.token)

      this.setState({
        isLoading: false,
      })

      return history.push('/app/dashboard')
    } catch (error) {
      Alert.alert(
        'Inscription',
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
      <Screen
        behavior="padding"
        enabled
      >
        <InformationContainer>
          <InputLine>
            <HideoInput
              iconClass={FontAwesome}
              iconName="user"
              iconColor="white"
              iconBackgroundColor="#247DAB"
              onChangeText={(username) => this.setState({
                username,
              })}
              inputStyle={{
                color: 'black',
              }}
              placeholder="pseudo"
              value={this.state.username}
              autoCapitalize="none"
              onSubmitEditing={() => {
                this.emailInput.focus()
              }}
            />
          </InputLine>
          <InputLine>
            <HideoInput
              ref={(emailInput) => this.emailInput = emailInput} // eslint-disable-line
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
              keyboardType="email-address"
              autoCapitalize="none"
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
              placeholder="password"
              value={this.state.password}
              autoCapitalize="none"
              autoCorrect={false}
              isPassword
              onSubmitEditing={() => {
                this.confirmPassword.focus()
              }}
            />
          </InputLine>
          <InputLine>
            <HideoInput
              ref={(confirmPassword) => this.confirmPassword = confirmPassword} // eslint-disable-line
              iconClass={FontAwesome}
              iconName="lock"
              iconColor="white"
              iconBackgroundColor="#247DAB"
              onChangeText={(confirmPassword) => this.setState({
                confirmPassword,
              })}
              inputStyle={{
                color: 'black',
              }}
              placeholder="password"
              value={this.state.confirmPassword}
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
              await this._onSignUp()
              next()
            }}
            disabled={this.state.isLoading}
          >
            Inscription
          </AwesomeButton>
        </ButtonContainer>
      </Screen>
    )
  }
}
