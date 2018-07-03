import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import get from 'lodash/get'
import {
  matchPath,
} from 'react-router-native'
import BottomNavigation, {
  ShiftingTab,
} from 'react-native-material-bottom-navigation'
import { // eslint-disable-line
  FontAwesome,
} from '@expo/vector-icons'

const navigations = [
  {
    key: 'ranking',
    icon: 'signal',
    label: 'Ranking',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/rankings',
  },
  {
    key: 'groups',
    icon: 'group',
    label: 'Groups',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/groups',
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
    label: 'Users',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/users',
  },
  {
    key: 'settings',
    icon: 'wrench',
    label: 'Settings',
    barColor: '#E0E0E0',
    pressColor: 'rgba(0, 0, 0, 0.16)',
    path: '/app/settings',
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

    this.state = {
      activeTab: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPath === this.props.currentPath) {
      return
    }

    const {
      currentPath,
    } = this.props
    const pathTab = find(navigations, (nav) => matchPath(currentPath, {
      path: nav.path,
    }))
    const pathKey = get(pathTab, 'key', null)

    if (pathKey && (pathKey !== this.state.activeTab)) {
      this.onTabPress(pathTab)
    }
  }

  onTabPress = (tab) => {
    const {
      history,
    } = this.props

    this.setState({
      activeTab: tab.key, // eslint-disable-line
    })

    return history.push(tab.path)
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

    console.log('tab', tab)
    console.log('activeTab', activeTab)
    console.log('isActive', isActive)
    console.log('-----')

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
    console.log('props', this.props)

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
