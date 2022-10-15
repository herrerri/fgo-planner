import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import CharForm from './CharForm';
import {
  mapMats,
  capitalizeFirstLetter,
  defaultValues,
} from './SearchPageDefaults';
import { ToastContainer, toast, Flip } from 'react-toastify';

const SearchPage = (props) => {
  const [userAction, setUserAction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [servantID, setServantID] = useState('');
  const [servant, setServant] = useState({});
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  // Get servant data either from API or local storage
  useEffect(() => {
    if (servantID !== '') {
      setLoading(true);
      setUserAction(true);

      const fetchData = async () => {
        let servantData;

        try {
          if (props.servants[servantID]) {
            servantData = await props.servants[servantID];
          } else {
            const servant = await axios.get(
              'https://api.atlasacademy.io/nice/JP/servant/' +
                servantID +
                '?lang=en'
            );

            let servantMats = mapMats(props.items, servant.data, true);
            let itemMats = mapMats(props.items, servant.data, false);

            servantData = {
              id: servant.data.id,
              name: servant.data.name,
              rarity: servant.data.rarity,
              servantClass: servant.data.className,
              face: servant.data.extraAssets.faces.ascension[4],
              mats: servantMats,
            };

            props.setItems(itemMats);
            props.setServants({
              ...props.servants,
              [servantID]: servantData,
            });
          }

          setSelectedValues(defaultValues);
          setServant(servantData);
          setLoading(false);
        } catch (error) {
          console.log('Axios Get', error);
        }
      };

      fetchData();
    }
  }, [servantID]);

  const closingFunction = () => {
    setUserAction(false);
    setServantID('');
    toast('Added to List!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    });
  };

  return (
    <div className='page'>
      <h1 className='white-text'>Fate/Grand Order Planner</h1>
      <i className='white-text subheading'>
        Plan out future item calculations by searching and adding FGO servants
        to a list!
      </i>
      <Search data={props.data} setServantID={setServantID} />
      {!userAction ? (
        <div />
      ) : loading ? (
        <div className='spinner'></div>
      ) : (
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
            inputList={props.inputList}
            servants={props.servants}
            items={props.items}
            setSelectedValues={setSelectedValues}
            setInputList={props.setInputList}
            setItems={props.setItems}
            closingFunction={closingFunction}
          ></CharForm>
        </div>
      )}
      <ToastContainer transition={Flip} />
    </div>
  );
};

export default SearchPage;
