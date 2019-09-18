import React, { useState }  from 'react'
const Blog = ({ blog }) => {

   const [fullBlog, setFullBlog] = useState(false)

   const fullBlogInfo = {display: fullBlog ? "" : "none"}


   //will add like functionality

   const toggleVisibility = () => {
      setFullBlog(!fullBlog);
    };
   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
   }
   // console.log("blog:", blog.user)
   return (
      <div style={blogStyle}>
         <div onClick={() => toggleVisibility()}>
            {blog.title} {blog.author}
         </div>
         <div style={fullBlogInfo} className="fullInfo">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes
          {/* <button onClick={() => handleLike()}>like</button> */}
        </p>
        
        <p>added by {blog.user.username} </p>
        </div>
      </div>
   )  
}


export default Blog