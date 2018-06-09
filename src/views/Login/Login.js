import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Constants,
  Facebook,
} from 'expo'
import {
  AsyncStorage,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'

import SignIn from 'views/Login/components/SignIn'
import SignUp from 'views/Login/components/SignUp'
import ButtonUnderline from 'components/ButtonUnderline'
import logo from 'assets/icons/logo.png'
import settings from 'helpers/settings'

const TabButtonRow = styled.View`
  margin-top: 10;
  flex-direction: row;
  justify-content: space-evenly;
`
const Screen = styled.View`
  flex: 1;
  flex-grow: 1;
`
const Header = styled.View`
  padding-top: ${20 + Constants.statusBarHeight};
  align-items: center;
  justify-content: flex-end;
`
const Bottom = styled.View`
  padding-bottom: ${5 + Constants.statusBarHeight};
  align-items: center;
`
const IconHeader = styled.Image`
  width: 80
  height: 80
`
const Error = styled.Text`
  margin-left: 10;
  font-weight: bold;
  color: red;
`

export default class Login extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    handleFacebook: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      signin: true,
      isLoading: false,
      error: null,
    }
  }

  onFacebookLogin = async () => {
    const {
      handleFacebook,
      history,
    } = this.props

    this.setState({
      isLoading: true,
    })

    try {
      const {
        type, token,
      } = await Facebook.logInWithReadPermissionsAsync(settings.facebookAppId, {
        permissions: [
          'public_profile',
          'email',
        ],
      })

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,short_name`)
        const data = await response.json()
        const result = await handleFacebook({
          facebookId: data.id,
          email: data.email,
          firstname: data.first_name,
          lastname: data.last_name,
          username: data.short_name,
        })

        await AsyncStorage.setItem(settings.authToken, result.data.handleFacebook.token)

        return history.push('/home')
      }
    } catch (error) {
      console.log('error', error)

      return this.setState({
        isLoading: false,
        error: error.message,
      })
    }

    return true
  }

  setSignIn = () => this.setState({
    signin: true,
  })

  setSignUp = () => this.setState({
    signin: false,
  })

  render() {
    const {
      history,
    } = this.props

    return (
      <Screen>
        <Header>
          <IconHeader source={logo} />
        </Header>
        <TabButtonRow>
          <ButtonUnderline
            underline={this.state.signin}
            onPress={this.setSignIn}
            title="DÉJA INSCRIT"
          />
          <ButtonUnderline
            underline={!this.state.signin}
            onPress={this.setSignUp}
            title="PAS ENCORE INSCRIT"
          />
        </TabButtonRow>
        {
          this.state.signin
            ? <SignIn history={history} onLogin={this.props.onLogin} />
            : <SignUp history={history} createUser={this.props.createUser} />
        }
        <Bottom>
          <Error>{this.state.error}</Error>
          <TabButtonRow>
            <Button
              onPress={this.onFacebookLogin}
              text="Facebook Login"
              buttonStyle={{
                  backgroundColor: 'blue',
                  width: 200,
                  height: 45,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 5,
                }}
              loading={this.state.isLoading}
            />
          </TabButtonRow>
        </Bottom>
      </Screen>
    )
  }
}