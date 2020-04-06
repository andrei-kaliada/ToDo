import React, { useState } from 'react';
import List from '../List';
import iconSvgAdd from '../../assets/img/add.svg';
import Badge from '../Badge';
import iconClose from '../../assets/img/close.svg';

import "./AddButtonList.scss";

const AddButtonList = ({colors, onAdd, lists}) => {

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [active, setActiveColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState();

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setActiveColor(colors[0].id);
  }
  
  const addList = () => {

    let lastId = lists[lists.length-1].id + 1;

console.log(lastId);
    if(!inputValue){
      alert('Введите название списка');
      return;
    }

    onAdd({
      "id": lastId,
      "name": inputValue,
      "color": colors.filter( color => color.id === active)[0].hex,
    });

    onClose();
  }

  return (
    <div className="add-list">
      <List
        onClick={() => {
          setVisiblePopup(true);
        }}
        items={[
          {
            icon: iconSvgAdd,
            name: 'Add list',
            className: "list__add-button",
          }
        ]} />
      {visiblePopup && 
      <div className="add-list__popup">
        <i  
        onClick={() => {
          setVisiblePopup(false);
        }}
         className="add-list__popup-iconClose">
          <img onClick={onClose}  src={iconClose} alt="iconClose"/>
        </i>

        <input onChange={(event) => setInputValue(event.target.value)} value={inputValue} className="field" type="text" placeholder="List name" />

        <div className="add-list__popup-colors">
          <ul>
            { colors.map( ({hex, id}) => (
               <li 
               key={id} 
               
               >
                  <Badge color={hex} 
                  onClick={() => {
                    setActiveColor(id);
                  }}

                  className={active === id  && 'active'}
                  />
               </li>
            ))}
            
           
          </ul>
        </div>
        <button
        onClick={addList}
        className="btn">Add</button>
      </div>

      }
    </div>
  );
}

export default AddButtonList;