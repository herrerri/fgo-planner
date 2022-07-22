import React, { useState, useEffect } from 'react';

const SearchBar = ({ data, setServantID }) => {
  const [filteredList, setFilterestList] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord !== '') {
      setFilterestList(newFilter);
    } else {
      setFilterestList([]);
    }
  };

  return (
    <div className='search'>
      <input type='text' placeholder='Search...' onChange={handleFilter} />
      {filteredList.length !== 0 && (
        <div className='dataresult'>
          {filteredList.slice(0, 5).map((value) => {
            return (
              <div
                className='dataitem'
                key={value.id}
                onClick={() => setServantID(value.id)}
              >
                {value.name +
                  ' (' +
                  capitalizeFirstLetter(value.className) +
                  ')'}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
