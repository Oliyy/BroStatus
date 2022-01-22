import React, { useEffect, useState } from 'react';

// import styles
import './App.css';

// import utils
import { socketHandler } from './utils/socketHandler';
import { stateFunctions } from './utils/interfaces';

// import components
import Header from './components/Header';
import Person from './components/Person';

function App() {
  // main state storage for the whole app
  const [connected, setConnected] = useState<boolean>(false);
  const [peopleStatus, setPeopleStatus] = useState([]);
  const [statusList, setStatusList] = useState([]);

  // on component load start client connection to socket
  useEffect(() => {
    const stateFunctionData: stateFunctions = { setConnected, setPeopleStatus, setStatusList };
    const SocketHandler = socketHandler();
    SocketHandler.start(stateFunctionData);
  }, []);

  // return main view tsx
  return (
    <div className="App">
      <Header connected={connected} />

      <div className="peopleStatus">
        <div className="peopleContainer">
          { peopleStatus.map((personStatus, i) => <Person key={i} person={personStatus} statusList={statusList} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
