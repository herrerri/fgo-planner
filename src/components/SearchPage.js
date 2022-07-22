import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import DisplayCard from './DisplayCard';

const SearchPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [servantID, setServantID] = useState('');
  const [servant, setServant] = useState({});
  const [skillRange, setSkillRange] = useState([
    ['1', '1', '1'],
    ['10', '10', '10'],
  ]);
  const [lvlRange, setLvlRange] = useState([
    [1, 0, 0],
    [90, 1000, 1000],
  ]);

  useEffect(() => {
    if (servantID !== '') {
      const fetchData = async () => {
        try {
          const data = await axios.get(
            'https://api.atlasacademy.io/nice/JP/servant/' +
              servantID +
              '?lang=en'
          );

          setSkillRange([
            ['1', '1', '1'],
            ['10', '10', '10'],
          ]);
          setLvlRange([
            [1, 0, 0],
            [maxLevel(data.data.rarity), 1000, 1000],
          ]);

          setServant(data);
          setLoading(false);
        } catch (error) {
          console.log('Axios Get');
        }
      };

      fetchData();
    }
  }, [servantID]);

  const duplicateEntry = props.servantList.some((svt) => {
    if (svt.id === servantID) {
      return true;
    }
  });

  const addToList = () => {
    if (!duplicateEntry) {
      let newlist = [
        ...props.servantList,
        {
          name: servant.data.name,
          rarity: servant.data.rarity,
          servantClass: servant.data.className,
          id: servant.data.id,
          skillMats: servant.data.skillMaterials,
          ascMats: servant.data.ascensionMaterials,
          skillRange: skillRange,
          lvlRange: lvlRange,
          face: servant.data.extraAssets.faces.ascension[4],
        },
      ];
      props.setServantList(newlist);
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
    <div className='searchpage'>
      <SearchBar data={props.data} setServantID={setServantID} />
      {loading ? (
        <div />
      ) : (
        <DisplayCard
          name={servant.data.name}
          sclass={servant.data.className}
          rarity={servant.data.rarity}
          face={servant.data.extraAssets.faces.ascension[4]}
          skillRange={skillRange}
          setSkillRange={setSkillRange}
          lvlRange={lvlRange}
          setLvlRange={setLvlRange}
          addToList={addToList}
        />
      )}
    </div>
  );
};

export default SearchPage;
