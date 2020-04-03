import React, { useState } from 'react';
import List from '../List';
import iconSvgAdd from '../../assets/img/add.svg';
import Badge from '../Badge';
import iconClose from '../../assets/img/close.svg';

import "./AddButtonList.scss";

const AddButtonList = ({colors}) => {

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [active, setActiveColor] = useState(colors[0].id);
  

console.log(active);
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
          <img  src={iconClose} alt="iconClose"/>
        </i>
        <input className="field" type="text" placeholder="List name" />
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
        <button className="btn">Add</button>
      </div>

      }
    </div>
  );
}

export default AddButtonList;