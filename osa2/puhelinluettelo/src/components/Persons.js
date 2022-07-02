import contactServices from './../services/contacts'

const Person = ({ person, persons, setPersons, message }) => {
    const poista = () => {
      if (!window.confirm(`delete contact ${person.name}?`)) return;
      //console.log('poistetaan', person.name)
      contactServices.remove(person.id).then(response => {
        setPersons(
          persons.filter(p => p.id !== person.id))//handle exceptions
          message({message:`${person.name} has been removed`, type:"msg"})
      }).catch(error => {
        message({message: `${person.name} was already removed`, type: "msg"})
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
            <Person key={person.id} person={person} 
            persons={persons} setPersons={setPersons} message={message}/>
          )}
        </tbody>
      </table>
    )
  }

  export default Persons