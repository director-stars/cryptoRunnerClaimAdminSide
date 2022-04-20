import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useNewTweetedReferee, useAddTweetedRefereeList } from 'hooks/useCryptoRunnerClaim'
import RefereeAddress from './components/RefereeAddress'

const Hero = styled.div`
  // background: linear-gradient(90deg, rgba(255, 0, 0, 0), rgb(214, 51, 65) 45%, rgba(255, 0, 0, 0));
  line-height: 1.5;
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  justify-content: center;
  flex-direction: column;
  margin: 30px auto;
  padding: 20px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
  }
`
const StyledFlexLayout = styled.div`
  margin-top: 80px;
  column-gap: 50px;
`

const StyledHead = styled.div`
  
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const PreviewList = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
`

const SubmitButton = styled(Button)`
  max-width: 300px;
  margin-top: 30px;
`

const Home: React.FC = () => {
  
  const { account, connect,reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  const { onAddTweetedRefereeList } = useAddTweetedRefereeList()
  const[pendingTx, setPendingTx] = useState(false)
  const tweetedReferees = useNewTweetedReferee();
  const [rewardStatus, setRewardStatus] = useState([]);

  const handleAdd = useCallback(async () => {
    try {
      console.log('handleAdd')
      const addressList = [];
      for(let i = 0; i < tweetedReferees.length; i ++){
        if(!rewardStatus[i]){
          addressList.push(tweetedReferees[i]);
        }
      }

      const txHash = await onAddTweetedRefereeList(addressList)
      // user rejected tx or didn't go thru
    } catch (e) {
      console.error(e)
    }
  },[rewardStatus, tweetedReferees, onAddTweetedRefereeList]);
  
  const previewRefereeList = useCallback(
    (refereeListToDisplay, ) => {
      return refereeListToDisplay.map((referee, index) =>(
        <RefereeAddress address={referee.address} index={index} rewardStatus={rewardStatus} setRewardStatus={setRewardStatus} />
      ))
    },
    [rewardStatus],
  )

  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
            Tweeted.
          </StyledHeading>
        </StyledHead>
      </Hero>
      <PageContent>
        <StyledFlexLayout>
          <PreviewList>
            <Heading as="h3" size="lg" mb="24px" color="primary">
              Preview new tweeted list  ({tweetedReferees.length}).
            </Heading>
            {previewRefereeList(tweetedReferees)}
          </PreviewList>
          <div>
            {(account)?(<>
            <SubmitButton fullWidth disabled={pendingTx || tweetedReferees.length === 0} onClick={async () => {
              setPendingTx(true)
              await handleAdd()
              setPendingTx(false)
            }}>{pendingTx ? 'Confirming' : 'Confirm Referees'}
            </SubmitButton></>):((<SubmitButton size="sm" disabled={(!tweetedReferees.length)} fullWidth onClick={onPresentConnectModal}>Connect Wallet</SubmitButton>))}
          </div>
        </StyledFlexLayout>
      </PageContent>
    </Page>
  )
}

export default Home
