import React, { useState } from 'react';
import CharValues from './CharValues';
import { levelCheck, operateAllValues } from './SearchPageDefaults';

const CharForm = ({
  servant,
  values,
  inputList,
  servants,
  items,
  setSelectedValues,
  setInputList,
  setItems,
  closingFunction,
}) => {
  const [tab, setTab] = useState('Levels');

  const handleTabUpdate = (e) => {
    setTab(e.target.value);
  };

  const handleSelectionUpdate = (e) => {
    setSelectedValues((prevState) => {
      return { ...prevState, [e.target.name]: parseInt(e.target.value) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempInputList = [...inputList];
    let newInputList;
    let newItems = items;

    if (inputList.some((data) => data.id === servant.id)) {
      const oldInput = inputList.find((svt) => {
        return svt.id === servant.id;
      });

      tempInputList = inputList.filter((svt) => {
        return svt.id !== servant.id;
      });

      newItems = operateAllValues(
        newItems,
        servants[servant.id].mats,
        [
          oldInput.values.skill1,
          oldInput.values.skill2,
          oldInput.values.skill3,
        ],
        [
          oldInput.values.append1,
          oldInput.values.append2,
          oldInput.values.append3,
        ],
        false
      );
    }

    newInputList = [...tempInputList, { id: servant.id, values: values }];

    newItems = operateAllValues(
      newItems,
      servants[servant.id].mats,
      [values.skill1, values.skill2, values.skill3],
      [values.append1, values.append2, values.append3],
      true
    );

    setInputList(newInputList);
    setItems(newItems);
    closingFunction();
  };

  return (
    <form onSubmit={handleSubmit} className='char-form'>
      <CharValues
        className='char-val char-val-main width-values-main'
        valueName='cat'
        valueList={['Levels', 'Skills', 'Appends']}
        valueCheck={'Levels'}
        update={handleTabUpdate}
      />
      {tab === 'Levels' && (
        <>
          <div className='val-header'>Level</div>
          <CharValues
            className='char-val width-values'
            valueName='level'
            valueList={levelCheck(servant.rarity)}
            valueCheck={values.level}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>ATK</div>
          <CharValues
            className='char-val width-values'
            valueName='atk'
            valueList={[0, 1000, 2000]}
            valueCheck={values.atk}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>HP</div>
          <CharValues
            className='char-val width-values'
            valueName='hp'
            valueList={[0, 1000, 2000]}
            valueCheck={values.hp}
            update={handleSelectionUpdate}
          />
        </>
      )}
      {tab === 'Skills' && (
        <>
          <div className='val-header'>Skill 1</div>
          <CharValues
            className='char-val width-values'
            valueName='skill1'
            valueList={[1, 4, 6, 9, 10]}
            valueCheck={values.skill1}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>Skill 2</div>
          <CharValues
            className='char-val width-values'
            valueName='skill2'
            valueList={[1, 4, 6, 9, 10]}
            valueCheck={values.skill2}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>Skill 3</div>
          <CharValues
            className='char-val width-values'
            valueName='skill3'
            valueList={[1, 4, 6, 9, 10]}
            valueCheck={values.skill3}
            update={handleSelectionUpdate}
          />
        </>
      )}
      {tab === 'Appends' && (
        <>
          <div className='val-header'>Append Skill 1</div>
          <CharValues
            className='char-val width-values'
            valueName='append1'
            valueList={[0, 9, 10]}
            valueCheck={values.append1}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>Append Skill 2</div>
          <CharValues
            className='char-val width-values'
            valueName='append2'
            valueList={[0, 9, 10]}
            valueCheck={values.append2}
            update={handleSelectionUpdate}
          />
          <div className='val-header'>Append Skill 3</div>
          <CharValues
            className='char-val width-values'
            valueName='append3'
            valueList={[0, 9, 10]}
            valueCheck={values.append3}
            update={handleSelectionUpdate}
          />
        </>
      )}
      <button className='addToListButton' type='submit'>
        ADD TO LIST
      </button>
    </form>
  );
};

export default CharForm;
