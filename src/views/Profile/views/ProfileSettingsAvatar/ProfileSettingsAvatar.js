import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue'
import {
  Alert,
  StyleSheet,
} from 'react-native'
import {
  ImagePicker,
  Permissions,
} from 'expo'
import {
  ReactNativeFile,
} from 'apollo-upload-client'

import defaultUserImage from 'assets/defaults/user.png'
import ImageLoader from 'components/ImageLoader'

const Screen = styled.View`
  flex: 1;
`
const Header = styled.View`
  padding-left: 5;
  margin-left: 10;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 10;
  flex-direction: row;
  border-left-width: 2;
  border-left-color: red;
  align-items: baseline;
`
const Title = styled.Text`
  font-size: 20;
`
const ImageContainer = styled.TouchableOpacity`
  width: 200;
  height: 200;
  border-radius: 100;
`
const SpaceContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const ButtonContainer = styled.View`
  margin-top: 20;
`
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: 200,
    opacity: 0.4,
    backgroundColor: 'darkgrey',
    borderRadius: 100,
  },
})

export default class ProfileSettingsAvatar extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    uploadUserAvatar: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: true,
    user: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      uploading: false,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
    }
  }

  async componentWillMount() {
    const {
      status: cameraStatus,
    } = await Permissions.askAsync(Permissions.CAMERA)
    const {
      status: cameraRollStatus,
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    this.setState({
      hasCameraPermission: cameraStatus === 'granted',
      hasCameraRollPermission: cameraRollStatus === 'granted',
    })
  }

  getImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.6,
      aspect: [
        1,
        1,
      ],
    })

    if (result.cancelled) {
      return true
    }

    return this._uploadFile(result)
  }

  getImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.6,
      aspect: [
        1,
        1,
      ],
    })

    if (result.cancelled) {
      return true
    }

    return this._uploadFile(result)
  }

  getImagePickerMethod = async () => {
    Alert.alert(
      'Choisir un avatar',
      'Comment choisir votre avatar ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Camera', onPress: async () => this.getImageFromCamera(),
        },
        {
          text: 'Fichier', onPress: async () => this.getImageFromLibrary(),
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  _uploadFile = async (result) => {
    const {
      uploadUserAvatar,
    } = this.props
    const file = new ReactNativeFile({
      uri: result.uri,
      type: 'image/jpeg',
      name: result.uri.split('/')[result.uri.split('/').length - 1],
    })

    try {
      this.setState({
        uploading: true,
      })

      await uploadUserAvatar(file)

      return this.setState({
        uploading: false,
      })
    } catch (error) {
      Alert.alert(
        'Choisir un avatar',
        'Une erreur est survenue...',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => {},
          },
        ],
        {
          cancelable: true,
        },
      )

      return this.setState({
        uploading: false,
      })
    }
  }

  _updateAvatar = async () => {
    const {
      hasCameraPermission,
      hasCameraRollPermission,
    } = this.state

    if (hasCameraPermission && hasCameraRollPermission) {
      await this.getImagePickerMethod()
    } else if (hasCameraRollPermission) {
      await this.getImageFromLibrary()
    } else {
      Alert.alert(
        'Choisir un avatar',
        'Merci de changer vos permissions',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => {},
          },
        ],
        {
          cancelable: true,
        },
      )
    }
  }

  render() {
    const {
      user,
      loading,
    } = this.props
    const {
      uploading,
    } = this.state

    return (
      <Screen>
        <Header>
          <Title>MON AVATAR</Title>
        </Header>
        <SpaceContainer>
          <ImageContainer
            onPress={this._updateAvatar}
            disabled={loading || uploading}
          >
            <ImageLoader
              containerStyle={styles.container}
              style={styles.image}
              source={{
                uri: user.avatar,
              }}
              placeholderSource={defaultUserImage}
            />
          </ImageContainer>
          <ButtonContainer>
            <AwesomeButton
              onPress={this._updateAvatar}
              disabled={loading || uploading}
            >
              Change Avatar
            </AwesomeButton>
          </ButtonContainer>
        </SpaceContainer>
      </Screen>
    )
  }
}
