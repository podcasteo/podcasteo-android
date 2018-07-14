import {
  withRouter,
} from 'react-router-native'
import {
  withApollo,
} from 'react-apollo'

import ProfileOthersDisconnect from './ProfileOthersDisconnect'

@withApollo
@withRouter
export default class extends ProfileOthersDisconnect {}
