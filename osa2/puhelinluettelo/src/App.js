import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({ persons, match }) => {
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(match.toLowerCase())
  )
  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const NewContact = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(d => d.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newEntry = {
        name: newName,
        number: newNumber,
        visible: true
      }
      setPersons(persons.concat(newEntry))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return(
  <form onSubmit={addName}>
    <div>
      name: <input value={newName}
        onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber}
        onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const SetSearch = ({newSearch, handleSearchChange}) => {
  return(
  <div>
  search: <input value={newSearch}
    onChange={handleSearchChange} />
</div>
)}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <NewContact persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <SetSearch newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <Persons persons={persons} match={newSearch} />
    </div>
  )

}

export default App