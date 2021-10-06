import Layout from "@components/layout/Layout/Layout"
import * as React from "react"
import "./comingsoon.scss"

const icons = [
  { icon: '/icon/icon-discord.svg', link: "https://discord.gg/cryptowhaleclub" },
  { icon: '/icon/icon-twitter.svg', link: "https://twitter.com/CryptoWhaleClub" },
]

// markup
const PageComingSoon = () => (
  <div className="comingsoon-bg w-full h-screen">
    <div className="flex flex-row justify-center">
      <img src="/comingsoon-content.png" className="py-40 px-5" />
    </div>
    <div className="flex justify-center items-center mt-8">
      <ul className="flex space-x-4">
        {icons.map((dt, idx) => {
          return (
            <a href={dt.link} target="_blank" rel="noreferrer" key={idx}>
              <img src={dt.icon} alt="" className="mx-4 w-12 sm:w-20 h-12 sm:h-20" />
            </a>
          )
        })}
      </ul>
    </div>
  </div>
)

export default PageComingSoon
