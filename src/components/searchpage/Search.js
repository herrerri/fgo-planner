import React, { useState } from 'react';
import ServantData from '../../resources/basic_servant_lang_en.json';

const Search = ({ setServantID }) => {
  const [filteredList, setFilterestList] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    const newFilter = ServantData.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord !== '') {
      setFilterestList(newFilter);
    } else {
      setFilterestList([]);
    }
  };

  const handleClick = (id) => {
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
                onClick={() => handleClick(value.id)}>
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
