import React, {useState} from 'react';
import List from './components/List';
import iconSvgList from './assets/img/list.svg';
import AddButtonList from './components/AddButtonList/';
import dataBase from './assets/db.json';

function App() {

 const [lists, setLists] = useState(
    dataBase.lists.map( (item) => {
      item.color = dataBase.colors.filter(color => color.id === item.colorId)[0].hex;
    return item;
  })
 );

 const onAddList = (obj) => {
   const newList = [
     ...lists,
     obj
   ];
console.log(newList);
   setLists(newList);
 }

 const onRemove = (element) => {
  alert('Delete');
 }

 const removeList = (item) => {
  if( window.confirm('Вы действительно хотите удалить этот список?')){
    onRemove(item);
  }
  
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
        onRemove={removeList}
        />
       <AddButtonList 
       colors={dataBase.colors}
       lists={lists}
       onAdd={onAddList}
       />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
