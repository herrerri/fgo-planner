import React from 'react';

const CharValues = (props) => {
  const printSelection = props.valueList.map((v) => {
    return (
      <>
        <input
          type='radio'
          name={props.valueName}
          className='char-val-radio'
          id={props.valueName + v}
          key={props.valueName + v + 'radio'}
          value={v}
          defaultChecked={v === props.values[props.valueName] ? true : false}
        />
        <label key={props.valueName + v + 'label'} htmlFor={props.valueName + v}>
          {v}
        </label>
      </>
    );
  });

  return (
    <div className={props.className} onChange={props.update} key={props.valueName}>
      {printSelection}
    </div>
  );
};

export default CharValues;
