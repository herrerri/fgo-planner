import React, { useState } from 'react';
import CharValues from './CharValues';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CharInfo = (props) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [tab, setTab] = useState('Levels');

  const updateSelection = (e) => {
    setSelectedValues(e.target.value);
  };

  const updateTab = (e) => {
    setTab(e.target.value);
  };

  return (
    <div className='char-info'>
      <div className='char-header'>
        <img
          className='char-image'
          src={props.face}
          alt={"Image of Fate Grand Order's " + props.name}
        />
        <h1>{props.name + ' (' + capitalizeFirstLetter(props.sclass) + ')'}</h1>
      </div>
      <CharValues
        className='char-val'
        valueName='cat'
        valueList={['Levels', 'Skills', 'Append Skills']}
        valueCheck={'Levels'}
        update={updateTab}
      />
      {tab === 'Levels' ? (
        <>
          <div className='char-header'>Level</div>
          <CharValues
            className='char-val'
            valueName='level'
            valueList={[80, 90, 100, 120]}
            valueCheck={90}
          />
          <div className='char-header'>ATK Fou</div>
          <CharValues
            className='char-val'
            valueName='atk'
            valueList={[0, 1000, 2000]}
            valueCheck={1000}
          />
          <div className='char-header'>HP Fou</div>
          <CharValues
            className='char-val'
            valueName='hp'
            valueList={[0, 1000, 2000]}
            valueCheck={1000}
          />
        </>
      ) : (
        ''
      )}
      {tab === 'Skills' ? (
        <>
          <div className='char-header'>Skill 1</div>
          <CharValues
            className='char-val'
            valueName='skill1'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={9}
          />
          <div className='char-header'>Skill 2</div>
          <CharValues
            className='char-val'
            valueName='skill2'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={9}
          />
          <div className='char-header'>Skill 3</div>
          <CharValues
            className='char-val'
            valueName='skill3'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={9}
          />
        </>
      ) : (
        ''
      )}
      {tab === 'Append Skills' ? (
        <>
          <div className='char-header'>Append Skill 1</div>
          <CharValues
            className='char-val'
            valueName='append1'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={1}
          />
          <div className='char-header'>Append Skill 2</div>
          <CharValues
            className='char-val'
            valueName='append2'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={10}
          />
          <div className='char-header'>Append Skill 3</div>
          <CharValues
            className='char-val'
            valueName='append3'
            valueList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            valueCheck={1}
          />
        </>
      ) : (
        ''
      )}
      <button className='addToListButton' onClick={() => props.addToList()}>
        Add to List
      </button>
    </div>
  );
};

export default CharInfo;
