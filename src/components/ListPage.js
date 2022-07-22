import React from 'react';

const ListPage = (props) => {
  const printList = props.servantList.map((servant) => {
    return <div className='displaycard info'>{servant.name}</div>;
  });

  return <div className='listpage'>{printList}</div>;
};

export default ListPage;
