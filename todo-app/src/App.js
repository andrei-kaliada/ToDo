import React, {useState, useEffect} from 'react';
import { List, AddButtonList, Tasks} from './components';
import iconSvgList from './assets/img/list.svg';

import axios from 'axios';



function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

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

 const onAddList = (obj) => {
   const newList = [
     ...lists,
     obj
   ];
   setLists(newList);
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
            icon:iconSvgList,
            name:'All tasks',
           
          }]
        }
        
        />
         <List 
         items={lists}
        isRemovable
        onRemove={onRemove}
        />
       <AddButtonList 
       colors={colors}
       lists={lists}
       onAdd={onAddList}
       />
      </div>
        <div className="todo__tasks">
          { lists && 
            <Tasks 
            list={lists[0]}
            />
          }
        </div>
      </div>
  );
}

export default App;
