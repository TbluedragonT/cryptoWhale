import React, { useState } from "react"
import ReactCardFlip from "react-card-flip"

export default function TeamCard({ image, name, role, description }) {
  const [isFlipped, setFlipped] = useState(false)
  const handleClick = e => {
    e.preventDefault()
    setFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      infinite={true}
    >
      <div
        className="h-[280px] min-h-[280px] w-[280px] min-w-[280px] flex flex-col bg-primary-light rounded-2xl items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={image}
          className="my-4 md:my-8 w-20 h-20 md:w-32 md:h-32 object-contain rounded-full"
        />
        <p className="text-secondary text-2xl md:text-3xl font-recoleta-bold py-2">
          {name}
        </p>
        <p className="text-secondary text-base md:text-xl">{role}</p>
      </div>
      <div
        className="h-[280px] min-h-[280px] w-[280px] min-w-[280px] flex flex-col bg-secondary text-black text-2xl rounded-2xl items-center justify-center cursor-pointer p-2 px-4"
        onClick={handleClick}
      >
        {description}
      </div>
    </ReactCardFlip>
  )
}
