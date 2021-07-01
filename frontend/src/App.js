import React from 'react';
// import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import Sandbox from './Sandbox.js';

import './App.css';

var angle = 0;
var sinA = 0;
var cosA = 0;
var mouseX = 0;
var mouseY = 0;
var radius = 30;


function App() {

  const [toDoListItems, setToDoListItems] = useState([]);
  const [mouseCoords, setMouseCoords] = useState([]);
  const [circleCoords, setCircleCoords] = useState(0);
  const timeoutRef = useRef(null)

  

  // let timerID = setTimeout(function tick() {
  //   console.log('tick');
  //   timerID = setTimeout(tick, 1000)
  // }, 1000)
  

  async function addNewItem(){
  
    let newItem = document.getElementById('newItem').value
    console.log('newItem', newItem)
  
    let newItemObject = {'todoitem': newItem}

    await fetch(`http://localhost:3001/updateList`, { credentials: 'include', 
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
      return <li key={index}> {item.todoitem}  <button className="btn" onClick={() => removeItem(item.id)}><i class="fa fa-trash"></i></button></li>
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
    if (timeoutRef.current !== null) {          // IF THERE'S A RUNNING TIMEOUT
      console.log('found old timer, and cleared it')
      clearTimeout(timeoutRef.current);         // THEN, CANCEL IT
    }

    console.log('page was loaded')
    let timerID = setTimeout( function tick() {
        cosA = Math.cos( angle) * radius
        sinA = Math.sin( angle) * radius
        
        angle += .1

        updateMousePointer()
       // console.log(cosA );
        timerID = setTimeout(tick, 25)
      }, 25)
  }, [])

  const tick = () => {
    
  }
  

  function updateMousePointer() {
    console.log(mouseX)
    document.getElementById('coords').style.left = `${mouseX + cosA}px`
    document.getElementById('coords').style.top = `${mouseY+30 +sinA}px`
   // setCircleCoords(cosA)
  }

  
 // updateMousePointer()
  useEffect( () => {
    const getToDoListFromDataBase = async () => {
      const response = await fetch(`http://localhost:3001/todo`, { credentials: 'include', method: 'get' });
      const listItems = await response.json();
      setToDoListItems(listItems)
    }
    getToDoListFromDataBase();
  }, [toDoListItems] )

  const handleMouseMove = (e) => {
    // console.log(e.pageX, e.pageY)
    setMouseCoords([e.pageX, e.pageY])
    mouseX = e.pageX-document.getElementById('coordParent').offsetLeft
    mouseY = e.pageY-document.getElementById('coordParent').offsetTop

    document.getElementById('coords').style.left = `${e.pageX-document.getElementById('coordParent').offsetLeft + cosA}px`
    document.getElementById('coords').style.top = `${e.pageY-document.getElementById('coordParent').offsetTop+30 + sinA }px`

    //console.log(document.getElementById('coords').style.left)

    // $("#follow").css({
    //   left: e.pageX,
    //   top: e.pageY
    // })
  }

  return (
    <div className="App" onMouseMove={(e) => handleMouseMove(e)}>
      <header className="App-header">
        <div> 
          <div id='coordParent' className = 'sticky'>
            <h1>ToDo List </h1>
            <div className='follow'  id='coords'> 
              {`Mouse Coordinates`} <br/>
              {`X: ${mouseCoords[0]}`} <br/>
              {`Y: ${mouseCoords[1]}`}
            </div>
            {/* <form */}
              
              <input id="newItem" type="text"></input>
              <Button variant="contained" size= 'small' onClick={() => addNewItem()}>Add item</Button>
            {/* </form> */}
          </div>
          <div>
            <div>{circleCoords}</div>
            <ul>{displayToDoList(toDoListItems)}</ul>
          </div>
        </div>
      </header>
      {/* <body>
        <Sandbox listItems={toDoListItems}/>
      </body> */}
    </div>
  );
}

export default App;
