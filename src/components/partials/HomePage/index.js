import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { utilities, faqs, members, milestons } from "@util/cryptoWhaleClubData"
import React, { useState } from "react"
import Roadmap from "@components/roadmap"
import TeamCard from "@components/teamcard"

const discordLink = "https://discord.gg/yCQ5NjguTB"

const FaqItem = ({ question, answer }) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div
      className="flex flex-row"
      onClick={() => {
        setCollapsed(!collapsed)
      }}
    >
      <div className="flex flex-col lg:w-3/5 p-2 py-4 cursor-pointer">
        <div className="text-black text-lg md:text-2xl capitalize font-recoleta-bold py-2">
          {question}
          <FontAwesomeIcon
            icon={collapsed ? faAngleDown : faAngleUp}
            className="mx-2"
          />
        </div>
        {!collapsed && (
          <div className="text-black text-base md:text-xl">{answer}</div>
        )}
      </div>
    </div>
  )
}

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

      <div className="lg:w-3/5 flex flex-row mx-auto py-20 items-center">
        <div className="lg:w-3/5 flex flex-col lg:pr-10 px-8">
          <div className="lg:hidden flex flex-col md:flex-row justify-center">
            <img src="/join-logo.svg" className="md:w-1/3 p-5" />
            <img src="/pirate-whale.gif" className="md:w-1/3 m-5 rounded-xl" />
          </div>
          <img src="/join-logo.svg" className="hidden lg:block w-1/3 py-5" />
          <p className="text-xl md:text-3xl text-black py-5">
            Crypto Whale Club is a collection of 10,000 unique NFT Atlantean
            whales living on the Ethereum blockchain, each representing one of
            20 crypto coins or tokens. Mint Price will be 0.06 ETH and the
            collection will drop in early to mid November.
          </p>
          <div className="flex flex-row justify-center lg:justify-start">
            <a
              className="rounded-full text-secondary text-lg md:text-2xl font-recoleta-bold bg-primary-lightest hover:bg-primary my-5 px-8 py-4 text-center cursor-pointer tracking-wider"
              href={discordLink}
              target="_blank"
            >
              Join our Discord
            </a>
          </div>
        </div>
        <div className="hidden lg:block w-2/5 px-10">
          <img src="/pirate-whale.gif" className="rounded-xl" />
        </div>
      </div>

      <div className="bg-primary">
        <p className="px-4 lg:px-0 lg:w-1/2 py-14 md:text-center text-secondary text-xl md:text-3xl mx-auto">
          Crypto Whales are forged from 100+ different attributes/traits with a
          maximum of 10,000 whales minted. They are programmatically generated
          and will be stored as ERC-721 tokens on the Ethereum blockchain. There
          are 20 different types of whales, each representing a different coin
          or token. Whales will be the logo color of their respective coin /
          token.
        </p>
      </div>

      <div
        className="px-4 lg:px-0 lg:w-3/5 flex flex-row mx-auto py-20 items-center"
        id="lore"
      >
        <div className="lg:w-3/5 flex flex-col lg:pr-10">
          <div className="flex flex-row lg:hidden md:w-3/5 mx-auto py-8">
            <img src="/lost-city.png" className="object-contain" />
          </div>
          <div className="capitalize text-primary text-6xl font-recoleta-bold">
            lore
          </div>
          <p className="text-xl text-black py-5">
            Long ago the humans of Atlantis merged with a pod of whales, both in
            genetics and values, and descended into the depths of the sea. But
            as humans spiraled into ever-increasing concentrations of wealth and
            power, the Atlanteans devised a plan to redeem their distant
            cousins. Under the pseudonym Satoshi Nakamoto, they gifted the core
            of their financial technology to the humans in the form of Bitcoin.
          </p>
          <p className="text-xl text-black py-5">
            Now, as the situation darkens, the whales are releasing their own
            likenesses as NFTs, each allowing a human to digitally represent
            themselves as an Atlantean. Perhaps through the values and tools of
            decentralized currency, exchange, ownership, and governance, the
            world might yet reverse its terminal course.
          </p>
        </div>
        <div className="hidden lg:block w-2/5 px-10">
          <img src="/lost-city.png" />
        </div>
      </div>

      <div
        className="bg-primary relative w-full grid grid-cols-5 py-12 px-4 lg:px-0"
        id="roadmap"
      >
        <div className="col-start-1 lg:col-start-2 col-end-6">
          <div className="capitalize text-secondary text-6xl font-recoleta-bold py-8">
            roadmap
          </div>
          <div className="py-4 flex flex-row justify-center xl:justify-start">
            <Roadmap milestons={milestons} />
          </div>
        </div>
      </div>

      <div
        className="lg:w-3/5 flex flex-col mx-auto py-20 px-4 lg:px-0"
        id="utility"
      >
        <div className="capitalize text-primary text-6xl font-recoleta-bold py-8">
          utility
        </div>
        {utilities.map((dt, idx) => (
          <div key={idx}>
            <div className="flex flex-col lg:flex-row">
              <img
                src={dt.img}
                className="md:w-2/3 lg:w-2/5 p-6 pl-0 object-contain mx-auto"
              />
              <div className="flex flex-col lg:w-3/5 p-6">
                <div className="text-primary text-2xl md:text-4xl capitalize py-6">
                  {dt.title}
                </div>
                <div className="text-black text-lg md:text-2xl">
                  {dt.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-primary relative w-full grid grid-cols-5 px-4 lg:px-0"
        id="team"
      >
        <div className="col-start-1 lg:col-start-2 col-end-6 py-12">
          <div className="capitalize text-secondary text-6xl font-recoleta-bold py-8">
            team
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 py-4 justify-center items-center">
            {members.map((dt, idx) => (
              <TeamCard
                image={dt.img}
                name={dt.name}
                role={dt.role}
                description={dt.description}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="lg:w-3/5 flex flex-col mx-auto py-20 px-4 lg:px-0"
        id="faq"
      >
        <div className="capitalize text-primary text-6xl font-recoleta-bold py-8">
          FAQ's
        </div>
        {faqs.map((dt, idx) => (
          <FaqItem {...dt} key={idx} />
        ))}
      </div>
    </div>
  )
}
