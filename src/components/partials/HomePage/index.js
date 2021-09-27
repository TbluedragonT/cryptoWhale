/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import {
  faqData,
  roadmapData,
  teamData,
  priceHeaderData,
  priceData,
} from "@util/walletWinnersData"
import { Menus } from '@components/layout/Layout/menu'

import "./homepage.scss"

const icons = [
  { icon: '/icon/twitter.svg', link: "https://twitter.com/wallet_winners" },
  { icon: '/icon/discord.svg', link: "https://discord.gg/BR2mXYpQJr" },
]

const responsive = {
  mobile: {
    breakpoint: { max: 10000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

const PriceTable = ({
  header,
  data,
}) => {
  return (
    <>
      <div className="grid grid-cols-6 items-center">
        {
          header.map((dt, idx) => (
            < div
              className={`col-start-${idx + 1} text-sm md:text-2xl text-primary text-center ${idx < 5 ? "border-r border-primary" : ""}`}
              key={idx}
            >
              {dt}
            </div>
          ))
        }
      </div>
      {
        data.map((dt, idx) => (
          <>
            <div
              className="grid grid-cols-6 items-center h-8"
              key={idx}
            >
              {
                dt.data.map((item, index) => (
                  <div
                    className={`col-start-${index + 1} h-8 ${index < 5 ? "border-r border-primary" : ""}`}
                    key={7 + idx * 6 + index}
                  >
                  </div>
                ))
              }
            </div>
            <div
              className="grid grid-cols-6 items-center price-item"
              key={idx}
            >
              <div className="hidden md:block">
                <img src={dt.image} className="absolute h-20 place-items-stretch transform -translate-x-6/7 -translate-y-5" />
              </div>
              {/* <div className="block md:hidden">
                <img src={dt.icon} className="absolute h-8 place-items-stretch left-0" />
              </div> */}
              {
                dt.data.map((item, index) => (
                  < div
                    className={`col-start-${index + 1} text-xs md:text-xl text-secondary py-2 text-center ${index < 5 ? "border-r border-primary" : ""}`}
                    key={7 + idx * 12 + index}
                  >
                    {item}
                  </div>
                ))
              }
            </div>
          </>
        ))
      }
    </>
  )
}

const RoadMapItem = (props) => {
  return (
    <div className="grid grid-cols-12 items-center py-2">
      <div className="text-xl lg:text-2xl tracking-wider text-primary col-span-2 md:col-span-1 py-2 md:py-0">
        {props.value}%
      </div>
      <div className="col-start-1 md:col-start-2 col-span-12 md:col-span-9 text-lg tracking-wide text-primary-light pl-4">
        {props.description}
      </div>
      <div className="hidden md:block col-start-11 col-span-2">
        <div className="rounded-md border-primary border h-32 m-8 relative">
          {props.image !== "none" &&
            <img src={props.image} className="absolute h-28 object-cover -left-8 top-2" />
          }
        </div>
      </div>
    </div>
  )
}

const Question = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="mb-12 text-left faq-item cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="grid grid-cols-12 items-center">
        <div className="text-xl tracking-wider text-primary-light col-span-11 capitalize">
          {props.faqTitle}
        </div>
        <div className="col-start-12 font-rbno2-light text-4xl text-primary-light text-shadow text-right">
          {open ? "-" : "+"}
        </div>
        {open &&
          <div className="col-span-11 mt-5 text-lg font-light leading-8 text-gray-400 capitalize">
            {props.faqDescription}
          </div>
        }
      </div>
    </div>
  )
}
const TeamItem = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <a
          href={props.twitterLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-primary p-2"
        >
          <div className="rounded-full overflow-hidden">
            <img src={props.image} alt="Team Image" className="my-auto" />
          </div>
        </a>
        <div className="flex flex-row items-center mt-6">
          <div className="w-2 h-2 bg-yellow-200"></div>
          <div className="text-primary text-xl lg:text-4xl px-3">
            {props.name}
          </div>
          <div className="w-2 h-2 bg-yellow-200"></div>
        </div>
        <div className="text-primary-light text-xl mt-2">
          {props.role}
        </div>
      </div>
    </div>
  )
}

