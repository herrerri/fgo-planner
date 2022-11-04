import React from 'react';
import Home from '../components/Home';
import SearchPage from '../components/searchpage/SearchPage';
import ListPage from '../components/listpage/ListPage';
import { Route, Routes } from 'react-router-dom';

const Router = ({
  servants,
  setServants,
  items,
  setItems,
  inputList,
  setInputList,
}) => {
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
