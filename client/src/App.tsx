import React, { useEffect, useState } from 'react';
import './App.css';
import { socketHandler } from './utils/socketHandler';
import { stateFunctions } from './utils/interfaces';

import Header from './components/Header';
import Person from './components/Person';

function App() {
  // store connection state of the socket
  const [connected, setConnected] = useState(false);
  const [peopleStatus, setPeopleStatus] = useState([]);

  useEffect(() => {
    const stateFunctionData: stateFunctions = { setConnected, setPeopleStatus };
    socketHandler().start(stateFunctionData);
  });

  return (
    <div className="App">
      <Header connected={connected} />

      <div className="peopleStatus">
        <div className="peopleContainer">
          { peopleStatus.map((personStatus, i) => <Person key={i} person={personStatus} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
