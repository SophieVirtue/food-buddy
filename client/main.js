import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '../imports/ui/containers/App';
import * as serviceWorker from './serviceWorker';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => ReactDOM.render(<App />, document.getElementById('root')));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();