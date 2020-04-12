import React from 'react';
import editIcon from '../../assets/img/edit.svg';
import checkIcon from '../../assets/img/check.svg';
import AddTasksForm from './AddTasksForm';

import axios from 'axios';

import './Tasks.scss';

export default function Tasks({ list,onEditTitle, onAddTask }) {

    const editTitle = () => {
        const newTitle = window.prompt('Write new Title');
       if(newTitle){
        onEditTitle(list.id, newTitle);
        axios.patch('http://localhost:3001/lists/' + list.id, {
            name: newTitle
        })
        .catch( error => alert(`Error: ${error}`));
       }
        
    }


    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editIcon} alt="editIcon" className="editIcon" />
            </h2>
            <div className="tasks__items">
                { (list.tasks ? !list.tasks.length : null) && <h2>No tasks</h2>}
                {list.tasks && list.tasks.map(task => (
                    <div key={task.id} className="tasks__items-row">
                        <div htmlFor="" className="checkbox">
                            <input id={`task-${task.id}`} type="checkbox" />
                            <label htmlFor={`task-${task.id}`}>
                                <img src={checkIcon} alt="checkIcon" />
                            </label>
                        </div>
                        <input type="text" value={task.text} />

                    </div>
                ))}
            </div>
            <AddTasksForm list={list} onAddTask={onAddTask} />
        </div>
    )
}
