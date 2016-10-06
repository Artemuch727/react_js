require('es6-promise').polyfill();
import {connect}from 'react-redux';
import React, { Component } from 'react';
import {browserHistory}from 'react-router';
import axios from 'axios';
import {checkErrors, userFilter, reposFilter, repositorySelect, issuesFilter, issuesCount, showSpinner, visFilter}from '../actions/index';
import Spinner from '../components/Spinner';
import InputField from '../components/InputField/InputField';
import ErrorPopup from '../components/ErrorPopup';


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

@connect(mapStateToProps, mapDispatchToProps)
class UserLoginRepo extends Component {
	handleUserInput(value) {
		const {onUserSelect} = this.props;
		onUserSelect(value);
	}

	handleRepoSelect(value) {
		const {userLogin, onRepoSelect, itemsPerPage} = this.props;
		onRepoSelect(userLogin, value, itemsPerPage);
	}

	render() {
		const { errorLog, userRepos, userLogin, showSpinner } = this.props;

		return (
			<div className="userInfoBox__container">
				{ <ErrorPopup errorLog = {errorLog} /> }
				<div className="userInfoBox">
					<a className="logo" href="/">
						<svg aria-hidden="true" height="45" version="1.1" viewBox="0 0 16 16" width="45">
							<path
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
						</svg>
					</a>
					<InputField
						className = "inputBox__input"
						name = "login"
						type = "text"
						autoComplete = "off"
						onItemSelect = {this.handleUserInput.bind(this)}
						defaultValue = {userLogin}
					/>
					<InputField
						className = "inputBox__input"
						name = "repository"
						type = "text"
						onItemSelect = {this.handleRepoSelect.bind(this)}
						autoComplete = "on"
						data = {userRepos}
					/>
					<div className={(showSpinner ? "spinner" : "spinner novis")}>
						{ <Spinner /> }
					</div>
				</div>
			</div>
		)
	}
}

export default UserLoginRepo;
