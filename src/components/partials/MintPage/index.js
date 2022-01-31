import React, { useEffect, useState } from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { connect } from "react-redux"
import {
  CONTRACT_ADDRESS_CWC,
  CONTRACT_ADDRESS_BLUB
} from "../../../util/addressHelper"
import abi_cwc from "../../../config/abi/abi_cwc.json"
import abi_blub from "../../../config/abi/abi_blub.json"
import "./mintpage.scss"
import { setConnected } from "../../../state/actions"

const MintPage = ({ web3, onBoard, walletAddress, connected, setConnected }) => {
  const minAmount = 1
  const [isBlub, setIsBlub] = useState(false)
  const [unitPrice, setUnitPrice] = useState(0.06)
  const [maxAmount, setMaxAmount] = useState(20)
  const [maxBlubAmount, setMaxBlubAmount] = useState(1000)
  const [currentSupply, setCurrentSupply] = useState(-1)
  const [amount, setAmount] = useState(isBlub ? 1 : 5)
  const [totalPrice, setTotalPrice] = useState(unitPrice * amount)
  const [cwcContract, setCwcContract] = useState(null)
  const [blubContract, setBlubContract] = useState(null)
  const [allowance, setAllowance] = useState(0)
  const [isApproved, setIsApproved] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  })

  useEffect(() => {
    if (connected) {
      const _cwcContract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC)
      const _blubContract = new web3.eth.Contract(abi_blub, CONTRACT_ADDRESS_BLUB)
      setCwcContract(_cwcContract)
      setBlubContract(_blubContract)
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

  useEffect(() => {
    if (cwcContract !== null && connected)
      blubInitialHandler()
  }, [cwcContract])

  useEffect(() => {
    const getAllowance = async () => {
      if (connected && blubContract !== null) {
        try {
          const _allowance = await blubContract.methods.allowance(walletAddress, CONTRACT_ADDRESS_CWC).call()
          setAllowance(_allowance)
        } catch (error) {
          console.log(error)
        }
      }
    }

    getAllowance()
  }, [blubContract, connected])

  useEffect(() => {
    if (!isBlub) {
      setIsApproved(true)
      return
    }

    if (allowance < 1 * 10e21)
      setIsApproved(false)
    else
      setIsApproved(true)
  }, [allowance, isBlub])

  useEffect(() => {
    setUnitPrice(isBlub ? 4500 : 0.06)
    setAmount(isBlub ? 1 : 5)
    setTotalPrice(isBlub ? 4500 : 0.3)
    setMaxAmount(isBlub ? maxBlubAmount : 20)
  }, [isBlub, maxBlubAmount])

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

  const blubInitialHandler = async () => {
    const _maxAmount = await cwcContract.methods.maxMintedPerWalletForPhaseWithBlub().call()
    const _currentPhase = await cwcContract.methods.currentPhase().call()
    const _mintBlubPerPhase = await cwcContract.methods.mintedWithBlubPerPhase(walletAddress, _currentPhase).call()
    setMaxBlubAmount(_maxAmount - _mintBlubPerPhase)

    if (_maxAmount === _mintBlubPerPhase) {
      setIsDisabled(true)
      setAmount(1)
    }
  }

  const mintHandler = async () => {
    if (isDisabled)
      return

    if (amount > 0) {
      if (isBlub) {
        try {
          await cwcContract.methods.mintWithBlub(amount).send({ from: walletAddress })
            .on('transactionHash', (receipt) => {
              setIsPending(true)
              displayNotify("info", "Transaction in progress...please wait a moment.")
            })
            .on('receipt', (receipt) => {
              getSupplyAmount()
              blubInitialHandler()
              displayNotify("success", "Success! Thank you for your Crypto Whale purchase; Capt. Ahab will be pleased.")
            })
            .on('error', () => {
              displayNotify("error", "Transaction cancelled.")
            });
          setIsPending(false)
        } catch (error) {
          console.log(error)
          displayNotify("error", "Unfortunately, the High Seas were too rough and your transaction has failed. Please try again.")
        }
      } else {
        const _totalPrice = amount * unitPrice * 10e17;
        try {
          await cwcContract.methods.mintWithEth(amount).send({ from: walletAddress, value: _totalPrice })
            .on('transactionHash', (receipt) => {
              setIsPending(true)
              displayNotify("info", "Transaction in progress...please wait a moment.")
            })
            .on('receipt', (receipt) => {
              getSupplyAmount()
              displayNotify("success", "Success! Thank you for your Crypto Whale purchase; Capt. Ahab will be pleased.")
            })
            .on('error', () => {
              displayNotify("error", "Transaction cancelled.")
            });
          setIsPending(false)
        } catch (error) {
          displayNotify("error", "Unfortunately, the High Seas were too rough and your transaction has failed. Please try again.")
        }
      }
    } else {
      displayNotify("warning", "Please select amount.")
    }
  }

  const approveHandler = async () => {
    try {
      await blubContract.methods.approve(CONTRACT_ADDRESS_CWC, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({ from: walletAddress })
        .on('transactionHash', (receipt) => {
          displayNotify("info", "Transaction in progress...please wait a moment.")
          setIsPending(true)
        })
        .on('receipt', (receipt) => {
          setIsApproved(true)
          displayNotify("success", "Success!")
        })
        .on('error', () => {
          displayNotify("error", "Transaction cancelled.")
        });
      setIsPending(false)
    } catch (error) {
      displayNotify("error", "Unfortunately, the High Seas were too rough and your transaction has failed. Please try again.")
    }
  }

  const handleCountControl = increase => {
    if (isDisabled)
      return

    let _amount = increase ? amount + 1 : amount - 1
    _amount = _amount > maxAmount ? maxAmount : _amount < minAmount ? minAmount : _amount
    setAmount(_amount)

    if (isBlub)
      setTotalPrice(_amount * unitPrice)
    else
      setTotalPrice((_amount * unitPrice).toFixed(2))
  }

  const changeHandler = (e) => {
    if (isDisabled)
      return

    let _amount = e.target.value
    _amount = _amount > maxAmount ? maxAmount : _amount < minAmount ? minAmount : _amount
    setAmount(_amount)

    if (isBlub)
      setTotalPrice(_amount * unitPrice)
    else
      setTotalPrice((_amount * unitPrice).toFixed(2))
  }

  const displayNotify = (type, content) => {
    setAlertState({
      open: true,
      message: content,
      severity: type,
    })
  }

  return (
    <div className="mint-page relative flex items-center justify-center w-screen h-screen">
      <a href="/" className="absolute top-5 left-10 w-1/5 tiny:w-2/12 cursor-pointer">
        <img src="/mint_page/logo.png" alt="logo" />
      </a>
      <div className="w-w-tiny h-h-tiny tiny:w-h-normal tiny:h-h-small lg:w-normal lg:h-h-normal mint-control flex flex-col text-white items-center justify-center relative lg:gap-6 xl:gap-2">
        <div className="h-1/2 flex flex-col w-full px-3 tiny:px-8 lg:px-24 xl:px-10">
          <div className="mt-5 mb-8 z-50">
            <div className="gap-6 flex justify-center">
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => setIsBlub(false)}>
                <div className="border-app-black border-2 rounded-full w-max h-max flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
                  {!isBlub && <div className="rounded-full bg-white" style={{ width: "10px", height: "10px" }}></div>}
                </div>
                <p className="text-xl tiny:text-2xl lg:text-3xl">Mint w/Eth</p>
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <div className="border-app-black border-2 rounded-full w-max h-max flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
                  {isBlub && <div className="rounded-full bg-white" style={{ width: "10px", height: "10px" }}></div>}
                </div>
                <p className="text-xl tiny:text-2xl lg:text-3xl">Mint w/ Blub (SOON!)</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-4/12 border-4 rounded-lg flex py-3 items-center justify-center gap-1">
              <button
                onClick={() => {
                  handleCountControl(false)
                }}
                className={isDisabled ? "btn-disabled" : ""}
              >
                <img
                  src="/mint_page/btn_left.png"
                  alt="reduce button"
                  className="h-6 tiny:h-8 lg:h-12 flex items-center justify-center"
                />
              </button>
              <input className={`bg-transparent input-amount outline-none w-2/5 text-center  font-lilita text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl ${isDisabled ? "btn-disabled" : ""}`} value={amount} type="number" onChange={changeHandler} />
              <button
                onClick={() => {
                  handleCountControl(true)
                }}
                className={isDisabled ? "btn-disabled" : ""}
              >
                <img
                  src="/mint_page/btn_right.png"
                  alt="reduce button"
                  className="h-6 tiny:h-8 lg:h-12 flex items-center justify-center"
                />
              </button>
            </div>
            <div className="w-8/12 border-4 rounded-lg font-lilita flex gap-1 tiny:gap-2 lg:gap-4 items-center justify-center text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl " >
              <span>{totalPrice}</span>
              {!isBlub && (
                <img src="/mint_page/ico_et.png" alt="eth logo" className="w-6" />
              )}
              <span>{isBlub ? "$BLUB" : "ETH"}</span>
            </div>
          </div>
        </div>
        {
          !connected ? (
            <button className="btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl w-full" onClick={connectHandler}>
              CONNECT WALLET
            </button>
          ) :
            isPending ? (
              <button className={`btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl w-full uppercase`}>
                Pending ...
              </button>
            ) :
              isApproved ? (
                <button className={`btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl w-full ${isDisabled ? "btn-disabled" : ""}`} onClick={mintHandler}>
                  {isBlub ? "MINT W/ETH" : "MINT W/BLUB"}
                </button>
              ) : (
                <button className={`btn-mint font-alphakind flex h-1/2 items-center justify-center py-10 xl:py-40 text-2xl tiny:text-2xl lg:text-3xl xl:text-5xl w-full uppercase`} onClick={approveHandler}>
                  Approve spending blub
                </button>
              )
        }
        {isDisabled ? (
          <div className="text-yellow-300 text-center text-sm lg:text-xl xl:text-2xl lg:-mt-4 pb-4 lg:pb-0 xl:-mb-5">
            Sorry, there is a limit of 3 Mints with $BLUB per wallet. You may mint additional ones with ETH in the near future.
          </div>
        ) : (
          <div className="text-center text-sm lg:text-xl xl:text-2xl pt-3 lg:pt-2 pb-4 lg:pb-0 xl:-mb-5">
            Mint Price of {isBlub ? unitPrice + " BLUB" : unitPrice + " ETH"} per whale. You may mint between 1 - {maxAmount} whales per transaction.
          </div>
        )}
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
