import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default preloadedState => {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(thunk)
	)
};

/*export default function () {
	return createStore(rootReducer, applyMiddleware(thunk));
}*/