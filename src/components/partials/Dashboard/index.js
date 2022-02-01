import React, { useState, useEffect } from "react"
import { dashboardData } from "./data"
import { connect } from "react-redux"
import "./dashboard.scss"
import {
  CONTRACT_ADDRESS_CWC,
  CONTRACT_ADDRESS_BLUB,
  CONTRACT_ADDRESS_STAKING,
  BACKEND_URL
} from "../../../util/addressHelper"
import abi_cwc from "../../../config/abi/abi_cwc.json"
import abi_blub from "../../../config/abi/abi_blub.json"
import abi_staking from "../../../config/abi/abi_staking.json"
import axios from "axios";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LGTitle = (props) => {
  const { children, className } = props
  return (
    <h1 className={`bg-purple rounded-t-lg text-2xl lg:text-3xl xl:text-4xl text-center py-6 text-white text-bold ${className}`}>{children}</h1>
  )
}

const Th = props => {
  const { children, className } = props
  return (
    <div className={`h-full ${className} items-center justify-center`}>
      <div className="border-2 border-white flex h-full items-center justify-center px-6 py-2 rounded-md text-center text-white uppercase">
        {children}
      </div>
    </div>
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

const ClaimButton = props => {
  const { children, className } = props
  return (
    <button
      className={`${className} px-6 py-1 my-1 text-sm h-auto uppercase bg-gradient-to-r from-purple-dark to-purple-light rounded-full text-white w-max`}
      onClick={props.onClick}
    >
      Claim
    </button>
  )
}

const ClaimAllButton = props => {
  const { children, className } = props
  return (
    <button
      className={`${className} px-6 py-1 my-1 text-3xl h-auto uppercase bg-gradient-to-r from-purple-dark to-purple-light rounded-full text-white w-max`}
      onClick={props.onClick}
    >
      Claim All
    </button>
  )
}

const StakeButton = props => {
  const { children, className } = props
  return (
    <button
      className={`${className} px-6 py-1 my-1 text-sm h-auto uppercase bg-gradient-to-r from-purple-dark to-purple-light rounded-full text-white w-max`}
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
  const STAKE_DECIMALS = 2;

  const [claimBalance, setClaimBalance] = useState(0)
  const [walletBalance, setWalletBalance] = useState(0)

  const [ownedTokens, setOwnedTokens] = useState([])
  
  const UPDATE_STAKING_UI_REFRESH_RATE = 10;

  function updateStakingUi() {
    setOwnedTokens((prevTokens) => prevTokens.map((token) => {return {...token, currently_accrued: token.status === "staked" ? token.currently_accrued + token.earning_rate/(UPDATE_STAKING_UI_REFRESH_RATE*3600) : token.currently_accrued}}));
  }

  useEffect(() => {
    const interval = setInterval(() => updateStakingUi(), 1000/UPDATE_STAKING_UI_REFRESH_RATE);
    return () => {
      clearInterval(interval);
    };
  }, []);

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

  // async function claimToken(tokenId) {
  //   const response = (await axios.post(`${BACKEND_URL}/claim/${tokenId}`)).data;
  //   if (response.status == "Success") {
  //     const accrued = response.accrued;
  //     const signature = response.signature;

  //     try {
  //       const contract = new web3.eth.Contract(abi_staking, CONTRACT_ADDRESS_STAKING);
  //       if (!contract) {
  //         return;
  //       }
  
  //       await contract.methods.claimSingle(tokenId, accrued, signature)
  //         .send({ from: walletAddress, type: "0x2" })
  //         .on('transactionHash', (receipt) => {
  //           alert("Transaction in progress...please wait a moment.")
  //         })
  //         .on('receipt', (receipt) => {
  //           collectOwnedTokens();
  //           alert("Success! You will receive your BLUB amount soon.")
  //         })
  //         .on('error', () => {
  //           alert("Transaction cancelled.")
  //         });
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  async function claimToken(tokenId) {
    const tokenIds = [tokenId];
    const postBody = {
      tokenIds,
      walletAddress
    }
    const response = (await axios.post(`${BACKEND_URL}/claimall-v3`, postBody)).data;

    if (response.status == "Success") {
      try {
        const contract = new web3.eth.Contract(abi_staking, CONTRACT_ADDRESS_STAKING);
        if (!contract) {
          return;
        }

        const sendParams = { from: walletAddress, type: "0x2"}
        if (process.env.GATSBY_APP_CHAIN_ID == 1) {
          sendParams.maxPriorityFeePerGas = 3000000000;
        }
  
        await contract.methods.claim(response.nonce, response.amount, response.timestamp, response.signature)
          .send(sendParams)
          .on('transactionHash', (receipt) => {
            alert("Transaction in progress...please wait a moment.")
          })
          .on('receipt', (receipt) => {
            collectOwnedTokens();
            alert("Success! You will receive your BLUB amount soon.")
          })
          .on('error', () => {
            alert("Transaction cancelled.")
          });
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function claimAll() {
    const tokenIds = ownedTokens.map((t) => t.tokenId);
    const postBody = {
      tokenIds,
      walletAddress
    }
    const response = (await axios.post(`${BACKEND_URL}/claimall-v3`, postBody)).data;

    if (response.status == "Success") {
      const accrued = response.accrued;
      const nonces = response.nonces;
      const signatures = response.signatures;

      try {
        const contract = new web3.eth.Contract(abi_staking, CONTRACT_ADDRESS_STAKING);
        if (!contract) {
          return;
        }

        const sendParams = { from: walletAddress, type: "0x2"}
        if (process.env.GATSBY_APP_CHAIN_ID == 1) {
          sendParams.maxPriorityFeePerGas = 3000000000;
        }
  
        await contract.methods.claim(response.nonce, response.amount, response.timestamp, response.signature)
          .send(sendParams)
          .on('transactionHash', (receipt) => {
            alert("Transaction in progress...please wait a moment.")
          })
          .on('receipt', (receipt) => {
            collectOwnedTokens();
            alert("Success! You will receive your BLUB amount soon.")
          })
          .on('error', () => {
            alert("Transaction cancelled.")
          });
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function collectOwnedTokens() {
    try {
      const contract = new web3.eth.Contract(abi_cwc, CONTRACT_ADDRESS_CWC);
      const contractBlub = new web3.eth.Contract(abi_blub, CONTRACT_ADDRESS_BLUB);
      const contractStaking = new web3.eth.Contract(abi_staking, CONTRACT_ADDRESS_STAKING);
      if (!contract || !contractBlub || !contractStaking) {
        return;
      }

      // walletAddress = '0xb9f59344a4cfcc062da21b7df1c2d9934e4bc71a'; // TODO remove

      const latest = await web3.eth.getBlock("latest");
      const events = await getPastEvents(contract, 'Transfer', 1, latest.number, {to: walletAddress});

      const balanceInWallet = await contractBlub.methods.balanceOf(walletAddress).call();
      let totalReadyToClaim = 0;

      const tokens = [];

      const potentialTokenIds = {};

      for (let event of events) {
        const tokenId = event.returnValues.tokenId;
        potentialTokenIds[tokenId] = true;
      }

      for (let tokenId of Object.keys(potentialTokenIds)) {
        const currentOwner = await contract.methods.ownerOf(tokenId).call();
        if (currentOwner.toLowerCase() === walletAddress.toLowerCase()) {
          const tokenEvents = await getPastEvents(contract, 'Transfer', 1, latest.number, {tokenId});
          const tokenInfo = (await axios.get(`${BACKEND_URL}/stake/${tokenId}`)).data;
          const tokenStakes = tokenInfo.result;

          const trTimes = await Promise.all(tokenEvents.map(async (event) => (await web3.eth.getBlock(event.blockNumber)).timestamp));
          const stTimes = tokenStakes.map((stake) => parseInt((new Date(new Date(stake.staked_at) - new Date(stake.staked_at).getTimezoneOffset() * 60000).getTime() / 1000).toFixed(0)));

          let status = 'none';
          if (stTimes.length > 0 && stTimes[stTimes.length-1] > trTimes[trTimes.length-1]) {
            status = 'staked';
          }

          const earning_rate = 4.1667;

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

          let alltime_claimed = tokenInfo.claimed_amount;
          const currently_accrued = (alltime_accrued - alltime_claimed);

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
      setClaimBalance(totalReadyToClaim);
    } catch (error) {
      console.log(error)
    }
  }

  async function addTokenToMetamask() {
    const tokenAddress = CONTRACT_ADDRESS_BLUB;
    const tokenSymbol = 'BLUB';
    const tokenDecimals = 18;
    const tokenImage = 'https://i.pinimg.com/originals/87/b3/ed/87b3ed7df54e851b95aaa9fff7d5e8a0.jpg';

    try {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (connected) {
      collectOwnedTokens();
    }
  }, [connected])

  return (
    <div className="dashboard min-h-screen font-aAhaWow w-full">
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
              <p className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold ">{ownedTokens.reduce((s, t) => t.currently_accrued + s, 0).toFixed(STAKE_DECIMALS)}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:tex6xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
          <div className="px-4 md:pr-16 md:pl-4">
            <LGTitle>
              IN WALLET
            </LGTitle>
            <div className="bg-white rounded-b-lg flex flex-col text-center text-purple py-4 gap-4">
              <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold ">{(walletBalance / 10**18).toFixed(STAKE_DECIMALS)}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-10 px-4">
          <div className="dashboard-table hidden md:block">
            <div className="grid grid-cols-5 gap-2 mb-1">
              <Th>Your Crypto Whales</Th>
              <Th>Status</Th>
              <Th>Earning Rate (Daily)</Th>
              <Th>Currently accrued</Th>
              <Th>Claimed</Th>
            </div>
            {ownedTokens.map((data, idx) => (
              <div key={idx} className="text-blue grid grid-cols-5 gap-1">
                <Td idx={idx}>{data.name}</Td>
                <Td idx={idx}>
                  {data.status == "staked" ? <ClaimButton onClick={() => claimToken(data.tokenId)}/> : <StakeButton onClick={() => stakeToken(data.tokenId)}/>}
                </Td>
                <Td idx={idx}>
                  {data.status == "staked" ? "100 $BLUB" : "-"}
                </Td>
                <Td idx={idx}>
                  {data.currently_accrued.toFixed(STAKE_DECIMALS)}
                </Td>
                <Td idx={idx}>
                  {data.alltime_claimed.toFixed(STAKE_DECIMALS)}
                </Td>
              </div>
            ))}
          </div>
          <div className="sm:w-3/4 mx-auto md:hidden flex flex-col px-0 tiny:px-8 gap-6 text-blue ">
          {ownedTokens.map((data, idx) => (
            <div className="flex flex-col rounded-lg text-left" key={idx}>
              <span className="rounded-t-lg border border-white text-white text-bold py-1 text-center">
                Crypto Whale {data.name}
              </span>
              <div className="bg-white px-2 tiny:px-4">
                <div className="text-center">
                  {data.status == "staked" ? <ClaimButton onClick={() => claimToken(data.tokenId)}/> : <StakeButton onClick={() => stakeToken(data.tokenId)}/>}
                </div>
                <div className="flex">
                  <div className="w-2/3 tiny:w-3/5 text-sm">EARNING RATE (DAILY)</div>: {data.status == "staked" ? "100 $BLUB" : "-"}
                </div>
                <div className="flex">
                  <div className="w-2/3 tiny:w-3/5 text-sm">CURRENTLY ACCRUED</div>: {data.currently_accrued.toFixed(STAKE_DECIMALS)}
                </div>
                <div className="bg-white rounded-b-lg flex">
                  <div className="w-2/3 tiny:w-3/5 text-sm">CLAIMED</div>: {data.alltime_claimed.toFixed(STAKE_DECIMALS)}
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="flex flex-row justify-center mt-10">
            <ClaimAllButton onClick={() => claimAll()}/>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="ml-5 text-5xl cursor-pointer"
              onClick={() => addTokenToMetamask()}
            />
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
