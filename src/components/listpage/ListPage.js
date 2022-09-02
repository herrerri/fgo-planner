import React from 'react';

const ListPage = (props) => {
  const printList = props.servantList.map((servant) => {
    return <div className=''>{servant.name}</div>;
  });

  return <div className='page'>{printList}</div>;
};

export default ListPage;
