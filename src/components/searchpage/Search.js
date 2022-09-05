import React, { useState } from 'react';

const Search = ({ data, setServantID }) => {
  const [filteredList, setFilterestList] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (e) => {
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

  const clickSearch = (id) => {
    setFilterestList([]);
    setServantID(id);
  };

  return (
    <div className='search'>
      <input type='text' placeholder='Search...' onChange={handleSearch} />
      {filteredList.length !== 0 && (
        <div className='dataresult'>
          {filteredList.slice(0, 5).map((value) => {
            return (
              <div
                className='dataitem'
                key={value.id}
                onClick={() => clickSearch(value.id)}
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

export default Search;
