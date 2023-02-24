require("dotenv").config();
require("./mongo");
const Person = require("./models/Person");

const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.static("dist"));

app.use(express.json());
morgan.token("payload", function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);
/*
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
      

*/

app.get("/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response, next) => {

  Person.estimatedDocumentCount({}).then( 
    (count) => {
    const message =  `<p>The phonebook has ${count} contacts</p>
                        <p>${new Date()}</p>`
                      response.send(message)
    }
  ).catch(error => next(error))
  

 
});

app.get("/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((personGuardada) => {
      response.json(personGuardada.toJSON());
    })
    .catch((error) => next(error));
}); 


app.put("/persons/:id" , (request, response, next) =>  { 
  const body = request.body

  const person = {
    name: body.name, 
    number: body.number
  } 

  const id = request.params.id

  Person.findByIdAndUpdate(id, person, {new: true})
  .then(updatePerson => {
    response.json(updatePerson)
  })
  .catch(error => next(error))


}) 


const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
