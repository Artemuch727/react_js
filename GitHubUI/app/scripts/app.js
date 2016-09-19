import React from 'react';
import {render}from 'react-dom';
import { Router, Route, IndexRoute, browserHistory}from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import { Provider}from 'react-redux';
import {createStore}from 'redux';
import userStore from './reducers/index';
import IssuesListContainer from './containers/IssuesListContainer';
import SearchLayout from './containers/SearchLayout';
import CommentListContainer from './containers/CommentListContainer';

let store = createStore(userStore)
const history = syncHistoryWithStore(browserHistory, store)
render ( 
           <Provider store={store}>
             <Router history={history}>                 
                <Route path="/" component={SearchLayout}>  
                    <Route path="issues/(:userId)/(:repoId)/(:pageNum)" component={IssuesListContainer} />   
                		<Route path="issues/detail/(:issueId)" component={CommentListContainer} />  
                 </Route> 
                <Route path="*" component={SearchLayout} />  
             </Router>
            </Provider> , document.getElementById('content')
);