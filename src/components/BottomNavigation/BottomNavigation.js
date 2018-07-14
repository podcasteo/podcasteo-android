import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import {
  matchPath,
} from 'react-router-native'
import BottomNavigation from 'react-native-material-bottom-navigation'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

import ShiftingTab from 'components/ShiftingTab'

const navigations = [
  {
    key: 'ranking',
    icon: 'signal',
    label: 'Allo',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/rankings',
  },
  {
    key: 'dashboard',
    icon: 'play-circle',
    label: 'Home',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/dashboard',
  },
  {
    key: 'user',
    icon: 'user-circle',
    label: 'Profile',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/profile',
  },
]

export default class BottomNavigationView extends React.Component {
  static propTypes = {
    currentPath: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    currentPath: '',
  }

  constructor(props) {
    super(props)

    const {
      currentPath,
    } = this.props
    const pathTab = this.getPathTab(currentPath)

    this.state = {
      activeTab: pathTab.key,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPath === this.props.currentPath) {
      return
    }

    const {
      currentPath,
    } = this.props
    const pathTab = this.getPathTab(currentPath)

    this.updateTab(pathTab)
  }

  onTabPress = (newTab) => {
    const {
      history,
    } = this.props

    this.updateTab(newTab)

    return history.push(newTab.path)
  }

  getPathTab = (currentPath) => {
    const pathTab = find(navigations, (nav) => matchPath(currentPath, {
      path: nav.path,
    }))

    return pathTab || {}
  }

  updateTab = (newTab) => {
    if (newTab && newTab.key) {
      this.setState({
        activeTab: newTab.key, // eslint-disable-line
      })
    }
  }

  renderIcon = (icon) => (item) => {
    const {
      isActive,
    } = item

    return (
      <FontAwesome
        size={24}
        color={isActive ? 'black' : '#404040'}
        name={icon}
      />
    )
  }

  renderTab = (item) => {
    const {
      tab,
    } = item
    let {
      isActive,
    } = item
    const {
      activeTab,
    } = this.state

    if (activeTab) {
      isActive = tab.key === activeTab
    }

    return (
      <ShiftingTab
        animationDuration={300}
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
        labelStyle={{
          color: isActive ? 'black' : '#404040',
        }}
      />
    )
  }

  render() {
    return (
      <BottomNavigation
        onTabPress={this.onTabPress}
        renderTab={this.renderTab}
        tabs={navigations}
        activeTab={this.state.activeTab}
        useLayoutAnimation
      />
    )
  }
}
