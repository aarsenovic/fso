import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import personService from './services/persons'
import Notification from '../components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

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
      if ((window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        personService
          .updatePerson(existingName.id, newNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === existingName.id ? returnedPerson : p))
            setNewName('');
            setNewNumber('');
            setMessage(`${newName} number changed`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setError(true)
            setPersons(persons.filter(n=>n.id !== existingName.id))
            setTimeout(()=>{
              setError(false)
              setMessage(null)
            }, 5000)
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
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setError(true)
          setMessage(error.response.data.error)
          setTimeout(()=> {
            setMessage(null)
            setError(false)
          }, 5000)
        }

        )


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
      <Notification message={message} error={error}/>

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