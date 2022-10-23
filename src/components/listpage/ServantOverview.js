import React from 'react';

const ServantOverview = (props) => {
  const servantDisplay = (servants, userInput) => {
    let displayableServants = [];

    userInput.forEach((v) => {
      displayableServants.push(servants[v.id]);
    });

    return displayableServants;
  };

  const displayServants = servantDisplay(props.servants, props.inputList)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((v) => {
      return (
        <div
          className='servant-container blue-two'
          onClick={() => props.formPopup(v)}
        >
          <img
            loading='lazy'
            src={v.face}
            alt={v.name}
            className='servant-icon blue-two'
          />
          <div className='item-hover-text'>{v.name}</div>
        </div>
      );
    });

  return (
    <div className='item-overview blue-two'>
      <h2 className='item-overview-header blue-two'>Servant Overview</h2>

      <div className='servant-overview-items blue-two'>
        {servantDisplay(props.servants, props.inputList).length === 0 ? (
          <div className='empty-text'>
            Search and add characters to view and edit them here!
          </div>
        ) : (
          displayServants
        )}
      </div>
    </div>
  );
};

export default ServantOverview;
