import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Parisienne&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

      <Outlet />
    </>
  )
}

export default RootLayout