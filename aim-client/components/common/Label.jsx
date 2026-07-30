"use client"

import React from 'react'

const Label = ( { children }) => {
  return (
      <div className="w-fit h-fit">
          <p className="font-anonymous font-bold text-secondary text-base md:text-lg underline underline-offset-4 underline-secondary">{ children }</p>
      </div>
  )
}

export default Label