require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')


app.use(express.static('dist'))


app.use(express.json())

const morgan = require('morgan')

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :response-time ms - Request Body: :body'))

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)

})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => console.log(error))
})


app.post('/api/persons', (request, response) => {
    const generatedId = Math.floor(Math.random() * 10000)

    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is required'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number is required'
        })
    }

    const existingName = persons.find(person => person.name === body.name)

    if (existingName) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedNote => {
        response.json(savedNote)
    })


})





const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})