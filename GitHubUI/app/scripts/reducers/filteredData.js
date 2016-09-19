const filteredData = (state = {repos: [], issues: [], issuesCount: 0, commentsData: {comments: [], issue: {}}}, action) => {
	switch (action.type) {
		case 'REPOS_CHECK':
			return {...state, repos: action.repos};
		case 'ISSUES_CHECK':
			return {...state, issues: action.issues};
		case 'ISSUES_COUNT':
			return {...state, issuesCount: action.total};
		case 'COMMENT_CHECK':
			return {...state,
				commentsData: {
					comments: action.comments.comments,
					issue: action.comments.issue
				}
			};
		default:
			return state;
	}
};

export default filteredData;
