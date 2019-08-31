import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = { lat: null, errorMessage: '' };

		//method has two arguments, arg1 is mandatory callback if success, arg2 is optional callback if failure
		window.navigator.geolocation.getCurrentPosition(
			position => {
				console.log(position.coords.latitude);
				this.setState({ lat: position.coords.latitude })
			},  //we must call setState()
			err => {
				console.log(err.errorMessage);
				this.setState({ errorMessage: err.message })
			}
		);
	}

	componentDidMount() {
		console.log('My component was rendered on the screen for the first time!');
	}
	componentDidUpdate() {
		console.log('Component updated!');
	}


	//React forces us to have method render
	render() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div >;
		}
		if (!this.state.errorMessage && this.state.lat) {
			return <div>Latitude: {this.state.lat}</div >;
		}

		//If we didnt return from previous two conditions, it means we are still loading
		return <div>Loading geolocation...</div >;

	}
}




ReactDOM.render(
	<App />, document.querySelector('#root')
);