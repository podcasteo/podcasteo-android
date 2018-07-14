import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  AsyncStorage,
} from 'react-native'

import settings from 'helpers/settings'
import Loader from 'components/Loader'

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default class ProfileOthersDisconnect extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  componentDidMount = async () => {
    const {
      history,
      client,
    } = this.props

    try {
      await AsyncStorage.removeItem(settings.authToken)
      await client.resetStore()

      const {
        entries,
      } = history

      entries[0] = entries[entries.length - 1]
      entries.length = 1

      history.replace('/')
    } catch (error) {
      history.goBack()
    }
  }

  render() {
    return (
      <Screen>
        <Loader />
      </Screen>
    )
  }
}
