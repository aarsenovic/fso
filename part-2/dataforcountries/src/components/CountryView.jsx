import { useState } from "react";

function CountryView({ country }) {
    const [active, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(prev => !prev)
    }

    return (
        <div>
            {country.name.common} <button onClick={handleClick}>show</button>
            {active && <div key={country.name.common}>
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
            </div>}
        </div>
    )

}













export default CountryView