import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ImageLoader from 'components/ImageLoader'
import Loader from 'components/Loader'

const TouchCircleContainer = styled.TouchableOpacity`
  height: 50;
  width: 50;
  align-items: center;
  justify-content: center;
  border-radius: 25;
  background: ${(props) => props.color};
  margin-right: 20;
`
const CircleText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: white;
`

export default class TouchCircle extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    image: PropTypes.object,
    text: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    color: 'white',
    image: null,
    text: null,
    onPress: () => {},
    loading: false,
  }

  render() {
    const {
      color,
      image,
      text,
      onPress,
      loading,
    } = this.props

    return (
      <TouchCircleContainer onPress={onPress} color={color}>
        {
          image &&
          <ImageLoader
            {...image}
          />
        }
        {
          text &&
          <CircleText>
            {text}
          </CircleText>
        }
        {
          loading &&
          <Loader />
        }
      </TouchCircleContainer>
    )
  }
}
