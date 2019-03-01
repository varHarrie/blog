import * as React from 'react'
import styled from 'styled-components'
import { Route, Router, Switch, Redirect } from 'react-router'
import { createBrowserHistory } from 'history'

import ArticleView from './views/ArticleView'
import BlogView from './views/BlogView'
import HomeView from './views/HomeView'
import { GlobalStyles } from './styles'

const history = createBrowserHistory()

export interface Props {}

export default function App(props: Props) {
  return (
    <Router history={history}>
      <Wrapper>
        <Route
          path='/'
          children={(props) => <HomeView expanded={!!props.match} {...props} />}
        />
        <Switch>
          <Route path='/articles/:id' component={ArticleView} />
          <Route path='/articles' component={BlogView} />
          {/* <Route render={() => <Redirect to='/articles' />} /> */}
        </Switch>
        <GlobalStyles />
      </Wrapper>
    </Router>
  )
}

App.displayName = 'App'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 640px;
  max-width: 100%;
`
