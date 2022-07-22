import React, { useState } from 'react';
import classIcons from '../resources/classicons/index.js';

const StatsEditSheet = (props) => {
  return (
    <div className='currentstats'>
      <div className='cskilltitle'>{props.title}</div>
      <div className='currentlvlatkhp'>
        <div>Level</div>
        <input
          type='text'
          maxLength={3}
          value={props.levels[0]}
          onChange={(e) => props.handleLevels(e, 0, props.arr)}
        />
        <div>ATK</div>
        <input
          type='text'
          maxLength={4}
          value={props.levels[1]}
          onChange={(e) => props.handleLevels(e, 1, props.arr)}
        />
        <div>HP</div>
        <input
          type='text'
          maxLength={4}
          value={props.levels[2]}
          onChange={(e) => props.handleLevels(e, 2, props.arr)}
        />
      </div>
      <div className='currentskills'>
        {props.skills.map((skill, index) => (
          <div>
            <div className='skillnum'>Skill {index + 1}</div>
            <div className='sliders'>
              <input
                id={skill}
                type='range'
                min={1}
                max={10}
                value={props.skills[index]}
                className='slider'
                onChange={(e) => props.handleSkills(e, index, props.arr)}
                step={1}
              />
              <div className='skilllvl'>{props.skills[index]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DisplayCard = (props) => {
  const handleSkillChange = (e, index, array) => {
    let skillValues = [...props.skillRange];

    if (
      parseInt(e.target.value) <= parseInt(props.skillRange[1][index]) ||
      parseInt(array) === 1
    ) {
      skillValues[array][index] = e.target.value;
    }

    if (
      array === 1 &&
      parseInt(e.target.value) < parseInt(props.skillRange[0][index])
    ) {
      skillValues[0][index] = parseInt(e.target.value);
    }

    props.setSkillRange(skillValues);
    console.log(props.skillRange);
  };

  const handleLevelChange = (e, index, array) => {
    let lvlValues = [...props.lvlRange];
    let val = parseInt(e.target.value);

    if (
      !(val > 100 && index === 0) &&
      !(val > 2000 && index !== 0) &&
      !(array === 0 && val > parseInt(props.lvlRange[1][index]))
    ) {
      lvlValues[array][index] = parseInt(e.target.value);
    }

    if (
      array === 1 &&
      parseInt(e.target.value) < parseInt(props.lvlRange[0][index])
    ) {
      lvlValues[0][index] = 0;
    }

    if (isNaN(val)) {
      lvlValues[array][index] = 0;
    }

    props.setLvlRange(lvlValues);
    console.log(props.lvlRange);
  };

  return (
    <div className='displaycard'>
      <div className='info'>
        <img
          className='displayimage'
          src={props.face}
          alt={"Image of Fate Grand Order's " + props.name}
        />
        <div className='infotext'>
          <div>
            <h1>{props.name}</h1>
            <p className='rarity'>{props.rarity + '★'}</p>
          </div>
          <img
            className='classicon'
            src={classIcons[props.sclass]}
            alt={props.sclass + ' icon'}
          />
        </div>
      </div>
      <div className='editstats'>
        <StatsEditSheet
          title={'Starting Stats'}
          arr={0}
          key='0'
          skills={props.skillRange[0]}
          handleSkills={handleSkillChange}
          levels={props.lvlRange[0]}
          handleLevels={handleLevelChange}
        />
        <StatsEditSheet
          title={'Goal Stats'}
          arr={1}
          key='1'
          skills={props.skillRange[1]}
          handleSkills={handleSkillChange}
          levels={props.lvlRange[1]}
          handleLevels={handleLevelChange}
        />
      </div>
      <button className='addToListButton' onClick={() => props.addToList()}>
        Add to List
      </button>
    </div>
  );
};

export default DisplayCard;
