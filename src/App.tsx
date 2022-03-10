import React, { useEffect, Suspense, lazy, useCallback } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
// import BigNumber from 'bignumber.js'
// import { useDogeBalance } from 'hooks/useDogesLand'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Referrals = lazy(() => import('./views/Referrals'))
const Tweeted = lazy(() => import('./views/Tweeted'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formating
// BigNumber.config({
//   EXPONENTIAL_AT: 1000,
//   DECIMAL_PLACES: 80,
// })

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Referrals />
            </Route>
            <Route path="/tweeted" exact>
              <Tweeted />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      {/* <NftGlobalNotification /> */}
    </Router>
  )
}

export default React.memo(App)
