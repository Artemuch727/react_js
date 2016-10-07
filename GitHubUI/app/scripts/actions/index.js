// actions
export const showSpinner = (active) => {
	return {
		type: 'SPINNER_SHOW',
		active: active
	};
};

export const userFilter = (userName)	=> {
	return {
		type: 'USER_CHECK',
		name: userName
	};
};

export const checkErrors = (errorLog) => {
	return {
		type: 'ERROR_CHECK',
		errorLog: errorLog
	};
};

export const showErrorDiv = (showErrorDiv) => {
	return {
		type: 'ERROR_SHOW',
		showErrorDiv: showErrorDiv
	};
};


export const repositorySelect = (repoName) => {
	return {
		type: 'REPOSITORY_CHECK',
		repoName: repoName
	};
};

export const reposFilter = (reposName) => {
	return {
		type: 'REPOS_CHECK',
		repos: reposName
	};
};

export const issuesFilter = (issues) => {
	return {
		type: 'ISSUES_CHECK',
		issues: issues
	};
};

export const issuesCount = (total) => {
	return {
		type: 'ISSUES_COUNT',
		total
	};
};

export const commentFilter = (comments, issue) => {
	return {
		type: 'COMMENT_CHECK',
		comments: {comments: comments,
			issue: issue}
	};
};

// export const itemsPerPage = (filter) => {
// 	return {
// 		type: 'SET_ITEMSPERPAGE_FILTER',
// 		filter
// 	};
// };

// export const pageSelected = (filter) => {
// 	return {
// 		type: 'SET_PAGESELECTED_FILTER',
// 		filter
// 	};
// };

export const visFilter = ( itemsPerPage, pageSelected ) => {
	return {
		type: 'SET_VISIBLITY_FILTER',
		filter: {itemsPerPage: itemsPerPage,
			pageSelected: pageSelected}
	};
};
