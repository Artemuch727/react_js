import {connect}from 'react-redux';
import axios from 'axios';
import {commentFilter, showSpinner}from '../actions/index';
import IssuesList from '../components/IssuesList';

const mapStateToProps = (state) => {
	return {
		userLogin: state.userFilter.name,
		userRepos: state.filteredData.repos,
		repoIssues: state.filteredData.issues,
		pageSelected: state.visFilter.pageSelected
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIssueSelect: (issueInfo) => {
			dispatch(showSpinner(true));
			axios.get(issueInfo.url + '/comments')
				.then((response) => {
					dispatch(commentFilter(response.data, issueInfo));
					dispatch(showSpinner(false));
				})
				.catch(() => {
					dispatch(showSpinner(false));
				});
		}
	};
};

const IssuesListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(IssuesList);

export default IssuesListContainer;
