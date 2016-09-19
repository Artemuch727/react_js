const TimePickerActions = {
	getTasksFromLocal: function() {
		var resultTasks = [];
		var index = 1;
		var TaskForExport = {};
		for (var element in localStorage){
			if (element.indexOf('ask') !== 0){
				TaskForExport = {
					id: JSON.parse(localStorage.getItem(element)).id,
					person: JSON.parse(localStorage.getItem(element)).person,
					project: JSON.parse(localStorage.getItem(element)).project,
					comment: JSON.parse(localStorage.getItem(element)).comment,
					cost: JSON.parse(localStorage.getItem(element)).cost,
					active: JSON.parse(localStorage.getItem(element)).active,
					timer: JSON.parse(localStorage.getItem(element)).timer
				};
				index++;
				resultTasks.push(TaskForExport);
			}
		}
		return resultTasks;
	}
};

module.exports = TimePickerActions;
