import React from 'react';
import { HexGrid } from './HexGrid';

const App: React.FC = () => {
  return (
    <div className="App">
      <HexGrid
        size={{
          width: 8,
          height: 10,
        }}
      />
    </div>
  );
}

export default App;
