import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log("Running effect")
    personsService
    .getAll()
    .then(persons => {
      console.log('Promise fulfilled')
      setPersons(persons)
    })
    .catch(() => {
      alert('Something went wrong retrieving the list of persons')
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    let person = persons.find(person => person.name === newName)

    if (person !== undefined) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        return     
      }
      
      personsService
        .update({ id: person.id, name: person.name, number: newNumber})
        .then(updatedPerson => {
          setPersons(persons
            .map(person =>
              person.id === updatedPerson.id ? updatedPerson : person
          ))
          setNewName('')
          setNewNumber('')

          setNotificationMessage(`${person.name} updated successfully`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(() => {
          alert(`Something went wrong updating person: ${person.name}`)
        })

        return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')

        setNotificationMessage(`${newPerson.name} created successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(() => {
			  alert('Something went wrong creating a new person')
      })
  }

  const removePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personsService
      .remove(person.id)
      .then(removedPerson => {
        setPersons(
          persons.filter(person => person.id != removedPerson.id)
        )
      })
      .catch(() => {
        setErrorMessage(`Information of ${person.name} has already been removed from the database`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      <Filter filter={filter} handleOnChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={addPerson}
        handleNameOnChange={handleNameChange}
        handleNumberOnChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />

      <h3>Numbers</h3>

      <Persons
        persons={filteredPersons}
        handleRemoveOnClick={removePerson} 
      />
    </div>
  )
}

export default App