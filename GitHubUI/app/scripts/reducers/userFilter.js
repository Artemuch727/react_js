const userFilter = (state = {name: '', rep: '', errorLog: '', showErrorDiv: false}, action) => {
	switch (action.type) {
		case 'USER_CHECK':
			return {...state, name: action.name};
		case 'REPOSITORY_CHECK':
			return {...state, rep: action.repoName};
		case 'ERROR_CHECK':
			return {...state, errorLog: action.errorLog};
		case 'ERROR_SHOW':
			return {...state, showErrorDiv: action.showErrorDiv};
		default:
			return state;
	}
};

export default userFilter;
