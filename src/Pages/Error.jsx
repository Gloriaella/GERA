import React from 'react'
import { Link } from 'react-router-dom'
import Errorgif from "../assets/404 Error.gif"
import { RiArrowLeftFill } from 'react-icons/ri'

const Error = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <img src={Errorgif} alt="" className="w-full h-80 object-contain" />
      <Link to={"/"} className='flex text-2xl gap-2'> <RiArrowLeftFill className='mt-1.5 text-2xl'/> Back </Link>
    </div>
  )
}

export default Error
