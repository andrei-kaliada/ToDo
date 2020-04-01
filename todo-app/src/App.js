import React from 'react';
import List from './components/List/List';
import iconSvgList from './assets/img/list.svg';
import iconSvgAdd from './assets/img/add.svg';


function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={
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
        <List items={[
          {
            icon:iconSvgAdd,
            name:'Add list',
           
          }
        ]}/>
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
