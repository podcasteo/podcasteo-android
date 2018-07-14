import React from 'react'
import styled from 'styled-components'
import TextTicker from 'react-native-text-ticker'
import get from 'lodash/get'
import {
  Audio,
} from 'expo'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import PodcastLink from './components/PodcastLink'

import settings from 'helpers/settings'
import webRadioSingleton from 'helpers/webRadioSingleton'

const WebRadioComponent = styled.View`
  height: 80;
`
const WebRadioContainer = styled.View`
  flex-direction: row;
  flex: 1;
`
const RadioComponent = styled.View`
  flex: 1;
  background-color: #111111B3;
  flex-direction: row;
`
const Information = styled.View`
  flex: 1;
  flex-direction: column;
`
const Title = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;
`
const Artist = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 1%;
  margin-right: 1%;
`
const Play = styled.TouchableOpacity`
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`
const PlayButton = styled.View`
  aspect-ratio: 1;
  flex: 1;
  margin: 20%;
  justify-content: center;
  align-items: center;
`

export default class WebRadio extends React.Component {
  constructor(props) {
    super(props)

    this.state = webRadioSingleton.getInstance()
  }

  async componentDidMount() {
    await this.getMetadata()

    this.timer = setInterval(this.getMetadata, 20000)
  }

  async componentWillUnmount() {
    clearInterval(this.timer)
  }

  getMetadata = async () => {
    try {
      const response = await fetch(settings.webradio.nowplaying)
      const responseData = await response.json()

      this.setState(webRadioSingleton.updateInstance({
        title: get(responseData, 'now_playing.song.title', 'unknow...'),
        artist: get(responseData, 'now_playing.song.artist', 'unknow...'),
        slug: get(responseData, 'now_playing.song.custom_fields.podcast', null), // eslint-disable-line
      }))
    } catch (error) {
      // error on metadata
    }
  }

  _onPressPlay = async () => {
    const {
      playing,
      initAudio,
    } = this.state

    try {
      if (!playing) {
        if (initAudio) {
          const source = {
            uri: 'https://radio.podcasteo-developer.com/radio/8000/radio.mp3',
          }

          await webRadioSingleton.getInstance().audio.loadAsync(source)
        }

        await webRadioSingleton.getInstance().audio.playAsync()

        this.setState(webRadioSingleton.updateInstance({
          playing: true,
          initAudio: false,
        }))
      } else {
        await webRadioSingleton.getInstance().audio.stopAsync()

        this.setState(webRadioSingleton.updateInstance({
          playing: false,
        }))
      }
    } catch (error) {
      this.setState(webRadioSingleton.updateInstance({
        playing: false,
        initAudio: true,
        audio: new Audio.Sound(),
      }))
    }
  }

  render() {
    const {
      slug,
    } = this.state

    return (
      <WebRadioComponent>
        <WebRadioContainer>
          <PodcastLink slug={slug} />
          <RadioComponent>
            <Information>
              <Artist>
                <TextTicker
                  style={{
                   fontSize: 16,
                   color: 'white',
                  }}
                  marqueeDelay={1000}
                >
                  {this.state.artist}
                </TextTicker>
              </Artist>
              <Title>
                <TextTicker
                  style={{
                   fontSize: 14,
                   color: 'white',
                  }}
                  marqueeDelay={1000}
                >
                  {this.state.title}
                </TextTicker>
              </Title>
            </Information>
            <Play onPress={this._onPressPlay}>
              <PlayButton>
                <FontAwesome
                  size={30}
                  name={this.state.playing ? 'pause' : 'play'}
                  color="white"
                />
              </PlayButton>
            </Play>
          </RadioComponent>
        </WebRadioContainer>
      </WebRadioComponent>
    )
  }
}
