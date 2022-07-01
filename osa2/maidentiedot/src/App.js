import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const WeatherInfo = ({weather}) => {
  if(Object.keys(weather).length === 0){
    return(
      <div>no weather info</div>
    )
  }
  const weatherImg = 'http://openweathermap.org/img/wn/'+
  weather.weather[0].icon+'@2x.png'
  console.log(weatherImg)
  return(
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperatur {Math.round(weather.main.temp-273.15)} celsius</p>
      <p>wind {weather.wind.speed} m/s</p>
      <img src={weatherImg} width="200"></img>
    </div>
  )
}

const Weather = ({ city }) => {
  const [cityData, setCityData] = useState([])
  const [cityWeather, setCityWeather] = useState([])

  const locInfo = 'http://api.openweathermap.org/geo/1.0/direct?q='+
    city+'&limit=1&appid='+ api_key
  useEffect(() => {
    axios
      .get(locInfo)
      .then(response => {
        //console.log('found cities', response.data)
        setCityData(response.data)
      })
  }, [])
  useEffect(() => {
    if(cityData.length===0){
      console.log('no city data')
      return
    }
    //console.log(cityData)
    //console.log('lat',cityData[0].lat)
    const locWeather = 'https://api.openweathermap.org/data/2.5/weather?lat='+
    cityData[0].lat+'&lon='+cityData[0].lon+'&appid='+ api_key
    axios
      .get(locWeather)
      .then(response => {
        console.log('found weather', response.data)
        setCityWeather(response.data)
      })
  }, [cityData.length])

  return (
    <WeatherInfo weather={cityWeather}/>
  )
}

const Country = ({ country }) => {
  const c = country[0]
  let capital = ''
  if ('capital' in c) {
    capital = c.capital[0]
    return (
      <div>
        <h2>{c.name.common}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {c.area} km^2</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(c.languages).map(l =>
            <li key={l}>{l}</li>)}
        </ul>
        <img src={c.flags.png} width="200"></img>
        <Weather city={capital} />
      </div>
    )
  }
  return (
    <div>
      <h2>{c.name.common}</h2>
      <p>Capital: no capital</p>
      <p>Area: {c.area} km^2</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(c.languages).map(l =>
          <li key={l}>{l}</li>)}
      </ul>
      <img src={c.flags.png} width="200"></img>
    </div>
  )
}

const Countries = ({ countries, filter, setNewSearch }) => {
  const showCountry = (name) => {
    setNewSearch(name)
  }
  const matches = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (matches.length > 10) {
    return <div>Too many countries</div>
  }
  if (matches.length > 1) {
    return <div>{
      matches.map(c => <p key={c.name.common}>{c.name.common}
        <button onClick={() => showCountry(c.name.common)}>
          show</button></p>)
    }</div>
  }
  if (matches.length === 1) {
    return <Country country={matches} />
  }
  return (
    <div>
      No countries found :(
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('loading countries')
        setCountries(response.data)
      })
  }, [])
  return (
    <div>
      find countries: <input value={newSearch}
        onChange={handleSearchChange} />
      <Countries countries={countries} filter={newSearch}
        setNewSearch={setNewSearch} />
    </div>
  );
}

export default App;
