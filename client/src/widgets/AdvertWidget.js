import React from 'react'

const AdvertWidget = () => {
  return (
    <div className='p-6 bg-blue-50 rounded-xl drop-shadow-md' >
      <div className='flex items-center justify-between' >
        <h5 className='font-medium text-[#074FB2] ' >Sponsored</h5>
        <p className=' text-gray-500 '>Create Ad</p>
      </div>
      <img src="https://assets.thehansindia.com/h-upload/2019/09/19/217781-dhoni.webp" alt="adImage" className='w-full h-auto rounded-xl my-[0.75rem]' />
      <div className='flex items-center justify-between mb-1' >
        <p className='text-[#074FB2] ' >Flipkart</p>
        <p className=' text-[#074FB2] underline ' >flipkart.com</p>
      </div>
      <hr />
      <p className='mt-[0.5rem] text-[#074FB2]'> Sale start in 30<sup>th</sup> Sep to 4<sup>th</sup> oct </p>
    </div>
  )
}

export default AdvertWidget