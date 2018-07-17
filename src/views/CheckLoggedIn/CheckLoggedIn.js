import React from 'react'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import Loader from 'components/Loader'
import ImageBackgroundLoader from 'components/ImageBackgroundLoader'
import StaticImage from 'helpers/StaticImage'

const Screen = styled.View`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`
const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
})

export default class CheckLoggedIn extends React.PureComponent {
  render() {
    return (
      <Screen>
        <ImageBackgroundLoader
          style={styles.background}
          placeholderSource={StaticImage.splash}
          source={StaticImage.splash}
        >
          <Loader />
        </ImageBackgroundLoader>

      </Screen>
    )
  }
}
