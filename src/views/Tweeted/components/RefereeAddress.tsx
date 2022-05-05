import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox } from '@pancakeswap-libs/uikit'

interface RefereeAddressProps {
  address: string,
  index: number,
  selectedStatus: boolean[],
  setSelectedStatus: any,
  isRewarded: boolean
}

const AddressItem = styled.div`
  display: flex;
  column-gap: 30px;
  & *{
    margin-top: 20px;
    font-family: monospace !important;
    font-size: x-large;
    line-height: 30px;
  }
`

const RefereeAddress: React.FC<RefereeAddressProps> = ({ address, index, selectedStatus, setSelectedStatus, isRewarded }) => {
  const [status, setStatus] = useState(selectedStatus[index]?selectedStatus[index]:isRewarded);
  const toggle = useCallback(() => {
    setStatus(!status)
  },[status]);

  useEffect(() => {
    const temp = selectedStatus;
      temp[index] = status;
      setSelectedStatus(temp);
  }, [status, selectedStatus, setSelectedStatus, index])

  return (
    <AddressItem>
      <div>{address}</div>
      <Checkbox checked={!status} onChange={toggle}/>
    </AddressItem>
  )
}

export default RefereeAddress
