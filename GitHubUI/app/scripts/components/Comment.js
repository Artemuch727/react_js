import React from 'react';

const Comment = ({ commentInfo }) => (
	<li className="comments">
		<div className="comments__author">
			<a href={commentInfo.user.html_url} >
				<img alt={commentInfo.user.login} className="author__img" src={commentInfo.user.avatar_url} height="40"  width="40" />
			</a>
		</div>
		<div className="comments__content content">
		<div className="content__commentTitle">  
			<a href={commentInfo.user.html_url} target="_blank" className="title__link">{commentInfo.user.login}</a>
				<span style={{fontSize: "12px"}}>{' создал комментарий: '}</span>
				<span className="title__dt">{commentInfo.created_at.substring(0, commentInfo.created_at.indexOf('T'))}</span>
		</div>                               
		<div className="content__body">
			{commentInfo.body}
		</div>
		</div>
	</li>
);

export default Comment;
