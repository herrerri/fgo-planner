import React, { useState } from 'react';
import ItemOverview from './ItemOverview';
import ServantOverview from './ServantOverview';
import Popup from './Popup';
import { operateAllValues } from '../searchpage/SearchPageDefaults';
import { ToastContainer, toast, Flip } from 'react-toastify';

const ListPage = (props) => {
  const [formPopup, setFormPopup] = useState(false);
  const [servant, setServant] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  const setForm = (v) => {
    setServant(v);
    let selectedInput = props.inputList.find((x) => x.id === v.id);
    setSelectedValues(selectedInput.values);
    setFormPopup(true);
  };

  const closingFunction = () => {
    toast('Totals Updated!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    });
    setFormPopup(false);
  };

  const handleDelete = () => {
    let newItems = props.items;

    const oldInput = props.inputList.find((svt) => {
      return svt.id === servant.id;
    });

    const inputList = props.inputList.filter((svt) => {
      return svt.id !== servant.id;
    });

    newItems = operateAllValues(
      newItems,
      props.servants[servant.id].mats,
      [oldInput.values.skill1, oldInput.values.skill2, oldInput.values.skill3],
      [
        oldInput.values.append1,
        oldInput.values.append2,
        oldInput.values.append3,
      ],
      false
    );

    props.setInputList(inputList);
    props.setItems(newItems);
    closingFunction();
  };

  return (
    <div className='page'>
      <h1 className='white-text'>Overview Page</h1>
      <i className='white-text subheading'>
        Plan out future item calculations by searching and adding FGO servants
        to a list!
      </i>
      <ItemOverview items={props.items} />
      <ServantOverview
        inputList={props.inputList}
        servants={props.servants}
        formPopup={setForm}
      />
      <Popup
        openPopup={formPopup}
        formPopup={setFormPopup}
        servant={servant}
        servants={props.servants}
        inputList={props.inputList}
        items={props.items}
        setItems={props.setItems}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        setInputList={props.setInputList}
        closingFunction={closingFunction}
        handleDelete={handleDelete}
      ></Popup>
      <ToastContainer transition={Flip} />
    </div>
  );
};

export default ListPage;
