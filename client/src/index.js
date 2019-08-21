import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './style/style.css';

let preloadedState = {};
if (window.sessionStorage.getItem('sessionUsername')) {
	preloadedState = {
		sessionReducer: {
			username: window.sessionStorage.getItem('sessionUsername')
		},
		userInfoReducer: {
			imageUrl: window.sessionStorage.getItem('sessionAvatar')
		}
	}
}

const store = configureStore(preloadedState);
ReactDOM.render(
	<Provider store={store}> 
		<App />
	</Provider>,
	document.getElementById('root')
)