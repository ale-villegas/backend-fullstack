const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token("payload", function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))

let persons = [
    
       
          { 
            "name": "Arto Hellas", 
            "number": "040-123456",
            "id": 1
          },
          { 
            "name": "Ada Lovelace", 
            "number": "39-44-5323523",
            "id": 2
          },
          { 
            "name": "Dan Abramov", 
            "number": "12-43-234345",
            "id": 3
          },
          { 
            "name": "Mary Poppendieck", 
            "number": "39-23-6423122",
            "id": 4
          }
        ]
      



        app.get('/', (request, response) => {
          response.send(" <h1>HOLAA</h1>  ")
        })
        

app.get('/persons', (request, response) => {
  response.json(persons)
})


app.get("/info", (request, response) => {
   
    response.send( ` <p>the phonebook has ${persons.length} persons <br/> ${new Date}  </p> `)
   
    
})


app.get("/persons/:id", (request, response) => {
    const id =  Number(request.params.id)
    const person = persons.find((person) => person.id === id); 

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }

})

app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generarId = () => {
    return Math.floor(Math.random() * 1000)
  }


  app.post("/persons", (request, response) => {

    const body = request.body 
    console.log(body)

    if (!body.name) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
const person =  {
    name: body.name, 
    number: body.number, 
    id: generarId()
}

persons = persons.concat(person)

response.json(person)
   
    
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})