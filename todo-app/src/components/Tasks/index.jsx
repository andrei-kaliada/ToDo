import React from 'react';
import editIcon from '../../assets/img/edit.svg';
import checkIcon from '../../assets/img/check.svg';

import './Tasks.scss';

export default function Tasks({ list }) {
    console.log(list);
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <img src={editIcon} alt="editIcon" className="editIcon" />
            </h2>
            <div className="tasks__items">
                {list.tasks.map(task => (
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
        </div>
    )
}
