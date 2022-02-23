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
      <img src={item.icon} className={!item.isStaked && "disabled"} alt="coin icon" />
      {item.isStaked && (
        <img src="/ahab_page/tick.png" alt="tick icon" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-6 md:w-8 lg:w-6  2xl:w-8 translate-y-1/2" />
      )}
    </div>
  )
}

const AhabPage = ({ web3, walletAddress, connected }) => {
  const [cwcContract, setCwcContract] = useState(null)
  const [ahabEligible, setAhabEligible] = useState(undefined)
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

  const checkAhab = async () => {
    const ahab_results = (await axios.get(`${BACKEND_URL}/ahab-check/${walletAddress}`)).data;
    const ahab_eligible = ahab_results.code == 200 && ahab_results.value;

    const newWhaleTypes = {...defaultWhaleType};
    if (ahab_results.code == 200) {
      for (let whaleType of ahab_results.types) {
        const whaleKey = whaleType.toLocaleLowerCase().replace(/ /g, "_")
        newWhaleTypes[whaleKey].isStaked = true;
      }
    }
    setAhabEligible(ahab_eligible);
    setWhaleTypes(newWhaleTypes);
  }

  const claimAhab = async () => {
    if (ahabEligible) {
      setAhabEligible(false);
      const ahab_results = (await axios.get(`${BACKEND_URL}/ahab/${walletAddress}`)).data;
      if (ahab_results.code == 200) {
        displayNotify("success", "Claim successful, please allow 12-24hrs for Ahab to sail into into your wallet!")
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
      <div className={`container mt-4 tiny:mt-8 sm:mt-12 lg:mt-24`}>
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 px-2 gap-4 md:gap-8 xl:gap-10 py-12 ">
          {Object.keys(whaleTypes).map((key, idx) => {
            return (
              <StakeItem item={whaleTypes[key]} key={idx} />
            )
          }
          )}
        </div>
        <div className=" text-center flex flex-col items-center justify-center ">
          <p className="text-xl sm:text-3xl md:text-4xl">
            {ahabEligible !== undefined && (ahabEligible ? "Congratulations! Please Claim Ahab using the button below." : "You need to collect one of each whale type to claim, time to hit the Opensea!")}
          </p>
          <video 
            controls
            autoPlay
            muted
            loop
            style={{ width: "auto", height: "300px" }}
            className="w-full mx-auto my-8 rounded-lg ahab-video">
            <source src="/ahab_page/ahab.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="relative" onClick={claimAhab}>
            <img src="/ahab_page/btn_claim.svg" alt="claim image" />
            <p className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-5xl lg:text-5xl whitespace-nowrap ${!ahabEligible && "disabled not-allowed"}`}>
              CLAIM AHAB
            </p>
          </button>
        </div>
        <p className="mt-8 text-sm sm:text-2xl md:text-3xl text-center">
          There was a time when Ahab was known as a hunter of whales. He turned the page on that chapter of his life after the Atlantean Whales befriended Ahab and taught him the error of his ways. He now assists the Atlanteans by sailing the seas in search of lost whales. He gently collects them and helps them to return to their Crypto Whale Pod homes.
        </p>
        <p className="mt-8 text-sm sm:text-2xl md:text-3xl text-center">
          The first 50 collectors to collect one of each 20 whale types are able to claim a Captain Ahab from the Crypto Whales website. The Captain will count as every whale type for the purposes of the Coin Rewards program.
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
