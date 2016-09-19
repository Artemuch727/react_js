const taskActions = (state ={}, action) => {
	switch (action.type) {
		case 'START_TASK':
			return Object.assign({}, state, action.item)
		case 'STOP_TASK':
			return Object.assign({}, state, action.item)
		case 'DELETE_TASK':
			return Object.assign({}, state, action.item)
		default:
			return state;
	};
};

export default taskActions;
