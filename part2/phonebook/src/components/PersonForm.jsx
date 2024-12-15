const PersonForm = (
  {
	handleSubmit,
	handleNameOnChange,
	handleNumberOnChange,
	newName, 
	newNumber
  }) => {
  return (
    <form onSubmit={handleSubmit}> 
      <div>
        name: <input value={newName} onChange={handleNameOnChange}/>
        <br />
        number: <input value={newNumber} onChange={handleNumberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
