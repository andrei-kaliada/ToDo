import React from 'react';
import classNames from 'classnames';

import "./Badge.scss";  


const Badge = ({color, onClick, className}) => {
   
        return(
            <i onClick={onClick} className={classNames("badge" ,{"active":className})} 
            style={{backgroundColor:`${color}`}}></i>
        );
}
 

export default Badge;