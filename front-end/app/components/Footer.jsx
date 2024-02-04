import React from 'react'
import Link from 'next/link'
import { AiOutlineGithub } from 'react-icons/ai'

const Footer = () => {
  const githubRepo = 'https://github.com/LucasKnezevich/tx_dwgs'

  return (
    <>
      <div className="footer-container">
        <Link href={githubRepo} target='blank'>
          <AiOutlineGithub
            className='footer-icon'
          />
        </Link>
      </div>
    </>
  )
}

export default Footer
