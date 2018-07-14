import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
  graphql,
} from 'react-apollo'

import ProfileSettingsInformationView from './ProfileSettingsInformation'

import selfQuery from 'api/users/query/self'
import updateUserMutation from 'api/users/mutation/updateUser'
import ErrorView from 'components/ErrorView'

class ProfileSettingsInformation extends React.PureComponent {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      networkStatus,
      loading,
    } = result
    const {
      updateUser,
    } = this.props

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <ProfileSettingsInformationView
        updateUser={updateUser}
        user={get(data, 'self')}
        networkStatus={networkStatus}
        loading={loading}
      />
    )
  }

  render() {
    return (
      <Query
        query={selfQuery}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}

@graphql(updateUserMutation, {
  props: (props) => ({
    updateUser: (data) => props.mutate({
      variables: {
        input: {
          ...data,
        },
      },
    }),
  }),
})
export default class extends ProfileSettingsInformation {}
