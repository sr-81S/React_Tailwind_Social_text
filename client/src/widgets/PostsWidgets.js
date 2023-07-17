import React, { useEffect, useState } from 'react'
import PostWidget from './PostWidget'


let mount = false;

const PostsWidgets = ({userName,postDescription,postUserId,postID}) => {

  const [postUserImg, setpostUserImg] = useState('')
  const [postPic, setPostPic] = useState('')

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
  
  //single post by post id

  const singlePost = async()=>{
    const posts = await fetch(`http://localhost:4000/api/getpost/${postID}`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `${data}`,
      },
      mode: "cors"
    })

    const finalPost = await posts.json()

    const {postPicture} = finalPost

    setPostPic(postPicture)

  }

  useEffect(() => {
    if(mount){
      userData();
      singlePost();
     }
     mount = true;
      return ()=>{
          // cleanup function
      }
  
  }, [])
 
  console.log(postID);
 
  return (
    <div >
     <PostWidget postUserPic={postUserImg} name={userName} description={postDescription} pictures={postPic} />
    </div>
  )
}

export default PostsWidgets