import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '064 918 0691'
     }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPhoneNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {/* <div>debug {newName}</div> */}
      {persons.map(person=><div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App