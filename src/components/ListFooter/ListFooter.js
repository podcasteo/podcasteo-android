import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import Loader from 'components/Loader'

const Footer = styled.View`
  margin-top: 10;
  padding-top: 20;
  padding-bottom: 20;
  border-top-width: 1;
  border-color: #CED0CE;
  justify-content: center;
  align-items: center;
`

export default class ListFooter extends React.PureComponent {
  static propTypes = {
    networkStatus: PropTypes.number.isRequired,
  }

  render() {
    const {
      networkStatus,
    } = this.props

    return (
      <Footer>
        {
          networkStatus === 7 ? (
            <FontAwesome
              size={32}
              color="gray"
              name="caret-up"
            />
          ) : (
            <Loader />
          )
        }
      </Footer>
    )
  }
}
