import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native'
import {
  Input,
  Button,
} from 'react-native-elements'

import PasswordInput from 'components/PasswordInput'
import settings from 'helpers/settings'
import validateEmail from 'helpers/validateEmail'

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
  font-weight: bold;
  color: red;
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
    onLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: null,
      isLoading: false,
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

      return history.push('/home')
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
              />
            </InputLine>
            <InputLine>
              <FontAwesome
                name="lock"
                size={32}
                color="gray"
              />
              <PasswordInput
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
        <Button
          onPress={this.onLogin}
          text="Connexion"
          buttonStyle={{
              backgroundColor: 'red',
              width: 200,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
            }}
          loading={this.state.isLoading}
        />
      </Screen>
    )
  }
}
