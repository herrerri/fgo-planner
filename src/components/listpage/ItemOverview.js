import React from 'react';

const ItemOverview = (props) => {
  const itemDisplay = (allItems) => {
    let displayableItems = [];
    const keys = Object.keys(allItems);

    keys.forEach((key) => {
      if (allItems[key].amount > 0) {
        displayableItems.push(allItems[key]);
      }
    });

    return displayableItems;
  };

  const displayItems = itemDisplay(props.items)
    .sort((a, b) => b.amount - a.amount)
    .map((v) => {
      return (
        <div className='item-container blue-two'>
          <img
            loading='lazy'
            src={v.icon}
            alt={'Image of ' + v.name}
            className='item-icon blue-two'
          />
          <div className='item-text blue-two'>{'x' + v.amount}</div>
          <div className='item-hover-text'>{v.name}</div>
        </div>
      );
    });

  return (
    <div className='item-overview blue-two'>
      <h2 className='item-overview-header blue-two'>Item Overview</h2>
      <div className='item-overview-items blue-two'>
        {itemDisplay(props.items).length === 0 ? (
          <div className='empty-text'>
            Search and add characters to view item requirements!
          </div>
        ) : (
          displayItems
        )}
      </div>
    </div>
  );
};

export default ItemOverview;
