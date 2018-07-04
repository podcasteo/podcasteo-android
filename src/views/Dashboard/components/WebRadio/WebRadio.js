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

import settings from 'helpers/settings'

const WebRadioComponent = styled.View`
  height: 15%;
  background-color: blue;
`
const WebRadioContainer = styled.View`
  flex-direction: row;
  flex: 1;
`
const PodcastLink = styled.View`
  aspect-ratio: 1;
  background-color: red;
`
const RadioComponent = styled.View`
  flex: 1;
  background-color: green;
  flex-direction: row;
`
const Information = styled.View`
  flex: 1;
  flex-direction: column;
`
const Title = styled.View`
  flex: 1;
  justify-content: center;
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

export default class WebRadio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initAudio: true,
      playing: false,
      audio: new Audio.Sound(),
      title: 'unknow...',
      artist: 'unknow...',
    }
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

      this.setState({
        title: get(responseData, 'now_playing.song.title', 'unknow...'),
        artist: get(responseData, 'now_playing.song.artist', 'unknow...'),
        podcastSlug: get(responseData, 'now_playing.song.custom_fields.podcast', null), // eslint-disable-line
      })
    } catch (error) {
      console.log('error', error) // eslint-disable-line
    }
  }

  _onPressPlay = async () => {
    const {
      playing,
      initAudio,
      audio,
    } = this.state

    try {
      if (!playing) {
        if (initAudio) {
          const source = {
            uri: 'https://radio.podcasteo-developer.com/radio/8000/radio.mp3',
          }

          await audio.loadAsync(source)
        }

        await audio.playAsync()

        this.setState({
          playing: true,
          initAudio: false,
        })
      } else {
        await audio.stopAsync()

        this.setState({
          playing: false,
        })
      }
    } catch (error) {
      this.setState({
        playing: false,
        initAudio: true,
        audio: new Audio.Sound(),
      })
    }
  }

  render() {
    return (
      <WebRadioComponent>
        <WebRadioContainer>
          <PodcastLink />
          <RadioComponent>
            <Information>
              <Title>
                <TextTicker
                  style={{
                   fontSize: 16,
                  }}
                  marqueeDelay={1000}
                >
                  {this.state.title}
                </TextTicker>
              </Title>
              <Artist>
                <TextTicker
                  style={{
                   fontSize: 14,
                  }}
                  marqueeDelay={1000}
                >
                  {this.state.artist}
                </TextTicker>
              </Artist>
            </Information>
            <Play onPress={this._onPressPlay}>
              <FontAwesome
                size={30}
                name={this.state.playing ? 'pause' : 'play'}
                color="black"
              />
            </Play>
          </RadioComponent>
        </WebRadioContainer>
      </WebRadioComponent>
    )
  }
}
