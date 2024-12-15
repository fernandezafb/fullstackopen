import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import SearchResult from './components/SearchResult'
import CountryInfo from './components/CountryInfo'
import Countries from './components/Countries'
import countriesService from './services/countries'
import weatherService from './services/weather'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResultMessage, setSearchResultMessage] = useState(null)
  const [lastCountryShown, setLastCountryShown] = useState(null)
  const [lastCountryWeatherData, setLastCountryWeatherData] = useState(null)

  useEffect(() => {
    console.log('Effect: loading countries')
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
      .catch(() => {
        alert('Something went wrong retrieving the list of countries')
      })
  }, [])

  useEffect(() => {
    console.log(`Effect: calling weather API for country ${lastCountryShown}`)
    if (lastCountryShown === null) {
      return
    }

    weatherService
      .getWeather(lastCountryShown.latlng[0], lastCountryShown.latlng[1])
      .then(weather => {
        setSearchResultMessage(
          <CountryInfo 
            country={lastCountryShown} 
            weather={weather} 
          />
        )

        setLastCountryWeatherData(weather)
      })
      .catch(() => {
        alert('Something went wrong retrieving the weather information')
      })
  }, [lastCountryShown])

  const showCountryInfo = (country) => {
    setLastCountryShown({ ...country })
    setSearchResultMessage(
      <CountryInfo country={country} weather={null} />
    )
  }

  /**
  * Method passed to the input 'onChange' event. Sets the 'filter' state
  * each time the method is called triggering a render of the component.
  */
  const handleFilterChange = (event) => {
    let newFilter = event.target.value
    setFilter(newFilter)

    // Case 0: Empty filter
    if (newFilter.length === 0) {
      setSearchResultMessage(null)
      return
    }

    let filteredCountries = countries
      .filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      
    // Case 1: More than 10 countries returned
    if (filteredCountries.length > 10) {
      setSearchResultMessage('Too many matches, specify another filter')
      return
    }

    // Case 2: Between 2 and 10
    if (filteredCountries.length > 1) {
      setSearchResultMessage(
        <Countries
          countries={filteredCountries}
          handleOnClick={showCountryInfo}
        />
      )
      return
    }

    // Case 3: Only 1 country matched
    if (filteredCountries.length === 1) {
      setLastCountryShown({ ...filteredCountries[0] })
      setSearchResultMessage(
        <CountryInfo country={filteredCountries[0]} weather={lastCountryWeatherData} />
      )
      return
    }

    // Case 4: No countries matched
    setSearchResultMessage(null)
  }

  return (
    <div>
      <h2>Countries Info</h2>

      <Filter filter={filter} handleOnChange={handleFilterChange} />
      <SearchResult message={searchResultMessage} />

    </div>
  )
}

export default App
