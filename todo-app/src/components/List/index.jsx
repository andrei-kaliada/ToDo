import React from 'react';
import remove from "../../assets/img/remove.svg";
import classNames from 'classnames';
import Badge from '../Badge'

import './List.scss';



const List = ({ items, isRemovable, onClick, colors }) => {

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                    <li key={index} className={ classNames(item.className, {'active':item.active})}>
                        <i>
                            { !item.color ? <img src={item.icon} alt="listSvg" /> :
                            //   <Badge color={item.color}/>
                            " "
                              }
                            <span>{item.name}</span>
                            { item.active && isRemovable ? <img src={remove}  alt="remove"/> : ""}
                        </i>
                    </li>
                ))}

        </ul>
    );
}

export default List;