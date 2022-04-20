import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox } from '@pancakeswap-libs/uikit'

interface RefereeAddressProps {
  address: string,
  index: number,
  rewardStatus: boolean[],
  setRewardStatus: any
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

const RefereeAddress: React.FC<RefereeAddressProps> = ({ address, index, rewardStatus, setRewardStatus }) => {
  const [status, setStatus] = useState(rewardStatus[index]?rewardStatus[index]:false);
  const toggle = useCallback(() => {
    setStatus(!status)
  },[status]);

  useEffect(() => {
    const temp = rewardStatus;
      temp[index] = status;
      setRewardStatus(temp);
  }, [status, rewardStatus, setRewardStatus, index])

  return (
    <AddressItem>
      <div>{address}</div>
      <Checkbox checked={!status} onChange={toggle}/>
    </AddressItem>
  )
}

export default RefereeAddress
