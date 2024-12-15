const Filter = ({ filter, handleOnChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleOnChange} />
    </div>
  )
}

export default Filter
