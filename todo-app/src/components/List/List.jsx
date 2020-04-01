import React from 'react';
import './List.scss';
import remove from "../../assets/img/remove.svg";


const List = ({ items, isRemovable }) => {

    return (
        <ul className="list">
            {items.map((item, index) => (
                    <li key={index} className={ item.active ? 'active' : ""}>
                        <i>
                            { !item.color ? <img src={item.icon} alt="listSvg" /> :
                              <i className={`badge badge--${item.color}`}></i>
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