import React, { useState, useEffect } from 'react';
import { List, AddButtonList, Tasks } from './components';
import iconSvgList from './assets/img/list.svg';
import { Route, useHistory } from 'react-router-dom';

import axios from 'axios';



function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  let history = useHistory();

  useEffect( () => {
    
    const listId = history.location.pathname.split('lists/')[1];
    
    if(lists){
      const list = lists.find( list => list.id === Number(listId) );
      setActiveItem(list); 
    }
  },[lists,history.location.pathname]);


  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const setTitle = (id, title) => {
    const newList = lists.map(list => {
      if (list.id === id) {
        list.name = title;
      }
      return list;
    })
    setLists(newList);


  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskId, {
        completed: completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  }


  const onAddList = (listId, taskObj) => {
    const newList = [
      ...lists,
      taskObj
    ];

    setLists(newList);
  }


  const onAddTask = (id, obj) => {

    const newList = lists.map(item => {
      if (item.id === id) {
        item.tasks = [
          ...item.tasks,
          obj
        ];
      }

      return item;
    })

    setLists(newList);
  }

  const onRemove = (element) => {
    let newLists = lists.filter(list => list.id !== element);
    setLists(newLists)
  }

  const onRemoveTask = (listId, taskId) => {
    const newTask = window.confirm('Are you sure you want to delete the task?');
    if(newTask){
      const newList = lists.map( item => {
        if( item.id === listId){
          item.tasks = item.tasks.filter( task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
       
        axios.delete('http://localhost:3001/tasks/' + taskId)
        .catch( error => alert(`Error: ${error}`));
    }
    
   }


  return (
    <div className="todo">
      <div className="todo__sidebar">

        <List
          onClickItem={() => {
            history.push(`/`);
          }}
          items={
            [{
              active: history.location.path === '/',
              icon: iconSvgList,
              name: 'All tasks',

            }]
          }
        />
        <List
          items={lists}
          isRemovable
          onRemove={onRemove}
          onClickItem={(item) => {
            history.push(`/lists/${item.id}`);
          }}
          activeItem={activeItem}
          
        />
        <AddButtonList
          colors={colors}
          lists={lists}
          onAdd={onAddList}
        />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {
            lists && lists.map(list => (

              <Tasks
                
                list={list}
                onAddTask={onAddTask}
              onEditTitle={setTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
                withoutEmpty
               
              />
            ))
          }
        </Route>
        <Route path='/lists/:id'>
          {lists && activeItem &&
            <Tasks list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={setTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />}
        </Route>
      </div>
    </div>
  );
}

export default App;
