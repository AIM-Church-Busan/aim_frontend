"use client"

import React from 'react'

const Label = ( { children }) => {
  return (
      <div className="w-fit h-fit px-6 py-2 bg-foreground rounded-md">
          <p className="font-anonymous font-bold text-primary text-base md:text-lg">{ children }</p>
      </div>
  )
}

export default Label