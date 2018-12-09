import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faPlus, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Home from './components/Home';
import Toolbar from './components/Toolbar';

library.add(faHeart, faPlus, faFileUpload);
class App extends Component {
	render() {
		return (
			<div>
				<Toolbar />
				<Home />
			</div>
		);
	}
}

export default App;
