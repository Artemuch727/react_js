const defaultState = {
	taskId: '',
	enabled: false,
	properties: {
		description: '',
		comments: '',
		cost: 0,
		timer: 0
	}
};

const taskActions = (state = {task: defaultState}, action) => {
	switch (action.type) {
		case 'START_TASK':
			return {...state, task: {...state.task, taskId: action.item.taskId, enabled: action.item.enabled}};
		case 'STOP_TASK':
			return {...state, task: defaultState};
		case 'EDIT_TASK':
			switch (action.item.propName) {
				case 'description':
					return {...state, task: {...state.task, properties: {...state.task.properties, description: action.item.newProp}}};
				case 'comments':
					return {...state, task: {...state.task, properties: {...state.task.properties, comments: action.item.newProp}}};
				case 'cost':
					return {...state, task: {...state.task, properties: {...state.task.properties, cost: action.item.newProp}}};
				case 'timer':
					return {...state, task: {...state.task, properties: {...state.task.properties, timer: action.item.newProp}}};
				default:
					return state;
			}
		default:
			return state;
	}
};

export default taskActions;
