import {combineReducers}from 'redux';
import userFilter from './userFilter';
import showSpinner from './showSpinner';
import visFilter from './visFilter';
import filteredData from './filteredData';
import {routerReducer}from 'react-router-redux';

const userStore = combineReducers({
	userFilter,
	showSpinner,
	visFilter,
	filteredData,
	routing: routerReducer
});

export default userStore;
