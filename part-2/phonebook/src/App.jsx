import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })




  }, [])


  const addNewPhoneNumber = (event) => {
    event.preventDefault();


    const newNameObject = {
      name: newName,
      number: newNumber
    }


    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      const person = persons.find(p => p.name === newName)
      if ((window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        personService
          .updatePerson(person.id, newNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            setNewName('');
            setNewNumber('');
          })
      }
    }

    else {
      personService
        .create(newNameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
        })
    }


  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  const namesToShow = searchFilter ? persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase())) : persons

  const removePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(prev =>
          prev.filter(person => person.id !== id)
        )
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange} />

      <h2>Add new</h2>
      <PersonForm onSubmit={addNewPhoneNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      ...
      {/* <div>debug {newName}</div> */}
      {/* {namesToShow.map(person=><div key={person.name}>{person.name} {person.number}</div>)} */}
      <Persons namesToShow={namesToShow} removePerson={removePerson} />
    </div>
  )
}

export default App