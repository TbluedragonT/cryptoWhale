import { utilities, faqs, members, milestons } from "@util/cryptoWhaleClubData"
import React from "react"

export default function HomePage({}) {
  return (
    <div>
      <div className="relative">
        <img src="/hero.png" />
        <img
          src="/hero-logo.svg"
          className="w-3/16 absolute top-2/16 left-1/16"
        />
      </div>

      <div className="w-3/5 flex flex-row mx-auto py-20 items-center">
        <div className="w-3/5 flex flex-col pr-10">
          <img src="/join-logo.svg" className="w-1/3 py-5" />
          <p className="text-3xl text-black py-5">
            Crypto Whale Club is a collection of 10,000 unique NFT Atlantean
            whales living on the Ethereum blockchain, each representing one of
            20 crypto coins or tokens. Mint Price will be 0.06 ETH and the
            collection will drop in early to mid November.
          </p>
          <div className="flex flex-row">
            <div className="rounded-full text-secondary text-2xl font-recoleta-bold bg-primary-lightest hover:bg-primary my-5 px-8 py-4 text-center cursor-pointer tracking-wider">
              Join our Discord
            </div>
          </div>
        </div>
        <div className="w-2/5 px-10">
          <img src="/pirate-whale.png" />
        </div>
      </div>

      <div className="bg-primary">
        <p className="w-1/2 py-14 text-center text-secondary text-3xl mx-auto">
          Crypto Whales are forged from 100+ different attributes/traits with a
          maximum of 10,000 whales minted. They are programmatically generated
          and will be stored as ERC-721 tokens on the Ethereum blockchain. There
          are 20 different types of whales, each representing a different coin
          or token. Whales will be the logo color of their respective coin /
          token.
        </p>
      </div>

      <div className="w-3/5 flex flex-row mx-auto py-20 items-center" id="lore">
        <div className="w-3/5 flex flex-col pr-10">
          <div className="capitalize text-primary text-6xl font-recoleta-bold">
            lore
          </div>
          <p className="text-xl text-black py-5">
            Long ago the humans of Atlantis merged with a pod of whales, both in
            genetics and values, and descended into the depths of the sea. But
            as humans spiraled into ever-increasing concentrations of wealth and
            power, the Atlanteans devised a plan to redeem their distant
            cousins. Under the pseudonym Satoshi Nakamoto, they gifted the core
            of their f inancial technology to the humans in the form of Bitcoin.
          </p>
          <p className="text-xl text-black py-5">
            Now, as the situation darkens, the whales are releasing their own
            likenesses as NFTs, each allowing a human to digitally represent
            themselves as an Atlantean. Perhaps through the values and tools of
            decentralized currency, exchange, ownership, and governance, the
            world might yet reverse its terminal course.
          </p>
        </div>
        <div className="w-2/5 px-10">
          <img src="/lost-city.png" />
        </div>
      </div>

      <div className="bg-primary relative w-full grid grid-cols-5" id="roadmap">
        <div className="col-start-2 col-end-6">
          <div className="capitalize text-secondary text-6xl font-recoleta-bold py-8">
            roadmap
          </div>
          <div className=" overflow-x-auto">
            <div className="flex flex-row">
              {milestons.map((dt, idx) => (
                <div className="flex flex-col">
                  <div className="flex flex-row items-center" key={idx}>
                    <div className="bg-secondary text-primary w-20 h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                      <span className="text-4xl">{dt.value}</span>
                      <span className="text-2xl">%</span>
                    </div>
                    <div
                      className={`${
                        dt.final ? "bg-transparent" : "bg-secondary"
                      } h-3 w-48`}
                    ></div>
                  </div>
                  <p className="text-base text-secondary pr-8">{dt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/5 flex flex-col mx-auto py-20" id="utility">
        <div className="capitalize text-primary text-6xl font-recoleta-bold py-8">
          utility
        </div>
        {utilities.map((dt, idx) => (
          <div key={idx}>
            <div className="flex flex-row">
              <img src={dt.img} className="w-2/5 p-6 pl-0" />
              <div className="flex flex-col w-3/5 p-6">
                <div className="text-primary text-4xl capitalize py-6">
                  {dt.title}
                </div>
                <div className="text-black text-2xl">{dt.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary relative w-full grid grid-cols-5" id="roadmap">
        <div className="col-start-2 col-end-6 py-12">
          <div className="capitalize text-secondary text-6xl font-recoleta-bold py-8">
            team
          </div>
          <div className="flex flex-row space-x-8 overflow-x-auto py-4">
            {members.map((dt, idx) => (
              <div
                className="h-96 flex flex-col bg-primary-light rounded-2xl items-center px-24"
                key={idx}
              >
                <img src={dt.img} className="py-8" />
                <p className="text-secondary text-3xl font-recoleta-bold py-2">
                  {dt.name}
                </p>
                <p className="text-secondary text-xl">{dt.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-3/5 flex flex-col mx-auto py-20" id="faq">
        <div className="capitalize text-primary text-6xl font-recoleta-bold py-8">
          FAQ's
        </div>
        {faqs.map((dt, idx) => (
          <div key={idx}>
            <div className="flex flex-row">
              <img src={dt.img} className="w-2/5 p-6" />
              <div className="flex flex-col w-3/5 p-6">
                <div className="text-primary text-4xl capitalize py-6">
                  {dt.title}
                </div>
                <div className="text-black text-2xl">{dt.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
