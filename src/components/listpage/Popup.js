import React from 'react';
import { capitalizeFirstLetter } from '../searchpage/SearchPageDefaults';
import CharForm from '../searchpage/CharForm';

const Popup = ({
  openPopup,
  formPopup,
  servant,
  servants,
  inputList,
  items,
  setItems,
  selectedValues,
  setSelectedValues,
  setInputList,
  closingFunction,
  handleDelete,
}) => {
  return openPopup ? (
    <div className='popup-container'>
      <div className='popup'>
        <button
          className='popup-close-btn'
          onClick={() => {
            formPopup(false);
          }}
        >
          &times;
        </button>
        <div className='char-info'>
          <div className='char-header'>
            <img
              loading='lazy'
              className='char-image'
              src={servant.face}
              alt={"Image of Fate Grand Order's " + servant.name}
            />
            <h1 className='char-name'>
              {servant.name +
                ' (' +
                capitalizeFirstLetter(servant.servantClass) +
                ')'}
            </h1>
          </div>
          <CharForm
            className='char-form'
            servant={servant}
            values={selectedValues}
            inputList={inputList}
            servants={servants}
            items={items}
            setSelectedValues={setSelectedValues}
            setInputList={setInputList}
            setItems={setItems}
            closingFunction={closingFunction}
          ></CharForm>
        </div>
        <button className='deleteButton' onClick={() => handleDelete()}>
          DELETE
        </button>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Popup;
