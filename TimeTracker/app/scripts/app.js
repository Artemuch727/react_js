import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import taskStore from './reducer';
import TaskBox from './containers/TaskBox';

 let store = createStore(taskStore);
//let store = createStore(taskStore, window.devToolsExtension && window.devToolsExtension());

render(
	<Provider store = {store}>
		<TaskBox />
	</Provider>
	,document.getElementById('content')
);
