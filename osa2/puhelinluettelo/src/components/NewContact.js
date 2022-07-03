import {useState} from 'react'
import contactServices from './../services/contacts'

const NewContact = ({ persons, setPersons, message}) => {
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
              message({message: `number updated`,type: "msg"})
            }).catch(error => {
                message({message: `${newName} was removed`, type: "error"})
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
            message({message:`added new contact ${newEntry.name}`, type: "msg"})
          })
          .catch(error => {
            console.log(error.response.data)
            message({message: error.response.data.error, type: "error"})
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
  
export default NewContact