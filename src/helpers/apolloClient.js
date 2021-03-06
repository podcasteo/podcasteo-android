import {
  AsyncStorage,
} from 'react-native'
import {
  ApolloClient,
} from 'apollo-client'
import {
  InMemoryCache,
} from 'apollo-cache-inmemory'
import {
  concat,
} from 'apollo-link'
import {
  setContext,
} from 'apollo-link-context'
import {
  createUploadLink,
} from 'apollo-upload-client'

import settings from 'helpers/settings'

const authMiddleware = setContext(async () => {
  const context = {}
  const headers = {}

  try {
    const authorization = await AsyncStorage.getItem(settings.authToken)

    if (authorization !== null) {
      headers.authorization = authorization
    }
  } catch (error) {
    // Error retrieving data
  }

  context.headers = headers

  return context
})
const uploadLink = createUploadLink({
  uri: settings.graphqlAPI,
})
const client = new ApolloClient({
  link: concat(authMiddleware, uploadLink),
  cache: new InMemoryCache(),
})

export default client
