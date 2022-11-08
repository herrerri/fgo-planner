import React, { useState } from 'react';
import CharValues from 'components/CharValues';
import { levelCheck, operateAllValues } from 'components/Defaults';

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
  const [tab, setTab] = useState('LEVELS');

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
        [oldInput.values.skill1, oldInput.values.skill2, oldInput.values.skill3],
        [oldInput.values.append1, oldInput.values.append2, oldInput.values.append3],
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

  CharValues.defaultProps = {
    className: 'char-val width-values',
    update: (e) => {
      handleSelectionUpdate(e);
    },
    values: values,
  };

  return (
    <form onSubmit={handleSubmit} className='char-form'>
      <CharValues
        className='char-val char-val-main width-values-main'
        valueName='cat'
        valueList={['LEVELS', 'SKILLS', 'APPENDS']}
        update={handleTabUpdate}
      />
      {tab === 'LEVELS' && (
        <>
          <div className='val-header'>Level</div>
          <CharValues valueName='level' valueList={levelCheck(servant.rarity)} />
          <div className='val-header'>ATK</div>
          <CharValues valueName='atk' valueList={[0, 1000, 2000]} />
          <div className='val-header'>HP</div>
          <CharValues valueName='hp' valueList={[0, 1000, 2000]} />
        </>
      )}
      {tab === 'SKILLS' && (
        <>
          <div className='val-header'>Skill 1</div>
          <CharValues valueName='skill1' valueList={[1, 4, 6, 9, 10]} />
          <div className='val-header'>Skill 2</div>
          <CharValues valueName='skill2' valueList={[1, 4, 6, 9, 10]} />
          <div className='val-header'>Skill 3</div>
          <CharValues valueName='skill3' valueList={[1, 4, 6, 9, 10]} />
        </>
      )}
      {tab === 'APPENDS' && (
        <>
          <div className='val-header'>Append Skill 1</div>
          <CharValues valueName='append1' valueList={[0, 9, 10]} />
          <div className='val-header'>Append Skill 2</div>
          <CharValues valueName='append2' valueList={[0, 9, 10]} />
          <div className='val-header'>Append Skill 3</div>
          <CharValues valueName='append3' valueList={[0, 9, 10]} />
        </>
      )}
      <button className='addToListButton' type='submit'>
        ADD TO LIST
      </button>
    </form>
  );
};

export default CharForm;
