import React, { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Navbar from './components/Navbar';
import Router from './router/Router';

const App = () => {
  const [servants, setServants] = useState({});
  const [items, setItems] = useState({});
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    setLocalData();
  }, [servants, items, inputList]);

  const getLocalData = () => {
    if (window.localStorage.getItem('SERVANTS') !== null)
      setServants(JSON.parse(window.localStorage.getItem('SERVANTS')));
    if (window.localStorage.getItem('ITEMS') !== null)
      setItems(JSON.parse(window.localStorage.getItem('ITEMS')));
    if (window.localStorage.getItem('INPUT_LIST') !== null)
      setInputList(JSON.parse(window.localStorage.getItem('INPUT_LIST')));
  };

  const setLocalData = () => {
    window.localStorage.setItem('SERVANTS', JSON.stringify(servants));
    window.localStorage.setItem('ITEMS', JSON.stringify(items));
    window.localStorage.setItem('INPUT_LIST', JSON.stringify(inputList));
  };

  return (
    <div>
      <Navbar />
      <Router
        servants={servants}
        setServants={setServants}
        items={items}
        setItems={setItems}
        inputList={inputList}
        setInputList={setInputList}
      />
    </div>
  );
};

export default App;
