import { useState, useEffect } from 'react'
import axios from 'axios'
import contactServices from './services/contacts'

const Person = ({ ids, persons, setPersons }) => {
  const person = persons.filter(p => p.id === ids)[0]//TODO handle exceptions
  const poista = () => {
    if (!window.confirm(`delete contact ${person.name}?`)) return;
    console.log('poistetaan', person.name)
    contactServices.remove(person.id).then(response => {
      setPersons(
        persons.filter(p => p.id !== ids))//handle exceptions
    })
  }
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={poista}>delete</button></td>
    </tr>
  )
}

const Persons = ({ persons, setPersons, match }) => {
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(match.toLowerCase())
  )
  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <Person key={person.id} ids={person.id} persons={persons} setPersons={setPersons} />
        )}
      </tbody>
    </table>
  )
}

const NewContact = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const sameName = persons.filter(d => d.name === newName);
    if (sameName.length > 0) {
      if (!window.confirm(`
      ${newName} has already been added, update number?`)) return;
      else {
        const updatedEntry = { ...sameName[0], number: newNumber }
        contactServices.replace(sameName[0].id, updatedEntry)
          .then(response => {
            setPersons(
              persons.map(p => p.id === sameName[0].id ? updatedEntry : p))
          })
      }
    }
    else {
      const newEntry = {
        name: newName,
        number: newNumber
      }
      contactServices.create(newEntry)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
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

const SetSearch = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      search: <input value={newSearch}
        onChange={handleSearchChange} />
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    contactServices.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <NewContact persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <SetSearch newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Persons persons={persons} setPersons={setPersons} match={newSearch} />
    </div>
  )

}

export default App