import {connect}from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import {browserHistory}from 'react-router';
import {issuesFilter, showSpinner, visFilter}from '../actions/index';
import { Link } from 'react-router';


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

@connect(mapStateToProps,mapDispatchToProps)
class PagingContainer extends Component {
	onItemsOnPageSelect(event) {
		const { pageSelected, userLogin, repositorySelect, onItemsOnPageChange  } = this.props;
		onItemsOnPageChange(event.target.value, pageSelected,  userLogin, repositorySelect)
	}

	onPageChangeDown() {
		const {itemsPerPage, pageSelected, userLogin, repositorySelect, onPageSelect  } = this.props;
		onPageSelect((pageSelected-1 == 0 ? pageSelected : pageSelected-1), itemsPerPage, userLogin, repositorySelect);
	}

	onPageChangeUp() {
		const {itemsPerPage, pageSelected, userLogin, repositorySelect, onPageSelect  } = this.props;
		onPageSelect((pageSelected+1 == 0 ? pageSelected : pageSelected+1), itemsPerPage, userLogin, repositorySelect);
	}

	onPageChange(item) {
		const {itemsPerPage, userLogin, repositorySelect, onPageSelect  } = this.props;
		onPageSelect(item, itemsPerPage, userLogin, repositorySelect)
	}

	render() {
		const {itemsPerPage, pageSelected, issuesCount, userLogin, repositorySelect } = this.props;
		var pageCount = 0;
		var pageArray = [];
		if (issuesCount > itemsPerPage) {
			pageCount = Math.round(issuesCount / itemsPerPage);
		}
		for (var i = 1 ; i <= pageCount ; i++) {
			pageArray.push(i);
		}

		return (
			<div className={issuesCount > 0 ? 'paginator':'paginator hidden'}>
				<div className='pageNavigation'>
					<ul className="pageNavigation__pageList">
						<li className={(pageCount>0?'':'hidden')}  onClick={this.onPageChangeDown.bind(this)}>
							<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' +(pageSelected-1 == 0 ? pageSelected : pageSelected-1)} aria-label="Previous" className="pageList__item" >
								<span aria-hidden="true">&laquo;</span>
							</Link>
						</li>
						{
							pageArray.map((item) => {
							return (
								<li key={item}  onClick={this.onPageChange.bind(this, item)}>
									<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' + item} className={(pageSelected == item ? 'pageList__item pageList__item--active':'pageList__item')} >{item}</Link>
								</li>
							)
						})
						}
						<li className={(pageCount>0?'':'hidden')}  onClick={this.onPageChangeUp.bind(this)}>
							<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' +(pageSelected+1 > pageCount ? pageCount : pageSelected+1)} aria-label="Next" className="pageList__item">
								<span aria-hidden="true">&raquo;</span>
							</Link>
						</li>
						<li className="pageList__item" >
					<span > на странице:
						<select id="mySelectId" name="mySelect" className="pageNavigation__itemSelector" onChange = {this.onItemsOnPageSelect.bind(this)}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="9999">Все</option>
						</select>
					</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default PagingContainer;
