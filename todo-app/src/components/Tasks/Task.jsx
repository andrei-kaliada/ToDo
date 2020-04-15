import React from 'react';
import checkIcon from '../../assets/img/check.svg';
import editIcon from '../../assets/img/edit.svg';
import removeIcon from '../../assets/img/remove.svg';

export default function Task({id, completed, text, onEditTask,onRemoveTask, list, onCompleteTask}) {

    const onChangeCheckBox = (event) =>{
        onCompleteTask(list.id, id, event.target.checked);
    }

    return (
        <div key={id} className="tasks__items-row">
            <div htmlFor="" className="checkbox">
                <input onChange={onChangeCheckBox} id={`task-${id}`} type="checkbox" checked={completed}/>
                <label htmlFor={`task-${id}`}>
                    <img src={checkIcon} alt="checkIcon" />
                </label>
            </div>
            <p>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={()=> onEditTask(list.id, {id,text})}>
                    <img src={editIcon} alt="editIcon"/>
                    {/* <img src={checkIcon} alt="checkIcon"/> */}
                </div>
                <div onClick={onRemoveTask}>
                    <img  src={removeIcon} alt="removeIcon"/>
                </div>
            </div>
        </div>
    )
}
