const mongoose = require('mongoose')

// url and mongoose.connect not required as per .env
// const url =
//   `mongodb+srv://iamkiko:${password}@cluster0-ostce.mongodb.net/blog-list?retryWrites=true`
// mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
},
author: {
    type: String,
    required: true
},
url: {
    type: String,
    required: true
},
likes: Number,
  })
  
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog
