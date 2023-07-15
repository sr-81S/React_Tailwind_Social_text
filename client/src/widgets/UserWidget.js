import React from 'react'
import twitter from "../assets/twitter.png"
import linkedin from "../assets/linkedin.png"
import { useNavigate } from 'react-router-dom'

const UserWidget = ({username, profile}) => {

  const navigate = useNavigate()

  const capName = username
  const logout = ()=>{
        sessionStorage.clear();
        navigate('/');
    }

  return (
    <div className='p-6 bg-blue-50 rounded-xl drop-shadow-md '>
      <div className='flex items-center justify-between gap-[1rem] pb-[1.1rem] ' >
        <div className='flex items-center justify-between gap-[1rem] cursor-pointer' >
          <div className=' h-[60px] w-[60px] ' >
            <img className=' h-[60px] w-[60px] rounded-[50%] object-cover '  src={profile} alt="profileImageIcon" />
          </div>
          <div>
            <h4 className=' font-medium text-lg text-[#074FB2] hover:text-teal-600  ' > {username} </h4>
            <p className='font-normal text-sm text-[#074FB2]' >@{capName} </p>
          </div>
        </div>
        <i onClick={logout} className="fa-solid fa-right-from-bracket text-2xl text-[#074FB2] cursor-pointer hover:text-red-500 transition-all "></i>
      </div>
      <hr />
      <div>
        <div className=' py-4 ' >
          <p className=' font-medium text-base mb-4 text-[#074FB2] ' >Social Networks</p>
          <div className='flex items-center justify-between gap-[1rem] mb-2 ' >
            <div className='flex items-center justify-between gap-4' >
                <img className='cursor-pointer' src={twitter} alt="TwitterIcon" />
                <div>
                  <p className=' font-medium text-[#074FB2] cursor-pointer ' > Twitter </p>
                </div>
            </div>
            <i className="fa-solid fa-pen text-lg text-[#074FB2] cursor-pointer "></i>
          </div>
          <div className='flex items-center justify-between gap-[1rem] mb-2 ' >
            <div className='flex items-center justify-between gap-4' >
                <img className='cursor-pointer' src={linkedin} alt="TwitterIcon" />
                <div>
                <p className=' font-medium text-[#074FB2] cursor-pointer ' > LinkedIn </p>
                </div>
            </div>
            <i className="fa-solid fa-pen text-lg text-[#074FB2] cursor-pointer "></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserWidget


