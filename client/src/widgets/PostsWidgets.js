import React from 'react'
import PostWidget from './PostWidget'

const PostsWidgets = ({userName,postDescription}) => {

  
 
  return (
    <div >
     <PostWidget name={userName} description={postDescription} />
    </div>
  )
}

export default PostsWidgets