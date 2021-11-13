import React from 'react';
import logo from './img/tier-logo.svg';
import './css/App.css';
import ShortenUrlForm from './components';

const App = () => (
    <div className="App">
    	<div className="header">
	        <img src={logo} className="App-logo" alt="logo" />
	        <p>Change mobility for good</p>
        </div>
        <ShortenUrlForm />
    </div>
);

export default App;
