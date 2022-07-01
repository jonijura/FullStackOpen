import { useState, useEffect } from 'react'
import axios from 'axios'
import contactServices from './services/contacts'

const Person = ({ ids, persons, setPersons, message }) => {
  const person = persons.filter(p => p.id === ids)[0]//TODO handle exceptions
  const poista = () => {
    if (!window.confirm(`delete contact ${person.name}?`)) return;
    //console.log('poistetaan', person.name)
    contactServices.remove(person.id).then(response => {
      setPersons(
        persons.filter(p => p.id !== ids))//handle exceptions
        message(`${person.name} poistettu`)
    }).catch(error => {
      message(`${person.name} oli jo poistettu`)
      console.log("could not delete beacuse person was not found",person)
      contactServices.getAll().then(response => {
        setPersons(response)
      })
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

const Persons = ({ persons, setPersons, match ,message }) => {
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(match.toLowerCase())
  )
  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <Person key={person.id} ids={person.id} 
          persons={persons} setPersons={setPersons} message={message}/>
        )}
      </tbody>
    </table>
  )
}

const NewContact = ({ persons, setPersons, message, eMessage}) => {
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
            message(`number updated`)
          }).catch(error => {
            eMessage(`${newName} was removed`)
            console.log("could not update beacuse person was not found",newName)
            contactServices.getAll().then(response => {
              setPersons(response)
            })
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
          //console.log(response)
          setPersons(persons.concat(response))
          message(`added new contact ${newEntry.name}`)
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="msg">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage2] = useState(null)
  const [eMessage, setError2] = useState(null)

  const setMessage  = msg=>{
    setTimeout(() => setMessage2(null),2000)
    setMessage2(msg)
  }
  const setError  = msg=>{
    setTimeout(() => setError2(null),2000)
    setError2(msg)
  }

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
      <Notification message={message} />
      <ErrorNotification message={eMessage} />
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <NewContact persons={persons} setPersons={setPersons} message={setMessage} eMessage={setError}/>
      <h2>Numbers</h2>
      <SetSearch newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Persons persons={persons} setPersons={setPersons}
       match={newSearch} message={setMessage}/>
    </div>
  )

}

export default App