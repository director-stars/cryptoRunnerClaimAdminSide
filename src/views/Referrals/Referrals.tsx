import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import FileUpload from 'components/FileUpload'

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
  column-gap: 100px;
  margin: auto;
  display: block;
`

const StyledHead = styled.div`
  
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`

const Home: React.FC = () => {

  const [file, setFile] = useState('')

  const updateFileCb = (_file) => {
    // const link = URL.createObjectURL(file)
    setFile(_file)
  }
  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
          Referees.
          </StyledHeading>
        </StyledHead>
      </Hero>
      <PageContent>
        <StyledFlexLayout>
          <FileUpload 
            updateFileCb={updateFileCb}
          />
        </StyledFlexLayout>
      </PageContent>
    </Page>
  )
}

export default Home
