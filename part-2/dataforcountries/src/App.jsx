import axios from "axios"
import { useState, useEffect } from "react"
import CountryView from "./components/CountryView"

function App() {
  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


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
    else if (namesToShow.length>1 &&  namesToShow.length <= 10) {
      return (
        <ul>
          {namesToShow.map((country) => {
            return (
              <li key={country.ccn3}>
                {/* {country.name.common} */}
                <CountryView country={country}/>
              </li>
            )

          })}
        </ul>
      )
    }

    else if (namesToShow.length === 1) {
      return (
      namesToShow.map(country=>{
        return (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <div>{country.capital[0]}</div>
            <div>Country: {country.area}</div>
            <ul>
              {Object.values(country.languages).map(language=>{
                return(
                  <li key={language}>{language}</li>
                )
              })}
            </ul>
            <div>
              <img src={`${country.flags.png}`} alt={country.name.common} />{}
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
