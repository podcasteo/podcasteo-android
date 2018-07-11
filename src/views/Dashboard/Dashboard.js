import React from 'react'
import styled from 'styled-components'

import WebRadio from './components/WebRadio'
import PodcastsPodcasteo from './components/PodcastsPodcasteo'
import PodcastsRanking from './components/PodcastsRanking'
import PodcastsWomen from './components/PodcastsWomen'

const DashboardContainer = styled.View`
flex: 1;
flex-direction: column;
background-color: #F3F3F3;
`

export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <DashboardContainer>
        <WebRadio key="WebRadio" />
        <PodcastsRanking key="PodcastsRanking" />
        <PodcastsWomen key="PodcastsWomen" />
        <PodcastsPodcasteo key="PodcastsPodcasteo" />
      </DashboardContainer>
    )
  }
}
