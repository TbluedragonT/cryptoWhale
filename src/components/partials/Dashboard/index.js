import React, { useState, useEffect } from "react"
import { dashboardData } from "./data"
import { connect } from "react-redux"
import "./dashboard.scss"
import {
  CONTRACT_ADDRESS_CWC,
  CONTRACT_ADDRESS_BLUB,
  BACKEND_URL
} from "../../../util/addressHelper"
import abi_cwc from "../../../config/abi/abi_cwc.json"
import abi_blub from "../../../config/abi/abi_blub.json"
import axios from "axios";

const LGTitle = (props) => {
  const { children, className } = props
  return (
    <h1 className={`bg-purple rounded-t-lg text-2xl lg:text-3xl xl:text-4xl text-center py-6 text-white text-bold ${className}`}>{children}</h1>
  )
}

const Th = props => {
  const { children, className } = props
  return (
    <th className={`h-full ${className} items-center justify-center`}>
      <div className="border-2 border-white flex h-full items-center justify-center px-6 py-2 rounded-md text-center text-white uppercase">
        {children}
      </div>
    </th>
  )
}

const Td = props => {
  const { children, className, idx } = props
  return (
    <div
      className={`${idx % 2 == 0 ? "bg-gray-200" : "bg-white"
        } text-center items-center flex justify-center py-1`}
    >
      {children}
    </div>
  )
}
const StakeButton = props => {
  const { children, className } = props
  return (
    <button
      className={`${className} px-6 py-1 h-auto uppercase bg-gradient-to-r from-purple-dark to-purple-light rounded-full text-white w-max`}
      onClick={props.onClick}
    >
      Stake
    </button>
  )
}

const Badge = props => {
  const { status } = props
  return (
    <span
      className={`${status === "staked" ? "text-red-500" : "text-green-500"
        } uppercase`}
    >
      {status === "staked" ? "staked" : "available"}
    </span>
  )
}

