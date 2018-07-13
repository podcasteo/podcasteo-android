import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue'
import {
  StyleSheet,
} from 'react-native'

import defaultErrorImage from 'assets/defaults/error.png'
import ImageLoader from 'components/ImageLoader'

const Screen = styled.ScrollView``
const ErrorImage = styled.View`
  margin-top: 10%;
  height: 200;
  justify-content: center;
  align-items: center;
`
const ErrorMessage = styled.View`
  flex: 1;
  margin-left: 5%;
`
const ErrorTitle = styled.Text`
  font-size: 24;
  font-weight: bold;
  margin-top: 10%;
`
const ErrorSubTitle = styled.Text`
  font-size: 20;
`
const ErrorContent = styled.Text`
  font-size: 18;
  color: red;
`
const ErrorSeparator = styled.View`
  margin-top: 10%;
  justify-content: center;
  align-items: center;
`
const ErrorReturn = styled.View`
  flex: 1;
  margin-top: 5%;
  justify-content: center;
  align-items: center;
`
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
})

export default class ErrorView extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    error: PropTypes.object,
  }

  static defaultProps = {
    error: {
      message: 'Unknow Error',
    },
  }

  _goBack = () => {
    const {
      history,
    } = this.props

    history.goBack()
  }

  render() {
    const errorTitle = 'Une erreur sème la zizanie...'
    const errorInformation = "Merci d'envoyer une capture d'écran à podcasteo.developer@gmail.com"

    return (
      <Screen>
        <ErrorImage>
          <ImageLoader
            style={styles.image}
            source={defaultErrorImage}
          />
        </ErrorImage>
        <ErrorMessage>
          <ErrorTitle>{errorTitle}</ErrorTitle>
          <ErrorSubTitle>{errorInformation}</ErrorSubTitle>
        </ErrorMessage>
        <ErrorSeparator>
          <ErrorSubTitle>--- Error message ---</ErrorSubTitle>
        </ErrorSeparator>
        <ErrorMessage>
          <ErrorContent>{this.props.error.message}</ErrorContent>
        </ErrorMessage>
        <ErrorReturn>
          <AwesomeButton
            type="primary"
            size="small"
            onPress={this._goBack}
          >
            Go back
          </AwesomeButton>
        </ErrorReturn>
      </Screen>
    )
  }
}
