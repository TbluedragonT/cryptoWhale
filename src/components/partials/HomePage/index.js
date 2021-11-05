import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { utilities, faqs, members, milestons } from "@util/cryptoWhaleClubData"
import React, { useEffect, useState } from "react"
import Roadmap from "@components/roadmap"
import TeamCard from "@components/teamcard"
import { discordLink, twitterLink } from "@components/layout/Layout/menu"
import date from "date-and-time"

const FaqItem = ({ question, answer }) => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <div className="flex flex-row">
      <div
        className="flex flex-col p-2 py-4 cursor-pointer"
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <div className="text-black text-lg md:text-2xl capitalize font-recoleta-bold py-2">
          {question}
          <FontAwesomeIcon
            icon={collapsed ? faAngleRight : faAngleDown}
            className="mx-2"
          />
        </div>
        {!collapsed && (
          <div className="text-black text-base md:text-xl md:w-3/4 2xl:w-2/3">
            {answer}
          </div>
        )}
      </div>
    </div>
  )
}

export default function HomePage({}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", _ => {
      setScrolled(window.scrollY > 60)
    })
  })

  const calc = () => {
    const now = new Date()
    const offset = Math.floor(
      date
        .subtract(
          new Date(2021, 10, 16),
          new Date(now.getFullYear(), now.getMonth(), now.getDate())
        )
        .toDays()
    )
    setLeftDays(offset)
  }

  const [leftDays, setLeftDays] = useState(0)
  useEffect(() => {
    calc()
    const timerId = setInterval(calc, 60000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div>
      <div className="relative">
        <img src="/hero.png" />
        {!scrolled && (
          <img
            src="/hero-logo.svg"
            className="w-3/16 absolute top-2/16 left-1/16"
          />
        )}
        {leftDays > 0 && (
          <div className="absolute top-1/3 right-1/16 xl:right-2/16 py-2 px-3 text-xl md:text-2xl xl:text-3xl text-secondary">
            <span className="text-yellow-300 text-5xl xl:text-7xl font-recoleta-bold px-2">
              {leftDays}
            </span>
            days till presale
          </div>
        )}
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
            20 crypto coins or tokens. Mint Price is 0.06 ETH with pre-sale
            November 16th and public mint November 18th.
          </p>
          <div className="flex flex-row justify-center md:justify-start gap-4">
            <a
              className="rounded-lg bg-primary-lightest hover:bg-primary my-5 px-4 py-4 cursor-pointer"
              href={discordLink}
              target="_blank"
            >
              <img src="/icon/icon-discord.svg" className="w-10 h-10" />
            </a>
            <a
              className="rounded-lg bg-primary-lightest hover:bg-primary my-5 px-4 py-4 cursor-pointer"
              href={twitterLink}
              target="_blank"
            >
              <img src="/icon/icon-twitter.svg" className="w-10 h-10" />
            </a>
          </div>
        </div>
        <div className="hidden lg:block w-2/5 px-10">
          <img src="/pirate-whale.gif" className="rounded-xl" />
        </div>
      </div>

      <div className="bg-primary relative w-full py-12 px-4 lg:px-0" id="about">
        <div className="bg-primary lg:w-3/5 flex flex-col lg:flex-row justify-around mx-auto py-10 items-center">
          <div className="flex flex-row py-8 lg:w-2/5">
            <img
              src="/gold-ship.png"
              className="w-3/5 lg:w-full object-contain rounded-xl mx-auto"
            />
          </div>
          <p className="p-4 lg:w-1/2 lg:px-0 text-secondary text-2xl lg:text-xl xl:text-2xl mx-auto">
            Crypto Whales are forged from 130+ different attributes/traits with
            a maximum of 10,000 whales minted. They are programmatically
            generated and will be stored as ERC-721 tokens on the Ethereum
            blockchain. There are 20 different types of whales, each
            representing a different coin or token. Whales will be the logo
            color of their respective coin / token.
          </p>
        </div>
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
          <div className="py-2">
            <span className="text-yellow-300 text-lg md:text-2xl capitalize py-6 px-2 tracking-tight">
              Post Sellout -
            </span>
            <span className="text-secondary text-lg md:text-2xl">
              We hire a dedicated community manager to continue marketing and
              pushing growth of the project.
            </span>
          </div>
          <div className="py-2">
            <span className="text-yellow-300 text-lg md:text-2xl capitalize py-6 px-2 tracking-tight">
              Carbon Offset for the project:
            </span>
            <span className="text-secondary text-lg md:text-2xl">
              Will be done regardless of how much of the collection sells.
            </span>
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
              <div className="flex flex-col justify-center lg:w-3/5 p-6 relative py-20">
                <div className="absolute top-0 text-primary text-2xl md:text-4xl capitalize py-6">
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
        className="flex flex-col lg:grid lg:grid-cols-5 mx-auto py-20 px-4 lg:px-0"
        id="faq"
      >
        <div className="lg:col-start-2 col-end-6 py-12">
          <div className="capitalize text-primary text-6xl font-recoleta-bold py-8">
            FAQ's
          </div>
          {faqs.map((dt, idx) => (
            <FaqItem {...dt} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
