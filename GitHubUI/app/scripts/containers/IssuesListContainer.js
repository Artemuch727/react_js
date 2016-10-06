import {connect}from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import {commentFilter, showSpinner}from '../actions/index';
import PagingContainer from '../containers/PagingContainer';
import Issue from '../components/Issue';

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

@connect(mapStateToProps, mapDispatchToProps)
class IssuesListContainer extends Component {
	render() {
		const {repoIssues, onIssueSelect} = this.props;
		return (
			<div>
				<div className={repoIssues.length > 0 ? 'issuelist' : 'issuelist hidden'}>
					<div>
						<ul>
							{
								repoIssues.map((issue) =>
									<Issue
										key={issue.id}
										issueInfo={issue}
										onIssueSelect={onIssueSelect}
									/>
								)
							}
						</ul>
					</div>
				</div>
				<PagingContainer />
			</div>
		)
	}
}

export default IssuesListContainer;
