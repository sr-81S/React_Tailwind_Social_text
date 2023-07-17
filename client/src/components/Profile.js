import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import UserWidget from '../widgets/UserWidget';

import AdvertWidget from '../widgets/AdvertWidget';

// import PostsWidgets from '../widgets/PostsWidgets';
import MyPostWidget from '../widgets/MyPostWidget';
import MenuWidget from '../widgets/MenuWidget';



let mount = false;


const Profile = () => {

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [profiePic, setProfiePic] = useState('')


    const navigate = useNavigate()

    const data = sessionStorage.getItem("token");

    useEffect(() => {
      
       if(mount){
        getAuthData();
        
       }

       mount = true;

        return ()=>{
            // cleanup function
        }
    
    }, [])
    





    const getAuthData = async()=>{
        if(!data){
            toast.warn('please login first', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
           navigate('/'); 
        }else{
            try {
                const responce = await fetch('http://localhost:4000/api/profile',{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${data}`,
                    },
                    mode: "cors"
                })

                const responceData = await responce.json();
                
                console.log(responceData);
                const {_id, name, picture} = responceData;
                setProfiePic(picture)
                setUserId(_id)
                setUserName(name)
                
            } catch (error) {
                toast.error('server login error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                navigate('/')
            }
        }
    }

    // const logout = ()=>{
    //     sessionStorage.clear();
    //     navigate('/');
    // }




  return (
    <div className='w-full px-[6%] py-[2rem] flex gap-[0.5rem] justify-between relative'>
        <div className=' fixed w-[21%] '>
            <UserWidget username={userName} profile={profiePic} />
        </div>
        <div className='basis-[42%] ml-[28%] '>
            <MyPostWidget userId={userId} name={userName} profile={profiePic} />
            {/* <PostsWidgets/> */}
        </div>
        <div className='basis-[26%]'>
            <MenuWidget/>
            <AdvertWidget/>
        </div>
    </div>
  )
}

export default Profile