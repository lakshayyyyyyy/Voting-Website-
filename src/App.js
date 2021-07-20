import React from 'react';
import ApexChart from './components/graph'
import './App.css';
import Main from './components/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/register.js'
import Votes from './components/Votes'
import First from './components/first'
import Second from './components/Second'
function App() {
  return (
    <div className="App">
      
      <Router>
        <Route exact path='/' component={Main}/>
        <Route exact path='/create' component={Register} />
        <Route exact path='/compare' component={ApexChart} />
        <Route exact path='/vote' component={Votes} />
        <Route exact path='/id' component={Second} />
        <Route  exact path='/f' component={First} />
      </Router>
    </div>
  );
}

export default App;
