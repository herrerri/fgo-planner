// Default values for the radio button selection
export const defaultValues = {
  level: 90,
  atk: 1000,
  hp: 1000,
  skill1: 9,
  skill2: 9,
  skill3: 9,
  append1: 0,
  append2: 0,
  append3: 0,
  cat: 'LEVELS',
};

export const levelCheck = (rarity) => {
  switch (rarity) {
    case 1:
      return [60, 70, 80, 90, 100, 120];
    case 2:
      return [65, 70, 80, 90, 100, 120];
    case 3:
      return [70, 80, 90, 100, 120];
    case 4:
      return [80, 90, 100, 120];
    case 5:
      return [90, 100, 120];
    default:
      return [90, 100, 120];
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const operationSwitch = (a, b, sum) => {
  if (sum) {
    return a + b;
  } else {
    return a - b;
  }
};

const handleItemUpdate = (items, servantData, upgradeType, operation, valueArray) => {
  let newItems = items;
  valueArray.forEach((item) => {
    if (item > 0) {
      [...Array(item - 1).keys()].forEach((i) => {
        Object.keys(servantData[parseInt('' + upgradeType + i)]).forEach((key) => {
          operationSwitch();
          newItems[key].amount = operationSwitch(
            newItems[key].amount,
            servantData[parseInt('' + upgradeType + i)][key],
            operation
          );
        });
      });
    }
  });

  return newItems;
};

export const operateAllValues = (items, servantData, skillArray, appendArray, sum) => {
  let newItems = handleItemUpdate(items, servantData, 1, sum, skillArray);
  newItems = handleItemUpdate(items, servantData, 2, sum, appendArray);
  newItems = handleItemUpdate(items, servantData, 3, sum, [5]);

  return newItems;
};

export const mapMats = (items, dataObject, servant) => {
  let newItems = {};
  let dataNames = ['skillMaterials', 'appendSkillMaterials', 'ascensionMaterials'];

  if (!servant) {
    newItems = items;
  }

  dataNames.forEach((dataName, dataIndex) => {
    const materials = Object.values(dataObject[dataName]);

    materials.forEach((d, itemIndex) => {
      Object.values(d)
        .flat()
        .forEach((i) => {
          if (typeof i === 'object') {
            if (servant) {
              if (!newItems[parseInt('' + (dataIndex + 1) + itemIndex)]) {
                newItems[parseInt('' + (dataIndex + 1) + itemIndex)] = {
                  [i.item.id]: i.amount,
                };
              } else {
                newItems[parseInt('' + (dataIndex + 1) + itemIndex)][i.item.id] = i.amount;
              }
            } else if (!newItems[i.item.id]) {
              newItems[i.item.id] = {
                name: i.item.name,
                icon: i.item.icon,
                amount: 0,
              };
            }
          }
        });
    });
  });

  return newItems;
};
