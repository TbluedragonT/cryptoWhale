import React, { useEffect, useState } from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { connect } from "react-redux"
import {
  CONTRACT_ADDRESS_CWC
} from "../../../util/addressHelper"
import whiteListAddresses from "../../../config/whiteListAddress"
import abi_cwc from "../../../config/abi/abi_cwc.json"
import "./mintpage.scss"

const MintPage = ({web3, onBoard, walletAddress, connected, setConnected}) => {
  const unitPrice = 6
  const minAmount = 1
  const maxAmount = 20
  const [currentSupply, setCurrentSupply] = useState(-1)
  const [amount, setAmount] = useState(5)
  const [cwcContract, setCwcContract] = useState(null)
  const [isAvailable, setIsAvailable] = useState(true)
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  })
  
  useEffect(() => {
    if (connected) {
      const _cwcContract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC)

      setCwcContract(_cwcContract)
    }
  }, [connected])

  useEffect(() => {
    if (!web3) return

    let handleInterval = setInterval(() => {
      getSupplyAmount()
    }, 15000)

    return () => {
      clearInterval(handleInterval)
    }
  })

  useEffect(() => {
    if (cwcContract !== null && connected)
      getSupplyAmount()
  }, [cwcContract])

  // useEffect(() => {
  //   if (connected) {
  //     const upperWalletAddress = walletAddress.toUpperCase();
  //     const _isAvailable = whiteListAddresses.some(v => v.toUpperCase() === upperWalletAddress)
  //     setIsAvailable(_isAvailable) 

  //     if(!_isAvailable)
  //       displayNotify("error", "You salty dog, trying to mint during presale without permission!")
  //   }
  // }, [connected])

  const connectHandler = async () => {
    if (onBoard !== null) {
      if (!(await onBoard.walletSelect())) {
        return;
      }
      setConnected(await onBoard.walletCheck())
    }
  }

  const getSupplyAmount = async () => {
    if (cwcContract !== null) {
      try {
        const todaySupply = await cwcContract.methods.mintIndex().call()
        setCurrentSupply(todaySupply)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const mintHandler = async () => {
    if(isAvailable) {
      if(amount > 0) {
        try {
          const totalPrice = amount * unitPrice * 10e15;
          await cwcContract.methods.mintWithEth(amount).send({ from: walletAddress, value: totalPrice })
            .on('transactionHash', (receipt) => {
              displayNotify("info", "Transaction in progress...please wait a moment.")
            })
            .on('receipt', (receipt) => {
              getSupplyAmount()
              displayNotify("success", "Success! Thank you for your purchase; Capt. Ahab will be pleased.")
            })
            .on('error', () => {
              displayNotify("error", "Transaction cancelled.")
            });
        } catch (error) {
          displayNotify("error", "Unfortunately, the High Seas were too rough and your transaction has failed. Please try again.")
        }
      } else {
        displayNotify("warning", "Please select amount.")
      }
    } else {
      displayNotify("error", "You salty dog, trying to mint during presale without permission!")
    }
  }
  
  const handleCountControl = increase => {
    let _amount = increase ? amount + 1 : amount - 1
    _amount = _amount > maxAmount ? maxAmount : _amount < minAmount ? minAmount : _amount 
    setAmount(_amount)
  }

  const displayNotify = (type, content) => {
    setAlertState({
      open: true,
      message: content,
      severity: type,
    })
  }

  const changeHandler = (e) =>{
    let _amount = e.target.value
    _amount = _amount > maxAmount ? maxAmount : _amount < minAmount ? minAmount : _amount 
    setAmount(_amount)
  }

  return (
    <div className="mint-page relative flex items-center justify-center w-screen h-screen">
      <a href="/" className="absolute top-5 left-10 w-1/5 tiny:w-2/12 cursor-pointer">
        <img src="/mint_page/logo.png" alt="logo" />
      </a>
      <div className="w-w-tiny h-h-tiny tiny:w-h-normal tiny:h-h-small lg:w-normal lg:h-h-normal mint-control flex flex-col text-white items-center justify-center relative lg:gap-6 xl:gap-2">
        <div className="h-1/2 flex flex-col w-full px-3 tiny:px-8 lg:px-24 xl:px-10">
          <div className="h-1/2 flex items-center justify-end font-lilita text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl">
{/*
            { currentSupply < 0 ? '?' : currentSupply}/2000
*/}
          </div>
          <div className="flex gap-4">
            <div className="w-4/12 border-4 rounded-lg flex py-3 items-center justify-center gap-1">
              <button
                onClick={() => {
                  handleCountControl(false)
                }}
              >
                <img
                  src="/mint_page/btn_left.png"
                  alt="reduce button"
                  className="h-6 tiny:h-8 lg:h-12 flex items-center justify-center"
                />
              </button>
              <input className="bg-transparent input-amount outline-none w-2/5 text-center  font-lilita text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl" value={amount} type="number" onChange={changeHandler}/>
              <button
                onClick={() => {
                  handleCountControl(true)
                }}
              >
                <img
                  src="/mint_page/btn_right.png"
                  alt="reduce button"
                  className="h-6 tiny:h-8 lg:h-12 flex items-center justify-center"
                />
              </button>
            </div>
            <div className="w-8/12 border-4 rounded-lg font-lilita flex gap-1 tiny:gap-2 lg:gap-4 items-center justify-center text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl " >
              <span>0.06</span>
              <img src="/mint_page/ico_et.png" alt="eth logo" className="w-6"/>
              <span>ETH</span>
            </div>
          </div>
        </div>
        {
          !connected ? (
            <button className="btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl w-full" onClick={connectHandler}>
              CONNECT WALLET
            </button>
          ) : (
            <button className={`btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl w-full ${!isAvailable && `btn-disabled`}`} onClick={mintHandler}>
              MINT
            </button>
          )
        }
      </div>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

const stateProps = (state) => ({
  web3: state.web3,
  onBoard: state.onBoard,
  walletAddress: state.walletAddress,
  connected: state.connected
});

const dispatchProps = (dispatch) => ({
  setWalletAddress: (address) => dispatch(setWalletAddress(address)),
  setConnected: (status) => dispatch(setConnected(status))
})

export default connect(stateProps, dispatchProps)(MintPage);