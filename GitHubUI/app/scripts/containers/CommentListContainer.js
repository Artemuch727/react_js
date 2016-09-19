import {connect}from 'react-redux';
import CommentList from '../components/CommentList';

const mapStateToProps = (state) => {
	return {
		comments: state.filteredData.commentsData.comments,
		issueInfo: state.filteredData.commentsData.issue
	};
};

const CommentListContainer = connect(
	mapStateToProps
)(CommentList);

export default CommentListContainer;
