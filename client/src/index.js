// Data layer control (Redux)
// import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// for anonymousUser in localStorage 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App';
import reducers from './reducers';
import 'react-bootstrap/dist/react-bootstrap.min.js';

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
// BEWARE of the localStorage timeout issue.
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(reduxThunk));
const persistor = persistStore(store);
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>, //update all children components when store updates.
	document.getElementById('root')
);

// console.log('STRIPE_KEY is: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENVIRONMENT is: ', process.env.NODE_ENV);
