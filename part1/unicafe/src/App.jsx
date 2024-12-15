import { useState } from 'react'

const Feedback = ({ handleClick }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleClick} />
      <Button text='neutral' handleClick={handleClick} />
      <Button text='bad' handleClick={handleClick}/>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text='positive' value={`${good / (good + neutral + bad) * 100}%`} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={() => handleClick(text)}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = clickType => {
    switch (clickType) {
      case 'good':
        return setGood(good + 1) 
      case 'neutral':
        return setNeutral(neutral + 1)
      case 'bad':
        return setBad(bad + 1)
      default:
        return
    }
  }

  return (
    <div>
      <Feedback handleClick={handleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App