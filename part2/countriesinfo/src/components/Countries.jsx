const Country = ({ country, handleOnClick }) =>
	<div>
    <span>{country.name.common}</span>
    <button onClick={() => handleOnClick(country)}>show</button>
  </div>


const Countries = ({ countries, handleOnClick }) =>
	countries.map(country =>
		<Country
			key={country.name.common}
			country={country}
			handleOnClick={handleOnClick}
		/>
	)

export default Countries