import React from 'react';
import Container from './container/index';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
