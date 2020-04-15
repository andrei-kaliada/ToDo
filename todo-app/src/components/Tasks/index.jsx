import React from 'react';
import editIcon from '../../assets/img/edit.svg';
import AddTasksForm from './AddTasksForm';
import Task from './Task';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './Tasks.scss';

export default function Tasks({
    list, onEditTitle,
    onAddTask,
    withoutEmpty,
    onRemoveTask,
    onEditTask,
    onCompleteTask }) {


    const editTitle = () => {
        const newTitle = window.prompt('Write new Title');
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
                .catch(error => alert(`Error: ${error}`));
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`} >
                <h2
                    style={{ color: list.color.hex }}
                    className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={editIcon} alt="editIcon" className="editIcon" />
                </h2>
            </Link>
            <div className="tasks__items">
                {list.tasks && !list.tasks.length && !withoutEmpty && <h2>No tasks</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        list={list}
                        onRemoveTask={onRemoveTask}
                        onEditTask={onEditTask}
                        onCompleteTask={onCompleteTask}
                    />
                ))}
            </div>
            <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
        </div>
    )
}
