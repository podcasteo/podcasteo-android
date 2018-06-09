import {
  graphql,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import LoginView from './Login'

import loginMutation from 'api/users/login'
import createUserMutation from 'api/users/createUser'
import handleFacebookMutation from 'api/users/handleFacebook'

@graphql(loginMutation, {
  name: 'loginMutation',
  props: (props) => ({
    onLogin: ({
      email,
      password,
    }) => props.loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    }),
  }),
})
@graphql(createUserMutation, {
  name: 'createUserMutation',
  props: (props) => ({
    createUser: ({
      email,
      username,
      password,
    }) => props.createUserMutation({
      variables: {
        input: {
          email,
          username,
          password,
        },
      },
    }),
  }),
})
@graphql(handleFacebookMutation, {
  name: 'handleFacebookMutation',
  props: (props) => ({
    handleFacebook: ({
      email,
      username,
      facebookId,
      firstname,
      lastname,
    }) => props.handleFacebookMutation({
      variables: {
        input: {
          email,
          username,
          facebookId,
          firstname,
          lastname,
        },
      },
    }),
  }),
})
@withRouter
export default class Login extends LoginView {}
