import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import SearchPage from './components/searchpage/SearchPage';
import ListPage from './components/listpage/ListPage';
import ServantData from './resources/basic_servant_lang_en.json';
import { Route, Routes } from 'react-router-dom';

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
    const cacheServantData = window.localStorage.getItem('SERVANTS');
    const cacheItemData = window.localStorage.getItem('ITEMS');
    const userSavedData = window.localStorage.getItem('INPUT_LIST');
    if (cacheServantData !== null) setServants(JSON.parse(cacheServantData));
    if (cacheItemData !== null) setItems(JSON.parse(cacheItemData));
    if (userSavedData !== null) setInputList(JSON.parse(userSavedData));
  };

  const setLocalData = () => {
    window.localStorage.setItem('SERVANTS', JSON.stringify(servants));
    window.localStorage.setItem('ITEMS', JSON.stringify(items));
    window.localStorage.setItem('INPUT_LIST', JSON.stringify(inputList));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <SearchPage
              data={ServantData}
              servants={servants}
              setServants={setServants}
              items={items}
              setItems={setItems}
              inputList={inputList}
              setInputList={setInputList}
            />
          }
        />
        <Route
          path='/overview'
          element={
            <ListPage
              data={ServantData}
              servants={servants}
              items={items}
              setItems={setItems}
              inputList={inputList}
              setInputList={setInputList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
