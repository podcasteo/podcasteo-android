import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PodcastInfo from './components/PodcastInfo'
import SocialNetworks from './components/SocialNetworks'
import UserLikes from './components/UserLikes'
import UserMembers from './components/UserMembers'

const Content = styled.ScrollView``

export default class PodcastContent extends React.PureComponent {
  static propTypes = {
    podcast: PropTypes.object.isRequired,
  }

  render() {
    const {
      podcast,
    } = this.props

    return (
      <Content>
        <PodcastInfo data={podcast} />
        <UserLikes slug={podcast.slug} />
        <UserMembers slug={podcast.slug} />
        <SocialNetworks data={podcast} />
      </Content>
    )
  }
}
