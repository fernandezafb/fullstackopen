import axios from 'axios'

const url = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lng) => {
 return axios
	.get(url, {
		params: { 
			lat: lat,
			lon: lng,
			units: 'metric',
			appId: import.meta.env.VITE_WEATHER_API_KEY
		}
	})
	.then(response => response.data)
}

export default { getWeather }
