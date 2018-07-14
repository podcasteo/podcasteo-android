import React from 'react'
import styled from 'styled-components'
import {
  StyleSheet,
} from 'react-native'

import podcasteoLogo from 'assets/defaults/podcasteo.png'
import ImageLoader from 'components/ImageLoader'

const Screen = styled.ScrollView``
const ImageContainer = styled.View`
  flex-direction: column;
  height: 300;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1;
  border-bottom-color: black;
  margin-left: 10%;
  margin-right: 10%;
`
const Title = styled.Text`
  font-size: 30;
  font-weight: bold;
`
const AboutPodcasteo = styled.View`
  margin-left: 5;
  margin-top: 10;
`
const Subtitle = styled.Text`
  margin-bottom: 5;
  font-weight: bold;
  font-size: 18;
`
const Content = styled.Text`
  margin-bottom: 10;
`
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
})

export default class ProfileOthersAbout extends React.PureComponent {
  render() {
    return (
      <Screen>
        <ImageContainer>
          <Title>Podcastéo</Title>
          <ImageLoader
            style={styles.image}
            source={podcasteoLogo}
          />
        </ImageContainer>
        <AboutPodcasteo>
          <Subtitle>
            Un lien à écouter pour commencer
          </Subtitle>
          <Content>
            Podcastorama spécial Podcastéo avec Julien comme invité : http://kulturkonfitur.fr/podcastorama-24-podcasteo/
          </Content>
          <Subtitle>
            1. Qu’est-ce que Podcastéo ?
          </Subtitle>
          <Content>
            Un monstre protéiforme et organique qui se réinvente chaque trimestre, parti sur une idée étrange de vouloir estimer les audiences de podcasts pour le challenge. Et puis pour réussir, il fallait avoir un nom de start-up française, d’où le eo en fin de nom. Nous étions en avril 2017 et François Fillon avait encore des chances d’être au second tour.
          </Content>
          <Content>
            Maintenant, la France est en marche, et nous avançons également car nous regroupons un classement de podcast, un réseau d’entraide, une communauté de créateurs de podcasts qui discutent sur un discord privé, une émission sur le média Podcast, des awards, des lives et on est pas prêt de s’arrêter.
          </Content>
          <Content>
            A l’origine un site qui liste des podcasts francophones. L’ordre de la liste est basé sur plusieurs critères dont une estimation des audiences calculée par un modèle prédictif.
          </Content>
          <Subtitle>
            2. Qu’est-ce que le réseau Podcastéo ?
          </Subtitle>
          <Content>
            En octobre 2017, 18 podcasts indépendants se sont associés dans le cadre d’un réseau d’entraide au nom de Podcastéo afin de promouvoir le podcast et leurs podcasts. Depuis, d'autres podcasts ont rejoint le réseau qui dénombre maintenant plus de 30 émissions. Cette structure va permettre aux producteurs d'émissions de développer des projets communs et de gagner en visibilité.
          </Content>
          <Content>
            Il faut bien comprendre que ce réseau est vu et compris par chacun de ses membres comme un groupe de solidarité entre podcasts, s’associant pour faire des actions dont la portée est supérieure que réalisées individuellement. Mais jamais nous ne donnons de ligne directrice, ni n’imposons un quelconque contenu dans les podcasts des membres. Enfin, chaque action du réseau est soumise au volontariat et non à l’obligation de réalisation.
          </Content>
          <Subtitle>
            3. Comment rejoindre le réseau Podcastéo ?
          </Subtitle>
          <Content>
            Nous sommes ouverts à tous les créateurs de podcasts, quelque soit ton audience, ton sujet et ton cocktail préféré.
          </Content>
          <Content>
            Il suffit de nous envoyer un email  Nous rejoindre ou de nous envoyer un DM sur notre compte Twitter  @Podcasteo
          </Content>
          <Subtitle>
            4. Qu’est-ce que le podcast Podcastéo ?
          </Subtitle>
          <Content>
            Dans le cadre de la réflexion sur comment renforcer le réseau évoqué ci-dessus, en janvier 2018, le réseau Podcastéo a lancé un podcast animé par ses membres. Chaque épisode aborde une thématique comme le lien avec les auditeurs, le montage ou l'éthique, des thèmes qui concernent à peu près tous les créateurs de podcasts aujourd'hui. Et tous les membres du discord Poscastéo peuvent y participer.
          </Content>
        </AboutPodcasteo>
      </Screen>
    )
  }
}
