import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import CharInfo from './CharInfo';

const SearchPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [servantID, setServantID] = useState('');
  const [servant, setServant] = useState({});

  // Get servant data either from API or cache
  useEffect(() => {
    if (servantID !== '') {
      const fetchData = async () => {
        let servantData;
        let itemData;

        try {
          if (entryExists(props.servantList, servantID)) {
            servantData = props.servantList.find((svt) => svt.id === servantID);
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

  // Saving user input in local storage
  const addToUserList = () => {
    if (!entryExists) {
      // props.setInputList(newInputList);
    }
  };

  const maxLevel = (rarity) => {
    switch (rarity) {
      case 1:
        return 60;
      case 2:
        return 65;
      case 3:
        return 70;
      case 4:
        return 80;
      case 5:
        return 90;
      default:
        return 90;
    }
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
        />
      )}
    </div>
  );
};

export default SearchPage;
