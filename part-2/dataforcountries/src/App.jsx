import axios from "axios"
import { useState, useEffect } from "react"
import CountryView from "./components/CountryView"

function App() {
  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)


  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
 


    if (namesToShow !== null && namesToShow.length === 1) {
      const capital = namesToShow[0].capital[0]
      const cc = namesToShow[0].cca2.toLowerCase()

      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital},${cc}&APPID=${apiKey}`)
        .then(response => {
          setWeatherData(response.data)
        })
        .catch(error=>{
          console.log("greska",error.response)
        })
    }



    console.log("vreme",weatherData)

 
  }, [searchFilter])







  const namesToShow = searchFilter ? countries.filter((country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase())) : null


  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);


  }

  const countriesToDisplay = () => {

    if (namesToShow === null) {
      return
    }


    if (namesToShow.length > 10) {
      return 'Too many matches, specify another filter'
    }
    else if (namesToShow.length > 1 && namesToShow.length <= 10) {
      return (
        <ul>
          {namesToShow.map((country) => {
            return (
              <li key={country.ccn3}>
                {/* {country.name.common} */}
                <CountryView country={country} />
              </li>
            )

          })}
        </ul>
      )
    }

    else if (namesToShow.length === 1) {
      return (
        namesToShow.map(country => {
          return (
            <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <div>{country.capital[0]}</div>
              <div>Country: {country.area}</div>
              <ul>
                {Object.values(country.languages).map(language => {
                  return (
                    <li key={language}>{language}</li>
                  )
                })}
              </ul>
              <div>
                <img src={`${country.flags.png}`} alt={country.name.common} />{ }
              </div>
              <div>
                Temperature - {weatherData ?weatherData.main.temp - 273.15 :"Loading..."}
              </div>
              <div>
                Wind - {weatherData ?weatherData.wind.speed :"Loading..."}m/s
              </div>
              <div>
                {weatherData ?<img src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`} alt="" /> :"loading"}
              </div>
            </div>
          )
        })
      )
    }
  }

  return (
    <>
      <div>
        find countries <input value={searchFilter} onChange={handleFilterChange} />
      </div>
      <div>
        {countriesToDisplay()}
      </div>
    </>
  )
}

export default App
