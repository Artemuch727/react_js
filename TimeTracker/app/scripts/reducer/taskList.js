import apiDB from '../actions/apiDB';

const taskList = (state = {list: apiDB.getTasksFromLStorage()}, action) => {
	switch (action.type) {
		case 'ADD_TASK': {
			return {...state, list: [...state.list, {...action.item,  enabled: false}]};
		}
		case 'EDIT_TASK_LIST':
			switch (action.item.propName) {
				case 'description':
					return {...state, list: state.list.map((item) =>
						(item.taskId == action.item.taskId ? {...item, properties: {...item.properties, description: action.item.newProp}}
							: item))
					};
				case 'comments':
					return {...state, list: state.list.map((item) =>
						(item.taskId == action.item.taskId ? {...item, properties: {...item.properties, comments: action.item.newProp}}
							: item))
					};
				case 'cost':
					return {...state, list: state.list.map((item) =>
						(item.taskId == action.item.taskId ? {...item, properties: {...item.properties, cost: action.item.newProp}}
							: item))
					};
				default:
					return state;
			}
		case 'DELETE_TASK': {
			let idxDelete = 0;
			state.list.forEach((item,index) => {
				if (item.taskId == action.item){
					idxDelete = index;
				}
			});
			return {...state, list:[...state.list.slice(0, idxDelete),  ...state.list.slice(idxDelete + 1)]};
		}
		default:
			return state;
	}
};

export default taskList;
