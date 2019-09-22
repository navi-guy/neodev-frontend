import React, {Component} from 'react';
import './App.css';
import Header from './Header';
import Table from './Table';

class App extends Component {
	render(){
		return (
			<div className="App">
				<Header  mytext="Hello gaa"></Header>
				<Table />

			</div>
			)
	}
  
}


export default App;

