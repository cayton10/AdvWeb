//Running through book: "Road to React" Tutorial
import React from 'react';

//Can also define some constants and variables up here
const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

//Function component
function App() {
  //This is where function implementations are placed

  return (
    //Returns code that "looks" like HTML which is called JSX
    <div>
      <h1>My Hacker Stories</h1>

      <label hhtmlFor='search'>Search: </label>
      <input id='search' type='text' />

      <hr />
      
      <List />
      
    </div>
  );
}

//Creating another component here for our list
function List() {

  return list.map(function(item) {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });

}

export default App;
