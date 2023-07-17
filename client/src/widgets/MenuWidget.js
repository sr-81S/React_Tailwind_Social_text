import React from 'react'

const MenuWidget = () => {
  return (
    <div className='p-6 bg-blue-50 rounded-xl drop-shadow-md mb-4 divide-y divide-slate-800' >
        <h4 className=' mb-2 font-semibold text-[#074FB2] '>Menu</h4>
        <div>
            <ul>
                <li className='flex items-center py-3 mt-2 bg-[#074FB2] text-white rounded-lg hover:bg-emerald-500 transition-all cursor-pointer ' ><i className="fa-solid fa-message text-lg ml-4 mr-4"></i><span className='inline-block font-medium text-base' >Chat Room</span></li>
                <li className='flex items-center py-3 mt-2 bg-[#074FB2] text-white rounded-lg hover:bg-emerald-500 transition-all cursor-pointer ' ><i className="fa-solid fa-code text-lg ml-4 mr-4"></i><span className='inline-block font-medium text-base' >Code Room</span></li>
            </ul>
        </div>
    </div>
  )
}



export default MenuWidget