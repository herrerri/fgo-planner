import React from 'react';

const CharValues = ({ valueName, valueList, values, className, update }) => {
  const printSelection = valueList.map((v) => {
    return (
      <>
        <input
          type='radio'
          name={valueName}
          className='char-val-radio'
          id={valueName + v}
          key={valueName + v + 'radio'}
          value={v}
          defaultChecked={v === values[valueName] ? true : false}
        />
        <label key={valueName + v + 'label'} htmlFor={valueName + v}>
          {v}
        </label>
      </>
    );
  });

  return (
    <div className={className} onChange={update} key={valueName}>
      {printSelection}
    </div>
  );
};

export default CharValues;
