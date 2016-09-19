require('es6-promise').polyfill();
import {connect}from 'react-redux';
import {browserHistory}from 'react-router';
import axios from 'axios';
import {checkErrors, userFilter, reposFilter, repositorySelect, issuesFilter, issuesCount, showSpinner, visFilter}from '../actions/index';
import UserInfo from '../components/UserInfo';

const mapStateToProps = (state) => {
	return {
		errorLog: state.userFilter.errorLog,
		userLogin: state.userFilter.name,
		userRepos: state.filteredData.repos,
		repoIssues: state.filteredData.issues,
		itemsPerPage: state.visFilter.itemsPerPage,
		issuesCount: state.filteredData.issuesCount,
		showSpinner: state.showSpinner.active
	};
};

const mapDispatchToProps = (dispatch) => {
	const showErrorWindow = (errText) => {
		const autoHide = () => {
			document.querySelector('.errorDiv')
				.classList.remove('errorDiv--show');
		};
		dispatch(checkErrors(errText));
		document.querySelector('.errorDiv')
				.classList.add('errorDiv--show');
		setTimeout(autoHide, 1500);
	};
	return {
		onUserSelect: (userName) => {
			if (userName !== '') {
				dispatch(showSpinner(true));
				axios.get('https://api.github.com/users/' + userName)
					.then(() => {
						dispatch(userFilter(userName, null));
						axios.get('https://api.github.com/users/' + userName + '/repos?page=1&per_page=9999')
							.then((response) => {
								dispatch(reposFilter(response.data));
								dispatch(showSpinner(false));
								document.getElementsByName('repository')[0].focus();
								if (response.data.length > 0) {
									dispatch(checkErrors(''));
									document.querySelector('.errorDiv').classList.remove('errorDiv--show');
								}else {
									showErrorWindow('У пользователя нет репозиториев');
								}
							})
							.catch(() => {
								dispatch(reposFilter([]));
								dispatch(showSpinner(false));
								document.getElementsByName('login')[0].focus();
							});
					})
					.catch(() => {
						dispatch(userFilter('ERR_NotFound', null));
						dispatch(showSpinner(false));
						document.getElementsByName('login')[0].focus();
						showErrorWindow('Пользователь не найден');
					});
			}else {
				dispatch(userFilter(''));
			}
		},
		onRepoSelect: (userName, repoName, itemsPerPage) => {
			dispatch(repositorySelect(repoName));
			if (repoName !== '') {
				dispatch(showSpinner(true));
				axios.get('https://api.github.com/repos/' + userName + '/' + repoName + '/issues?page=1&per_page=9999')
					.then((response) => {
						dispatch(issuesCount(response.data.length));
						if (response.data.length === 0) {
							showErrorWindow('Нет обращений по репозиторию!');
						}
					})
					.catch(() => {
						dispatch(showSpinner(false));
						dispatch(issuesCount(0));
						document.getElementsByName('repository')[0].focus();
						showErrorWindow('Репозиторий не найден');
					});
				axios.get('https://api.github.com/repos/' + userName + '/' + repoName + '/issues?page=1&per_page=' + itemsPerPage)
					.then((response) => {
						dispatch(issuesFilter(response.data));
						dispatch(visFilter(itemsPerPage, 1));
						dispatch(showSpinner(false));
						browserHistory.push('/issues/' + userName + '/' + repoName + '/1');
					})
					.catch(() => {
						dispatch(showSpinner(false));
						dispatch(issuesFilter([]));
						document.getElementsByName('repository')[0].focus();
					});
			}else {
				dispatch(issuesFilter([]));
				dispatch(issuesCount(0));
			}
		}
	};
};

const UserLoginRepo = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfo);

export default UserLoginRepo;
