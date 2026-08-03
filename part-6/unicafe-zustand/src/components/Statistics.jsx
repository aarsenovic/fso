import { useUnicafeValues } from "../store"




const Statistics = () => {

  const unicafeValues = useUnicafeValues()



  if (unicafeValues.all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{unicafeValues.goodValue}</td></tr>
          <tr><td>neutral</td><td>{unicafeValues.neutralValue}</td></tr>
          <tr><td>bad</td><td>{unicafeValues.badValue}</td></tr>
          <tr><td>all</td><td>{unicafeValues.all}</td></tr>
          <tr><td>average</td><td>{unicafeValues.average}</td></tr>
          <tr><td>positive</td><td>{unicafeValues.positive} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
