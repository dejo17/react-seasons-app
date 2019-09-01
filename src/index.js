import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'


class App extends React.Component {

	state = { lat: null, errorMessage: '' }; 
	//This is kind of initialization is enabled by Babel, it creates constructor and initializes state for us

	componentDidMount() {
		//method has two arguments, arg1 is mandatory callback if success, arg2 is optional callback if failure
		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({ lat: position.coords.latitude }),  //we must call setState() to set state, not use nay other way
			err => this.setState({ errorMessage: err.message })
		);
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
			return <SeasonDisplay lat = {this.state.lat}/>;
		}

		//If we didnt return from previous two conditions, it means we are still loading
		return <Spinner text ="Please allow us to find your location"/>;

	}
}

ReactDOM.render(
	<App />, document.querySelector('#root')
);