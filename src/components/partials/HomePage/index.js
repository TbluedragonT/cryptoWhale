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
              className={`col-start-${idx + 1} text-2xl text-primary text-center`}
              key={idx}
            >
              {dt}
            </div>
          ))
        }
      </div>
      {
        data.map((dt, idx) => (
          <div
            className="grid grid-cols-5 items-center price-item my-8"
            key={idx}
          >
            <div>
              <img src={dt.image} className="absolute h-20 place-items-stretch transform -translate-x-3/4 -translate-y-5" />
            </div>
            {
              dt.data.map((item, index) => (
                < div
                  className={`col-start-${index + 1} text-xl text-secondary py-2 text-center`}
                  key={7 + idx * 5 + index}
                >
                  {item}
                </div>
              ))
            }
          </div>
        ))
      }
    </>
  )
}

const RoadMapItem = (props) => {
  return (
    <div className="grid grid-cols-12 items-center">
      <div className="text-2xl tracking-wider text-primary col-span-1">
        {props.value}%
      </div>
      <div className="col-start-2 col-span-9 text-lg tracking-wide text-primary-light">
        {props.description}
      </div>
      <div className="col-start-11 col-span-2">
        <div className="rounded-md border-primary border h-32">
          {props.image !== "none" &&
            <img src={props.image} className="absolute h-28 object-cover -left-2 -top-1/2" />
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
        <div className="flex flex-row items-center">
          <div className="w-2 h-2 bg-yellow-200"></div>
          <div className="text-primary text-4xl">
            {props.name}
          </div>
          <div className="w-2 h-2 bg-yellow-200"></div>
        </div>
        <div className="text-primary-light text-xl">
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
      <div className="flex flex-row">
        <div className="bg-primary w-2/3 py-0 relative">
          <div className="mix-blend-overlay banner-effect">
          </div>
          <img src="/cassino.png" className="absolute left-0 top-0"></img>
        </div>
        <div className="flex flex-col w-1/3 justify-between">
          <nav>
            <div className="flex justify-center space-x-4">
              <div>
                <ul className="navMenus">
                  {Menus.map(dt => (
                    <li className="py-2 px-3" key={dt.name} >
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
            </div>
          </nav>
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-row font-bajt text-4xl text-primary italic bold">
              <img src="/logo.png" className="w-20 h-20"></img>
              <div>
                Wallet<br />
                Winners
              </div>
            </div>
            <p className="text-primary-light text-lg font-thin">
              Wallet Winners is a “PlayToWin” NFT Entarteiment House that brings Art and Gambling to Coexistence. Win and Earn* vide variety of Prizes; Money,Crypto, NFT Art and Real life Benefits* ( such as Tickets to Exclusive Events, Travel Packages etc.)
            </p>
            <div className="flex flex-row bg-secondary py-2">
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
          <div className="flex text-primary-light justify-center">
            <span>V.1</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-10 md:pt-24" id="about">
        <div className="flex flex-row">
          <div className="flex flex-col max-w-md">
            <div className="uppercase text-primary text-right">about</div>
            <div className="border-l-2 border-primary">
              <div className="uppercase text-primary text-4xl font-bajt font-extrabold italic">blockchain<br /> bonansa</div>
              <p className="text-primary-light">Our First Game is called Blockchain Bonanza;. Programmatically generated NFT that will take 10.000 spins on XXX Date and bring Valuable Prizes.</p>
            </div>
          </div>
          <div>
            <img src="/bitcoin.png" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-10 md:pt-24 prize-list" id="prizelist">
        <div className="w-1/2">
          <div className="text-2xl tracking-wider text-primary font-bajt italic font-extrabold md:text-4xl uppercase text-right">
            price list
          </div>
          <PriceTable
            header={priceHeaderData}
            data={priceData}
          />
        </div>
      </div>

      <div className="flex justify-center" id="roadmap">
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
          <div className="grid grid-cols-3 gap-4 mt-12 md:grid-cols-3 md:gap-4 lg:gap-12 place-items-stretch">
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

      <div className="flex pt-10 md:pt-24 justify-center">
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="uppercase text-primary text-4xl font-bajt font-extrabold italic">showroom</div>
          <p className="text-primary-light">
            sed nec, sit eiusmod dolor lacus. ipsum a vulputate id aute gravida. nec nibh a nullam felis pellentesque duis est nullam orci aliquam ligula aliquam cupidatat pretium et duis lacus. proident, sed nec, sit eiusmod dolor lacus. ipsum a vulputate id aute gravida. nec nibh a nullam felis pellentesque duis est nullam orci aliquam ligula aliquam cupidatat pretium et duis lacus. proident,
          </p>
        </div>
      </div>

      <div className="w-full showroom">
      </div>

      <div className="py-8 md:py-20 bg-secondary" id="faq">
        <div className="flex flex-row container mx-auto text-left">
          <div className="text-4xl tracking-wider font-bajt text-primary faq-title">
            FAQ
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
