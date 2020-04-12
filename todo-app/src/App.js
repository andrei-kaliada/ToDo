import React, {useState, useEffect} from 'react';
import { List, AddButtonList, Tasks} from './components';
import iconSvgList from './assets/img/list.svg';

import axios from 'axios';



function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
 

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
  const newList = lists.map( list => {
    if( list.id === id){
      list.name = title;
    }
    return list;
  })
  setLists(newList);
  
}

 const onAddList = (listId, taskObj) => {
   const newList = [
     ...lists,
     taskObj
   ];

   setLists(newList);
 }


 const onAddTask = (id,obj) => {

  const newList = lists.map( item => {
    if(item.id === id){
      item.tasks = [
        ...item.tasks,
        obj 
      ];
    }

    return item;
  })

  setLists(newList);
  console.log(id,obj);
}

 const onRemove = (element) => {
    let newLists = lists.filter( list => list.id !== element);
    setLists(newLists)
 }




  return (
    <div className="todo">
      <div className="todo__sidebar">
      
        <List
         items={
          [{
            active:true,
            icon:iconSvgList,
            name:'All tasks',
           
          }]
        }
        
        />
         <List 
         items={lists}
        isRemovable
        onRemove={onRemove}
        onClickItem={ (item) => { 
          setActiveItem(item);
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
          { lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={setTitle}/>}
        </div>
      </div>
  );
}

export default App;
