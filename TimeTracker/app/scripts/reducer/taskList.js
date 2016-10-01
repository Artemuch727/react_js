import apiDB from '../actions/apiDB';

const taskList = (state = apiDB.getTasksFromLocal(), action) => {
	switch (action.type) {
		case 'ADD_TASK': {
			return [...state, action.item];
		}
		case 'DELETE_TASK': {
			let newList = state;
			newList.forEach((item,index) => {
				if (item.taskId == action.item){
					newList.splice(index, 1);
				}
			});

			return [...state,  newList];
		}
		default:
			return state;
	}
};

export default taskList;
