"use client"

import React from 'react'

const Label = ( { children }) => {
  return (
      <div className="w-fit h-fit px-4 py-0.5 bg-beige-to-black rounded-md">
          <p className="font-anonymous font-bold text-gray text-base md:text-lg">{ children }</p>
      </div>
  )
}

export default Label