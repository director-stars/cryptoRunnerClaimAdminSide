import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Input, Button } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useNewTweetedReferee, useAddTweetedRefereeList } from 'hooks/useCryptoRunnerClaim'
import FlexLayout from 'components/layout/Flex'

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

const StyledInput = styled(Input)`
  max-width: 500px;
  text-align: right;
`

const SubmitButton = styled(Button)`
  max-width: 300px;
  margin-top: 30px;
`

const RefereeAddress = styled.div`
  margin-top: 20px;
`

const Home: React.FC = () => {

  const { onAddTweetedRefereeList } = useAddTweetedRefereeList()
  const[pendingTx, setPendingTx] = useState(false)
  const tweetedReferees = useNewTweetedReferee();

  const handleAdd = useCallback(async () => {
    try {
      const txHash = await onAddTweetedRefereeList(tweetedReferees)
      // user rejected tx or didn't go thru
    } catch (e) {
      console.error(e)
    }
  }, [onAddTweetedRefereeList, tweetedReferees])

  const previewRefereeList = useCallback(
    (refereeListToDisplay, ) => {
      return tweetedReferees.map((referee) =>(
        <RefereeAddress>{referee}</RefereeAddress>
      ))
    },
    [tweetedReferees],
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
            {/* <StyledInput type="text" min="0" scale="lg" mb="50px" placeholder='Claim Amount' isSuccess onChange={handleAmountChange}/> */}
            <SubmitButton fullWidth onClick={async () => {
              setPendingTx(true)
              handleAdd()
              setPendingTx(false)
            }}>{pendingTx ? 'Confirming' : 'Confirm Referees'}
            </SubmitButton>
          </div>
        </StyledFlexLayout>
      </PageContent>
    </Page>
  )
}

export default Home
