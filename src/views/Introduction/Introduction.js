import React from 'react'
import PropTypes from 'prop-types'
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import { // eslint-disable-line
  Ionicons,
} from '@expo/vector-icons'

import slide1 from 'assets/slides/intro_1.png'
import slide2 from 'assets/slides/intro_2.png'
import slide3 from 'assets/slides/intro_3.png'
import settings from 'helpers/settings'
import AppIntroSlider from 'components/AppIntroSlider'

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
    title: '',
    text: 'Rejoins la communauté Podcastéo et découvre les podcasts du moment.',
    image: slide1,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
  {
    key: 'social',
    title: '',
    text: 'En devenant membre Podcastéo, tu peux découvrir la progression de tes podcasts préférés à travers différents réseaux.',
    image: slide2,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
  {
    key: 'radio',
    title: '',
    text: 'Tu peux aussi écouter la webradio Podcastéo, qui diffuse une sélection de podcasts choisis avec amour.',
    image: slide3,
    imageStyle: styles.image,
    backgroundColor: '#247DAB',
  },
]

export default class Introduction extends React.PureComponent {
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
