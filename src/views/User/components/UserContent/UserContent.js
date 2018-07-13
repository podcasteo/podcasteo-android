import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SocialNetworks from './components/SocialNetworks'
import PodcastMembers from './components/PodcastMembers'
import PodcastLikes from './components/PodcastLikes'
import UserFollowing from './components/UserFollowing'
import UserFollowers from './components/UserFollowers'

const Content = styled.ScrollView``

export default class UserContent extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const {
      user,
    } = this.props

    return (
      <Content>
        <PodcastMembers slug={user.slug} />
        <PodcastLikes slug={user.slug} />
        <UserFollowing slug={user.slug} />
        <UserFollowers slug={user.slug} />
        <SocialNetworks data={user} />
      </Content>
    )
  }
}
