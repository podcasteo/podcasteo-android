import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  graphql,
  Query,
} from 'react-apollo'

import ProfileSettingsAvatarView from './ProfileSettingsAvatar'

import selfQuery from 'api/users/query/self'
import uploadUserAvatarMutation from 'api/users/mutation/uploadUserAvatar'
import ErrorView from 'components/ErrorView'

class ProfileSettingsAvatar extends React.PureComponent {
  static propTypes = {
    uploadUserAvatar: PropTypes.func.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      loading,
    } = result
    const {
      uploadUserAvatar,
    } = this.props

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <ProfileSettingsAvatarView
        uploadUserAvatar={uploadUserAvatar}
        user={get(data, 'self')}
        loading={loading}
      />
    )
  }

  render() {
    return (
      <Query
        query={selfQuery}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}

@graphql(uploadUserAvatarMutation, {
  props: ({
    mutate,
  }) => ({
    uploadUserAvatar: (file) => mutate({
      variables: {
        file,
      },
    }),
  }),
  options: () => ({
    refetchQueries:
    () => ([
      {
        query: selfQuery,
      },
    ]),
  }),
})
export default class extends ProfileSettingsAvatar {}
