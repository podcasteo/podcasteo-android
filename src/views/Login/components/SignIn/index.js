import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import AwesomeButton from 'react-native-really-awesome-button'
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'
import {
  Input,
} from 'react-native-elements'

import settings from 'helpers/settings'
import validateEmail from 'helpers/validateEmail'
import PasswordInput from 'components/PasswordInput'

const Screen = styled.View`
  flex: 1;
`
const Scroll = styled.ScrollView`
  margin-bottom: 20;
  flex: 1;
`
const Formulaire = styled.View`
  flex: 1;
  margin-top: 20;
  margin-bottom: 20;
`
const InputLine = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
  margin-left: 15;
  margin-bottom: 15;
  margin-right: 15;
`
const Error = styled.Text`
  margin-left: 10;
  margin-bottom: 10;
  font-weight: bold;
  color: red;
`
const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  container: {
    paddingBottom: 20,
  },
})

export default class SignIn extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      error: null,
      isLoading: false,
      password: '',
    }
  }

  onLogin = async () => {
    const {
      email,
      password,
    } = this.state
    const {
      onLogin,
      history,
    } = this.props

    if (!validateEmail(email)) {
      return this.setState({
        error: 'invalid email',
      })
    }

    if (get(password, 'length', 0) < 3) {
      return this.setState({
        error: 'invalid password',
      })
    }

    this.setState({
      isLoading: true,
    })

    try {
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
      this.setState({
        isLoading: false,
        error: 'Something went wrong...',
      })
    }

    return true
  }

  render() {
    return (
      <Screen>
        <Scroll
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Formulaire>
            <InputLine>
              <FontAwesome
                name="envelope-o"
                size={32}
                color="gray"
              />
              <Input
                containerStyle={styles.input}
                onChangeText={(email) => this.setState({
                  email,
                })}
                placeholder="Email"
                value={this.state.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  this.passwordInput.focus()
                }}
              />
            </InputLine>
            <InputLine>
              <FontAwesome
                name="lock"
                size={32}
                color="gray"
              />
              <PasswordInput
                inputRef={(passwordInput) => {
                  this.passwordInput = passwordInput
                }}
                onChangeText={(password) => this.setState({
                 password,
                })}
                placeholder="Mot de passe"
                value={this.state.password}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </InputLine>
          </Formulaire>
        </Scroll>
        <Error>{this.state.error}</Error>
        <ButtonContainer>
          <AwesomeButton
            progress
            onPress={async (next) => {
              await this.onLogin()
              next()
            }}
            backgroundColor="#FF4242"
            backgroundDarker="#B62828"
            disabled={this.state.isLoading}
          >
            Connexion
          </AwesomeButton>
        </ButtonContainer>
      </Screen>
    )
  }
}
