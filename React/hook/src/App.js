import React from 'react';
import SongList from './components/SongList';
import SongContextProvider from './context/SongContext';

function App() {
  return (
    <div className="App">
      <SongContextProvider>
        <SongList/>
      </SongContextProvider>
    </div>
  );
}

export default App;
