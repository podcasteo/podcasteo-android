import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Animated,
  Dimensions,
  FlatList,
} from 'react-native'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

const Screen = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ECF0F1;
`
const HeaderView = styled.View`
  flex-direction: column;
`
const TitleView = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  background-color: cornflowerblue;
  padding-bottom: 10;
`
const TriangleView = styled.View`
  height: 0;
  border-top-color: cornflowerblue;
  border-right-width: ${Dimensions.get('screen').width};
  border-right-color: transparent;
`
const TitleText = styled.Text`
  color: white;
  font-size: 20;
  font-weight: bold;
  margin-left: 5%;
`
const SubtitleText = styled.Text`
  color: white;
  font-size: 18;
  margin-left: 5%;
`
const LinesContainer = styled.View`
  margin-bottom: 7%;
  background-color: white;
  border-top-color: gray;
  border-bottom-color: gray;
  border-top-width: 1;
  border-bottom-width: 1;
`
const LineIcon = styled.View`
  width: 8%;
  align-content: center;
  justify-content: center;
  margin-left: 5%;
`
const LineItem = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5%;
  margin-bottom: 5%;
`
const LineText = styled.Text`
  margin-left: 5%;
  font-size: 18;
`
const data = [
  {
    id: 'profileComplementary',
    links: [
      {
        name: 'Mes podcasts',
        link: '/app/profile/podcasts/members',
        icon: 'group',
      },
      {
        name: 'Podcasts favoris',
        link: '/app/profile/podcasts/likes',
        icon: 'bookmark',
      },
      {
        name: 'Abonnés',
        link: '/app/profile/users/followers',
        icon: 'heart-o',
      },
      {
        name: 'Abonnements',
        link: '/app/profile/users/following',
        icon: 'heart',
      },
    ],
  },
  {
    id: 'profileSettings',
    links: [
      {
        name: 'Avatar',
        link: '/app/profile/settings/avatar',
        icon: 'user-circle',
      },
      {
        name: 'Réseaux sociaux',
        link: '/app/profile/settings/networks',
        icon: 'external-link',
      },
      {
        name: 'Informations',
        link: '/app/profile/settings/information',
        icon: 'user-circle-o',
      },
    ],
  },
  {
    id: 'profileAbout',
    links: [
      {
        name: 'À propos de Podcastéo',
        link: '/app/profile/others/about',
        icon: 'question-circle',
      },
      {
        name: 'Déconnexion',
        link: '/app/profile/others/disconnect',
        icon: 'power-off',
      },
    ],
  },
]
const TitleAnimate = Animated.createAnimatedComponent(TitleView)
const TriangleAnimate = Animated.createAnimatedComponent(TriangleView)
const HeaderAnimate = Animated.createAnimatedComponent(HeaderView)

export default class Profile extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  static defaultProps = {
    user: {
      username: '...',
      email: '...',
    },
  }

  constructor(props) {
    super(props)

    this.offset = 0

    this.state = {
      scrollOffset: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.state.scrollOffset.addListener((scroll) => (this.offset = scroll.value)) // eslint-disable-line
  }

  _onScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y

    this.state.scrollOffset.setValue(offset)
  }

  _onPress = (value) => {
    const {
      history,
    } = this.props

    history.push(value.link)
  }

  _renderItem = (object) => {
    const {
      item,
    } = object

    return (
      <LinesContainer>
        {
          item.links.map((value) => (
            <LineItem
              key={value.name}
              onPress={() => this._onPress(value)}
            >
              <LineIcon>
                {
                  value.icon && (
                    <FontAwesome
                      size={20}
                      color="gray"
                      name={value.icon}
                    />
                  )
                }
              </LineIcon>
              <LineText>
                {value.name}
              </LineText>
            </LineItem>
          ))
        }
      </LinesContainer>
    )
  }

  _headerAnimation = () => {
    const {
      scrollOffset,
    } = this.state

    return {
      height: scrollOffset.interpolate({
        inputRange: [
          0,
          300,
        ],
        outputRange: [
          200,
          50,
        ],
        extrapolate: 'clamp',
      }),
    }
  }

  _titleAnimation = () => {
    const {
      scrollOffset,
    } = this.state

    return {
      height: scrollOffset.interpolate({
        inputRange: [
          0,
          300,
        ],
        outputRange: [
          140,
          60,
        ],
        extrapolate: 'clamp',
      }),
    }
  }

  _triangleAnimation = () => {
    const {
      scrollOffset,
    } = this.state

    return {

      borderTopWidth: scrollOffset.interpolate({
        inputRange: [
          0,
          100,
        ],
        outputRange: [
          50,
          -200,
        ],
        extrapolate: 'clamp',
      }),
    }
  }

  render() {
    const {
      user,
    } = this.props

    return (
      <Screen>
        <HeaderAnimate style={this._headerAnimation()}>
          <TitleAnimate style={this._titleAnimation()}>
            <TitleText>
              {user.username}
            </TitleText>
            <SubtitleText>
              {user.email}
            </SubtitleText>
          </TitleAnimate>
          <TriangleAnimate style={this._triangleAnimation()} />
        </HeaderAnimate>
        <FlatList
          style={{
            flex: 1,
            paddingTop: 50,
            width: '100%',
          }}
          contentContainerStyle={{
            paddingBottom: 50,
            width: '100%',
          }}
          onScroll={this._onScroll}
          scrollEventThrottle={16}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
        />
      </Screen>
    )
  }
}
