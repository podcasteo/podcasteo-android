import {
  graphql,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import LoginView from './Login'

import createUserMutation from 'api/users/mutation/createUser'
import handleFacebookMutation from 'api/users/mutation/handleFacebook'
import loginMutation from 'api/users/mutation/login'

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
      facebookAvatar,
    }) => props.handleFacebookMutation({
      variables: {
        input: {
          email,
          username,
          facebookId,
          firstname,
          lastname,
          facebookAvatar,
        },
      },
    }),
  }),
})
@withRouter
export default class Login extends LoginView {}
