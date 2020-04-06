import React, { useState } from 'react';
import remove from "../../assets/img/remove.svg";
import classNames from 'classnames';
import Badge from '../Badge'

import './List.scss';



const List = ({ items, isRemovable, onClick, onRemove}) => {

    const [active, setActive] = useState(true);



    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                    <li onClick={() => {
                        setActive(item.id);
                    }} key={index} className={ classNames(item.className, {'active':active === item.id && 'active'})}>
                            { !item.color ? <img src={item.icon} alt="" /> :
                              <Badge color={item.color}/>
                            
                              }
                            <span>{item.name}</span>
                            { (active === item.id) && isRemovable &&
                             <img 
                             onClick={() => {onRemove(item.id)}}
                             className="list__remove-icon"
                                src={remove} 
                                alt="remove"/> }
                    </li>
                ))}

        </ul>
    );
}

export default List;