import apiDB from '../actions/apiDB';

const taskList = (state = {list: apiDB.getTasksFromLocal()}, action) => {
	switch (action.type) {
		case 'ADD_TASK': {
			let newAddedTask = action.item;
			newAddedTask.enabled = false;
			return {...state, list: [...state.list, newAddedTask]};
		}
		case 'EDIT_TASK_LIST':
			switch (action.item.propName) {
				case 'description':
					return {...state, list: state.list.map((item) =>
						(item.taskId == action.item.taskId ? {...item, properties: {...item.properties, description: action.item.newProp}}
							: item))
					};
				case 'project':
					return {...state, list: state.list.map((item) =>
						(item.taskId == action.item.taskId ? {...item, properties: {...item.properties, project: action.item.newProp}}
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
			let newList = state.list;
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
