import React, { useState, useEffect } from 'react';
import List from '../List';
import iconSvgAdd from '../../assets/img/add.svg';
import Badge from '../Badge';
import iconClose from '../../assets/img/close.svg';
import axios from 'axios';

import "./AddButtonList.scss";

const AddButtonList = ({colors, onAdd, lists}) => {

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [activeColor, setActiveColor] = useState();
  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setActiveColor(colors[0].id);
  }

  useEffect( () => {
    if(Array.isArray(colors)){
      setActiveColor(colors[0].id);
    }
  },[colors])
  
  const addList = () => {

    // let lastId = lists[lists.length-1].id + 1;

    if(!inputValue){
      alert('Введите название списка');
      return;
    }

    setIsLoading(true);

    axios.post('http://localhost:3001/lists',{
      name:inputValue,
      colorId:activeColor
    })
    .then( ({data}) => {
      const color = colors.filter(c => c.id === activeColor)[0];
      const listObj = {
        ...data,
        color
      };
      onAdd(listObj);
      onClose();
    })
    .catch(() => {
      alert('Ошибка при добавлении списка!');
    })
    .finally(()=>{
      setIsLoading(false);
    })

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
            { colors.map( (color) => (
              
               <li 
               key={color.id} 
               
               >
                  <Badge color={color.hex} 
                  onClick={() => {
                    setActiveColor(color.id);
                  }}

                  className={activeColor === color.id  && 'active'}
                  />
               </li>
            ))}
            
           
          </ul>
        </div>
        <button
        onClick={addList}
        className="btn">
          { isLoading ? <p>Loading...</p> : <p>Add</p>}
        </button>
      </div>

      }
    </div>
  );
}

export default AddButtonList;