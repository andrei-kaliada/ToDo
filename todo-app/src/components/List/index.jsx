import React, { useState } from 'react';
import remove from "../../assets/img/remove.svg";
import classNames from 'classnames';
import Badge from '../Badge'
import axios from 'axios';

import './List.scss';



const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
 
    const removeList = (item) => {
        if( window.confirm('Вы действительно хотите удалить этот список?')){
            axios.delete('http://localhost:3001/lists/' + item.id)
            .then(() => {
                onRemove(item.id);
            })
        }
        
       }

       if(activeItem){
           console.log(activeItem.id);
       }
       

      

    return (
        <ul onClick={onClick} className="list">
            {items && items.map((item, index) => (
                    <li
                    onClick={onClickItem ? () => onClickItem(item) : null} 
                    key={index} 
                    className={ classNames(item.className, {
                        active: item.active
                          ? item.active
                          : activeItem && activeItem.id === item.id
                      })}>

                            { !item.color ? <img src={item.icon} alt="" /> :
                              <Badge color={item.color.hex}/>
                              }
                            <span>{item.name}{ item.tasks && ` (${item.tasks.length})`}</span>
                            {  (activeItem ? activeItem.id === item.id : null) && isRemovable && 
                             <img 
                             onClick={() => {removeList(item)}}
                             className="list__remove-icon"
                                src={remove} 
                                alt="remove"/> }
                    </li>
                ))}

        </ul>
    );
}

export default List;