import React from 'react'
import Image from 'next/image'
import logo from 'public/images/Snohomish_County_Public_Utility_District_logo.svg'
import Dropdown from './Dropdown'

const Header = () => {
  return (
    <header className='header'>
    <div className='image-container'>
      <Image
        src={logo}
        width={200}
        height={110}
        alt='Snohomish PUD Logo'
        priority
        className='header-image'
      />
      </div>
      <Dropdown />
      <h1 className='header-title'>Transmission Drawings</h1>
      <h3 className="header-demo-text">Demo</h3>
    </header>
  )
}

export default Header
