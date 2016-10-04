const apiDB = {
	getTasksFromLStorage: () => {
		let resultTasks = [];
		let index = 1;
		let TaskForExport = {};
		for (let element in localStorage) {
			if (element.indexOf('ask') !== 0) {
				TaskForExport = {
					taskId: JSON.parse(localStorage.getItem(element)).taskId,
					active: JSON.parse(localStorage.getItem(element)).enabled,
					properties: JSON.parse(localStorage.getItem(element)).properties
				};
				index++;
				resultTasks.push(TaskForExport);
			}
		}
		return resultTasks;
	},
	addNewTaskToLStorage: (task) => {
		localStorage.setItem("task_"+task.taskId, JSON.stringify(task));
	},
	deleteTaskFromLStorage: (task) => {
		localStorage.removeItem("task_"+ task.taskId);
	}
};

module.exports = apiDB;

