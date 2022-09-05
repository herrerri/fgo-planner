import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import CharInfo from './CharInfo';

// Default values for the radio button selection
const defaultValues = {
  level: 90,
  atk: 1000,
  hp: 1000,
  skill1: 9,
  skill2: 9,
  skill3: 9,
  append1: 1,
  append2: 10,
  append3: 1,
};

const SearchPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [servantID, setServantID] = useState('');
  const [servant, setServant] = useState({});
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  // Get servant data either from API or local storage
  useEffect(() => {
    if (servantID !== '') {
      const fetchData = async () => {
        let servantData;

        try {
          if (entryExists(props.servantList, servantID)) {
            servantData = await props.servantList.find(
              (svt) => svt.id === servantID
            );
          } else {
            const servant = await axios.get(
              'https://api.atlasacademy.io/nice/JP/servant/' +
                servantID +
                '?lang=en'
            );

            servantData = {
              id: servant.data.id,
              name: servant.data.name,
              rarity: servant.data.rarity,
              servantClass: servant.data.className,
              face: servant.data.extraAssets.faces.ascension[4],
              skillList: mapMaterialLists(servant.data, 'skillMaterials'),
              appendList: mapMaterialLists(
                servant.data,
                'appendSkillMaterials'
              ),
              ascensionList: mapMaterialLists(
                servant.data,
                'ascensionMaterials'
              ),
            };

            let newServantList = [...props.servantList, servantData];
            props.setServantList(newServantList);
          }

          setLoading(true);
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

  // Check if the servant exists in our cached list
  const entryExists = (aList, data) => {
    return aList.some((d) => d.id === data);
  };

  // Map through the specified material array found in data object
  const mapMaterialLists = (dataObject, dataName) => {
    let arrayFromData = Object.values(dataObject[dataName]);

    return arrayFromData.map((d) => ({
      qp: d.qp,
      mats: d.items.map((i) => ({
        id: i.item.id,
        name: i.item.name,
        icon: i.item.icon,
        amount: i.amount,
      })),
    }));
  };

  // Update the selected values
  const updateSelection = (e) => {
    console.log(selectedValues);
    setSelectedValues((prevState) => {
      return { ...prevState, [e.target.name]: parseInt(e.target.value) };
    });
  };

  // Saving user input in local storage
  const addToUserList = () => {
    let newInputList;
    if (!entryExists(props.inputList, servantID)) {
      newInputList = [
        ...props.inputList,
        { id: servantID, values: selectedValues },
      ];
    } else {
      const filteredList = props.inputList.filter((servant) => {
        return servant.id !== servantID;
      });
      newInputList = [filteredList, { id: servantID, values: selectedValues }];
    }
    props.setInputList(newInputList);
    setLoading(true);
  };

  return (
    <div className='page'>
      <Search data={props.data} setServantID={setServantID} />
      {loading ? (
        <div />
      ) : (
        <CharInfo
          name={servant.name}
          sclass={servant.servantClass}
          rarity={servant.rarity}
          face={servant.face}
          addToUserList={addToUserList}
          selectedValues={selectedValues}
          updateSelection={updateSelection}
        />
      )}
    </div>
  );
};

export default SearchPage;
