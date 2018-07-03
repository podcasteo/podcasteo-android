import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native'
import {
  Input,
  Button,
} from 'react-native-elements'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import settings from 'helpers/settings'
import validateEmail from 'helpers/validateEmail'
import PasswordInput from 'components/PasswordInput'

const Screen = styled.KeyboardAvoidingView`
  flex: 1;
`
const Scroll = styled.ScrollView`
  flex: 1;
`
const Formulaire = styled.View`
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
const ErrorText = styled.Text`
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
      error: '',
      password: '',
      isLoading: false,
      username: '',
    }
  }

  onSignUp = async () => {
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

    if (get(username, 'length', 0) < 3) {
      return this.setState({
        error: 'invalid username',
      })
    }

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

    if (get(password, 'length', 0) < 3 || password !== confirmPassword) {
      return this.setState({
        error: 'invalid password',
      })
    }

    this.setState({
      isLoading: true,
    })

    try {
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
      this.setState({
        isLoading: false,
        error: 'Something went wrong...',
      })
    }

    return true
  }

  render() {
    return (
      <Screen
        behavior="padding"
        enabled
      >
        <Scroll
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Formulaire>
            <InputLine>
              <FontAwesome
                name="user-circle"
                size={32}
                color="gray"
              />
              <Input
                containerStyle={styles.input}
                onChangeText={(username) => this.setState({
                  username,
                })}
                placeholder="Username"
                value={this.state.username}
                autoCapitalize="none"
              />
            </InputLine>
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
            <InputLine>
              <FontAwesome
                name="lock"
                size={32}
                color="gray"
              />
              <PasswordInput
                onChangeText={(confirmPassword) => this.setState({
                 confirmPassword,
                })}
                placeholder="Mot de passe"
                value={this.state.confirmPassword}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </InputLine>
          </Formulaire>
        </Scroll>
        <ErrorText>{this.state.error}</ErrorText>
        <Button
          onPress={this.onSignUp}
          containerStyle={{
              flex: 0,
              paddingBottom: 10,
            }}
          text="Inscription"
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
