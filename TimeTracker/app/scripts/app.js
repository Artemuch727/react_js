import React from 'react';
import {render} from 'react-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'


import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TaskBox from './components/TaskBox';
import Actions from './actions/actions';
import {blue500, red500, greenA200,deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

injectTapEventPlugin();
render( <MuiThemeProvider >
        		<div>
     				 <TaskBox data={Actions.getTasksFromLocal()} 
        				/>
        		</div>
      		</MuiThemeProvider>, 
      		document.getElementById('content'));