import React, {useState} from 'react';
import List from './components/List';
import iconSvgList from './assets/img/list.svg';
import AddButtonList from './components/AddButtonList/';
import dataBase from './assets/db.json';

function App() {

 

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
         <List items={[
          {
            color:'green',
            name:'Products'
          },
          {
            color:'blue',
            name:'Frontend',
            active:true,
          },
          {
            color:'pink',
            name:'Films and Serial'
          }
          
        ]}
        isRemovable
        />
       <AddButtonList 
       colors={dataBase.colors}
       />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
