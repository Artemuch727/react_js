import {connect}from 'react-redux';
import axios from 'axios';
import {browserHistory}from 'react-router';
import {issuesFilter, showSpinner, visFilter}from '../actions/index';
import Paginator from '../components/Paginator';

const mapStateToProps = (state) => {
	return {
		userLogin: state.userFilter.name,
		repositorySelect: state.userFilter.rep,
		itemsPerPage: state.visFilter.itemsPerPage,
		pageSelected: state.visFilter.pageSelected,
		issuesCount: state.filteredData.issuesCount
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPageSelect: (pageNum, perPage, userName, repoName) => {
			dispatch(visFilter(perPage, pageNum));
			dispatch(showSpinner(true));
			axios.get('https://api.github.com/repos/' + userName + '/' + repoName + '/issues?page=' + pageNum + '&per_page=' + perPage)
				.then((response) => {
					dispatch(issuesFilter(response.data));
					dispatch(showSpinner(false));
				})
				.catch(() => {
					dispatch(issuesFilter([]));
					dispatch(showSpinner(false));
				});
		},
		onItemsOnPageChange: (perPage, pageNum, userName, repoName) => {
			window.scrollTo(0, 0);
			dispatch(visFilter(perPage, pageNum));
			dispatch(showSpinner(true));
			axios.get('https://api.github.com/repos/' + userName + '/' + repoName + '/issues?page=1&per_page=' + perPage)
				.then((response) => {
					dispatch(issuesFilter(response.data));
					dispatch(visFilter(perPage, 1));
					dispatch(showSpinner(false));
					browserHistory.push('/issues/' + userName + '/' + repoName + '/1');
				})
				.catch(() => {
					dispatch(issuesFilter([]));
					dispatch(showSpinner(false));
				});
		}
	};
};

const PagingContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Paginator);

export default PagingContainer;
