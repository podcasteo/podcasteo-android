import {
  Alert,
  Linking,
} from 'react-native'

function getFacebookURL(data, type) {
  return {
    appURL: `fb://${type === 'podcast' || type === 'group' ? 'page' : 'profile'}/${data}`,
    webURL: `http://facebook.com/${data}`,
  }
}

function getTwitterURL(data) {
  return {
    appURL: `twitter://user?screen_name=${data}`,
    webURL: `https://twitter.com/${data}`,
  }
}

function getItunesURL(data) {
  return {
    appURL: `itm:${data.split(':')[1]}`,
    webURL: data,
  }
}

function getSoundcloudURL(data) {
  return {
    appURL: `soundcloud://users:${data}`,
    webURL: `https://soundcloud.com/${data}`,
  }
}

export default async function openURL(data, provider, type) {
  let appURL
  let webURL

  switch (provider) {
    case 'facebook':
      ({
        appURL,
        webURL,
      } = getFacebookURL(data, type))
      break
    case 'twitter':
      ({
        appURL,
        webURL,
      } = getTwitterURL(data, type))
      break
    case 'soundcloud':
      ({
        appURL,
        webURL,
      } = getSoundcloudURL(data, type))
      break
    case 'itunes':
      ({
        appURL,
        webURL,
      } = getItunesURL(data, type))
      break
    default:
      break
  }

  try {
    const supported = Linking.canOpenURL(appURL)

    if (!supported) {
      throw Error('UNSUPPORTED')
    } else {
      await Linking.openURL(appURL)
    }
  } catch (appURLError) {
    try {
      await Linking.openURL(webURL)
    } catch (webURLError) {
      Alert.alert(
        'Erreur 34788',
        `l'url suivante est invalide: ${webURL}`,
        [
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
}
