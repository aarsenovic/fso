import { useState} from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')




  const addNewPhoneNumber = (event) => {
    event.preventDefault();

    if(persons.some(person=>person.name === newName)) {
      alert(`${newName} is already taken`)
      return
    }
  
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newNameObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event)=> {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  const namesToShow = searchFilter ?persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase())) :persons 

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add new</h2>
      <PersonForm onSubmit={addNewPhoneNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      ...
      {/* <div>debug {newName}</div> */}
      {/* {namesToShow.map(person=><div key={person.name}>{person.name} {person.number}</div>)} */}
      <Persons namesToShow={namesToShow}/>
    </div>
  )
}

export default App