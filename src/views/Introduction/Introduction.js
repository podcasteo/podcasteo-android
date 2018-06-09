import React from 'react'
import PropTypes from 'prop-types'
import { // eslint-disable-line
  Ionicons,
} from '@expo/vector-icons'
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'

import slide1 from 'assets/slides/intro_1.png'
import slide2 from 'assets/slides/intro_2.png'
import slide3 from 'assets/slides/intro_3.png'
import AppIntroSlider from 'components/AppIntroSlider'
import settings from 'helpers/settings'

const {
  width: appWidth,
  height: appHeight,
} = Dimensions.get('window')
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: appWidth + 20,
    height: appHeight + 20,
  },
})
const slides = [
  {
    key: 'introduction',
    title: 'Podcastéo ?',
    text: 'Rejoins la communauté Podcastéo et découvre les Podcasts du moment.',
    image: slide1,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
  {
    key: 'social',
    title: 'Classement',
    text: 'En devenant membre Podcastéo tu peux découvrir la progression de tes podcasts préféré à travers différents réseaux.',
    image: slide2,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
  {
    key: 'radio',
    title: 'Webradio',
    text: 'Tu peux aussi écouter la webradio Podcastéo, diffusant une selection de podcast choisie avec amour.',
    image: slide3,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
]

export default class Introduction extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  componentDidMount = async () => {
    const {
      history,
    } = this.props

    try {
      const value = await AsyncStorage.getItem(settings.introduction)

      if (value !== null) {
        history.replace('/login')
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  _onDone = async () => {
    const {
      history,
    } = this.props

    try {
      await AsyncStorage.setItem(settings.introduction, 'done')
    } catch (error) {
      // Error retrieving data
    }

    history.replace('/login')
  }

  _renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-arrow-round-forward"
        size={24}
        style={{
         backgroundColor: 'transparent',
        }}
      />
    </View>
  )

  _renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-checkmark"
        size={24}
        style={{
         backgroundColor: 'transparent',
       }}
      />
    </View>
  )

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this._onDone}
      />
    )
  }
}
