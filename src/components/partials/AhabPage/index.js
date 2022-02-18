import React, { useEffect, useState } from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { connect } from "react-redux"
import axios from "axios"
import { defaultWhaleType } from "@util/cryptoWhaleClubData"
import { CONTRACT_ADDRESS_CWC, BACKEND_URL } from "@util/addressHelper"
import abi_cwc from "@config/abi/abi_cwc.json"
import whalesInfo from "@util/whales.json"
import "./ahabpage.scss"

const StakeItem = (props) => {
  const { item } = props

  return (
    <div className="relative">
      <img src={item.icon} alt="coin icon" />
      {item.isStaked && (
        <img src="/ahab_page/tick.png" alt="tick icon" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-6 md:w-8 lg:w-6  2xl:w-8 translate-y-1/2" />
      )}
    </div>
  )
}

const AhabPage = ({ web3, walletAddress, connected }) => {
  const [cwcContract, setCwcContract] = useState(null)
  const [ahabEligible, setAhabEligible] = useState(false)
  const [whaleTypes, setWhaleTypes] = useState(defaultWhaleType)
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  })

  useEffect(() => {
    if (connected) {
      const _cwcContract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC)
      setCwcContract(_cwcContract)
      checkAhab()
    }
  }, [connected])

  useEffect(() => {
    const initialHandler = async () => {
      const latest = await web3.eth.getBlock("latest");
      const events = await getPastEvents(cwcContract, 'Transfer', 1, latest.number, { to: walletAddress });
      for (let event of events) {
        const tokenId = event.returnValues.tokenId;
        const isUsed = await checkUsedToken(tokenId)
        if(!isUsed) {
          const whale_type = whalesInfo[tokenId]['Whale Type'].toLocaleLowerCase().replace(/ /g, "_");
          setWhaleTypes(prevState => ({
            ...prevState,
            [whale_type]: {
              ...prevState[whale_type],
              isStaked: true
            }
          }))
        }
      }
    }

    if (connected && cwcContract != null) {
      initialHandler()
    }
  }, [connected, cwcContract])

  const getPastEvents = async (contract, event, fromBlock, toBlock, filter = {}) => {
    if (fromBlock <= toBlock) {
      try {
        const options = {
          fromBlock: fromBlock,
          toBlock: toBlock,
          filter,
        };
        const ret = await contract.getPastEvents(event, options);
        return ret;
      }
      catch (error) {
        const midBlock = (fromBlock + toBlock) >> 1;
        const arr1 = await getPastEvents(contract, event, fromBlock, midBlock);
        const arr2 = await getPastEvents(contract, event, midBlock + 1, toBlock);
        return [...arr1, ...arr2];
      }
    }
    return [];
  }

  const checkUsedToken = async (id) => {
    // const result = (await axios.get(`${BACKEND_URL}/check-used/${id}`)).data;
    // return result.code == 200 && result.value
    return false
  }

  const checkAhab = async () => {
    const ahab_results = (await axios.get(`${BACKEND_URL}/ahab-check/${walletAddress}`)).data;
    const ahab_eligible = ahab_results.code == 200 && ahab_results.value;
    setAhabEligible(ahab_eligible);
  }

  const claimAhab = async () => {
    if (ahabEligible) {
      setAhabEligible(false);
      const ahab_results = (await axios.get(`${BACKEND_URL}/ahab/${walletAddress}`)).data;
      if (ahab_results.code == 200) {
        displayNotify("success", "Success! We will send out your Ahab within a few days.")
      } else {
        displayNotify("error", "Something went wrong!")
      }
      checkAhab();
    }
  }

  const displayNotify = (type, content) => {
    setAlertState({
      open: true,
      message: content,
      severity: type,
    })
  }

  return (
    <div className="ahab-container flex items-center justify-center font-aAhaWow text-white py-8 md:py-12 lg:py-14">
      <a href="/" className="absolute top-5 left-10 w-1/5 tiny:w-2/12 cursor-pointer">
        <img src="/logo.png" alt="logo" />
      </a>
      <div className={`container mt-4 tiny:mt-8 sm:mt-12 lg:mt-24 ${!ahabEligible && "disabled"} `}>
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 px-2 gap-4  md:gap-8  xl:gap-10 py-12 ">
          {Object.keys(whaleTypes).map((key, idx) => {
            return (
              <StakeItem item={whaleTypes[key]} key={idx} />
            )
          }
          )}
        </div>
        <div className=" text-center flex flex-col items-center justify-center ">
          <p className="text-xl sm:text-3xl md:text-4xl">
            {ahabEligible ? "Congratulation you are qualified!" : "Sorry, You are not qualified."}
          </p>
          <img src="/ahab_page/captain.png" alt="captain image" />
          <button className="relative" onClick={claimAhab}>
            <img src="/ahab_page/btn_claim.svg" alt="claim image" />
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-5xl lg:text-5xl whitespace-nowrap">
              CLAIM AHAB
            </p>
          </button>
        </div>
        <p className="mt-8 text-sm sm:text-2xl md:text-3xl text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prioftware like Aldus PageMaker including versions of Lorem
        </p>
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
  walletAddress: state.walletAddress,
  connected: state.connected
});

export default connect(stateProps, null)(AhabPage);