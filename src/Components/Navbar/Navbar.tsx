import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <Link to="/">
      <div className='bg-red-500 py-5'>Navbar</div>
    </Link>
  )
}

export default Navbar