import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import ListPage from './components/ListPage';
import ServantData from './resources/basic_servant_lang_en.json';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [servantList, setServantList] = useState([]);

  useEffect(() => {
    getLocalServantList();
  }, []);

  useEffect(() => {
    setLocalServantList();
  }, [servantList]);

  const getLocalServantList = () => {
    const data = window.localStorage.getItem('SAVED_SERVANT_LIST');
    if (data !== null) setServantList(JSON.parse(data));
  };

  const setLocalServantList = () => {
    window.localStorage.setItem(
      'SAVED_SERVANT_LIST',
      JSON.stringify(servantList)
    );
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
            />
          }
        />
        <Route
          path='/list'
          element={
            <ListPage
              servantList={servantList}
              setServantList={setServantList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
