import React from 'react';
import Home from 'pages/Home';
import SearchPage from 'pages/SearchPage';
import ListPage from 'pages/ListPage';
import { Route, Routes } from 'react-router-dom';

const Router = ({ servants, setServants, items, setItems, inputList, setInputList }) => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route
        path='/search'
        element={
          <SearchPage
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
            servants={servants}
            items={items}
            setItems={setItems}
            inputList={inputList}
            setInputList={setInputList}
          />
        }
      />
    </Routes>
  );
};

export default Router;
