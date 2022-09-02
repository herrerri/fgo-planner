import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchPage from './components/searchpage/SearchPage';
import ListPage from './components/listpage/ListPage';
import ServantData from './resources/basic_servant_lang_en.json';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [servantList, setServantList] = useState([]);
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    setLocalData();
  }, [servantList, inputList]);

  const getLocalData = () => {
    const cacheServantData = window.localStorage.getItem('CACHED_SERVANT_LIST');
    const userSavedData = window.localStorage.getItem('USER_SAVED_LIST');
    if (cacheServantData !== null) setServantList(JSON.parse(cacheServantData));
    if (userSavedData !== null) setInputList(JSON.parse(userSavedData));
  };

  const setLocalData = () => {
    window.localStorage.setItem(
      'CACHED_SERVANT_LIST',
      JSON.stringify(servantList)
    );
    window.localStorage.setItem('USER_SAVED_LIST', JSON.stringify(inputList));
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
              servantList={servantList}
              setServantList={setServantList}
              setInputList={setInputList}
            />
          }
        />
        <Route
          path='/list'
          element={
            <ListPage servantList={servantList} setInputList={setInputList} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
