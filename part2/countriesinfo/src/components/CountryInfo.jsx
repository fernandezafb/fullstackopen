const CountryInfo = ({ country, weather }) => {
	if (!weather) {
    return <div>Loading weather...</div>;
  }

	return (
		<div>
			<h2>{country.name.common}</h2>
			
			<div>capital: {country.capital}</div>
			<div>area: {country.area}</div>

			<h4>languages:</h4>

			<ul>
				{Object.entries(country.languages).map((info) =>
	 				<li key={info[0]}>{info[1]}</li>
				)}
			</ul>

			{country.coatOfArms?.png && (
				<img src={country.coatOfArms.png} alt="Coat of arms" width="200" />
			)}

			<h4>Weather in {country.name.common}</h4>
			<div>temperature: {weather.main.temp} Celsius</div>
			<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt='weather icon' width="100" />
			<div>wind: {weather.wind.speed} m/s</div>
		</div>
	)
}

export default CountryInfo
