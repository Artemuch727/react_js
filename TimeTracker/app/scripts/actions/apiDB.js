const apiDB = {
	getTasksFromLocal: () => {
		let resultTasks = [];
		let index = 1;
		let TaskForExport = {};
		for (let element in localStorage) {
			if (element.indexOf('ask') !== 0) {
				TaskForExport = {
					taskId: JSON.parse(localStorage.getItem(element)).taskId,
					active: JSON.parse(localStorage.getItem(element)).enabled,
					properties: JSON.parse(localStorage.getItem(element)).properties
					//timer: JSON.parse(localStorage.getItem(element)).timer
				};
				index++;
				resultTasks.push(TaskForExport);
			}
		}
		return resultTasks;
	},
	addNewTaskToStorage: (task) => {
		localStorage.setItem("task_"+task.taskId, JSON.stringify(task));
	}
};

module.exports = apiDB;
