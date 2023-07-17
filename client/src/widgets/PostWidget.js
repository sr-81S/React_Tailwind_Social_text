import React from 'react'


const PostWidget = ({name,description,postUserPic,pictures}) => {
  return (
    <div className='p-6 bg-blue-50 rounded-xl my-4 drop-shadow-md ' >
        <div className='flex items-center justify-between' >
          <div className='flex items-center justify-between gap-2' >
              <div className='w-[60px] h-[60px] rounded-[50%] overflow-hidden' >
                <img className='w-[60px] h-[60px] object-cover ' src={postUserPic} alt="ProfilePicture" />
              </div>
              <div>
                <h4 className=' font-medium text-[#074FB2] ' > {name} </h4>
                <p className=' font-light text-[#074FB2] ' >Bhubaneswar, Odisha</p>
              </div>
          </div>
          <i className="fa-solid fa-ellipsis text-xl text-[#074FB2] cursor-pointer " ></i>
        </div>
        <div className=' my-3 ' >
          <p className='text-[#074FB2] font-medium ml-4' > {description} </p>
        </div>
        {
          pictures?(<div className='flex justify-center items-center overflow-hidden rounded-2xl mb-3' >
          <img src={pictures} alt="PostPictureFromDB"  />
        </div>):(<></>)
        }
        <hr />
        <div className='flex items-center justify-between mt-3' >
          <div className='flex items-center justify-between gap-4' >
          <i className="fa-regular fa-heart text-red-700 text-xl"></i>
          <i className="fa-regular fa-message text-lg text-[#074FB2] "></i>
          <i className="fa-regular fa-paper-plane text-lg text-[#074FB2] "></i>
          </div>
          <i className="fa-regular fa-bookmark text-xl text-[#074FB2] "></i>
        </div>
    </div>
  )
}

export default PostWidget


