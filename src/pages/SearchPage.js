import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from 'components/Search';
import CharForm from 'components/CharForm';
import { DefaultToast } from 'components/DefaultToast';
import { mapMats, capitalizeFirstLetter, defaultValues } from 'components/SearchPageDefaults';
import { ToastContainer, toast, Flip } from 'react-toastify';

const SearchPage = ({ servants, setServants, items, setItems, inputList, setInputList }) => {
  const [userAction, setUserAction] = useState(false);
  const [loading, setLoading] = useState(true);

  const [servantID, setServantID] = useState('');
  const [servant, setServant] = useState({});
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  useEffect(() => {
    if (servantID !== '') {
      setLoading(true);
      setUserAction(true);
      fetchData();
    }
  }, [servantID]);

  const fetchData = async () => {
    let servantData;

    try {
      if (servants[servantID]) {
        servantData = await servants[servantID];
      } else {
        const newServant = await axios.get(
          'https://api.atlasacademy.io/nice/JP/servant/' + servantID + '?lang=en'
        );

        let servantMats = mapMats(items, newServant.data, true);
        let itemMats = mapMats(items, newServant.data, false);

        servantData = {
          id: newServant.data.id,
          name: newServant.data.name,
          rarity: newServant.data.rarity,
          servantClass: newServant.data.className,
          face: newServant.data.extraAssets.faces.ascension[4],
          mats: servantMats,
        };

        setItems(itemMats);
        setServants({
          ...servants,
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

  const closingFunction = () => {
    setUserAction(false);
    setServantID('');
    toast('Added to List!', DefaultToast);
  };

  return (
    <div className='page'>
      <h1 className='white-text'>Search Page</h1>
      <i className='white-text subheading'>
        Plan out future item calculations by searching and adding FGO servants to a list!
      </i>
      <div className='examples-text blue-two'>
        <p>
          Fate/Grand Order is a mobile game for Android and iOS where one of the main functions of
          the game involves gathering resources and using them to develop the characters you receive
          in-game.
        </p>
        <p>
          If you are unsure of what to search or would just like to see the app in action, the
          examples below will showcase the search function. After clicking on an example, you can
          click the "Add to List" button to see data in the Overview page. You can play around with
          the different tabs and see the data being overwritten using different settings.
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
      <Search setServantID={setServantID} />
      {!userAction ? (
        <div />
      ) : loading ? (
        <div className='spinner'></div>
      ) : (
        <div className='char-info'>
          <div className='char-header'>
            <img className='char-image' src={servant.face} alt={servant.name} />
            <h1 className='char-name'>
              {servant.name + ' (' + capitalizeFirstLetter(servant.servantClass) + ')'}
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
            closingFunction={closingFunction}></CharForm>
        </div>
      )}
      <ToastContainer transition={Flip} />
    </div>
  );
};

export default SearchPage;
