import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
// import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css' 
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('') 
  const [blogAuthor, setBlogAuthor] = useState('') 
  const [blogUrl, setBlogUrl] = useState('') 

  const [newBlogVisible, setNewBlogVisible] = useState(false)
  
  //init blogs on page with useEffect - update to async/await?
  useEffect(() => {
      blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

//   add useEffect for local storage
  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON){
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
      }
  }, [])

  //add handleLogin to send form
  const handleLogin = async (event) => {
      event.preventDefault()
      try {
          const user = await loginService.login({
              username, password,
          })

          window.localStorage.setItem(
              'loggedBlogUser', JSON.stringify(user)
          )

          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch(exception) {
          errorContent('Wrong username or password')
        //   setTimeout(() => {
        //     setErrorMessage(null)
        //   }, 5000)
      }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const showBlogs = () => blogs.map(blog =>
    <Blog
        key={blog.id}
        blog={blog}
        //requires author and title?
    />
    )

    // const blogFormRef = React.createRef()

  const blogForm = () => {
    const hideWhenVisible = {display: newBlogVisible ? 'none' : ''}
    const showWhenVisible = {display: newBlogVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>Add Blog</button>
        </div>
        <div style={showWhenVisible}>
        <CreateBlog 
            addBlog={addBlog}
            blogTitle={blogTitle}
            setBlogTitle={setBlogTitle}
            blogAuthor={blogAuthor}
            setBlogAuthor={setBlogAuthor}
            blogUrl={blogUrl}
            setBlogUrl={setBlogUrl}
        />
        <button onClick={() => setNewBlogVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (event) => { //need to update to async/await
      event.preventDefault()

      const blogObject = {
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl
      }

      blogService
      .create(blogObject)
      .then(addedBlog => {
          setBlogs(blogs.concat(addedBlog))
          setNewBlog('')
          setBlogTitle('')
          setBlogAuthor('')
          setBlogUrl('')
      })
      successContent(`a new blog ${blogTitle} by ${blogAuthor} added`)
  }
  const errorContent = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const successContent = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000)
  }

if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
	    	/>
      </div>
    )
  }

  return (
   <div>
    <div>
        <h2>Blogs</h2>
        <SuccessNotification message={successMessage}/>
        <p>{user.name} logged in
        <button onClick={handleLogout}>Logout</button>
        </p>
        {/* <Togglable buttonLabel="Add a blog"> */}
          {blogForm()}
        {/* </Togglable> */}
      </div>
      <div>
      {showBlogs()}
      </div>
    </div>
  )
}




export default App;
