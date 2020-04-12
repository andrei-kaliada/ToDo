import React, { useState } from 'react'
import addIcon from '../../assets/img/add.svg';
import axios from 'axios';

export default function AddTasksForm({list, onAddTask}) {

    const [activeForm, setActiveForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleFromVisible = () => {
        setActiveForm(!activeForm);
        setInputValue('');
    }

    

    const AddTask = () => {
        
        const obj =  {
            "listId": list.id,
            "text": inputValue,
            "completed": false
          }

          setIsLoading(true);
      axios.post('http://localhost:3001/tasks', obj)
      .then( ({data}) => {
        console.log(data);
        onAddTask(list.id, obj);
        toggleFromVisible();
       
      }) 
      .catch((error)=> {
        console.log(`Error: ${error}`)
      })
      .finally( ()=> {
        setIsLoading(false);
      })
    }

    return (
        <div>
            <div className="tasks__form">
                {!activeForm ?
                    <div
                        onClick={toggleFromVisible}
                        className="tasks__form-new">
                        <img src={addIcon} alt="addIcon" />
                        <span>New tasks</span>
                    </div>

                    :

                    <div className="tasks__form-add">
                        <input
                        onChange={(event) => setInputValue(event.target.value)}
                        value={inputValue}
                         className="field" 
                         type="text"
                          placeholder="Task text" />
                        <div className="tasks__form-add-btn">
                        <button
                        disabled={isLoading}
                        onClick={AddTask}
                         className="btn">
                              { isLoading ? <p>Loading...</p> : <p>Add tasks</p>}
                       </button>
                        <button
                        onClick={toggleFromVisible}
                        className="btn-cancel">
                                Cancel
                       </button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
