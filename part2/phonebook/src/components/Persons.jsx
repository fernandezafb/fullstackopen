const Person = ({ person, onClick }) => (
  <div>
    <span>{person.name} {person.number}</span>
    <button onClick={() => onClick(person)}>delete</button>
  </div>
)

const Persons = ({ persons, handleRemoveOnClick}) =>
  persons.map(person =>
    <Person 
      key={person.name}
      person={person}
      onClick={handleRemoveOnClick}
    />
  )

export default Persons