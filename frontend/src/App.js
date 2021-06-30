import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react'

import './App.css';

function App() {
  const [toDoListItems, setToDoListItems] = useState([]);

  async function addNewItem(){
  
  let newItem = document.getElementById('newItem').value
    console.log('newItem', newItem)
  
    let newItemObject = {'todoitem': newItem}

    await fetch(`http://localhost:3001/updateList`, {  credentials: 'include', 
                                                method: 'post',
                                                headers: {
                                                            'Content-Type': 'application/json',
                                                            'charset':'UTF-8'
                                                         },
                                                body: JSON.stringify(newItemObject)
                                        })
  }


const displayToDoList = (toDoListItems) => {

  return (<>
    
    {toDoListItems.map((item, index) => {
      return <li id={index} >{item.todoitem} <button class="btn" onClick={() => removeItem(item.id)}><i class="fa fa-trash"></i></button></li>
      })}
    
  </>)
}

  const removeItem = async (itemToRemove) =>{
    console.log(itemToRemove)
    // post to the sever, and attach whatever was clicked on

    let item = { 'id': itemToRemove }

    await fetch(`http://localhost:3001/removeItem`, {  credentials: 'include', 
                                                method: 'post',
                                                headers: {
                                                            'Content-Type': 'application/json'
                                                         },
                                                body: JSON.stringify(item)
                                        })
  }

  useEffect( () => {
    const getToDoListFromDataBase = async () => {
      const response = await fetch(`http://localhost:3001/todo`, { credentials: 'include', method: 'get' });
      const listItems = await response.json();
      setToDoListItems(listItems)
    }
    getToDoListFromDataBase();
  }, [toDoListItems] )

  return (
    <div className="App">
      <header className="App-header">
        <div> 
          <div>
            <h1>ToDo List </h1>
            
            <input id="newItem" type="text"></input>
            <Button variant="outline-light" onClick={() => addNewItem()}>Click to add item to List</Button>
          </div>
          <div>
            <ul>{displayToDoList(toDoListItems)}</ul>
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