const Dashboard = ({web3, onBoard, walletAddress, connected, setConnected}) => {
  const STAKE_DECIMALS = 4;

  const [claimBalance, setClaimBalance] = useState(0)
  const [walletBalance, setWalletBalance] = useState(0)

  const [ownedTokens, setOwnedTokens] = useState([])
  
  async function getPastEvents(contract, event, fromBlock, toBlock, filter = {}) {
    if (fromBlock <= toBlock) {
        try {
            const options = {
                fromBlock: fromBlock,
                toBlock  : toBlock,
                filter,
            };
            const ret = await contract.getPastEvents(event, options);
            // console.log(ret);
            return ret;
        }
        catch (error) {
            console.log(error);
            const midBlock = (fromBlock + toBlock) >> 1;
            const arr1 = await getPastEvents(contract, event, fromBlock, midBlock);
            const arr2 = await getPastEvents(contract, event, midBlock + 1, toBlock);
            return [...arr1, ...arr2];
        }
    }
    return [];
  }

  async function stakeToken(tokenId) {
    // let account = await web3.eth.getAccounts();
    const account = walletAddress;
    const timestamp = Math.floor(Date.now() / 1000);
    const message = `\x19Ethereum Signed Message:\n${account}|${timestamp}|${tokenId}`;
    const hash = web3.eth.accounts.hashMessage(message);
    const signature = await web3.eth.sign(hash, account);

    const response = (await axios.post(`${BACKEND_URL}/stake/${tokenId}/${timestamp}/${account}/${signature}`)).data;
    if (response.status == "Success") {
      setOwnedTokens(prevTokens => prevTokens.map((token) => {
        if (token.tokenId == tokenId) {
          token.status = 'staked';
        }
        return token;
      }));
    }
  }

  async function collectOwnedTokens() {
    try {
      const contract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC);
      const contractBlub = new web3.eth.Contract(abi_blub, CONTRACT_ADDRESS_BLUB);
      if (!contract || !contractBlub) {
        return;
      }

      //walletAddress = '0xb9f59344a4cfcc062da21b7df1c2d9934e4bc71a'; // TODO remove

      const latest = await web3.eth.getBlock("latest");
      const events = await getPastEvents(contract, 'Transfer', 1, latest.number, {to: walletAddress});

      const balanceInWallet = await contractBlub.methods.balanceOf(walletAddress).call();
      let totalReadyToClaim = 0;

      const tokens = [];
      for (let event of events) {
        const tokenId = event.returnValues.tokenId;
        const currentOwner = await contract.methods.ownerOf(tokenId).call();
        if (currentOwner.toLowerCase() === walletAddress.toLowerCase()) {
          const tokenEvents = await getPastEvents(contract, 'Transfer', 1, latest.number, {tokenId});
          const tokenStakes = (await axios.get(`${BACKEND_URL}/stake/${tokenId}`)).data;

          const trTimes = await Promise.all(tokenEvents.map(async (event) => (await web3.eth.getBlock(event.blockNumber)).timestamp));
          const stTimes = tokenStakes.map((stake) => parseInt((new Date(stake.staked_at).getTime() / 1000).toFixed(0)));

          let status = 'none';
          if (stTimes.length > 0 && stTimes[stTimes.length-1] > trTimes[trTimes.length-1]) {
            status = 'staked';
          }

          const earning_rate = 4;

          let alltime_accrued = 0;
          let end_timestamp, i=0, j=0;
          while (i < stTimes.length) {
            // find staking timestamp
            const start_timestamp = stTimes[i];
            
            // find first transfer timestamp after staking
            while (j < trTimes.length && trTimes[j] <= start_timestamp) {
              j++;
            }

            if (j==trTimes.length) {
              end_timestamp = Math.floor(Date.now() / 1000);
            } else {
              end_timestamp = trTimes[j];
            }

            if (i < stTimes.length - 1) {
              end_timestamp = Math.min(end_timestamp, stTimes[i+1]);
            }

            alltime_accrued += (end_timestamp - start_timestamp)*earning_rate / 3600;
            i++;
          }

          let alltime_claimed = 0;

          alltime_accrued = alltime_accrued.toFixed(STAKE_DECIMALS);
          const currently_accrued = (alltime_accrued - alltime_claimed).toFixed(STAKE_DECIMALS);

          totalReadyToClaim += (alltime_accrued - alltime_claimed);

          tokens.push({
            tokenId,
            name: `#${tokenId}`,
            status,
            earning_rate,
            alltime_accrued,
            currently_accrued,
            alltime_claimed
          });
        }
      }

      setOwnedTokens(tokens);
      setWalletBalance(balanceInWallet);
      setClaimBalance(totalReadyToClaim.toFixed(STAKE_DECIMALS));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (connected) {
      collectOwnedTokens();
    }
  }, [connected])

  return (
    <div className="dashboard min-h-screen font-aAhaWow">
      <a href="/" className="absolute top-5 left-10 w-1/5 tiny:w-2/12 cursor-pointer">
        <img src="/mint_page/logo.png" alt="logo" />
      </a>
      <div className="lg:w-3/4 xl:w-2/3 mx-auto pb-30">
        <div className="grid md:grid-cols-2 grid-cols-1 pt-28 sm:pt-36 md:pt-40 gap-4 px-6 sm:px-16 md:px-0 ">
          <div className="px-4 md:pl-16 md:pr-4">
            <LGTitle>
              READY TO CLAIM
            </LGTitle>
            <div className="bg-white rounded-b-lg flex flex-col text-center text-purple py-4 gap-4">
              <p className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-bold ">{claimBalance}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:tex6xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
          <div className="px-4 md:pr-16 md:pl-4">
            <LGTitle>
              IN WALLET
            </LGTitle>
            <div className="bg-white rounded-b-lg flex flex-col text-center text-purple py-4 gap-4">
              <p className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-bold ">{walletBalance}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-10 px-4">
          <div className="dashboard-table">
            <div className="grid grid-cols-5 gap-2 mb-1">
              <Th>Your Crypto Whales</Th>
              <Th>Status</Th>
              <Th>Earning Rate (Hourly)</Th>
              <Th>Currently accrued</Th>
              <Th>Claimed</Th>
            </div>
            {ownedTokens.map((data, idx) => (
              <div key={idx} className="text-blue grid grid-cols-5 gap-1">
                <Td idx={idx}>{data.name}</Td>
                <Td idx={idx}>
                  {data.status == "staked" ? data.status : <StakeButton onClick={() => stakeToken(data.tokenId)}/>}
                </Td>
                <Td idx={idx}>
                  {data.status == "staked" ? data.earning_rate + " $BLUB" : "-"}
                </Td>
                <Td idx={idx}>
                  {data.currently_accrued}
                </Td>
                <Td idx={idx}>
                  {data.alltime_claimed}
                </Td>
              </div>
            ))}
          </div>
        </div>
      </div>
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

export default connect(stateProps, dispatchProps)(Dashboard);
