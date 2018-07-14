import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AwesomeButton from 'react-native-really-awesome-button'
import {
  Alert,
  KeyboardAvoidingView,
} from 'react-native'

import IsaoInput from 'components/CustomInput/Isao'

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
  margin-bottom: 10;
`
const InputLine = styled.View`
  flex: 1;
  margin-bottom: 15;
  margin-right: 15;
`

export default class ProfileUsersFollowers extends React.Component {
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
      isLoading: false,
      isUpdate: false,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!this.props.loading && prevProps.loading && this.props.user) {
      this.setState({
        ...this.props.user,
        isUpdate: false,
      })
    }
  }

  _updateInformation = async () => {
    const {
      description,
      email,
      firstname,
      lastname,
      username,
    } = this.state
    const {
      updateUser,
      user,
    } = this.props

    try {
      await updateUser({
        id: user.id,
        description,
        email,
        firstname,
        lastname,
        username,
      })

      this.setState({
        isUpdate: false,
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
    const disabled = this.state.isLoading || !this.state.isUpdate

    return (
      <Container>
        <Header>
          <Title>MES INFORMATIONS</Title>
        </Header>
        <FormsContainer>
          <KeyboardAvoidingView behavior="padding" enabled>
            <InformationContainer>
              <InputLine>
                <IsaoInput
                  label="Surnom"
                  activeColor="#da7071"
                  passiveColor="#dadada"
                  onChangeText={(username) => this.setState({
                  username,
                  isUpdate: true,
                })}
                  inputStyle={{
                  color: 'black',
                }}
                  placeholder="Surnom obligatoire"
                  value={this.state.username}
                  autoCapitalize="none"
                />
              </InputLine>
              <InputLine>
                <IsaoInput
                  label="Email"
                  activeColor="#da7071"
                  passiveColor="#dadada"
                  onChangeText={(email) => this.setState({
                  email,
                  isUpdate: true,
                })}
                  inputStyle={{
                  color: 'black',
                }}
                  placeholder="chuck.norris@gmail.com"
                  value={this.state.email}
                />
              </InputLine>
              <InputLine>
                <IsaoInput
                  label="Prénom"
                  activeColor="#da7071"
                  passiveColor="#dadada"
                  onChangeText={(firstname) => this.setState({
                  firstname,
                  isUpdate: true,
                })}
                  inputStyle={{
                  color: 'black',
                }}
                  placeholder="Chuck"
                  value={this.state.firstname}
                />
              </InputLine>
              <InputLine>
                <IsaoInput
                  label="Nom"
                  activeColor="#da7071"
                  passiveColor="#dadada"
                  onChangeText={(lastname) => this.setState({
                  lastname,
                  isUpdate: true,
                })}
                  inputStyle={{
                  color: 'black',
                }}
                  placeholder="Norris"
                  value={this.state.lastname}
                />
              </InputLine>
              <InputLine>
                <IsaoInput
                  label="Description"
                  activeColor="#da7071"
                  passiveColor="#dadada"
                  onChangeText={(description) => this.setState({
                  description,
                  isUpdate: true,
                })}
                  inputStyle={{
                  color: 'black',
                }}
                  placeholder="Quand un moustique pique Chuck Norris, c'est le moustique qui se gratte."
                  value={this.state.description}
                />
              </InputLine>
            </InformationContainer>
          </KeyboardAvoidingView>
          <ButtonContainer>
            <AwesomeButton
              progress
              backgroundColor={disabled ? '#DFDFDF' : '#FF4242'}
              backgroundDarker={disabled ? '#CACACA' : '#B62828'}
              onPress={async (next) => {
                await this._updateInformation()
                next()
              }}
              disabled={disabled}
            >
              Sauvegarder
            </AwesomeButton>
          </ButtonContainer>
        </FormsContainer>
      </Container>
    )
  }
}
