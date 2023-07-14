import React, { useEffect, useState } from 'react'
import profileImage from '../assets/profile.jpg'
import PostsWidgets from './PostsWidgets';
import { toast } from 'react-toastify';





const MyPostWidget = ({userId, name}) => {

  const [description, setDescription] = useState()
  const [allPosts, setallPosts] = useState()

  useEffect(() => {
    
      getAllPosts()
     
  }, [])
  

  const data = sessionStorage.getItem("token");

  const createPost = async()=>{
    
     console.log(JSON.stringify({name:name, userId: userId, description:description}));

    const responce = await fetch('http://localhost:4000/api/post',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${data}`,
    },
    body: JSON.stringify({name:name, userId: userId, description:description})
    })

    const posts = await responce.json();

    setDescription('')

    const afterReverse = posts.reverse();


    setallPosts(afterReverse)

    toast.success('🦄 Wow so easy!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    console.log("Posts objects");
    console.log(posts);

  }

  const getAllPosts = async ()=>{
    
      const responce = await fetch('http://localhost:4000/api/allpost',{
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`${data}`
        }
      })

      const getPosts = await responce.json()

      const assendPost = getPosts.reverse();

      setallPosts(assendPost);
  }


  return (
    <>
      <div className='p-6 bg-blue-50 rounded-xl drop-shadow-md ' >
      <div className="flex items-center justify-between gap-4 mb-3" >
        <div className='w-[60px] h-[60px]  '>
          <img className=' w-[60px] rounded-[50%] object-cover ' src={profileImage} alt="ProfileImage" />
        </div>
        <div className=' p-[1rem] w-[100%] border-solid border-[1px] border-[#074FB2] rounded-3xl ' >
          <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-[100%] bg-inherit focus:outline-none ' type="text" name="description" placeholder="What's on your mind... "  id="description" />
        </div>
      </div>
      <hr />
      <div className=' flex items-center justify-between mt-2 ' >
        <div className="flex items-center justify-between gap-1 text-[#074FB2] cursor-pointer hover:text-emerald-500 transition-all" >
          <i className="fa-solid fa-image"></i>
          <p>Image</p>
        </div>
        <div className="flex items-center justify-between gap-1 text-[#074FB2] cursor-pointer hover:text-emerald-500 transition-all" >
          <i className="fa-solid fa-film"></i>
          <p>Video</p>
        </div>
        <div className="flex items-center justify-between gap-1 text-[#074FB2] cursor-pointer hover:text-emerald-500 transition-all" >
          <i className="fa-solid fa-paperclip"></i>
          <p>Attachment</p>
        </div>
        <div className="flex items-center justify-between gap-1 text-[#074FB2] cursor-pointer hover:text-emerald-500 transition-all" >
          <i className="fa-solid fa-microphone"></i>
          <p>Audio</p>
        </div>
        <button onClick={createPost} className=' px-4 py-1 bg-[#074FB2] rounded-lg font-medium text-white cursor-pointer hover:bg-emerald-500 transition-all' >
          Post
        </button>
      </div>
    </div>
    <div>
      {
        !allPosts?(<></>):(allPosts.map((value, index)=>{
          return(
            <>
              <PostsWidgets
                key={index}
                userName ={value.name}
                postDescription ={value.description}
              />
            </>
          )
        }))
      }
    </div>
    </>
  )
}

export default MyPostWidget