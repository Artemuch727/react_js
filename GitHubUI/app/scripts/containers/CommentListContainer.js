import {connect}from 'react-redux';
import React, { Component } from 'react';
import Comment from '../components/Comment';

const mapStateToProps = (state) => {
	return {
		comments: state.filteredData.commentsData.comments,
		issueInfo: state.filteredData.commentsData.issue
	};
};

@connect(mapStateToProps)
class CommentListContainer extends Component {
	render() {
		const { comments, issueInfo } = this.props;

			return (
				<div className="commentsList">
					<div className={( issueInfo.title!='' ? "commentsList__issueBox" : "commentsList__issueBox hidden")}>
						<div className="issueBox__title">
							{issueInfo.title}
						</div>
						<div className="issueBox__content">
							{issueInfo.body}
						</div>
					</div>
					<ul className={(comments.length > 0 ? "commentsList__comments": "commentsList__comments hidden")}>
						{comments.map((comment) =>
							<Comment
								key={comment.id}
								commentInfo={comment}
							/>
						)}
					</ul>
				</div>
			);

	}

}
export default CommentListContainer;
