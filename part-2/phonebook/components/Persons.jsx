const Persons = ({namesToShow, removePerson}) => {

    const personRemoval = (id, name) => {
        if((window.confirm(`Delete ${name}`))) {
            removePerson(id)
        }
    }
    
    return (
    <div>
        {namesToShow.map(person=>
        <div key={person.id}>
            {person.name} {person.number}
            <button onClick={()=>personRemoval(person.id, person.name)}>Delete</button>
        </div>)}
    </div>
    )
}


export default Persons