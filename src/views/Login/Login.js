import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Constants,
  Facebook,
} from 'expo'
import {
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue'

import logo from 'assets/icons/logo.png'
import settings from 'helpers/settings'
import ButtonUnderline from 'components/ButtonUnderline'
import SignIn from 'views/Login/components/SignIn'
import SignUp from 'views/Login/components/SignUp'

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
const ErrorText = styled.Text`
  margin-left: 10;
  font-weight: bold;
  color: red;
`
const ScrollContainer = styled.View`
  flex: 1;
`

export default class Login extends React.Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    handleFacebook: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoading: false,
      signin: true,
    }
  }

  setSignIn = () => this.setState({
    signin: true,
  })

  setSignUp = () => this.setState({
    signin: false,
  })

  _onFacebookLogin = async () => {
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
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,short_name,picture.width(500).height(500)`)
        const data = await response.json()
        const result = await handleFacebook({
          facebookId: data.id,
          email: data.email,
          firstname: data.first_name,
          lastname: data.last_name,
          username: `${data.first_name}${data.last_name}`,
          facebookAvatar: data.picture.data.url,
        })

        await AsyncStorage.setItem(settings.authToken, result.data.handleFacebook.token)

        return history.replace('/app/dashboard')
      }

      throw new Error('Facebook connexion failed')
    } catch (error) {
      Alert.alert(
        'Connexion Facebook',
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
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollContainer>
              {
                this.state.signin
                  ? <SignIn history={history} onLogin={this.props.onLogin} />
                  : <SignUp history={history} createUser={this.props.createUser} />
              }
              <Bottom>
                <ErrorText>{this.state.error}</ErrorText>
                <TabButtonRow>
                  <AwesomeButton
                    progress
                    onPress={async (next) => {
                    await this._onFacebookLogin()
                    next()
                  }}
                    disabled={this.state.isLoading}
                  >
                  Connexion Facebook
                  </AwesomeButton>
                </TabButtonRow>
              </Bottom>
            </ScrollContainer>
          </KeyboardAvoidingView>
        </ScrollView>
      </Screen>
    )
  }
}
