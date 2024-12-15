const Filter = ({ filter, handleOnChange }) => {
  return (
    <div>
      find countries: <input value={filter} onChange={handleOnChange} />
    </div>
  )
}

export default Filter
