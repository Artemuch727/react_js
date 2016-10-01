/**
 * Created by User on 01.10.2016.
 */
import {combineReducers}from 'redux';
import taskList from './taskList';
import taskActions from './taskActions';

const taskStore = combineReducers({
	taskActions,
	taskList
});

export default taskStore;
