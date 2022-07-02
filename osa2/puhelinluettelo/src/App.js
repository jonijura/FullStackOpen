import { useState, useEffect } from 'react'
import contactServices from './services/contacts'
import Persons from './components/Persons'
import NewContact from './components/NewContact'

const SetSearch = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      search: <input value={newSearch}
        onChange={handleSearchChange} />
    </div>
  )
}

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessageDef] = useState(null)

  const setMessage  = msg=>{
    setTimeout(() => setMessageDef(null),2000)
    setMessageDef({
      message: msg.message,
      type: msg.type
    })
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
      <Notification message={message}/>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <NewContact persons={persons} setPersons={setPersons} message={setMessage}/>
      <h2>Numbers</h2>
      <SetSearch newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Persons persons={persons} setPersons={setPersons}
       match={newSearch} message={setMessage}/>
    </div>
  )

}

export default App