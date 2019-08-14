const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
    let persons = [
      {
        name: "Bill Gates",
        number: "021 456 8823",
        id: 1
      },
      {
        name: "Alexis Toromanoff ",
        number: "083 442 3328",
        id: 2
      },
      {
        name: "Costas Ioannou",
        number: " 324 442 2123",
        id: 3
      },
      {
        name: "Maria Andreou ",
        number: "434 222 5535",
        id: 4
      }
    ]

    //HOMEPAGE
    app.get('/', (request, response) => {
        response.send('<h1>Hello World!</h1>')
    })
    
    //GET ALL PERSONS
    app.get('/api/persons', (request, response) => {
        response.json(persons)
    })

    app.get('/info', (request, response) => {
    //     const phonebookInfo = {
    //         content: `Phonebook has info for ${persons.length} people`,
    //         date: new Date()
    //     }

    //     response.send({content: phonebookInfo.content, date: phonebookInfo.date})
    // })

        const phonebookInfo = `Phonebook has info for ${persons.length} people 

        ${new Date()}`
        // const date = new Date()
        response.send(phonebookInfo)
    })

    //GET SPECIFIC PERSON
    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)

        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })

    //DELETE
    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(persons => persons.id !== id)
      
        response.status(204).end()
      })
    
      //GENERATING ID function
      const generateId = () => {
        const newId = persons.length > 0
          ? Math.floor(Math.random() * 1000 + 1)
          : 0
    
          return newId
     }
    
      //POST ->  ADDING
      app.post('/api/persons', (request, response) => {
          const body = request.body

          console.log(body.name)
          // const exists = body.includes(body.name)
          if(!body.name || !body.number) { // if empty
              return response.status(400).json({
                  error: 'please include name and number'
              })
         }   
          else if(persons.map(person => person.name).includes(body.name)) { //if duplicate name
            return response.status(400).json({
                error: 'name must be unique'
            })
          }

          const person = {
              name: body.name,
              number: body.number,
              id: generateId(),
          }

          persons = persons.concat(person)

          response.json(person) //response.json(body)?
      })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)