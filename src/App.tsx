import React, { useEffect } from 'react';
import './App.css';
import { fetchEmployeeData } from './services';

function App() {


  useEffect(() => {
    const fetchData = async () => {
      return await fetchEmployeeData()
    }
    
    fetchData()
  }, [])
  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
