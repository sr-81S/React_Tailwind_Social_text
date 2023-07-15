import React, { useEffect, useState } from 'react'
import PostWidget from './PostWidget'


let mount = false;

const PostsWidgets = ({userName,postDescription,postUserId}) => {

  const [postUserImg, setpostUserImg] = useState('')

  const data = sessionStorage.getItem("token");


  const userData = async()=>{
    const userDatas = await fetch(`http://localhost:4000/api/getuser/${postUserId}`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `${data}`,
      },
      mode: "cors"
    })

   const finaldata =  await userDatas.json()

   const {picture} = finaldata;
    console.log("pic is here");
    // console.log(picture);
    setpostUserImg(picture)
  }
  
  useEffect(() => {
    if(mount){
      userData();
     }
     mount = true;
      return ()=>{
          // cleanup function
      }
  
  }, [])
  
 
  return (
    <div >
     <PostWidget postUserPic={postUserImg} name={userName} description={postDescription} />
    </div>
  )
}

export default PostsWidgets