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
  { icon: '/icon/twitter.svg', link: "https://twitter.com/" },
  { icon: '/icon/telegram.svg', link: "https://telegram.org" },
  { icon: '/icon/discord.svg', link: "https://discord.gg/" },
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
      <div className="grid grid-cols-5 items-center">
        {
          header.map((dt, idx) => (
            < div
              className={`col-start-${idx + 1} text-sm md:text-2xl text-primary text-center ${idx < 4 ? "border-r border-primary" : ""}`}
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
              className="grid grid-cols-5 items-center h-8"
              key={idx}
            >
              {
                dt.data.map((item, index) => (
                  <div
                    className={`col-start-${index + 1} h-8 ${index < 4 ? "border-r border-primary" : ""}`}
                    key={7 + idx * 5 + index}
                  >
                  </div>
                ))
              }
            </div>
            <div
              className="grid grid-cols-5 items-center price-item"
              key={idx}
            >
              <div>
                <img src={dt.image} className="absolute h-20 place-items-stretch transform -translate-x-6/7 -translate-y-5" />
              </div>
              {
                dt.data.map((item, index) => (
                  < div
                    className={`col-start-${index + 1} text-sm md:text-xl text-secondary py-2 text-center ${index < 4 ? "border-r border-primary" : ""}`}
                    key={7 + idx * 10 + index}
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
    <div className="grid grid-cols-12 items-center">
      <div className="text-xl lg:text-2xl tracking-wider text-primary col-span-2 md:col-span-1">
        {props.value}%
      </div>
      <div className="col-start-3 md:col-start-2 col-span-9 text-lg tracking-wide text-primary-light">
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
              <div className="flex flex-row font-bajt text-4xl text-primary italic bold items-center">
                <img src="/logo.png" className="w-16 h-16"></img>
                <div className="p-6">
                  Wallet<br />
                  Winners
                </div>
              </div>
            </div>
            <p className="text-primary-light text-lg font-thin leading-8">
              Wallet Winners is a “PlayToWin” NFT Entarteiment House that brings Art and Gambling to Coexistence. Win and Earn* vide variety of Prizes; Money,Crypto, NFT Art and Real life Benefits* ( such as Tickets to Exclusive Events, Travel Packages etc.)
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
            <div className="uppercase text-primary text-right">about</div>
            <div className="md:border-l-2 border-primary py-8 pl-6">
              <div className="uppercase text-primary text-4xl font-bajt font-extrabold italic py-4">blockchain<br /> bonansa</div>
              <p className="text-primary-light py-4 leading-8">
                Our First Game is called Blockchain Bonanza;. Programmatically generated NFT that will take 10.000 spins on XXX Date and bring Valuable Prizes.
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <img src="/bitcoin.png" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center sm:p-2 md:px-5 lg:px-10 prize-list" id="prizelist">
        <div className="pl-28 pr-2 sm:pl-36 sm:pr-10 w-full lg:w-1/2 lg:px-0 py-10">
          <div className="text-2xl tracking-wider text-primary font-bajt italic font-extrabold md:text-4xl uppercase text-right p-8">
            price list
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
          <div className="uppercase text-primary text-4xl font-bajt font-extrabold italic">showroom</div>
          <p className="text-primary-light py-10 leading-8">
            sed nec, sit eiusmod dolor lacus. ipsum a vulputate id aute gravida. nec nibh a nullam felis pellentesque duis est nullam orci aliquam ligula aliquam cupidatat pretium et duis lacus. proident, sed nec, sit eiusmod dolor lacus. ipsum a vulputate id aute gravida. nec nibh a nullam felis pellentesque duis est nullam orci aliquam ligula aliquam cupidatat pretium et duis lacus. proident,
          </p>
        </div>
      </div>

      <div className="w-full showroom">
      </div>

      <div className="py-8 md:py-20 bg-secondary" id="faq">
        <div className="lg:flex lg:flex-row container mx-auto text-left">
          <div className="text-4xl tracking-normal font-bajt text-primary py-4 lg:faq-title lg:py-0">
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
