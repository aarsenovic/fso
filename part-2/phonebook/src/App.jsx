import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNewPhoneNumber = (event) => {
    event.preventDefault();

    if(persons.some(person=>person.name === newName)) {
      alert(`${newName} is already taken`)
      return
    }
  
    const newNameObject = {
      name: newName
    }

    setPersons(persons.concat(newNameObject));
    setNewName('');
  }

  const handleNameChange = (event)=> {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPhoneNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {/* <div>debug {newName}</div> */}
      {persons.map(person=><div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App