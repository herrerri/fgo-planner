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
            servantData = await fetchFromApi();
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

  const fetchFromApi = async () => {
    const servant = await axios.get(
      'https://api.atlasacademy.io/nice/JP/servant/' + servantID + '?lang=en'
    );

    let servantMats = mapMats(props.items, servant.data, true);
    let itemMats = mapMats(props.items, servant.data, false);

    let servantData = {
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

    return servantData;
  };

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
      <h1 className='white-text'>Search Page</h1>
      <i className='white-text subheading'>
        Plan out future item calculations by searching and adding FGO servants
        to a list!
      </i>
      <div className='examples-text blue-two'>
        <p>
          Fate/Grand Order is a mobile game for Android and iOS where one of the
          main functions of the game involves gathering resources and using them
          to develop the characters you receive in-game.
        </p>
        <p>
          If you are unsure of what to search or would just like to see the app
          in action, the examples below will showcase the search function. After
          clicking on an example, you can click the "Add to List" button to see
          data in the Overview page. You can play around with the different tabs
          and see the data being overwritten using different settings.
        </p>
      </div>
      <div className='examples'>
        <div className='example blue-two' onClick={() => setServantID(2800100)}>
          <img
            src='https://static.atlasacademy.io/JP/Faces/f_28001003.png'
            alt='oberon'
            className='char-image'></img>
          <div className='example-text  white-text'>Oberon</div>
        </div>
        <div className='example blue-two' onClick={() => setServantID(704000)}>
          <img
            src='https://static.atlasacademy.io/JP/Faces/f_7040003.png'
            alt='morgan'
            className='char-image'></img>
          <div className='example-text  white-text'>Morgan</div>
        </div>
        <div className='example blue-two' onClick={() => setServantID(402900)}>
          <img
            src='https://static.atlasacademy.io/JP/Faces/f_4029003.png'
            alt='achilles'
            className='char-image'></img>
          <div className='example-text  white-text'>Achilles</div>
        </div>
      </div>
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
            closingFunction={closingFunction}></CharForm>
        </div>
      )}
      <ToastContainer transition={Flip} />
    </div>
  );
};

export default SearchPage;
