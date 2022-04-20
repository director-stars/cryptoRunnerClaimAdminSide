import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Button, Input, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import FlexLayout from 'components/layout/Flex'
import { useAddClaimList, useGetPermission } from '../../hooks/useCryptoRunnerClaim'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 10;
const KILO_BYTES_PER_BYTE = 1024;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

interface FileUploadProps {
  label?: string
  maxFileSizeInBytes?: BigInteger
  updateFileCb?: (array) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ label, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES, updateFileCb, ...props }) => {
  const { account, connect,reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const fileInputField = useRef(null)
  const [exceed, setExceed] = useState(false)
  const [file, setFile] = useState({
    name: null,
    type: "",
    size: ""
  })
  const[pendingTx, setPendingTx] = useState(false)
  
  const [refereeList, setRefereeList] = useState([])
  const [claimAmount, setClaimAmount] = useState(0)
  const { onAddList } = useAddClaimList()
  const permission = useGetPermission();

  const handleAdd = useCallback(async () => {
    try {
      const txHash = await onAddList(refereeList, claimAmount)
      // user rejected tx or didn't go thru
    } catch (e) {
      console.error(e)
    }
  }, [onAddList, refereeList, claimAmount])

  const handleAmountChange = (e) => {
    console.log(e.target.value)
    const value = e.target.value;
    if(!Number(value)){
      e.target.value = "";
      setClaimAmount(0);
    }
    else{
      setClaimAmount(value);
    }
  }


  const handleUploadBtnClick = () => {
    fileInputField.current.click()
  }
  const handleNewFileUpload = (e) => {
    const _file = e.target.files[0]
    if (_file.size > maxFileSizeInBytes) {
      setExceed(true)
      setFile({
        name: null,
        type: "",
        size: ""
      })
      return
    }
    let arrayBuffer;
    const fileReader = new FileReader();
    fileReader.onload = (e1) => {
        arrayBuffer = fileReader.result;
        const data = new Uint8Array(arrayBuffer);
        const arr = [];
        for(let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        const bstr = arr.join("");
        const result = bstr.toString().replace(/\r\n/g,'\n').split('\n');
        const list = [];
        let index = 0;
        for(let i = 1; i < result.length; i ++){
          if(result[i] !== "" && result[i].length === 42 && result[i].startsWith("0x")){
            list[index] = result[i];
            index ++;
          }
        }
      setRefereeList(list)
    }
    fileReader.readAsArrayBuffer(_file);
  }

  const previewRefereeList = useCallback(
    (refereeListToDisplay, ) => {
      return refereeList.map((referee) =>(
        <RefereeAddress>{referee}</RefereeAddress>
      ))
    },
    [refereeList],
  )

  return (
    <>
      {(account)?(<>
        <UploadFileBtn
          type="button"
          onClick={handleUploadBtnClick}
        >
          {exceed && (
            <span>File size exeeds 10 MB. Upload Again</span>
          )}
          {!exceed && (
            <span>Upload a file</span>
          )}
        </UploadFileBtn>
        <FormField 
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          accept=".xlsx, .xls, .csv"
          {...props}
        />
      {(refereeList.length > 0)?(
        <StyledFlexLayout>
          <PreviewList>
            <Heading as="h3" size="lg" mb="24px" color="primary">
              Preview new referee list  ({refereeList.length}).
            </Heading>
            {previewRefereeList(refereeList)}
          </PreviewList>
          <div>
            
            <StyledInput type="text" min="0" scale="lg" mb="50px" placeholder='Claim Amount' isSuccess onChange={handleAmountChange}/>
            <SubmitButton fullWidth disabled={(!claimAmount || !permission)} onClick={async () => {
              setPendingTx(true)
              handleAdd()
              setPendingTx(false)
            }}>{pendingTx ? 'Adding' : 'Add Referees'}
            </SubmitButton>
          </div>
        </StyledFlexLayout>
      ):(
      <></>
      )}
      </>):(<ConnectContent><Button size="sm" fullWidth onClick={onPresentConnectModal}>Connect Wallet</Button></ConnectContent>)}
    </>
  )
}

const ConnectContent = styled.div`
  margin: auto;
  text-align: center;
  & button, div{
    max-width: 200px;
  }
`
const StyledInput = styled(Input)`
  max-width: 500px;
  text-align: right;
`

const PreviewList = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
`

const RefereeAddress = styled.div`
  margin-top: 20px;
  font-family: monospace !important;
  font-size: x-large;
`

const StyledFlexLayout = styled(FlexLayout)`
  margin-top: 80px;
  column-gap: 50px;
`

const SubmitButton = styled(Button)`
  max-width: 200px;
  margin-top: 30px;
  margin-left: 300px;
`

const FormField = styled.input.attrs({
  type: 'file'
})`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }

  display: none;
`

const UploadFileBtn = styled.button`
  margin: auto;
  max-width: 300px;
  box-sizing: border-box;
  appearance: none;
  background-color: #3498db;
  border: 2px solid #3498db;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  // color: #3498db;
  color: #fff;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: "Open Sans", sans-serif;
  width: 45%;
  display: flex;
  align-items: center;
  // padding-right: 0;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #184a6c;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    // background: transparent;
    background: #184a6c;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: #184a6c;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`

const FileMetaData = styled.div`
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`

export default FileUpload
