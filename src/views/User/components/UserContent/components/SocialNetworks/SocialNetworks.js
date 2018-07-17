import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FlatList,
  StyleSheet,
} from 'react-native'

import StaticImage from 'helpers/StaticImage'
import openURL from 'helpers/openURL'
import TouchCircle from 'components/TouchCircle'

const Container = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`
const Title = styled.Text`
  margin-left: 5%;
  font-weight: bold;
  font-size: 16;
`
const SubContainer = styled.View`
  margin-top: 3%;
  margin-left: 5%;
`
const SubText = styled.Text`
  font-size: 14px;
  margin-left: 5%;
`
const Separator = styled.View`
  margin-right: 5px;
`
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
})

export default class SocialNetworks extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: null,
  }

  getSocialNetworks = (data) => {
    const socialNetworks = []

    if (data) {
      if (data.facebook) {
        socialNetworks.push({
          type: 'facebook',
          url: data.facebook,
        })
      }

      if (data.twitter) {
        socialNetworks.push({
          type: 'twitter',
          url: data.twitter,
        })
      }

      if (data.itunes) {
        socialNetworks.push({
          type: 'itunes',
          url: data.itunes,
        })
      }

      if (data.soundcloud) {
        socialNetworks.push({
          type: 'soundcloud',
          url: data.soundcloud,
        })
      }
    }

    return socialNetworks
  }

  render() {
    const {
      data,
    } = this.props
    const socialNetworks = this.getSocialNetworks(data)

    return (
      <Container>
        <Title>Réseaux sociaux</Title>
        <SubContainer>
          {
            socialNetworks.length > 0 ? (
              <FlatList
                horizontal
                enableEmptySections
                data={socialNetworks}
                keyExtractor={(item) => `${item.type}/${item.url}`}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) => // eslint-disable-line
                  (<TouchCircle
                    onPress={() => openURL(item.url, item.type)}
                    image={{
                      resizeMode: 'cover',
                      style: styles.image,
                      source: StaticImage[item.type],
                    }}
                  />)
                }
              />
            ) : (
              <SubText>
                Aucun lien
              </SubText>
            )
          }
        </SubContainer>
      </Container>
    )
  }
}
