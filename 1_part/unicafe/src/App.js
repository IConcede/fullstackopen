import React, { useState } from 'react'

const Header = ({header}) => {
  return(
    <h1>{header}</h1>
  );
};

const Button = ({handleClick, text}) => {
  return(
      <button onClick={handleClick}>{text}</button>
  );
};

const StatisticLine = ({text, value}) => {
  return(
    <p>{text + (value??'')}</p>
  );
};

const Statistics = ({good, neutral, bad}) => {
  if(!(good||neutral||bad)){
    return(
      <div>
        <Header header='statistics' />
        <StatisticLine text='No feedback given' />
      </div>
    );
  }

  return(
    <div>
      <Header header='statistics' />
      <StatisticLine text='good ' value={good} />
      <StatisticLine text='neutral ' value={neutral} />
      <StatisticLine text='bad ' value={bad} />
      <StatisticLine text='all ' value={good + neutral + bad} />
      <StatisticLine text='average ' value={(good - bad)/(good + neutral + bad)} />
      <StatisticLine text='positive ' value={100*good/(good + neutral + bad) + ' %'} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type, setType) => () => setType(type + 1);

  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={handleClick(good, setGood)} text='good'/>
      <Button handleClick={handleClick(neutral, setNeutral)} text='neutral'/>
      <Button handleClick={handleClick(bad, setBad)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App