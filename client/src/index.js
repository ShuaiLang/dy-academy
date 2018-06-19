// Data layer control (Redux)
// import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App'
// import reducers from './reducers';


// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(<App />, document.getElementById('root'));

// console.log('STRIPE_KEY is: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENVIRONMENT is: ', process.env.NODE_ENV);
