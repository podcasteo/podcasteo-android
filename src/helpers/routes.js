import React from 'react'
import {
  Route,
} from 'react-router-native'

import CheckLoggedIn from 'views/CheckLoggedIn'
import Introduction from 'views/Introduction'
import Login from 'views/Login'
import Home from 'views/Home'
import Podcasts from 'views/Podcasts'
import Podcast from 'views/Podcast'

const routes = [
  {
    path: '/',
    exact: true,
    component: CheckLoggedIn,
  },
  {
    path: '/introduction',
    exact: true,
    component: Introduction,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/podcasts',
    component: Podcasts,
    routes: [
      {
        path: '/podcasts/:podcastId',
        component: Podcast,
      },
    ],
  },
]
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => (
    // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} exact={route.exact} />
  )}
  />
)

export default routes.map((route, i) => (
  <RouteWithSubRoutes key={i} {...route} /> // eslint-disable-line react/no-array-index-key
))
