import React, { useState } from "react"
import { dashboardData } from "./data"
import "./dashboard.scss"

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
const StackButton = props => {
  const { children, className } = props
  return (
    <button
      className={`${className} px-6 py-1 h-auto uppercase bg-gradient-to-r from-purple-dark to-purple-light rounded-full text-white w-max`}
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

const Dashboard = () => {
  const [claimBalence, setClaimBalance] = useState(423.2)
  const [walletBalence, setWalletBalence] = useState(43.2)

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
              <p className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-bold ">{claimBalence}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:tex6xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
          <div className="flex justify-center md:hidden">
            <button className="border-4 border-white text-white px-4 py-1 rounded-xl bg-gradient-to-r from-green-light to-green-dark">
              CLAIM NOW
            </button>
          </div>
          <div className="px-4 md:pr-16 md:pl-4">
            <LGTitle>
              IN WALLET
            </LGTitle>
            <div className="bg-white rounded-b-lg flex flex-col text-center text-purple py-4 gap-4">
              <p className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-bold ">{walletBalence}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl ">$BLUB</p>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <button className="border-4 border-white text-white px-4 py-1 rounded-xl bg-gradient-to-r from-green-light to-green-dark">
              CLAIM NOW
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-10 px-4">
          <div className="dashboard-table">
            <div className="grid grid-cols-5 gap-2 mb-1">
              <Th>Your Whales</Th>
              <Th>Earning Rate</Th>
              <Th>Currently accrued</Th>
              <Th>All-time accrued</Th>
              <Th>Status</Th>
            </div>
            {dashboardData.map((data, idx) => (
              <div key={idx} className="text-blue grid grid-cols-5 gap-1">
                <Td idx={idx}>{data.name}</Td>
                <Td idx={idx}>
                  {data.status == "staked" ? data.earning_rate : <StackButton />}
                </Td>
                <Td idx={idx}>
                  {data.status == "staked" ? (
                    data.currently_accrued
                  ) : (
                    <StackButton />
                  )}
                </Td>
                <Td idx={idx}>
                  {data.status == "staked" ? data.status : <StackButton />}
                </Td>
                <Td idx={idx}>
                  <Badge status={data.status} />
                </Td>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
