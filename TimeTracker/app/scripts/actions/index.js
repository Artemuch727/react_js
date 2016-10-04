export const startTask = (item) => {
  return {
    type: 'START_TASK',
    item: item
  };
};

export const stopTask = () => {
  return {
    type: 'STOP_TASK'
  };
};


export const editTask = (propName, newProp) => {
  return {
    type: 'EDIT_TASK',
	item: {
    		propName: propName,
			newProp: newProp
    }
  };
};

/****************************************/

export const editTaskStorage = (taskId, propName, newProp) => {
	return {
		type: 'EDIT_TASK_LIST',
		item: {
			taskId: taskId,
			propName: propName,
			newProp: newProp
		}
	};
};

export const addTaskToStorage = (item) => {
	return {
		type: 'ADD_TASK',
		item: item
	};
};

export const deleteTask = (item) => {
	return {
		type: 'DELETE_TASK',
		item: item
	};
};


/******* timer actions **************/
export const startTimer = (item) => {
	return {
		type: 'DELETE_TASK',
		item: item
	};
};
