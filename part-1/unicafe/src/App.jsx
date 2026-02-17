import { useState } from 'react'



const Statistics = ({ good, neutral, bad }) => {

  let total = good + neutral + bad
  let average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  let positive = total === 0 ? 0 : (good / total) * 100;

  if(total === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )

}







const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good = {good} neutral = {neutral} bad = {bad}/>


    </div>
  )
}

export default App