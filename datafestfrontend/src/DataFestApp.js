import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import FrontPage from "./FrontPage";

class DataFestApp extends Component {
	render() {
		return <Router>
			<div>
				<Route exact path="/" component={FrontPage.FrontPage}/>
				<Route exact path="/registration" component={FrontPage.FrontPage}/>
			</div>
		</Router>
	}
}



export default DataFestApp;
