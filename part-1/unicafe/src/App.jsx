import { useState } from 'react'





const Statistics = ({ good, neutral, bad }) => {

  let total = good + neutral + bad
  let average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  let positive = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>


      <StatisticLine text={"good"} statistic={good} />
      <StatisticLine text={"neutral"} statistic={neutral} />
      <StatisticLine text={"bad"} statistic={bad} />
      <StatisticLine text={"all"} statistic={total} />
      <StatisticLine text={"average"} statistic={average} />
      <StatisticLine text={"positive"} statistic={`${positive}%`} />
    </div>
  )

}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, statistic }) => {
  return <p>{text} {statistic}</p>
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App