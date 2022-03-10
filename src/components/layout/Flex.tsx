import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  // flex-wrap: wrap;
  & > * {
    min-width: 50%;
    max-width: 50%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
