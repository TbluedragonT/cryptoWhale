import React, { useEffect, useState } from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { ChainID, getWeb3, getOnBoard } from "../../../util/wallet"
import {
  CONTRACT_ADDRESS_CWC
} from "../../../util/addressHelper"
import whiteListAddresses from "../../../config/whiteListAddress"
import abi_cwc from "../../../config/abi/abi_cwc.json"
import "./mintpage.scss"

const MintPage = () => {
  const unitPrice = 6
  const minAmount = 1
  const maxAmount = 5
  const [connected, setConnected] = useState(false)
  const [currentSupply, setCurrentSupply] = useState(-1)
  const [walletReady, setWalletReady] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [amount, setAmount] = useState(3)
  const [web3, setWeb3] = useState(null)
  const [onBoard, setOnBoard] = useState(null)
  const [cwcContract, setCwcContract] = useState(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  })
  
  useEffect(() => {
    setWeb3(window.__web3 || null);
    setOnBoard(window.__onboard || null);
    setWalletAddress(window.__walletAddress || null);
    setWalletReady(window.__walletReady || false);
  }, []);

  useEffect(() => {
    window.__web3 = web3;
  }, [web3]);
  useEffect(() => {
    window.__onboard = onBoard;
  }, [onBoard]);
  useEffect(() => {
    window.__walletAddress = walletAddress;
  }, [walletAddress]);
  useEffect(() => {
    window.__walletReady = walletReady;
  }, [walletReady]);

  useEffect(() => {
    if (web3 && walletReady) {
      addressAvailable();
    }
  }, [web3, walletReady]);

  useEffect(() => {
    if (!web3) return

    let handleInterval = setInterval(() => {
      getSupplyAmount()
    }, 15000)

    return () => {
      clearInterval(handleInterval)
    }
  })

  function addressAvailable() {
    if (walletAddress) {
      return;
    }

    if (web3 && web3.currentProvider && web3.currentProvider.selectedAddress &&
      (web3.currentProvider.selectedAddress.length > 0)) {
      setWalletAddress(web3.currentProvider.selectedAddress);
    } else {
      setTimeout(addressAvailable, 100);
    }
  }

  useEffect(() => {
    async function walletInitialize() {
      const _web3 = await getWeb3()
      const _onBoard = await getOnBoard()
      const _chainId = await _web3.eth.getChainId()
      const _address = await _web3.eth.getAccounts()

      setWeb3(_web3)
      setOnBoard(_onBoard)
      if(_address[0] && _chainId === ChainID)
        setWalletReady(true)

      setWalletAddress(_address[0])
    }

    if (typeof window !== "undefined") {
      if (window.ethereum) {

        window.ethereum.on('chainChanged', handleNetworkChange);
        window.ethereum.on('disconnect', logout);
        window.ethereum.on('accountsChanged', logout);
      }
    }

    walletInitialize()
  }, [])

  useEffect(() => {
    if (connected) {
      const _cwcContract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC)

      setCwcContract(_cwcContract)
    }
  }, [connected])

  useEffect(() => {
    if (cwcContract !== null && connected)
      getSupplyAmount()
  }, [cwcContract])

  useEffect(() => {
    if (walletAddress && walletReady) {
      const upperWalletAddress = walletAddress.toUpperCase();
      setConnected(true)
      const _isAvailable = whiteListAddresses.some(v => v.toUpperCase() === upperWalletAddress)
      setIsAvailable(_isAvailable) 

      if(!_isAvailable)
        displayNotify("error", "You do not have permission to mint during Presale, sorry!")
    } else {
      setConnected(false)
    }
  }, [walletAddress, walletReady])

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

  const connectHandler = async () => {
    if (onBoard !== null) {
      if (!(await onBoard.walletSelect())) {
        return;
      }
      setWalletReady(await onBoard.walletCheck())
    }
  }

  const logout = () => {
    if (onBoard != null) {
      onBoard.walletReset();
    }
    setWalletAddress('');
    setWalletReady(false);
  }

  const handleNetworkChange = (networkId) => {
    logout();
    if (networkId != '0x1') {
      displayNotify("warning", "You should choose Ethereum main network!")
    }
  }

  const mintHandler = async () => {
    if(isAvailable) {
      if(amount > 0) {
        try {
          const totalPrice = amount * unitPrice * 10e15;
          await cwcContract.methods.mint(amount).send({ from: walletAddress, value: totalPrice })
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
      displayNotify("error", "You do not have permission to mint during Presale, sorry!")
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

  return (
    <div className="mint-page relative flex items-center justify-center w-screen h-screen">
      <a href="/" className="absolute top-5 left-10 w-1/5 tiny:w-2/12 cursor-pointer">
        <img src="/mint_page/logo.png" alt="logo" />
      </a>
      <div className="w-w-tiny h-h-tiny tiny:w-h-normal tiny:h-h-small lg:w-normal lg:h-h-normal mint-control flex flex-col text-white items-center justify-center relative lg:gap-6 xl:gap-2">
        <div className="h-1/2 flex flex-col w-full px-3 tiny:px-8 lg:px-24 xl:px-10">
          <div className="h-1/2 flex items-center justify-end font-lilita text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl">
            {currentSupply < 0 ? '?' : currentSupply}/2000
          </div>
          <div className="h-1/2 flex gap-4">
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
              <span className="w-1/4 text-center  font-lilita text-2xl tiny:text-3xl lg:text-4xl xl:text-6xl">{amount}</span>
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

export default MintPage
