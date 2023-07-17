import React, { useEffect, useState } from 'react'
import PostsWidgets from './PostsWidgets';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer'




const MyPostWidget = ({userId, name, profile}) => {

  const [description, setDescription] = useState()
  const [allPosts, setallPosts] = useState()
  const [imgToggle, setImgToggle] = useState(false)
  const [postPicture, setPostPicture] = useState('')

  useEffect(() => {
    
      getAllPosts()
     
  }, [])
  

  const data = sessionStorage.getItem("token");

  const handelPostPic = async(e)=>{
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      setPostPicture(image)
    } catch (err) {
      console.log(err);
    }

    //full size image upload
    // const file = e.target.files[0];
    //     if(file){
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file)
    //         reader.onloadend = ()=>{
    //             console.log(reader.result);
    //             setPostPicture(reader.result)
    //         }
    //     }
  }



  //post image resizer
  const resizeFile = (file) =>
  new Promise((resolve) => {
       Resizer.imageFileResizer(
          file,
          800,
          1280,
          "JPEG",
          500,
          0,
      (uri) => {
          resolve(uri);
      },
      "base64"
  );
});

  const createPost = async()=>{
    
     console.log(JSON.stringify({name:name, userId: userId, description:description}));

    const responce = await fetch('http://localhost:4000/api/post',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${data}`,
    },
    body: JSON.stringify({name:name, userId: userId, description:description, postPicture: postPicture})
    })

    const posts = await responce.json();

    setDescription('')
    setPostPicture('')
    setImgToggle(false)

    const afterReverse = posts.reverse();


    setallPosts(afterReverse)

    toast.success('New Post Posted', {
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



      console.log(assendPost);

      setallPosts(assendPost);
     

    }





  //handel handelTogleImage for image post in feeds

  const handelTogleImage =()=>{
    if(imgToggle === false){
      setImgToggle(true)
    }else{
      setImgToggle(false)
    }
  }


  return (
    <>
      <div className='p-6 bg-blue-50 rounded-xl drop-shadow-md ' >
      <div className="flex items-center justify-between gap-4 mb-3" >
        <div className='w-[60px] h-[60px]  '>
          <img className='w-[60px] h-[60px] rounded-[50%] object-cover ' src={profile} alt="ProfileImage" />
        </div>
        <div className=' p-[1rem] w-[90%] border-solid border-[1px] border-[#074FB2] rounded-3xl ' >
          <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-[100%] bg-inherit focus:outline-none ' type="text" name="description" placeholder="What's on your mind... "  id="description" />
        </div>
      </div>
      <hr />
      <div className=' flex items-center justify-between mt-2 ' >
        <div className="flex items-center justify-between gap-1 text-[#074FB2] cursor-pointer hover:text-emerald-500 transition-all" onClick={handelTogleImage} >
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
      {imgToggle?(<div className='mt-4 flex items-center gap-3' >
        <label className="ml-1 text-zinc-500" htmlFor="profile">Choose a Picture</label>
        <input className='ml-1' type="file" name="prfile" onChange={handelPostPic} accept="image/jpg, image/jpeg" />
      </div>):(<></>)}
    </div>
    <div>
      {
        !allPosts?(<></>):(allPosts.map((value, index)=>{
          return(
            <>
              <PostsWidgets
                key={value._id}
                postID = {value._id}
                userName ={value.name}
                postDescription ={value.description}
                postUserId={value.userId}
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