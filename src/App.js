import React from 'react';
import axios from 'axios';
import { acquireToken, getGraphToken } from './adalConfig';
import './App.css';

class App extends React.Component {
	state = {
		userData: ''
	};

	async componentDidMount() {
		await acquireToken();
		let graphToken = await getGraphToken();

		try {
			let response = await axios({
				url: 'https://graph.microsoft.com/v1.0/me',
				method: 'GET',
				headers: { Authorization: `Bearer ${graphToken}` }
			});

			if (response.status != 200 && response.status != 204) {
				return 'error';
			}

			this.setState({ userData: response.data });
		} catch (error) {
			return 'error';
		}
	}

	tokenRefresher = () => {
		acquireToken();
	};

	render() {
		let userName = '';

		setInterval(this.tokenRefresher, 150000);

		if (this.state.userData != '') {
			userName = this.state.userData.givenName;
		}

		return <div className="App">Welcome, {userName}</div>;
	}
}

export default App;
