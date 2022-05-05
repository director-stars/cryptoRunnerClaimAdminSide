import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useNewTweetedReferee, useAddTweetedRefereeList, useGetPermission } from 'hooks/useCryptoRunnerClaim'
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const SubmitButton = styled(Button)`
  max-width: 300px;
  margin-top: 30px;
`

const StyledLayout = styled.div`

`

const StyledDiv = styled.div`
  text-align:right;
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
  const [selectedStatus, setSelectedStatus] = useState([]);
  const permission = useGetPermission();

  const handleAdd = useCallback(async () => {
    try {
      console.log('handleAdd')
      const addressList = [];
      for(let i = 0; i < tweetedReferees.length; i ++){
        if(!selectedStatus[i]){
          addressList.push(tweetedReferees[i]);
        }
      }

      const txHash = await onAddTweetedRefereeList(addressList)
      // user rejected tx or didn't go thru
    } catch (e) {
      console.error(e)
    }
  },[selectedStatus, tweetedReferees, onAddTweetedRefereeList]);
  
  const previewRewardedTweetedList = useCallback(
    (refereeListToDisplay, ) => {
      let index = -1;
      return refereeListToDisplay.map((referee, ) =>{
        index ++;
        if(referee.is_rewarded)
          return (
              <RefereeAddress address={referee.address} index={index} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} isRewarded={referee.is_rewarded}/>
          )
        return <></>;
      })
    },
    [selectedStatus],
  )

  const previewNewTweetedList = useCallback(
    (refereeListToDisplay, ) => {
      let index = -1;
      return refereeListToDisplay.map((referee, ) =>{
        index ++;
        if(referee.is_rewarded)
          return <></>;
        return (
            <RefereeAddress address={referee.address} index={index} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} isRewarded={referee.is_rewarded}/>
        )
      })
    },
    [selectedStatus],
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
        {permission?(
          <StyledFlexLayout>
          <Heading as="h3" size="lg" mb="24px" color="primary">
            Preview tweeted list  ({tweetedReferees.length}).
          </Heading>
          <PreviewList>
            
            <StyledLayout>
              <div>Already rewarded and tweeted again.</div>
              {previewRewardedTweetedList(tweetedReferees)}
            </StyledLayout>
            <StyledLayout>
              <div>New tweeted address list</div>
              {previewNewTweetedList(tweetedReferees)}
            </StyledLayout>
          </PreviewList>
          <StyledDiv>
            {(account)?(<>
            <SubmitButton fullWidth disabled={pendingTx || tweetedReferees.length === 0 || !permission} onClick={async () => {
              setPendingTx(true)
              await handleAdd()
              setPendingTx(false)
            }}>{pendingTx ? 'Confirming' : 'Confirm Referees'}
            </SubmitButton></>):((<SubmitButton size="sm" disabled={(!tweetedReferees.length)} fullWidth onClick={onPresentConnectModal}>Connect Wallet</SubmitButton>))}
          </StyledDiv>
        </StyledFlexLayout>
        ):(
          <></>
        )}
      </PageContent>
    </Page>
  )
}

export default Home
