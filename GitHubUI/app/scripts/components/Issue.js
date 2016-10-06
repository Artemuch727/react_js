import React, { Component } from 'react';
import { Link } from 'react-router'

class Issue extends Component {
	selectIssue(issue) {
		const { onIssueSelect } = this.props;
		onIssueSelect(issue);
	}

	render() {
		const { issueInfo } = this.props;
		return (
			<li className="issueBox issuelist__issueBox-box">
				<div className="issueBox__author">
					<div className="author__img">
						<a href={issueInfo.user.html_url} >
							<img alt={issueInfo.user.login} src={issueInfo.user.avatar_url} height="40"  width="40" />
						</a>
					</div>
					<div className="author__login login">
						<a href={issueInfo.user.html_url} target="_blank" className="login__link">{issueInfo.user.login}</a>
					</div>
				</div>
				<div className="content issueBox__content">
					<div className="content__issueTitle">
						<Link  to={"/issues/detail/id" + issueInfo.id} onClick={this.selectIssue.bind(this, issueInfo)}  className="title__link"> {issueInfo.title} </Link>
						<div className="title__comments">
							<svg aria-hidden="true" height="35" version="1.1" viewBox="0 0 16 16" width="35">
								<path d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path>
							</svg>
							<span className="info__text">{issueInfo.comments}</span>
						</div>
					</div>
					<div className="content__info info">
				<span>
					{'#' + issueInfo.number +' создано: '+ issueInfo.created_at.substring(0, issueInfo.created_at.indexOf('T')) + ', пользователем '}
					<a href={issueInfo.user.html_url} target="_blank" className="login__link">{issueInfo.user.login}</a>
				</span>
					</div>
				</div>
			</li>
		)
	}
}

export default Issue;