export default function Homepage() {
  const [horizontalType, setHorizontalType] = useState(null)

  const checkHorizontal = () => {
    setHorizontalType(window.innerWidth >= 1024 ? "large"
      : window.innerWidth >= 768 ? "middle"
        : window.innerWidth >= 425 ? "small"
          : window.innerWidth >= 320 ? "tiny" : "microscopic")
  }

  useEffect(() => {
    checkHorizontal()
    window.addEventListener("resize", checkHorizontal)
    return () => {
      window.removeEventListener("resize", checkHorizontal)
    }
  }, [])

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row">
        <nav>
          <div className="hidden sm:flex lg:hidden justify-center">
            <ul className="navMenus w-full flex justify-around">
              {Menus.map(dt => (
                <li className="py-2 px-3 text-primary-light" key={dt.name} >
                  {dt.type == 'internal' ?
                    <Link
                      activeClassName="active"
                      to={dt.path}
                      partiallyActive={!!dt.partiallyActive}
                      target={dt.target}
                    >
                      {dt.name}
                    </Link>
                    :
                    <a href={dt.path} target={dt.target}>
                      {dt.name}
                    </a>
                  }
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="bg-primary lg:w-3/5 py-0 relative">
          <img src="/banner.png" className="w-full object-cover"></img>
        </div>
        <div className="flex flex-col lg:w-2/5 justify-between px-8 pt-8">
          <nav>
            <div className="hidden lg:flex justify-center">
              <ul className="navMenus w-full flex justify-around">
                {Menus.map(dt => (
                  <li className="py-2 px-3 text-primary-light" key={dt.name} >
                    {dt.type == 'internal' ?
                      <Link
                        activeClassName="active"
                        to={dt.path}
                        partiallyActive={!!dt.partiallyActive}
                        target={dt.target}
                      >
                        {dt.name}
                      </Link>
                      :
                      <a href={dt.path} target={dt.target}>
                        {dt.name}
                      </a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-row justify-center lg:justify-start">
              <div className="flex flex-row font-bajt text-2xl md:text-4xl text-primary italic bold items-center">
                <img src="/logo.png" className="w-16 h-16"></img>
                <div className="p-6">
                  Wallet<br />
                  Winners
                </div>
              </div>
            </div>
            <p className="text-primary-light text-lg font-thin leading-8">
              Wallet Winners is a "Play2Win" NFT Entertainment House that joins Art and Gambling together in an exciting new fashion! Play for a wide variety of Prizes including: Crypto, NFT Collectibles and (in the near future), 
              Real-World Experiences (such as Tickets to Exclusive Events, Travel Packages and more).
            </p>
            <p>&nbsp;</p>
            <p className="text-primary-light text-lg font-thin leading-8"><strong>TRUST, SAFETY AND PRIZES</strong></p>
            <p className="text-primary-light text-lg font-thin leading-8">
              The team at Wallet Winners understands that trusting a new project can be risky. That is why we have contracted MasterBrews to not only handle our tech needs, but to also guarantee all prizes! All NFTs offered 
              in our Prize List are already owned and held by the MasterBrews team on our behalf. Crypto wins will be distributed and controlled through the Smart Contract itself. No rug pulls here!
            </p>
            <p>&nbsp;</p>
            <p className="text-primary-light text-lg font-thin leading-8">
              If you have any doubts or questions, please feel free to contact us or the MasterBrews team directly through Discord.
            </p>
            <div className="flex flex-row bg-secondary py-2 justify-center lg:justify-start">
              {
                icons.map((dt, idx) => (
                  <li className="list-none pr-5 pt-5" key={idx}>
                    <a
                      href={dt.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={dt.icon}
                        alt=""
                      />
                    </a>
                  </li>
                ))
              }
            </div>

          </div>
          <div className="hidden lg:flex text-primary-light justify-center">
            <span>V.1</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-10 md:pt-24" id="about">
        <div className="flex flex-row">
          <div className="flex flex-col max-w-md">
            <div className="md:border-l-2 border-primary py-8 pl-6">
              <div className="uppercase text-primary text-2xl md:text-4xl font-bajt font-extrabold italic py-4">blockchain<br /> bonansa</div>
              <p className="text-primary-light py-4 leading-8">
                Introducing our first game: Blockchain Bonanza! Based on Ethereum Mainnet and utilizing Smart Contract technology, 10 000 "Spins" (NFTs) will be offered for "Mint" at a cost of 0.08 ETH. Minting windows 
                will be revealed in the near future. Once the sale period is over, you'll be able to use your spins and win fabulous prizes! It's that simple. 
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <img src="/bitcoin.png" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center sm:p-2 md:px-5 lg:px-10 prize-list" id="prizelist">
        <div className="pl-2 md:pl-28 pr-2 sm:pl-36 sm:pr-10 w-full lg:w-1/2 lg:px-0 py-10">
          <div className="text-2xl tracking-wider text-primary font-bajt italic font-extrabold md:text-4xl uppercase text-center md:text-right p-8">
            PRIZE LIST
          </div>
          <PriceTable
            header={priceHeaderData}
            data={priceData}
          />
        </div>
      </div>

      <div className="flex justify-center pt-20 px-2" id="roadmap">
        <div>
          <div className="text-2xl tracking-wider text-primary font-bajt italic font-extrabold md:text-4xl uppercase">
            Roadmap
          </div>
          {
            roadmapData.map((dt, idx) => (
              <RoadMapItem
                key={idx}
                {...dt}
              />
            ))
          }
        </div>
      </div>

      <div className="py-8 md:py-20" id="team">
        <div className="container mx-auto">
          <div className="text-2xl tracking-wider text-center text-primary font-bajt italic font-extrabold md:text-4xl uppercase">
            Team
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 md:grid-cols-3 md:gap-4 lg:gap-16 place-items-stretch">
            {
              teamData.map((dt, idx) => (
                <TeamItem
                  className="mt-6 md:mt-0"
                  {...dt}
                  key={idx}
                />
              ))
            }
          </div>
        </div>
      </div>

      <div className="flex pt-10 md:pt-24 justify-center px-3 md:px-0">
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <div className="uppercase text-primary text-2xl md:text-4xl font-bajt font-extrabold italic">Virtual NFT Showroom</div>
          <p className="text-primary-light py-10 leading-8">
            Imagine being able to walk through a beautiful, fully-rendered NFT art gallery or to explore our actual Entertainment House metaverse. Coming soon, that dream will be reality. Look for more updates and details dropping
             in the near future!
          </p>
        </div>
      </div>

      <div className="w-full showroom">
      </div>

      <div className="py-8 md:py-20 bg-secondary" id="faq">
        <div className="lg:flex lg:flex-row container mx-auto text-left">
          <div className="text-2xl md:text-4xl tracking-normal font-bajt text-primary py-4 lg:faq-title lg:py-0">
            F A Q
          </div>
          <div className="flex flex-col max-w-5xl mx-auto">
            <div className="faq-container">
              {faqData.map((dt, idx) => (
                <Question key={idx} {...dt}></Question>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
