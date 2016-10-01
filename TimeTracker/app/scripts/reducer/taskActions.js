const taskActions = (state = {
	task: {
		taskId: '',
		enabled: false,
		properties: {
			description: '',
			project: '',
			comments: '',
			cost: 0,
			timer: 0
		}
	}
}, action) => {
	switch (action.type) {
		case 'START_TASK':
			return {...state, task: action.item};
		case 'STOP_TASK':
			return {...state, task: action.item};
		case 'EDIT_TASK':
			return {...state, task: action.item};
		default:
			return state;
	}
};

export default taskActions;
